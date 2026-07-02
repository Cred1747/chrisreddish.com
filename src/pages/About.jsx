import { 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Download,
  Database,
  BarChart3,
  Cloud,
  Code,
  Users,
  ExternalLink,
} from 'lucide-react'

const skills = [
  {
    category: 'BI & Analytics',
    icon: BarChart3,
    items: ['Looker / LookML', 'Power BI & DAX', 'Excel (advanced)', 'KPI development', 'Data storytelling', 'Self-service analytics'],
  },
  {
    category: 'Data Modeling & Warehousing',
    icon: Database,
    items: ['Dimensional modeling (star schema)', 'Curated data models', 'Semantic layers', 'Data warehousing', 'Data architecture'],
  },
  {
    category: 'SQL & Data Engineering',
    icon: Code,
    items: ['Advanced SQL (CTEs, window functions)', 'BigQuery', 'SQL Server', 'ETL/ELT pipelines', 'Data quality & validation', 'Data dictionaries & lineage'],
  },
  {
    category: 'Cloud, AI & Programming',
    icon: Cloud,
    items: ['GCP (BigQuery, Cloud Run)', 'Conversational AI agents', 'NLP (BERT), PyTorch, scikit-learn', 'Python, JavaScript, R', 'Git / CI-CD'],
  },
]

const experience = [
  {
    title: 'Data Analyst & Analytics Engineer',
    company: 'Servus Municipal Finance Analytics',
    period: 'June 2024 - Present',
    location: 'Remote',
    highlights: [
      'Design and deliver BI solutions end to end: curated data models, reports, and interactive dashboards for municipal clients across the U.S.',
      'Build data warehousing pipelines processing 100M+ rows into BigQuery with automated data quality checks',
      'Architect dimensional data models and LookML semantic layers serving technical and non-technical stakeholders',
      'Rebuilt a citywide parking revenue model with near-perfect row-level parity, surfacing $59M+ in additional recoverable revenue visibility',
      'Deployed AI conversational analytics on Cloud Run with a Semantic Query Layer of 120+ validated queries',
      'Handle sensitive, person-level financial and demographic data under government privacy requirements',
      'Author data dictionaries, transformation logic, and lineage documentation; coach a team of 5 university capstone analysts',
    ],
  },
  {
    title: 'Research Data Analyst',
    company: 'USF Big Data Analytics Lab',
    period: 'January 2023 - December 2025',
    location: 'Tampa, FL',
    highlights: [
      'Built end-to-end ML/NLP pipelines for large-scale text analysis: collection, preprocessing, feature engineering, training, and evaluation',
      'Fine-tuned models (BERT, Logistic Regression, Gradient Boosting, Random Forest) reaching 88%+ accuracy on stance detection',
      'Co-authored a peer-reviewed publication at the 38th International FLAIRS Conference (SCOPUS-indexed)',
    ],
  },
  {
    title: 'Department Manager, Staff-Level',
    company: '14 Years in Retail Operations',
    period: '2009 - 2023',
    location: 'Tampa, FL',
    highlights: [
      'Built operational dashboards and KPI reporting in Excel and Power BI across sales, inventory, labor, and compliance',
      'Led teams of 15-25 employees with structured coaching, training, and performance management',
      'Managed USDA regulatory documentation requirements with auditable, high-accuracy record keeping',
      'Transitioned paper-based tracking to electronic data workflows, improving reporting accuracy',
    ],
  },
]

const education = [
  {
    degree: 'Master of Science in Data Intelligence',
    school: 'University of South Florida',
    period: 'Expected Spring 2027',
    gpa: '4.0',
    status: 'In Progress',
  },
  {
    degree: 'Bachelor of Science in Information Science',
    school: 'University of South Florida',
    concentration: 'Data Science',
    period: 'Graduated December 2025',
    gpa: '4.0',
    status: 'Completed',
    diplomaUrl: '/USF_BS_Diploma_Christopher_Reddish.pdf',
  },
]

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h1>
          <div className="flex items-center gap-2 text-slate-400">
            <MapPin className="w-4 h-4" />
            Tampa / Riverview, FL
          </div>
        </div>

        {/* Bio */}
        <section className="mb-16">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              I'm a Data Analyst & Analytics Engineer at Servus Municipal Finance Analytics
              with 8+ years of hands-on data reporting and analytics experience. I design
              and deliver BI solutions end to end: curated data models, data warehousing
              pipelines, interactive dashboards, and AI agents that help cities make better
              decisions. I specialize in analytics data modeling for regulated, person-level
              operational and financial data, where accuracy directly affects individuals.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              I recently graduated with my Bachelor's in Information Science (Data Science concentration)
              and am now pursuing my Master's in Data Intelligence, both at USF with
              a 4.0 GPA. I'm a published researcher: my work at USF's Big Data Analytics
              Lab on NLP and stance detection was peer-reviewed and published at the
              38th International FLAIRS Conference.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              Before pivoting to data science, I spent 14 years in retail operations
              leadership, building dashboards in Excel and Power BI, leading teams of
              15-25, and managing regulated compliance documentation. That experience
              gave me strong leadership skills, a results-driven mindset, and the ability
              to turn complex data requests into trusted, usable reporting for any audience.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Skills & Technologies</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-xl border border-slate-700 p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <skill.icon className="w-5 h-5 text-primary-400" />
                  <h3 className="font-semibold">{skill.category}</h3>
                </div>
                <ul className="space-y-2">
                  {skill.items.map(item => (
                    <li key={item} className="text-sm text-slate-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-slate-600 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Briefcase className="w-5 h-5 text-primary-400" />
            <h2 className="text-2xl font-bold">Experience</h2>
          </div>
          <div className="space-y-8">
            {experience.map((job, i) => (
              <div
                key={i}
                className="relative pl-6 border-l-2 border-slate-700"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-500 rounded-full" />
                <div className="mb-2">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <div className="flex flex-wrap gap-x-4 text-sm text-slate-400">
                    <span className="text-primary-400">{job.company}</span>
                    <span>{job.period}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 mt-3">
                  {job.highlights.map((highlight, j) => (
                    <li key={j} className="text-sm text-slate-400 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-1.5 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="w-5 h-5 text-primary-400" />
            <h2 className="text-2xl font-bold">Education</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <span className="flex items-center gap-1 text-accent-400 text-sm">
                    <Award className="w-4 h-4" />
                    {edu.gpa} GPA
                  </span>
                </div>
                <p className="text-primary-400 text-sm mb-1">{edu.school}</p>
                {edu.concentration && (
                  <p className="text-slate-500 text-sm">Concentration: {edu.concentration}</p>
                )}
                <p className={`text-sm ${edu.status === 'Completed' ? 'text-accent-400 font-medium' : 'text-slate-500'}`}>{edu.period}</p>
                {edu.diplomaUrl && (
                  <a
                    href={edu.diplomaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View Digital Diploma
                  </a>
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-4">
            Relevant coursework: Data Warehousing, Database Design, Health Informatics,
            Applied Data Intelligence, Statistical Learning, Predictive Analytics,
            Intro to AI, Deep Learning
          </p>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary-900/30 to-accent-900/30 rounded-xl p-8 text-center">
          <Users className="w-10 h-10 text-primary-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Let's Connect</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            I'm actively seeking Data Analyst, BI Developer, and Analytics Engineer
            positions, remote or Tampa-area. I'd love to hear about opportunities on your team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:ChristopherReddish@USF.edu"
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
            >
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/christopher-reddish-192a402a5"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-medium rounded-lg transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/Christopher_Reddish_Resume.pdf"
              download
              className="px-6 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
