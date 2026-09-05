import { useRef, useState } from 'react';
import { User, Camera, Upload, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import './forms.css';

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo, setPersonalInfo, convertFileToBase64, showToast } =
    useResume();
  const { personalInfo } = resumeData;
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const validate = (field, value) => {
    let error = '';
    if (field === 'fullName' && !value.trim()) {
      error = 'Full name is required';
    }
    if (field === 'email') {
      if (!value.trim()) error = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Enter a valid email address';
    }
    return error;
  };

  const handleChange = (field, value) => {
    updatePersonalInfo(field, value);
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
  };

  const handleBlur = (field, value) => {
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
  };

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast('Image must be under 2MB', 'error');
      return;
    }
    const base64 = await convertFileToBase64(file);
    setPersonalInfo({ photo: base64 });
    showToast('Photo uploaded successfully!');
  };

  const removePhoto = () => {
    setPersonalInfo({ photo: '' });
  };

  return (
    <div className="form-card fade-in">
      <div className="section-title">
        <span className="icon"><User size={18} /></span>
        Personal Information
      </div>

      <div className="photo-upload">
        {personalInfo.photo ? (
          <img
            src={personalInfo.photo}
            alt="Profile"
            className="photo-preview"
          />
        ) : (
          <div className="photo-placeholder">
            <Camera size={28} />
          </div>
        )}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhoto}
          />
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={16} />
              {personalInfo.photo ? 'Change Photo' : 'Upload Photo'}
            </button>
            {personalInfo.photo && (
              <button className="btn btn-danger btn-sm" onClick={removePhoto}>
                <Trash2 size={16} />
                Remove
              </button>
            )}
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Max 2MB - JPG, PNG
          </p>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            className={`form-input ${errors.fullName ? 'input-error' : ''}`}
            value={personalInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            onBlur={(e) => handleBlur('fullName', e.target.value)}
            placeholder="John Doe"
          />
          {errors.fullName && <span className="form-error">{errors.fullName}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={(e) => handleBlur('email', e.target.value)}
            placeholder="john@example.com"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            className="form-input"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <input
            className="form-input"
            value={personalInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">LinkedIn URL</label>
          <input
            className="form-input"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        <div className="form-group">
          <label className="form-label">GitHub URL</label>
          <input
            className="form-input"
            value={personalInfo.github}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/johndoe"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Professional Summary</label>
        <textarea
          className="form-textarea"
          value={personalInfo.summary}
          onChange={(e) => handleChange('summary', e.target.value.slice(0, 500))}
          placeholder="Write a brief summary about yourself..."
          maxLength="500"
        />
        <span
          className={`char-counter ${
            personalInfo.summary.length > 450
              ? personalInfo.summary.length >= 500
                ? 'limit'
                : 'warning'
              : ''
          }`}
        >
          {personalInfo.summary.length}/500 characters
        </span>
      </div>
    </div>
  );
}
