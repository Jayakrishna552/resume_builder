import { createContext, useContext, useCallback, useEffect, useRef, useState } from 'react';
import {
  STORAGE_KEYS,
  loadFromStorage,
  saveToStorage,
  getResumes,
  saveResume,
  deleteResume,
} from '../utils/localStorage';
import { initialResumeData } from '../utils/sampleData';

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(() =>
    loadFromStorage(STORAGE_KEYS.DRAFT, initialResumeData)
  );
  const [theme, setTheme] = useState(() => loadFromStorage(STORAGE_KEYS.THEME, 'light'));
  const [resumes, setResumes] = useState(() => getResumes());
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveToStorage(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveToStorage(STORAGE_KEYS.DRAFT, resumeData);
      setResumes(getResumes());
    }, 500);
    return () => clearTimeout(timer);
  }, [resumeData]);

  const showToast = useCallback((message, type = 'success') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const updatePersonalInfo = useCallback((field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  }, []);

  const setPersonalInfo = useCallback((newInfo) => {
    setResumeData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, ...newInfo } }));
  }, []);

  const addEducation = useCallback((entry) => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { id: crypto.randomUUID(), ...entry }],
    }));
  }, []);

  const updateEducation = useCallback((id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  }, []);

  const removeEducation = useCallback((id) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  }, []);

  const addExperience = useCallback((entry) => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, { id: crypto.randomUUID(), ...entry }],
    }));
  }, []);

  const updateExperience = useCallback((id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  }, []);

  const removeExperience = useCallback((id) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  }, []);

  const addSkill = useCallback((skill) => {
    setResumeData((prev) => {
      if (prev.skills.some((s) => s.toLowerCase() === skill.trim().toLowerCase())) return prev;
      return { ...prev, skills: [...prev.skills, skill.trim()] };
    });
  }, []);

  const removeSkill = useCallback((index) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  }, []);

  const addProject = useCallback((entry) => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, { id: crypto.randomUUID(), ...entry }],
    }));
  }, []);

  const updateProject = useCallback((id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  }, []);

  const removeProject = useCallback((id) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  }, []);

  const addCertification = useCallback((entry) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { id: crypto.randomUUID(), ...entry }],
    }));
  }, []);

  const updateCertification = useCallback((id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  }, []);

  const removeCertification = useCallback((id) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  }, []);

  const setTemplate = useCallback((template) => {
    setResumeData((prev) => ({ ...prev, template }));
  }, []);

  const convertFileToBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  const resetResume = useCallback(() => {
    setResumeData(initialResumeData);
    showToast('Resume cleared', 'info');
  }, [showToast]);

  const loadResume = useCallback(
    (data) => {
      setResumeData({
        ...initialResumeData,
        ...data,
        personalInfo: { ...initialResumeData.personalInfo, ...data.personalInfo },
      });
    },
    []
  );

  const saveResumeToStorage = useCallback(() => {
    const saved = saveResume({ ...resumeData, updatedAt: Date.now() });
    setResumes(getResumes());
    showToast('Resume saved successfully!');
    return saved;
  }, [resumeData, showToast]);

  const removeResume = useCallback(
    (id) => {
      const updated = deleteResume(id);
      setResumes(updated);
      showToast('Resume deleted', 'info');
    },
    [showToast]
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = {
    resumeData,
    theme,
    resumes,
    toast,
    showToast,
    toggleTheme,
    updatePersonalInfo,
    setPersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification,
    setTemplate,
    resetResume,
    loadResume,
    saveResumeToStorage,
    removeResume,
    convertFileToBase64,
    setResumeData,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}

export function calculateCompletion(data) {
  const { personalInfo, education, experience, skills, projects, certifications } = data;
  let total = 0;
  let score = 0;

  if (personalInfo.fullName) { total += 10; score += 10; }
  if (personalInfo.email && /^\S+@\S+\.\S+$/.test(personalInfo.email)) { total += 10; score += 10; }
  if (personalInfo.phone) { total += 10; score += 10; }
  if (personalInfo.summary) { total += 10; score += 10; }
  total += 10; if (education.length > 0) score += 10;
  total += 20; if (experience.length > 0) score += 20;
  total += 10; if (skills.length > 0) score += 10;
  total += 10; if (projects.length > 0) score += 10;
  total += 10; if (certifications.length > 0) score += 10;

  return total === 0 ? 0 : Math.min(100, Math.round((score / total) * 100));
}
