import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  Palette,
  Download,
  Shield,
  Zap,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react';
import './Home.css';

const features = [
  {
    icon: FileText,
    title: 'Multiple Templates',
    desc: 'Choose from 3 professionally designed resume templates',
  },
  {
    icon: Palette,
    title: 'Live Preview',
    desc: 'See your resume update in real-time as you type',
  },
  {
    icon: Download,
    title: 'PDF Export',
    desc: 'Download your polished resume as a high-quality PDF',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    desc: 'Your data is stored locally in your browser',
  },
  {
    icon: LayoutDashboard,
    title: 'Resume Dashboard',
    desc: 'Save, edit, and manage multiple resumes easily',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Built with React and Vite for a blazing-fast experience',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />

        <div className="hero-content">
          <div className="hero-badge fade-in-up">
            <Sparkles size={16} />
            Free & Open Resume Builder
          </div>
          <h1 className="hero-title fade-in-up delay-1">
            Build Your <span className="gradient-text">Professional</span> Resume
          </h1>
          <p className="hero-subtitle fade-in-up delay-2">
            Create a stunning, ATS-friendly resume in minutes. No sign-up required,
            your data stays private, and downloads are completely free.
          </p>
          <div className="hero-actions fade-in-up delay-3">
            <button className="btn btn-hero" onClick={() => navigate('/builder')}>
              Create Your Resume
              <ArrowRight size={20} />
            </button>
            <button className="btn btn-hero-outline" onClick={() => navigate('/dashboard')}>
              View Dashboard
            </button>
          </div>
          <div className="hero-stats fade-in-up delay-4">
            <div>
              <span className="stat-num">3+</span>
              <span className="stat-label">Templates</span>
            </div>
            <div>
              <span className="stat-num">100%</span>
              <span className="stat-label">Free</span>
            </div>
            <div>
              <span className="stat-num">ATS</span>
              <span className="stat-label">Friendly</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-header">
          <h2 className="features-title">Everything You Need to <span className="gradient-text">Land the Job</span></h2>
          <p className="features-subtitle">Powerful features designed to make your resume stand out.</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                className="feature-card fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
                key={feature.title}
              >
                <div className="feature-icon">
                  <Icon size={24} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <h2 className="cta-title">Ready to Build Your Future?</h2>
          <p className="cta-text">Get started in seconds — no account needed.</p>
          <button className="btn btn-hero" onClick={() => navigate('/builder')}>
            Get Started Now
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
