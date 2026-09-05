import { formatDate, baseUrlClean } from './helpers';
import './templates.css';

export default function ProfessionalTemplate({ data }) {
  const { personalInfo, education, experience, skills, projects, certifications } = data;

  return (
    <div className="resume-page professional">
      <div className="prof-layout">
        <aside className="prof-side">
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Profile" className="prof-photo" />
          )}
          <h1 className="prof-name">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="prof-title">
            {experience[0]?.role || education[0]?.field || 'Professional'}
          </p>

          {(personalInfo.email || personalInfo.phone || personalInfo.address) && (
            <div className="prof-block">
              <h3>Contact</h3>
              {personalInfo.email && <p>{personalInfo.email}</p>}
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.address && <p>{personalInfo.address}</p>}
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
          )}

          {skills.length > 0 && (
            <div className="prof-block">
              <h3>Skills</h3>
              {skills.map((skill, i) => (
                <p className="prof-skill" key={i}>• {skill}</p>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div className="prof-block">
              <h3>Certifications</h3>
              {certifications.map((cert) => (
                <div className="prof-cert" key={cert.id}>
                  <p style={{ fontWeight: 600 }}>{cert.name}</p>
                  <p>{cert.organization} {cert.year}</p>
                </div>
              ))}
            </div>
          )}
        </aside>

        <main className="prof-main">
          {personalInfo.summary && (
            <section className="prof-section">
              <h2>Summary</h2>
              <p>{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="prof-section">
              <h2>Experience</h2>
              {experience.map((exp) => (
                <div className="prof-item" key={exp.id}>
                  <div className="prof-item-head">
                    <h3>{exp.company}</h3>
                    <span>{formatDate(exp.startDate)} – {formatDate(exp.endDate)}</span>
                  </div>
                  <p className="prof-item-role">{exp.role}</p>
                  {exp.description && <p>{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section className="prof-section">
              <h2>Education</h2>
              {education.map((edu) => (
                <div className="prof-item" key={edu.id}>
                  <div className="prof-item-head">
                    <h3>{edu.college}</h3>
                    <span>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}</span>
                  </div>
                  <p className="prof-item-role">
                    {[edu.degree, edu.field].filter(Boolean).join(', ')}
                  </p>
                  {edu.score && <p>{edu.score}</p>}
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section className="prof-section">
              <h2>Projects</h2>
              {projects.map((project) => (
                <div className="prof-item" key={project.id}>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  {project.tech && <p className="prof-tech">{project.tech}</p>}
                  {(project.github || project.live) && (
                    <div className="prof-links">
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
        </main>
      </div>
    </div>
  );
}
