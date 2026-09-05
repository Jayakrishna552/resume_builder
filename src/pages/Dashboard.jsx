import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  FileText,
  Plus,
  Pencil,
  Trash2,
  Layers,
  Clock,
  FilePlus2,
} from 'lucide-react';
import { useResume, calculateCompletion } from '../context/ResumeContext';
import { sampleResumeData } from '../utils/sampleData';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { resumes, removeResume, loadResume } = useResume();
  const [confirmDelete, setConfirmDelete] = useState(null);

  const createNew = () => {
    navigate('/builder');
  };

  const editResume = (resume) => {
    loadResume(resume);
    navigate('/builder');
  };

  const loadSample = () => {
    loadResume(sampleResumeData);
    navigate('/builder');
  };

  const handleDelete = (id) => {
    removeResume(id);
    setConfirmDelete(null);
  };

  const formatDate = (date) => {
    if (!date) return 'Not saved yet';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <Layers size={28} />
          <div>
            <h1>My Resumes</h1>
            <p>Manage and create your resumes</p>
          </div>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-outline" onClick={loadSample}>
            <FilePlus2 size={18} />
            Load Sample Data
          </button>
          <button className="btn btn-primary" onClick={createNew}>
            <Plus size={18} />
            Create New
          </button>
        </div>
      </div>

      {resumes.length === 0 ? (
        <div className="dashboard-empty">
          <div className="empty-icon">
            <FileText size={48} />
          </div>
          <h2>No Resumes Yet</h2>
          <p>Start building your first professional resume today!</p>
          <div className="empty-actions">
            <button className="btn btn-primary" onClick={createNew}>
              <Plus size={18} />
              Create New Resume
            </button>
            <button className="btn btn-outline" onClick={loadSample}>
              Try with Sample Data
            </button>
          </div>
        </div>
      ) : (
        <div className="dashboard-grid">
          <button className="create-card" onClick={createNew}>
            <div className="create-card-icon">
              <Plus size={32} />
            </div>
            <span>Create New Resume</span>
          </button>

          {resumes.map((resume) => {
            const completion = calculateCompletion(resume);
            return (
              <div className="resume-card" key={resume.id}>
                <div className="resume-card-top">
                  <div className="resume-card-icon">
                    <FileText size={24} />
                  </div>
                  <div className="resume-card-meta">
                    <h3>{resume.personalInfo.fullName || 'Untitled Resume'}</h3>
                    <p>{resume.personalInfo.email || 'No email'}</p>
                  </div>
                </div>

                <div className="resume-card-progress">
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${completion}%`,
                        background: 'linear-gradient(90deg, var(--bg-gradient-1), var(--bg-gradient-3))',
                      }}
                    />
                  </div>
                  <span className="completion-num">{completion}%</span>
                </div>

                <div className="resume-card-footer">
                  <span className="resume-date">
                    <Clock size={14} />
                    {resume.updatedAt ? formatDate(resume.updatedAt) : 'Draft'}
                  </span>
                  <span className="template-badge">{resume.template}</span>
                </div>

                <div className="resume-card-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => editResume(resume)}>
                    <Pencil size={15} />
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setConfirmDelete(resume.id)}
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>

                {confirmDelete === resume.id && (
                  <div className="delete-confirm">
                    <p>Delete this resume?</p>
                    <div className="delete-confirm-actions">
                      <button className="btn btn-sm btn-outline" onClick={() => setConfirmDelete(null)}>
                        Cancel
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(resume.id)}>
                        Yes, Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
