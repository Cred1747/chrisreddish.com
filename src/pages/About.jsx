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
    category: 'Data & Analytics',
    icon: Database,
    items: ['BigQuery', 'Looker / LookML', 'SQL', 'dbt', 'Data Modeling', 'ETL Pipelines'],
  },
  {
    category: 'Visualization',
    icon: BarChart3,
    items: ['Looker Dashboards', 'Recharts', 'Chart.js', 'D3.js', 'Tableau'],
  },
  {
    category: 'Cloud & Infrastructure',
    icon: Cloud,
    items: ['Google Cloud Platform', 'Cloud Functions', 'BigQuery ML', 'Pub/Sub'],
  },
  {
    category: 'Programming',
    icon: Code,
    items: ['Python', 'JavaScript', 'React', 'SQL', 'R', 'LookML'],
  },
]

const experience = [
  {
    title: 'Data & AI Analytics Engineer',
    company: 'Servus Municipal Finance Analytics',
    period: '2024 - Present',
    location: 'Remote',
    highlights: [
      'Build data pipelines in GCP for municipal clients including Portland, Chicago, and Seattle',
      'Develop Looker dashboards with LookML for utility billing and parking analytics',
      'Create AI conversational agents with 120+ Golden Queries for natural language data access',
      'Lead equity analysis and RCT evaluation for Portland Water Bureau Smart Discount program',
    ],
  },
  {
    title: 'Meat Manager',
    company: 'Costco Wholesale',
    period: '2010 - 2024',
    location: 'Tampa, FL',
    highlights: [
      '14+ years of leadership experience managing teams and operations',
      'Developed data-driven inventory and scheduling optimization',
      'Built strong communication and stakeholder management skills',
      'Consistently exceeded performance targets and quality standards',
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
              I'm a Data & AI Analytics Engineer at Servus Municipal Finance Analytics, 
              where I build data pipelines, Looker dashboards, and AI agents that help 
              cities make better decisions. My work spans utility billing analytics for 
              Portland Water Bureau, parking citation analysis for Chicago, and conversational 
              AI systems that let city officials query data in plain English.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              I recently graduated with my Bachelor's in Information Science (Data Science concentration) 
              and am now pursuing my Master's in Data Intelligence—both at USF with 
              a 4.0 GPA. My research at USF's Big Data Analytics Lab focuses on NLP and 
              stance detection in social media text.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              Before pivoting to data science, I spent 14+ years in retail management at 
              Costco Wholesale. That experience gave me strong leadership skills, a 
              results-driven mindset, and the ability to communicate complex information 
              to diverse stakeholders—skills that translate directly to working with 
              municipal clients.
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
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary-900/30 to-accent-900/30 rounded-xl p-8 text-center">
          <Users className="w-10 h-10 text-primary-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Let's Connect</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            I'm actively seeking remote Data Analyst and Looker Developer positions. 
            I'd love to hear about opportunities on your team.
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
