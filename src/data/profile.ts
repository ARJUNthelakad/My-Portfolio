export const profile = {
  name: 'Arjun T',
  role: 'MCA Student · Full-Stack Developer',
  location: 'Malappuram, Kerala, India',
  email: 'thelakkadarjun86@gmail.com',
  phone: '+91 8590514936',
  phoneHref: '+918590514936',
  availability: 'Open to internships & junior roles',
} as const

export const heroStats = [
  { value: '03', label: 'Shipped projects' },
  { value: '2 mo', label: 'Internship' },
  { value: '2026', label: 'BCA graduate' },
] as const

export const skillGroups = [
  {
    title: 'Languages',
    note: 'The core of everything I build',
    items: ['Python', 'Java', 'C', 'JavaScript'],
  },
  {
    title: 'Web',
    note: 'Interfaces with a little motion',
    items: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    title: 'Backend',
    note: 'Server logic and auth flows',
    items: ['Django', 'SQL', 'Email OTP auth', 'REST APIs'],
  },
  {
    title: '3D & Creative',
    note: 'Where design meets geometry',
    items: ['Three.js', 'WebGL', 'Interaction design'],
  },
  {
    title: 'Data',
    note: 'Modelling and querying',
    items: ['SQL', 'MySQL', 'Database design'],
  },
  {
    title: 'Tooling',
    note: 'Everyday workspace',
    items: ['VS Code', 'Git', 'GitHub', 'Python tooling'],
  },
] as const

export type Project = {
  index: string
  title: string
  subtitle: string
  blurb: string
  tech: string[]
  status: string
  image: string
  imageAlt: string
}

export const projects: Project[] = [
  {
    index: '01',
    title: 'XELQX',
    subtitle: 'Modern e-commerce platform',
    blurb:
      'A fashion and footwear storefront built around a calm, editorial shopping experience: product galleries, quick browsing and navigation that stays out of the way.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    status: 'Completed',
    image: '/images/projects/xelqx.jpg',
    imageAlt: 'Bright fashion store interior with clothing rails and shoes',
  },
  {
    index: '02',
    title: 'XELQX Footwear',
    subtitle: '3D commerce experiment',
    blurb:
      'An ongoing build that puts a shoe at the centre of the page — real-time 3D visualisation, product interactions and an immersive buying flow instead of flat photos.',
    tech: ['React', 'JavaScript', 'Three.js'],
    status: 'In progress',
    image: '/images/projects/xelqx-footwear.jpg',
    imageAlt: 'Close-up of a black high-top sneaker on a stone ledge',
  },
  {
    index: '03',
    title: 'Twitter Mini',
    subtitle: 'Social app with verified accounts',
    blurb:
      'A Django social network with account management and email OTP verification. Mostly a deep dive into authentication, sessions and the parts of a backend users never see.',
    tech: ['Python', 'Django', 'SQL', 'HTML', 'CSS'],
    status: 'Completed',
    image: '/images/projects/twitter-mini.jpg',
    imageAlt: 'Hand holding a phone showing a social profile and photo feed',
  },
]

export const education = [
  {
    title: 'Master of Computer Applications',
    meta: 'MCA · First year',
    place: 'LEAD College, Palakkad',
    detail:
      'Deepening my foundations in software engineering, databases and application development while building projects alongside coursework.',
  },
  {
    title: 'Bachelor of Computer Applications',
    meta: 'BCA · Completed 2026',
    place: 'Yenepoya Deemed to be University, Bangalore',
    detail:
      'Programming fundamentals, web technologies and database systems — the base I keep building on.',
  },
] as const

export const experience = [
  {
    title: 'Quest Innovative Solutions',
    meta: 'Internship · 2 months',
    place: 'Calicut, Kerala',
    detail:
      'An academic internship inside a working software environment: observing how real teams plan, build and ship, and applying that discipline to my own projects.',
  },
] as const

export type Certification = {
  name: string
  issuer?: string
  programme?: string
  year?: string
  url?: string
}

/** Public Coursera learner profile — the "View all certificates" link. */
export const courseraProfileUrl = ''

export const certifications: Certification[] = [
  {
    name: 'Google IT Support',
    issuer: 'Google',
    programme: 'Specialization',
    url: 'https://coursera.org/share/6607bb1ae780253cb477bf99878676d9',
  },
  {
    name: 'Google Data Analytics',
    issuer: 'Google',
    programme: 'Specialization',
    url: 'https://coursera.org/share/528d09d5668e7084ab7c003ced016e58',
  },
  {
    name: 'People & Soft Skills: Essential for Professional Success',
    issuer: 'IBM',
    programme: 'Specialization',
    url: 'https://coursera.org/share/c8106c0284ad3213d6ac4583fc3e651a',
  },
  {
    name: 'Strategic Leadership and Management',
    issuer: 'University of Illinois Urbana-Champaign',
    programme: 'Specialization',
    url: 'https://coursera.org/share/d021b7caf596db0b8c48e797afefd478',
  },
  {
    name: 'Figma for UI/UX: Master Web Design in Figma',
    programme: 'Course',
    url: 'https://coursera.org/share/8e0a2aa49b61eb4a80ff6f5ac6662092',
  },
  {
    name: 'Create the User Interface in Android Studio',
    programme: 'Course',
    url: 'https://coursera.org/share/3e0142fc989a0924dc6add64a1524713',
  },
  {
    name: 'Introduction to Blockchain',
    programme: 'Course',
    url: 'https://coursera.org/share/8273eb5c17f1129e37bb3f46aceef117',
  },
  {
    name: 'Solving Problems with Creative and Critical Thinking',
    programme: 'Course',
    url: 'https://coursera.org/share/d7142984790c79865fd062d5378340cc',
  },
]

export const interests = [
  'Full-stack development',
  'Python',
  'Software engineering',
  'AI & machine learning',
  '3D web',
  'E-commerce',
  'Database management',
] as const
