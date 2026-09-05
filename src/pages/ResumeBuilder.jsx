import { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Sparkles } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import PersonalInfoForm from '../components/PersonalInfoForm';
import EducationForm from '../components/EducationForm';
import ExperienceForm from '../components/ExperienceForm';
import SkillsForm from '../components/SkillsForm';
import ProjectsForm from '../components/ProjectsForm';
import CertificationsForm from '../components/CertificationsForm';
import ResumePreview from '../components/ResumePreview';
import { useResume } from '../context/ResumeContext';
import './ResumeBuilder.css';

const sections = ['personal', 'education', 'experience', 'skills', 'projects', 'certifications'];

const renderForm = (section) => {
  switch (section) {
    case 'personal':
      return <PersonalInfoForm />;
    case 'education':
      return <EducationForm />;
    case 'experience':
      return <ExperienceForm />;
    case 'skills':
      return <SkillsForm />;
    case 'projects':
      return <ProjectsForm />;
    case 'certifications':
      return <CertificationsForm />;
    default:
      return <PersonalInfoForm />;
  }
};

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState('personal');
  const { saveResumeToStorage } = useResume();

  const currentIndex = sections.indexOf(activeSection);
  const next = () => setActiveSection(sections[Math.min(currentIndex + 1, sections.length - 1)]);
  const prev = () => setActiveSection(sections[Math.max(currentIndex - 1, 0)]);

  return (
    <div className="builder-page">
      <div className="builder-topbar no-print">
        <div className="builder-title">
          <Sparkles size={20} />
          Resume Builder
        </div>
        <div className="builder-top-actions">
          <button className="btn btn-success" onClick={saveResumeToStorage}>
            <Save size={16} />
            Save
          </button>
        </div>
      </div>

      <div className="builder-layout">
        <Sidebar activeSection={activeSection} onSelect={setActiveSection} />

        <main className="builder-main no-print">
          <div className="builder-nav-buttons">
            <button className="btn btn-ghost" onClick={prev} disabled={currentIndex === 0}>
              <ChevronLeft size={18} />
              Previous
            </button>
            <span className="builder-step-indicator">
              Section {currentIndex + 1} of {sections.length}
            </span>
            <button
              className="btn btn-ghost"
              onClick={next}
              disabled={currentIndex === sections.length - 1}
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>

          <div key={activeSection}>
            {renderForm(activeSection)}
          </div>

          <div className="builder-nav-buttons bottom">
            <button className="btn btn-ghost" onClick={prev} disabled={currentIndex === 0}>
              <ChevronLeft size={18} />
              Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={next}
              disabled={currentIndex === sections.length - 1}
            >
              Next Section
              <ChevronRight size={18} />
            </button>
          </div>
        </main>

        <section className="preview-pane">
          <ResumePreview />
        </section>
      </div>
    </div>
  );
}
