import { Check, LayoutTemplate } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import './TemplateSelector.css';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    desc: 'Gradient header with bold typography',
    colors: ['#6366f1', '#8b5cf6', '#ec4899'],
  },
  {
    id: 'professional',
    name: 'Professional',
    desc: 'Classic two-column layout',
    colors: ['#1e293b', '#4f46e5'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    desc: 'Clean, simple and elegant',
    colors: ['#0f172a'],
  },
];

export default function TemplateSelector() {
  const { resumeData, setTemplate } = useResume();

  return (
    <div className="template-selector">
      <div className="template-title">
        <LayoutTemplate size={18} />
        Resume Template
      </div>
      <div className="template-grid">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            className={`template-card ${resumeData.template === tpl.id ? 'active' : ''}`}
            onClick={() => setTemplate(tpl.id)}
          >
            <div className="template-preview">
              {tpl.colors.map((color, i) => (
                <span
                  key={i}
                  className="template-stripe"
                  style={{
                    background: color,
                    width: i === 0 && tpl.id === 'professional' ? '30%' : '100%',
                  }}
                />
              ))}
              <span className="template-lines">
                {[...Array(4)].map((_, i) => (
                  <span key={i} style={{ width: `${[90, 70, 80, 50][i]}%` }} />
                ))}
              </span>
            </div>
            <div className="template-info">
              <div className="template-name">
                {tpl.name}
                {resumeData.template === tpl.id && (
                  <span className="template-check"><Check size={14} /></span>
                )}
              </div>
              <p className="template-desc">{tpl.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
