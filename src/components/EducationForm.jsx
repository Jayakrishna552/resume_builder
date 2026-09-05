import { useState } from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import './forms.css';

const emptyEntry = { college: '', degree: '', field: '', startYear: '', endYear: '', score: '' };
const currentYear = new Date().getFullYear();

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;
  const [errors, setErrors] = useState({});

  const validate = (id, field, value) => {
    if (field === 'college' && !value.trim() && value !== '') return 'College name is required';
    if (field === 'degree' && !value.trim() && value !== '') return 'Degree is required';
    return '';
  };

  const handleAdd = () => {
    addEducation(emptyEntry);
  };

  const handleChange = (id, field, value) => {
    updateEducation(id, field, value);
    setErrors((prev) => ({ ...prev, [`${id}-${field}`]: validate(id, field, value) }));
  };

  const yearOptions = () => {
    const years = [];
    for (let y = currentYear + 5; y >= 1970; y--) years.push(y);
    return years;
  };

  return (
    <div className="form-card fade-in">
      <div className="section-title">
        <span className="icon"><GraduationCap size={18} /></span>
        Education
      </div>

      {education.length === 0 && (
        <div className="empty-hint">No education added yet. Add your educational background.</div>
      )}

      {education.map((entry, index) => (
        <div className="entry-card" key={entry.id}>
          <div className="entry-header">
            <div className="entry-index">{index + 1}</div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeEducation(entry.id)}
            >
              <Trash2 size={15} />
              Remove
            </button>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">College / University *</label>
              <input
                className={`form-input ${errors[`${entry.id}-college`] ? 'input-error' : ''}`}
                value={entry.college}
                onChange={(e) => handleChange(entry.id, 'college', e.target.value)}
                placeholder="Stanford University"
              />
              {errors[`${entry.id}-college`] && (
                <span className="form-error">{errors[`${entry.id}-college`]}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Degree *</label>
              <input
                className={`form-input ${errors[`${entry.id}-degree`] ? 'input-error' : ''}`}
                value={entry.degree}
                onChange={(e) => handleChange(entry.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
              />
              {errors[`${entry.id}-degree`] && (
                <span className="form-error">{errors[`${entry.id}-degree`]}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Field of Study</label>
            <input
              className="form-input"
              value={entry.field}
              onChange={(e) => handleChange(entry.id, 'field', e.target.value)}
              placeholder="Computer Science"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Year</label>
              <select
                className="form-select"
                value={entry.startYear}
                onChange={(e) => handleChange(entry.id, 'startYear', e.target.value)}
              >
                <option value="">Select year</option>
                {yearOptions().map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">End Year</label>
              <select
                className="form-select"
                value={entry.endYear}
                onChange={(e) => handleChange(entry.id, 'endYear', e.target.value)}
              >
                <option value="">Select year</option>
                {yearOptions().map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Percentage / CGPA</label>
            <input
              className="form-input"
              value={entry.score}
              onChange={(e) => handleChange(entry.id, 'score', e.target.value)}
              placeholder="8.5 CGPA / 85%"
            />
          </div>
        </div>
      ))}

      <button className="add-btn" onClick={handleAdd}>
        <Plus size={18} />
        Add Education
      </button>
    </div>
  );
}
