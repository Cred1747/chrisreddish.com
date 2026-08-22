import { Link } from 'react-router-dom'
import { ExternalLink, Github, Calendar, GraduationCap, Sparkles, Briefcase } from 'lucide-react'

const featuredProjects = [
  {
    title: 'Municipal Utility Analytics Suite',
    emoji: '🏛',
    category: 'Platform Demo',
    date: '2026',
    description: 'Analytics platform built on public EIA, EPA, and Census data and delivered as an interactive dashboard with a live AI chatbot over a semantic query layer. Ask about water rates, electric reliability, and affordability.',
    technologies: ['Semantic Query Layer', 'Claude API', 'React', 'Recharts', 'Public Data'],
    github: 'https://github.com/Cred1747/chrisreddish.com',
    live: '/utility',
    internal: true,
  },
  {
    title: 'BERTopic Tweet Explorer',
    emoji: '🐦',
    category: 'Research',
    date: '2025',
    description: 'Interactive visualization of BERTopic modeling results from my published FLAIRS research. Explore topic proportions over time, click to view tweets, and switch between models and stance classifications.',
    technologies: ['React', 'Recharts', 'NLP', 'BERTopic', 'Papaparse'],
    github: 'https://github.com/Cred1747/BERTopic-Tweet-Explorer',
    live: '/bert',
    internal: true,
  },
  {
    title: 'Bourbon Explorer',
    emoji: '🥃',
    category: 'Personal',
    date: '2024',
    description: 'An interactive data visualization app for exploring and comparing 1,350+ bourbons. Filter by price, ABV, rating, and distillery. Includes scatter plots, value analysis, and flavor profile breakdowns.',
    technologies: ['React', 'Recharts', 'Tailwind CSS', 'Data Visualization'],
    github: 'https://github.com/Cred1747/chrisreddish.com',
    live: '/bourbon',
    internal: true,
  },
]

const workProjects = [
  {
    title: 'Multi-City Parking Data Platform',
    description: 'Built ELT pipelines integrating parking violation data across nine U.S. cities into a unified BigQuery warehouse: a 180M+ record multi-city merge table (13M+ citation records for a single city) with standardized dimensional schemas, census enrichment, automated quality checks, and interactive client dashboards.',
    technologies: ['BigQuery', 'SQL', 'Python', 'ELT Pipelines', 'Data Modeling', 'React + Recharts'],
  },
  {
    title: 'Looker-to-React Analytics Platform Migration',
    description: 'Replaced the Looker BI layer with a custom React + Recharts analytics application over BigQuery, rebuilding client dashboards and semantic logic in-house and removing the third-party BI dependency from client delivery.',
    technologies: ['React', 'Recharts', 'BigQuery', 'SQL', 'Node.js API', 'Platform Migration'],
  },
  {
    title: 'Citywide Parking Revenue Model Rebuild',
    description: 'Independently rebuilt a citywide parking revenue analytics model to reproduce and verify existing output, achieving near-perfect row-level parity and surfacing $59M+ in additional recoverable revenue visibility.',
    technologies: ['BigQuery', 'Advanced SQL', 'Data Validation', 'Data Modeling'],
  },
  {
    title: 'Water Utility Billing & Equity Analytics',
    description: 'Designed analytical data models merging RCT assignments with billing and payment records. Built equity analysis dashboards and discount program effectiveness visualizations for policy stakeholders.',
    technologies: ['BigQuery', 'SQL', 'React + Recharts', 'RCT Analysis', 'Data Visualization'],
  },
  {
    title: 'AI Conversational Analytics Agents',
    description: 'Developed and deployed production chatbot applications on GCP Cloud Run enabling natural language queries against complex municipal datasets for city officials.',
    technologies: ['Python', 'JavaScript', 'GCP Cloud Run', 'BigQuery', 'LLMs'],
  },
  {
    title: 'Semantic Query Layer',
    description: 'Developed a library of 120+ pre-validated analytical query templates for municipal AI agents, enabling natural language data exploration for city officials without SQL knowledge.',
    technologies: ['BigQuery', 'SQL', 'Python', 'LLM Agents'],
  },
]

const academicProjects = [
  {
    title: 'AI-Generated vs. Real Image Detection',
    category: 'School',
    date: '2026',
    description: 'Built a ResNet-18 ensemble classifier in PyTorch that distinguishes AI-generated images from authentic photographs, reaching 0.987 macro-F1 against single-model and zero-shot baselines.',
    technologies: ['PyTorch', 'ResNet-18', 'Ensemble Methods', 'Computer Vision', 'Python'],
    github: 'https://github.com/Cred1747/project2-ai-detection',
    live: null,
  },
  {
    title: 'Florida Hospital Quality Benchmarking',
    category: 'School',
    date: '2026',
    description: 'Built following Health Informatics coursework at USF. Benchmarks 167 Florida acute-care hospitals on real CMS Care Compare data: star ratings, 30-day readmissions, HCAHPS patient experience, and ED operations, with a documented dimensional star schema and data quality notes.',
    technologies: ['CMS Data', 'Dimensional Modeling', 'React', 'Recharts', 'Data Quality'],
    github: 'https://github.com/Cred1747/chrisreddish.com',
    live: '/healthcare',
  },
  {
    title: 'NLP Stance Detection Pipeline',
    category: 'Research',
    date: '2025',
    description: 'Built ML pipeline processing 10,000+ social media records through multi-model classification (BERT, GPT-4, ensemble methods). Co-authored peer-reviewed publication at FLAIRS 2025.',
    technologies: ['Python', 'BERT', 'GPT-4', 'scikit-learn', 'BERTopic'],
    github: 'https://github.com/Cred1747/BERTopic-Tweet-Explorer',
    live: '/bert',
  },
  {
    title: 'Predictive Analytics Project',
    category: 'School',
    date: 'Fall 2025',
    description: 'Graduate coursework applying machine learning models to real-world prediction problems. Focus on model selection, cross-validation, and interpretation.',
    technologies: ['Python', 'scikit-learn', 'pandas', 'Jupyter'],
    github: null,
    live: null,
  },
]

export default function Projects() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Projects</h1>
          <p className="text-slate-400 max-w-2xl">
            A collection of professional, academic, and personal projects, from cloud data platforms delivered for municipal clients to published NLP research.
          </p>
        </div>

        {/* Work Projects */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-accent-400" />
            <h2 className="text-xl font-semibold">Client Delivery — Servus Municipal Finance Analytics</h2>
          </div>
          <p className="text-slate-500 text-sm mb-6">
            Data platform and analytics work delivered for external municipal government clients. Live demos and screenshots are confidential.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {workProjects.map((project, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
              >
                <span className="inline-block px-2 py-0.5 text-xs font-medium rounded mb-2 bg-accent-500/20 text-accent-400">
                  Work
                </span>
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects with Live Demos */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-semibold text-amber-400">Featured Projects — Live Demos</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project, i) => (
              <div 
                key={i}
                className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-xl border border-amber-700/50 p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{project.emoji}</span>
                  <div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span className="text-xs text-amber-400">{project.category} • {project.date}</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-amber-900/30 text-amber-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Link
                    to={project.live}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-lg transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Try It Live
                  </Link>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors text-sm"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Academic/Research Projects */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-primary-400" />
            <h2 className="text-xl font-semibold">Academic & Research</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {academicProjects.map((project, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
                    project.category === 'Research' 
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-primary-500/20 text-primary-400'
                  }`}>
                    {project.category}
                  </span>
                  <span className="text-slate-500 text-sm flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.date}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
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
                      <Link
                        to={project.live}
                        className="text-sm text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education Context */}
        <div className="p-6 bg-gradient-to-r from-primary-900/20 to-accent-900/20 rounded-xl border border-slate-700">
          <div className="flex items-start gap-4">
            <GraduationCap className="w-8 h-8 text-primary-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              <p className="text-slate-400 mb-4">
                I recently graduated with my Bachelor's in Information Science (Data Science concentration) 
                from USF and am now pursuing my Master's in Data Intelligence. 
                Both programs maintain a 4.0 GPA.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-slate-500">B.S. Graduated:</span>
                  <span className="text-accent-400 font-medium ml-2">December 2025 ✓</span>
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
