import { Link } from 'react-router-dom'
import { ExternalLink, Github, Calendar, GraduationCap, Sparkles } from 'lucide-react'

const featuredProject = {
  title: 'Bourbon Explorer',
  category: 'Personal',
  date: '2024',
  description: 'An interactive data visualization app for exploring and comparing bourbons. Filter by price, ABV, rating, and distillery. Includes scatter plots, value analysis, and flavor profile breakdowns.',
  technologies: ['React', 'Recharts', 'Tailwind CSS', 'Data Visualization'],
  github: 'https://github.com/Cred1747/bourbonExplorer',
  live: '/bourbon',
  internal: true,
}

const projects = [
  {
    title: 'Golden Queries System',
    category: 'Work',
    date: '2024-Present',
    description: 'Developed 120+ pre-built analytical queries for municipal AI agents, enabling natural language data exploration for city officials without SQL knowledge.',
    technologies: ['LookML', 'BigQuery', 'Python', 'Looker API'],
    github: null,
    live: null,
  },
  {
    title: 'Utility Billing Fact Tables',
    category: 'Work',
    date: '2024',
    description: 'Designed and implemented comprehensive fact tables for Portland Water Bureau, tracking customer accounts, payments, discounts, and service history.',
    technologies: ['BigQuery', 'dbt', 'LookML', 'Data Modeling'],
    github: null,
    live: null,
  },
  {
    title: 'Predictive Analytics Project',
    category: 'School',
    date: 'Fall 2025',
    description: 'Graduate coursework project applying machine learning models to real-world prediction problems. Focus on model selection, validation, and interpretation.',
    technologies: ['Python', 'scikit-learn', 'pandas', 'Jupyter'],
    github: 'https://github.com/Cred1747',
    live: null,
  },
  {
    title: 'Object-Oriented Programming (COP5230)',
    category: 'School',
    date: 'Fall 2025',
    description: 'Advanced OOP concepts in Python/Java, design patterns, and software architecture principles.',
    technologies: ['Python', 'Java', 'Design Patterns', 'UML'],
    github: 'https://github.com/Cred1747',
    live: null,
  },
  {
    title: 'Applied Data Intelligence (ESI6613)',
    category: 'School',
    date: '2025',
    description: 'Graduate-level coursework covering advanced data analysis techniques, statistical modeling, and business intelligence applications.',
    technologies: ['R', 'Python', 'Statistical Analysis', 'BI Tools'],
    github: null,
    live: null,
  },
  {
    title: 'Disco Elysium Companion App',
    category: 'Personal',
    date: '2024',
    description: 'A personal project building a companion tool for the RPG Disco Elysium, tracking character builds and dialog choices.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/Cred1747',
    live: null,
  },
]

const categories = ['All', 'Work', 'School', 'Personal']

export default function Projects() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Projects</h1>
          <p className="text-slate-400 max-w-2xl">
            A collection of professional, academic, and personal projects. 
            From municipal data pipelines to graduate research.
          </p>
        </div>

        {/* Featured Project */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-amber-400">Featured Project</h2>
          </div>
          <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-xl border border-amber-700/50 p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🥃</span>
                  <h3 className="text-xl font-bold">{featuredProject.title}</h3>
                  <span className="px-2 py-0.5 text-xs font-medium rounded bg-slate-600/50 text-slate-400">
                    {featuredProject.category}
                  </span>
                </div>
                <p className="text-slate-300 mb-4">{featuredProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredProject.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-amber-900/30 text-amber-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link
                    to={featuredProject.live}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Try It Live
                  </Link>
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category filters - placeholder for future interactivity */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                i === 0
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="card-hover bg-slate-800/50 rounded-xl border border-slate-700 p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded mb-2 ${
                    project.category === 'Work'
                      ? 'bg-accent-500/20 text-accent-400'
                      : project.category === 'School'
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'bg-slate-600/50 text-slate-400'
                  }`}>
                    {project.category}
                  </span>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {project.date}
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {(project.github || project.live) && (
                <div className="flex gap-4 pt-4 border-t border-slate-700">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Education Context */}
        <div className="mt-16 p-6 bg-gradient-to-r from-primary-900/20 to-accent-900/20 rounded-xl border border-slate-700">
          <div className="flex items-start gap-4">
            <GraduationCap className="w-8 h-8 text-primary-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Currently Studying</h3>
              <p className="text-slate-400 mb-4">
                I'm completing my Bachelor's in Information Science (Data Science concentration) 
                at USF while simultaneously pursuing a Master's in Data Intelligence. 
                Both programs maintain a 4.0 GPA.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-slate-500">B.S. Graduation:</span>
                  <span className="text-slate-300 ml-2">December 2025</span>
                </div>
                <div>
                  <span className="text-slate-500">M.S. Expected:</span>
                  <span className="text-slate-300 ml-2">Spring 2027</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
