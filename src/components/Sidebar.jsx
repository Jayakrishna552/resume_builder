import {
  User,
  GraduationCap,
  Briefcase,
  Sparkles,
  FolderKanban,
  Award,
  RotateCcw,
} from 'lucide-react';
import { useResume, calculateCompletion } from '../context/ResumeContext';
import './Sidebar.css';

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'certifications', label: 'Certifications', icon: Award },
];

export default function Sidebar({ activeSection, onSelect }) {
  const { resumeData, resetResume } = useResume();
  const completion = calculateCompletion(resumeData);

  return (
    <aside className="sidebar">
      <div className="sidebar-progress">
        <div className="progress-header">
          <span className="progress-title">Resume Completion</span>
          <span className="progress-value">{completion}%</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${completion}%`,
              background:
                completion === 100
                  ? 'linear-gradient(90deg, #10b981, #34d399)'
                  : 'linear-gradient(90deg, var(--bg-gradient-1), var(--bg-gradient-3))',
            }}
          />
        </div>
        <p className="progress-hint">
          {completion === 100 ? 'Perfect! Your resume is complete!' : 'Fill all sections to complete'}
        </p>
      </div>

      <nav className="sidebar-nav">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(section.id)}
            >
              <span className="sidebar-icon">
                <Icon size={18} />
              </span>
              <span>{section.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="btn btn-danger btn-sm btn-block" onClick={resetResume}>
          <RotateCcw size={16} />
          Clear Resume
        </button>
      </div>
    </aside>
  );
}
