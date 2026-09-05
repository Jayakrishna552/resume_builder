export const STORAGE_KEYS = {
  RESUMES: 'resumecraft_resumes',
  CURRENT: 'resumecraft_current_resume',
  DRAFT: 'resumecraft_draft',
  THEME: 'resumecraft_theme',
};

export function loadFromStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error(`Failed to load "${key}" from localStorage`, error);
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to save "${key}" to localStorage`, error);
    return false;
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove "${key}" from localStorage`, error);
  }
}

export function deleteResume(id) {
  const resumes = getResumes();
  const updated = resumes.filter((r) => r.id !== id);
  saveToStorage(STORAGE_KEYS.RESUMES, updated);
  return updated;
}

export function getResumes() {
  return loadFromStorage(STORAGE_KEYS.RESUMES, []);
}

export function saveResume(resume) {
  const resumes = getResumes();
  const existingIndex = resumes.findIndex((r) => r.id === resume.id);
  if (existingIndex >= 0) {
    resumes[existingIndex] = resume;
  } else {
    resumes.unshift(resume);
  }
  saveToStorage(STORAGE_KEYS.RESUMES, resumes);
  return resume;
}

export function getResumeById(id) {
  return getResumes().find((r) => r.id === id) || null;
}
