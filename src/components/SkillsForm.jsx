import { useState } from 'react';
import { Sparkles, Plus, X } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import './forms.css';

export default function SkillsForm() {
  const { resumeData, addSkill, removeSkill } = useResume();
  const { skills } = resumeData;
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    const value = input.trim();
    if (!value) {
      setError('Skill cannot be empty');
      return;
    }
    if (skills.some((s) => s.toLowerCase() === value.toLowerCase())) {
      setError('Skill already added');
      return;
    }
    addSkill(value);
    setInput('');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="form-card fade-in">
      <div className="section-title">
        <span className="icon"><Sparkles size={18} /></span>
        Skills
      </div>

      <div className="skills-input-row">
        <input
          className="form-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError('');
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter or click Add"
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={18} />
          Add
        </button>
      </div>
      {error && <div className="form-error" style={{ marginBottom: '0.8rem' }}>{error}</div>}

      {skills.length === 0 ? (
        <div className="empty-hint">No skills added yet. Add your key skills.</div>
      ) : (
        <div className="skills-tags">
          {skills.map((skill, index) => (
            <span className="skill-tag" key={`${skill}-${index}`}>
              {skill}
              <button onClick={() => removeSkill(index)} aria-label={`Remove ${skill}`}>
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
