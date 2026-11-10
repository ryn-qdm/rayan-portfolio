// ✏️ EDIT ME: all personal text lives here and in projects.ts.
// Everything below comes from your CV. Leave a link as '' to hide it.
export const profile = {
  name: 'Rayan Abuqaddom',
  shortTitle: 'Data Science & AI',
  location: 'Amman, Jordan',
  email: 'rynabuqaddom@gmail.com',
  phone: '+962 79 745 1416',
  linkedin: '', // e.g. 'https://www.linkedin.com/in/your-handle'
  github: '', // e.g. 'https://github.com/your-handle'
  cv: 'Rayan_Abuqaddom_CV.pdf', // file in /public
  intro:
    'Data Science and AI student at Al al-Bayt University, ranked first in my department. I build AI-driven solutions for societal and environmental problems through research, innovation and entrepreneurship.',
  about:
    'Data Science and Artificial Intelligence undergraduate at Al Al-Bayt University, ranked first in the Department of Data Science and Artificial Intelligence, with research and innovation experience across Jordan, Spain, Saudi Arabia, and Egypt. Research interests span machine learning, natural language processing, and educational technologies, with a commitment to developing AI-driven solutions that address societal and environmental challenges through research, innovation, and entrepreneurship.',
  headlineStart: 'I turn complex problems into',
  headlineWords: ['Intelligent solutions.', 'Meaningful impact.', 'Data-driven decisions.', 'Human-centered technology.'],
  interests: ['Machine learning', 'Deep learning & computer vision', 'Natural language processing', 'Educational technologies', 'Robotics'],
}

export const education = [
  { when: '5 Aug 2026', title: 'B.Sc. Data Science and Artificial Intelligence', where: 'Al al-Bayt University, Mafraq', note: 'GPA 3.79 / 4.00. Ranked first in the Department of Data Science and Artificial Intelligence.' },
  { when: 'Sep 2025 – Feb 2026', title: 'Erasmus+ KA171 exchange', where: 'University of Valladolid, Spain', note: 'Merit-based international scholarship, with a research internship in AI and Learning Analytics at the GSIC/EMIC group.' },
]

export const skills = [
  { group: 'Languages', items: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'HTML/CSS', 'Arduino'] },
  { group: 'AI & data', items: ['Machine learning', 'Deep learning', 'NLP', 'Computer vision', 'Learning analytics', 'SQL', 'Power BI', 'Tableau'] },
  { group: 'Frameworks', items: ['PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'Hugging Face', 'Flask', 'React'] },
]

export const publication = {
  cite: 'Arabiat, M., Hamad, K., Abuqaddom, R., Alissa, L., Alshdaifat, N., Abuowaida, S., & Abu Romman, A. (2025). Automated Brain Tumor Classification Using ConvNeXt-Tiny and Colorized MRI: A Deep Learning Approach With Enhanced Interpretability. 26th International Arab Conference on Information Technology (ACIT 2025), Alexandria, Egypt. IEEE.',
}

export const honors = [
  'Princess Alia Award for Innovation and Entrepreneurship, 2025',
  'Erasmus+ KA171 Scholarship, 2025',
  'Best Problem Analysis Award, English Language Olympics, 2024',
  'Second Place, MEDDebate Future Panel, 2024',
  'Participant, Mawhiba Programs for Gifted Students',
]

export const experience = [
  { group: 'Research', rows: [
    { when: 'Nov 2025 – Feb 2026', role: 'Research Intern', org: 'GSIC/EMIC Research Group, University of Valladolid', text: 'Built Python preprocessing pipelines for multimodal educational datasets, trained and evaluated transformer models (BERT, AudiBERT), and ran literature reviews on multimodal learning analytics.' },
  ]},
  { group: 'Leadership', rows: [
    { when: 'Oct 2024', role: 'Marketing Team Leader & PR Member', org: 'IEEE Computer Society, Al al-Bayt University', text: '' },
    { when: '2025', role: 'Social Media Leader', org: 'IEEE Women in Engineering, Al al-Bayt University', text: '' },
    { when: '2022', role: 'Ambassador', org: 'Center of Excellence for Innovation and Entrepreneurship, Al al-Bayt University', text: '' },
    { when: '2024 – 2026', role: 'HTUx Ambassador', org: 'Al Hussein Technical University', text: '' },
    { when: 'Mar 2025 – 2026', role: 'Content Creator', org: 'Tech3arabi', text: '' },
    { when: '2024 – 2025', role: 'Member', org: 'AIESEC Jordan', text: '' },
  ]},
  { group: 'Programmes & training', rows: [
    { when: '2026', role: 'Makers Collective', org: '', text: '' },
    { when: '', role: 'SAIF', org: '', text: '' },
    { when: '', role: 'NMK training with the Ministry of Digital Economy', org: '', text: '' },
  ]},
  { group: 'Conferences & competitions', rows: [
    { when: '2025', role: 'Paper presenter', org: 'ACIT 2025, Alexandria, Egypt', text: '' },
    { when: '2026', role: 'Participant', org: 'AstroCode 2026 Hackathon, Amman Arab University', text: '' },
    { when: '2024', role: 'Attendee', org: 'Global AI Summit (GAIN), Riyadh', text: '' },
    { when: 'Jun 2024', role: 'Selected participant', org: 'Universities and Artificial Intelligence Technology, Jordan', text: '' },
    { when: '2024', role: 'Participant', org: 'Makers Choice Jordan', text: '' },
  ]},
  { group: 'Volunteering', rows: [
    { when: '', role: 'Volunteer', org: 'La Olma Environmental Association, Valladolid', text: '' },
    { when: '', role: 'Volunteer', org: 'Basmat Al-Hayat Initiative', text: '' },
    { when: '', role: 'Volunteer', org: 'Nahno National Volunteering Platform', text: '' },
    { when: '', role: 'Volunteer', org: 'TEDx Zarqa University', text: '' },
  ]},
]
