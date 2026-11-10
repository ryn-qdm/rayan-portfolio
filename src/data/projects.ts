// ✏️ EDIT ME: add, remove or reorder projects. Each one becomes a card and a case-study page.
// Only facts from your CV and capstone report are used. Expand the text with your own details.
export type Motif = 'drain' | 'scan' | 'sky' | 'robot' | 'coffee'
export interface Project {
  slug: string
  title: string
  tag: string
  motif: Motif
  tone: 'paper' | 'violet' | 'ink'
  summary: string
  role: string
  status: string
  stack: string[]
  sections: { h: string; p: string }[]
  highlights: string[]
  process?: { t: string; d: string }[]
  visual?: 'ring' // 'ring' = the rotating photo ring (kept for Brain Tumor)
  model?: string // GLB in public/media
  video?: { src: string; poster: string } // files in public/media
  cover?: string // card image: file name (no extension) in the project's photo folder; defaults to the first
  coverFit?: 'contain'
}

export const projects: Project[] = [
  {
    slug: 'smart-drainage',
    model: 'Drainage_Inlet.glb',
    title: 'AI-Based Smart Rainwater Drainage Inlets System',
    tag: 'Capstone · 2026',
    motif: 'drain',
    tone: 'violet',
    summary: 'A prototype that watches rainfall and water level at a drainage inlet and flags abnormal behavior that may mean a blockage.',
    role: 'Undergraduate capstone project, supervised by Dr. Alaa Al-Omoush',
    status: 'Prototype tested. Manuscript in preparation.',
    stack: ['ESP32', 'HC-SR04 ultrasonic sensor', 'Rain sensor', 'OpenWeatherMap API', 'Python Flask', 'Machine learning', 'React dashboard'],
    sections: [
      { h: 'The problem', p: 'Seasonal rain repeatedly exposes weaknesses in the drainage systems of Jordanian cities, especially Amman. Debris at inlet openings stops water from draining, and water builds up quickly on roads and in neighborhoods.' },
      { h: 'What I built', p: 'An ESP32 reads an ultrasonic water-level sensor and a rain sensor, and weather context comes from the OpenWeatherMap API. Readings travel over Wi-Fi to a Flask backend with two layers of intelligence: a rule-based engine that tracks how the water level progresses during rainfall, and a machine learning classifier trained on a generated dataset that simulates realistic drainage scenarios.' },
      { h: 'Testing the edge cases', p: 'The prototype uses two pumps. One simulates rainfall; the other simulates abnormal outside inflow, such as building gutters or side connections. That lets the system be tested on anomalies beyond a plain blockage.' },
      { h: 'Response and visibility', p: 'When a blockage or anomaly is detected, a downward-sliding grate mechanism activates to restore flow. A React dashboard shows flood-risk classification, blockage status, anomaly warnings, AI diagnostics, gate state and weather context.' },
      { h: 'Validation', p: 'The system was validated through prototype hardware testing and scenario-based simulation covering blockage detection, risk classification, anomaly detection and gate actuation.' },
    ],
    highlights: ['AI + IoT + real-time analytics', 'Rule-based engine and ML classifier working together', 'Automatic mechanical response'],
  },
  {
    slug: 'brain-tumor-research',
    visual: 'ring',
    title: 'Brain Tumor Deep Learning Research',
    tag: 'Research · 2025',
    motif: 'scan',
    tone: 'ink',
    summary: 'Deep learning for brain tumor classification from MRI, with a focus on interpretability.',
    role: 'Co-author, presented at ACIT 2025',
    status: 'Paper published (IEEE). Research continuing.',
    stack: ['ConvNeXt-Tiny', 'Colorized MRI', 'Deep learning', 'Python', 'PyTorch'],
    sections: [
      { h: 'The work', p: 'The paper studies automated brain tumor classification using ConvNeXt-Tiny on colorized MRI images, with an approach designed for enhanced interpretability so that predictions can be examined rather than just trusted.' },
      { h: 'Publication', p: 'Presented at the 26th International Arab Conference on Information Technology (ACIT 2025) in Alexandria, Egypt, and published by IEEE with co-authors Arabiat, Hamad, Alissa, Alshdaifat, Abuowaida and Abu Romman.' },
      { h: 'Next', p: 'The initiative continues with medical imaging datasets and deep learning. Add your own results and next steps here once you are ready to share them.' },
    ],
    highlights: ['IEEE conference paper', 'Medical imaging', 'Interpretable deep learning'],
  },
  {
    slug: 'jordan-skyguide-ai',
    video: { src: 'skyguide.mp4', poster: 'skyguide-poster.jpg' },
    title: 'Jordan SkyGuide AI',
    tag: 'Education · AI',
    motif: 'sky',
    tone: 'paper',
    summary: 'An AI-powered educational platform that makes astronomy and space science easier to learn in Jordan.',
    role: 'Project creator',
    status: 'In development',
    stack: ['Voice interaction', 'Real-time sky visualization', 'Localized content'],
    sections: [
      { h: 'The idea', p: 'SkyGuide uses voice interaction, real-time sky visualization and localized astronomical content to broaden STEM access for young learners in Jordan.' },
      { h: 'Your materials', p: 'Add screenshots, a demo link and a short story of how SkyGuide started by editing src/data/projects.ts. The page is ready for them.' },
    ],
    highlights: ['Voice-first learning', 'Localized for Jordan', 'STEM accessibility'],
  },
  {
    slug: 'robotics',
    video: { src: 'robotic_hand.mp4', poster: 'robotic_hand-poster.jpg' },
    cover: '04-robotic-hand-electronics',
    title: 'Robotics Systems Development',
    tag: 'Hardware + AI',
    motif: 'robot',
    tone: 'paper',
    summary: 'An interactive robotic head and a robotic hand that combine sensors, computer vision, Arduino and AI features.',
    role: 'Designer and builder',
    status: 'Built',
    stack: ['Arduino', 'Computer vision', 'Sensors', 'AI', 'OpenCV'],
    sections: [
      { h: 'What I made', p: 'I designed and built robotic systems, including an interactive robotic head and a robotic hand, that bring together sensors, computer vision, Arduino and AI-based functions.' },
      { h: 'Why it matters to me', p: 'These builds are where software meets physical hardware, and where human-centered technology becomes something you can see and touch. Add photos and videos to this page to show them off.' },
    ],
    highlights: ['Hardware-software integration', 'Computer vision on embedded builds'],
  },
  {
    slug: 'reco-coffee',
    coverFit: 'contain',
    title: 'RECO Coffee Upcycling Initiative',
    tag: 'Sustainability',
    motif: 'coffee',
    tone: 'violet',
    summary: 'An award-winning circular-economy initiative that turns coffee waste into environmentally sustainable products.',
    role: 'Team member',
    status: 'Award-winning',
    stack: ['Circular economy', 'Sustainability', 'Innovation'],
    sections: [
      { h: 'The initiative', p: 'RECO transforms coffee waste into environmentally sustainable products, applying circular-economy thinking to something that is usually thrown away.' },
      { h: 'Recognition', p: 'The initiative is award-winning. Add the name of the award, your role and the products here when you are ready.' },
    ],
    highlights: ['Circular economy', 'Award-winning'],
    process: [
      { t: 'Collect', d: 'Coffee waste is collected.' },
      { t: 'Prepare', d: 'The raw coffee waste is prepared.' },
      { t: 'Press', d: 'It is pressed using heat and pressure.' },
      { t: 'Use', d: 'The resulting material goes into different products, including coal, soap, eye cream, fertilizer and other applications.' },
    ],
  },
]
