import { formatDate, baseUrlClean } from './helpers';
import './templates.css';

export default function ModernTemplate({ data }) {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div className="resume-page modern">
      <header className="modern-header">
        <div className="modern-header-content">
          <h1 className="modern-name">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="modern-role">
            {education[0]?.field || experience[0]?.role || 'Professional'}
          </p>
          <div className="modern-contact">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
                {baseUrlClean(personalInfo.linkedin)}
              </a>
            )}
            {personalInfo.github && (
              <a href={personalInfo.github} target="_blank" rel="noreferrer">
                {baseUrlClean(personalInfo.github)}
              </a>
            )}
          </div>
        </div>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Profile" className="modern-photo" />
        )}
      </header>

      <div className="modern-body">
        {personalInfo.summary && (
          <section className="modern-section">
            <h2 className="modern-section-title">Profile</h2>
            <p className="modern-text">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="modern-section">
            <h2 className="modern-section-title">Experience</h2>
            {experience.map((exp) => (
              <div className="modern-item" key={exp.id}>
                <div className="modern-item-head">
                  <h3>{exp.company}</h3>
                  <span className="modern-date">{formatDate(exp.startDate)} – {formatDate(exp.endDate)}</span>
                </div>
                <p className="modern-sub">{exp.role}</p>
                {exp.description && <p className="modern-text">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="modern-section">
            <h2 className="modern-section-title">Education</h2>
            {education.map((edu) => (
              <div className="modern-item" key={edu.id}>
                <div className="modern-item-head">
                  <h3>{edu.college}</h3>
                  <span className="modern-date">
                    {edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}
                  </span>
                </div>
                <p className="modern-sub">
                  {[edu.degree, edu.field].filter(Boolean).join(', ')}
                </p>
                {edu.score && <p className="modern-text">{edu.score}</p>}
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section className="modern-section">
            <h2 className="modern-section-title">Skills</h2>
            <div className="modern-skills">
              {skills.map((skill, i) => (
                <span className="modern-skill" key={i}>{skill}</span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="modern-section">
            <h2 className="modern-section-title">Projects</h2>
            {projects.map((project) => (
              <div className="modern-item" key={project.id}>
                <h3>{project.name}</h3>
                <p className="modern-text">{project.description}</p>
                {project.tech && <p className="modern-tech">{project.tech}</p>}
                {(project.github || project.live) && (
                  <div className="modern-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer">Live Demo</a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section className="modern-section">
            <h2 className="modern-section-title">Certifications</h2>
            {certifications.map((cert) => (
              <div className="modern-cert" key={cert.id}>
                <div>
                  <p className="modern-sub" style={{ fontWeight: 700 }}>{cert.name}</p>
                  <p className="modern-text">{cert.organization}</p>
                </div>
                {cert.year && <span className="modern-date">{cert.year}</span>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
