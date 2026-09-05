import { formatDate, baseUrlClean } from './helpers';
import './templates.css';

export default function MinimalTemplate({ data }) {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div className="resume-page minimal">
      <header className="minimal-header">
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Profile" className="minimal-photo" />
        )}
        <h1 className="minimal-name">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="minimal-role">
          {experience[0]?.role || education[0]?.field || 'Professional'}
        </p>
        <div className="minimal-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
        </div>
      </header>

      <div className="minimal-body">
        {personalInfo.summary && (
          <section className="minimal-section">
            <h2>About</h2>
            <p>{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="minimal-section">
            <h2>Experience</h2>
            {experience.map((exp) => (
              <div className="minimal-row" key={exp.id}>
                <div className="minimal-row-info">
                  <p className="minimal-date">
                    {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                  </p>
                  <h3>{exp.role}</h3>
                  <p className="minimal-company">{exp.company}</p>
                  {exp.description && <p>{exp.description}</p>}
                </div>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="minimal-section">
            <h2>Education</h2>
            {education.map((edu) => (
              <div className="minimal-row" key={edu.id}>
                <div className="minimal-row-info">
                  <p className="minimal-date">
                    {edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}
                  </p>
                  <h3>{[edu.degree, edu.field].filter(Boolean).join(', ')}</h3>
                  <p className="minimal-company">{edu.college}</p>
                  {edu.score && <p>{edu.score}</p>}
                </div>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section className="minimal-section">
            <h2>Skills</h2>
            <p>{skills.map((s) => s).join('  ·  ')}</p>
          </section>
        )}

        {projects.length > 0 && (
          <section className="minimal-section">
            <h2>Projects</h2>
            {projects.map((project) => (
              <div className="minimal-project" key={project.id}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                {project.tech && <p className="minimal-tech">{project.tech}</p>}
                {(project.github || project.live) && (
                  <div className="minimal-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer">
                        {baseUrlClean(project.github)}
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer">
                        {baseUrlClean(project.live)}
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section className="minimal-section">
            <h2>Certifications</h2>
            {certifications.map((cert) => (
              <div className="minimal-row" key={cert.id}>
                <div className="minimal-row-info">
                  <p className="minimal-date">{cert.year}</p>
                  <h3>{cert.name}</h3>
                  <p className="minimal-company">{cert.organization}</p>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
