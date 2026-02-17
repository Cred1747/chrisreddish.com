import { Link } from 'react-router-dom'
import { ArrowRight, Database, BarChart3, Brain, Code, Building2, ExternalLink, Github, FileText, Users, TrendingUp, Layers } from 'lucide-react'

const stats = [
  { value: '✓', label: 'Built AI Chatbots', icon: Brain },
  { value: '✓', label: 'Featured in USF Newsletter', icon: FileText, link: '/research' },
  { value: '50GB+', label: 'Data Pipelines', icon: Database },
  { value: '4.0', label: 'USF GPA', icon: TrendingUp },
]

const highlights = [
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'BigQuery pipelines, data modeling, and ETL workflows for municipal analytics',
  },
  {
    icon: BarChart3,
    title: 'Dashboard Development',
    description: 'Interactive dashboards serving cities like Portland, Chicago, and Seattle',
  },
  {
    icon: Brain,
    title: 'AI & NLP Research',
    description: 'Published researcher in stance detection and topic modeling at FLAIRS 2025',
  },
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'React frontends, Python backends, and cloud-native architectures on GCP',
  },
]

const liveProjects = [
  {
    title: 'BERTopic Tweet Explorer',
    emoji: '🐦',
    description: 'Interactive visualization from my published FLAIRS research — explore topic modeling results from 10K+ tweets',
    tags: ['React', 'NLP', 'BERTopic', 'Published Research'],
    link: '/bert',
    github: 'https://github.com/Cred1747/BERTopic-Tweet-Explorer',
    highlight: true,
  },
  {
    title: 'Bourbon Explorer',
    emoji: '🥃',
    description: 'Data viz app with 1,350+ bourbons — filter, compare, and discover with interactive charts',
    tags: ['React', 'Recharts', 'Data Visualization'],
    link: '/bourbon',
    github: 'https://github.com/Cred1747/chrisreddish.com',
    highlight: false,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-slate-900 to-accent-900/10" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-primary-400 mb-4">
                <Building2 className="w-5 h-5" />
                <span className="text-sm font-medium">Data & AI Analytics Engineer @ Servus</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">Chris Reddish</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                I build data pipelines, dashboards, and AI agents that help 
                municipalities make smarter decisions. Published NLP researcher 
                pursuing my Master's in Data Intelligence.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-medium rounded-lg transition-colors"
                >
                  About Me
                </Link>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="lg:pl-8">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => {
                  const content = (
                    <>
                      <stat.icon className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </>
                  )
                  
                  return stat.link ? (
                    <Link
                      key={i}
                      to={stat.link}
                      className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 text-center hover:border-primary-500/50 hover:bg-slate-700/50 transition-colors"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div
                      key={i}
                      className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 text-center"
                    >
                      {content}
                    </div>
                  )
                })}
              </div>
              
              {/* Quick links */}
              <div className="mt-4 flex gap-3">
                <a
                  href="https://github.com/Cred1747"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800/50 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/christopher-reddish-192a402a5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800/50 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-colors text-sm"
                >
                  <Users className="w-4 h-4" />
                  LinkedIn
                </a>
                <Link
                  to="/research"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800/50 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-colors text-sm"
                >
                  <FileText className="w-4 h-4" />
                  Publications
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Projects */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Try My Live Demos</h2>
              <p className="text-slate-400 text-sm">Interactive projects you can explore right now</p>
            </div>
            <Link
              to="/projects"
              className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center gap-1"
            >
              All projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {liveProjects.map((project, i) => (
              <div
                key={i}
                className={`rounded-xl border p-6 ${
                  project.highlight 
                    ? 'bg-gradient-to-r from-primary-900/30 to-accent-900/30 border-primary-500/30' 
                    : 'bg-slate-800/50 border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{project.emoji}</span>
                    <div>
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      {project.highlight && (
                        <span className="text-xs text-accent-400 font-medium">Featured — Published Research</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        project.highlight 
                          ? 'bg-primary-500/20 text-primary-300' 
                          : 'bg-slate-700/50 text-slate-300'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Link
                    to={project.link}
                    className={`inline-flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors text-sm ${
                      project.highlight
                        ? 'bg-primary-500 hover:bg-primary-600 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Try It Live
                  </Link>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-medium rounded-lg transition-colors text-sm"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured In */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-primary-900/20 to-accent-900/20 rounded-2xl border border-primary-500/20 p-8">
            <div className="flex items-center gap-2 text-primary-400 text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              Featured in USF School of Information Newsletter • Spring 2026
            </div>
            <blockquote className="text-lg sm:text-xl text-slate-200 italic mb-4 leading-relaxed">
              "It's fast, collaborative, and iterative—the closest thing to an applied analytics shop I've experienced at school. Beyond modeling, we emphasize validation, reproducibility, and communication. That cadence—ship, critique, refine—leveled up my data cleaning, modeling, and dashboarding skills far more than one-and-done class projects."
            </blockquote>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">— FLAIRS Conference Q&A</span>
              <a
                href="https://www.usf.edu/arts-sciences/departments/information/documents/newsletter/si-newsletter-vol4-no1-compressed.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center gap-1"
              >
                Read Newsletter <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">What I Do</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <div
                key={i}
                className="card-hover p-6 bg-slate-800/50 rounded-xl border border-slate-700"
              >
                <item.icon className="w-10 h-10 text-primary-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-900/30 to-accent-900/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-slate-300 mb-8">
            I'm actively looking for remote Data Analyst and Analytics Engineer positions.
            Let's chat about how I can help your team.
          </p>
          <a
            href="mailto:ChristopherReddish@USF.edu"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  )
}
