import { useState } from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import './forms.css';

const emptyEntry = { name: '', organization: '', year: '' };
const currentYear = new Date().getFullYear();

export default function CertificationsForm() {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResume();
  const { certifications } = resumeData;
  const [errors, setErrors] = useState({});

  const validate = (id, field, value) => {
    if (field === 'name' && !value.trim()) return 'Certificate name is required';
    if (field === 'organization' && !value.trim()) return 'Organization is required';
    return '';
  };

  const handleAdd = () => {
    addCertification(emptyEntry);
  };

  const handleChange = (id, field, value) => {
    updateCertification(id, field, value);
    setErrors((prev) => ({ ...prev, [`${id}-${field}`]: validate(id, field, value) }));
  };

  const yearOptions = () => {
    const years = [];
    for (let y = currentYear; y >= 1970; y--) years.push(y);
    return years;
  };

  return (
    <div className="form-card fade-in">
      <div className="section-title">
        <span className="icon"><Award size={18} /></span>
        Certifications
      </div>

      {certifications.length === 0 && (
        <div className="empty-hint">No certifications added yet.</div>
      )}

      {certifications.map((entry, index) => (
        <div className="entry-card" key={entry.id}>
          <div className="entry-header">
            <div className="entry-index">{index + 1}</div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeCertification(entry.id)}
            >
              <Trash2 size={15} />
              Remove
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Certificate Name *</label>
            <input
              className={`form-input ${errors[`${entry.id}-name`] ? 'input-error' : ''}`}
              value={entry.name}
              onChange={(e) => handleChange(entry.id, 'name', e.target.value)}
              placeholder="AWS Certified Developer"
            />
            {errors[`${entry.id}-name`] && (
              <span className="form-error">{errors[`${entry.id}-name`]}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Organization *</label>
            <input
              className={`form-input ${errors[`${entry.id}-organization`] ? 'input-error' : ''}`}
              value={entry.organization}
              onChange={(e) => handleChange(entry.id, 'organization', e.target.value)}
              placeholder="Amazon Web Services"
            />
            {errors[`${entry.id}-organization`] && (
              <span className="form-error">{errors[`${entry.id}-organization`]}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Year</label>
            <select
              className="form-select"
              value={entry.year}
              onChange={(e) => handleChange(entry.id, 'year', e.target.value)}
            >
              <option value="">Select year</option>
              {yearOptions().map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <button className="add-btn" onClick={handleAdd}>
        <Plus size={18} />
        Add Certification
      </button>
    </div>
  );
}
