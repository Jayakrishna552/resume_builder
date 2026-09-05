import { useState } from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import './forms.css';

const emptyEntry = { company: '', role: '', startDate: '', endDate: '', description: '' };
const currentYear = new Date().getFullYear();
const startYear = currentYear - 40;

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { experience } = resumeData;
  const [errors, setErrors] = useState({});

  const validate = (id, field, value) => {
    if (field === 'company' && !value.trim()) return 'Company name is required';
    if (field === 'role' && !value.trim()) return 'Job role is required';
    return '';
  };

  const handleAdd = () => {
    addExperience(emptyEntry);
  };

  const handleChange = (id, field, value) => {
    updateExperience(id, field, value);
    setErrors((prev) => ({ ...prev, [`${id}-${field}`]: validate(id, field, value) }));
  };

  const monthOptions = () => {
    const options = [];
    for (let y = currentYear; y >= startYear; y--) {
      for (let m = 1; m <= 12; m++) {
        options.push(`${y}-${String(m).padStart(2, '0')}`);
      }
    }
    return options;
  };

  return (
    <div className="form-card fade-in">
      <div className="section-title">
        <span className="icon"><Briefcase size={18} /></span>
        Work Experience
      </div>

      {experience.length === 0 && (
        <div className="empty-hint">No experience added yet. Add your work history.</div>
      )}

      {experience.map((entry, index) => (
        <div className="entry-card" key={entry.id}>
          <div className="entry-header">
            <div className="entry-index">{index + 1}</div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeExperience(entry.id)}
            >
              <Trash2 size={15} />
              Remove
            </button>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Company Name *</label>
              <input
                className={`form-input ${errors[`${entry.id}-company`] ? 'input-error' : ''}`}
                value={entry.company}
                onChange={(e) => handleChange(entry.id, 'company', e.target.value)}
                placeholder="Google"
              />
              {errors[`${entry.id}-company`] && (
                <span className="form-error">{errors[`${entry.id}-company`]}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Job Role *</label>
              <input
                className={`form-input ${errors[`${entry.id}-role`] ? 'input-error' : ''}`}
                value={entry.role}
                onChange={(e) => handleChange(entry.id, 'role', e.target.value)}
                placeholder="Frontend Developer"
              />
              {errors[`${entry.id}-role`] && (
                <span className="form-error">{errors[`${entry.id}-role`]}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <select
                className="form-select"
                value={entry.startDate}
                onChange={(e) => handleChange(entry.id, 'startDate', e.target.value)}
              >
                <option value="">Select month</option>
                {monthOptions().map((m) => (
                  <option key={m} value={m}>
                    {formatDateLabel(m)}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <select
                className="form-select"
                value={entry.endDate}
                onChange={(e) => handleChange(entry.id, 'endDate', e.target.value)}
              >
                <option value="">Select month</option>
                <option value="Present">Present</option>
                {monthOptions().map((m) => (
                  <option key={m} value={m}>
                    {formatDateLabel(m)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Job Description</label>
            <textarea
              className="form-textarea"
              value={entry.description}
              onChange={(e) => handleChange(entry.id, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
        </div>
      ))}

      <button className="add-btn" onClick={handleAdd}>
        <Plus size={18} />
        Add Experience
      </button>
    </div>
  );
}

function formatDateLabel(value) {
  if (!value || value === 'Present') return value || 'Select month';
  const [year, month] = value.split('-');
  const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10)]} ${year}`;
}
