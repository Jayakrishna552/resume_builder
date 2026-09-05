export const initialResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    summary: '',
    photo: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  template: 'modern',
};

export const sampleResumeData = {
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson',
    summary:
      'Results-driven full-stack developer with 5+ years of experience building scalable web applications. Passionate about clean code, modern design, and delivering delightful user experiences.',
    photo: '',
  },
  education: [
    {
      id: crypto.randomUUID(),
      college: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startYear: '2014',
      endYear: '2018',
      score: '3.8 GPA',
    },
  ],
  experience: [
    {
      id: crypto.randomUUID(),
      company: 'TechNova Inc.',
      role: 'Senior Frontend Developer',
      startDate: '2021-01',
      endDate: 'Present',
      description:
        'Lead a team of 6 developers building a React-based SaaS dashboard. Improved page load performance by 45% and reduced bug reports by 30%.',
    },
    {
      id: crypto.randomUUID(),
      company: 'CloudSprint',
      role: 'Full Stack Developer',
      startDate: '2018-07',
      endDate: '2020-12',
      description:
        'Developed REST and GraphQL APIs with Node.js and PostgreSQL. Built responsive user interfaces with React and Redux.',
    },
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'GraphQL', 'Tailwind CSS', 'PostgreSQL', 'Git'],
  projects: [
    {
      id: crypto.randomUUID(),
      name: 'E-Commerce Platform',
      description:
        'A full-featured e-commerce platform with payment processing, product search, and an admin dashboard serving 10k+ monthly users.',
      tech: 'React, Node.js, Stripe, MongoDB',
      github: 'https://github.com/alexjohnson/shop',
      live: 'https://shop-demo.example.com',
    },
    {
      id: crypto.randomUUID(),
      name: 'TaskFlow',
      description:
        'A collaborative project management tool with real-time updates, drag-and-drop kanban boards, and team analytics.',
      tech: 'React, Redux, Socket.io, Express',
      github: 'https://github.com/alexjohnson/taskflow',
      live: 'https://taskflow.example.com',
    },
  ],
  certifications: [
    {
      id: crypto.randomUUID(),
      name: 'AWS Certified Developer',
      organization: 'Amazon Web Services',
      year: '2023',
    },
    {
      id: crypto.randomUUID(),
      name: 'Professional JavaScript Certification',
      organization: 'freeCodeCamp',
      year: '2019',
    },
  ],
  template: 'modern',
};
