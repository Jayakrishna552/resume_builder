import { useState } from 'react';
import { FolderKanban, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import './forms.css';

const emptyEntry = { name: '', description: '', tech: '', github: '', live: '' };

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;
  const [errors, setErrors] = useState({});

  const validate = (id, field, value) => {
    if (field === 'name' && !value.trim()) return 'Project name is required';
    return '';
  };

  const handleAdd = () => {
    addProject(emptyEntry);
  };

  const handleChange = (id, field, value) => {
    updateProject(id, field, value);
    setErrors((prev) => ({ ...prev, [`${id}-${field}`]: validate(id, field, value) }));
  };

  return (
    <div className="form-card fade-in">
      <div className="section-title">
        <span className="icon"><FolderKanban size={18} /></span>
        Projects
      </div>

      {projects.length === 0 && (
        <div className="empty-hint">No projects added yet. Showcase your work.</div>
      )}

      {projects.map((entry, index) => (
        <div className="entry-card" key={entry.id}>
          <div className="entry-header">
            <div className="entry-index">{index + 1}</div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeProject(entry.id)}
            >
              <Trash2 size={15} />
              Remove
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Project Name *</label>
            <input
              className={`form-input ${errors[`${entry.id}-name`] ? 'input-error' : ''}`}
              value={entry.name}
              onChange={(e) => handleChange(entry.id, 'name', e.target.value)}
              placeholder="E-Commerce Platform"
            />
            {errors[`${entry.id}-name`] && (
              <span className="form-error">{errors[`${entry.id}-name`]}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={entry.description}
              onChange={(e) => handleChange(entry.id, 'description', e.target.value)}
              placeholder="Describe the project, its purpose and your role..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Technologies Used</label>
            <input
              className="form-input"
              value={entry.tech}
              onChange={(e) => handleChange(entry.id, 'tech', e.target.value)}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">GitHub Link</label>
              <input
                className="form-input"
                value={entry.github}
                onChange={(e) => handleChange(entry.id, 'github', e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Live Demo Link</label>
              <input
                className="form-input"
                value={entry.live}
                onChange={(e) => handleChange(entry.id, 'live', e.target.value)}
                placeholder="https://demo.example.com"
              />
            </div>
          </div>
        </div>
      ))}

      <button className="add-btn" onClick={handleAdd}>
        <Plus size={18} />
        Add Project
      </button>
    </div>
  );
}
