import { Link } from 'react-router-dom'
import { ArrowRight, Database, BarChart3, Brain, Code, Building2 } from 'lucide-react'
import DemoChart from '../components/DemoChart'

const highlights = [
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'BigQuery pipelines, LookML modeling, and ETL workflows for municipal analytics',
  },
  {
    icon: BarChart3,
    title: 'Dashboard Development',
    description: 'Interactive Looker dashboards serving cities like Portland, Chicago, and Seattle',
  },
  {
    icon: Brain,
    title: 'AI & Conversational Analytics',
    description: 'Building AI agents with Golden Queries for natural language data exploration',
  },
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'React frontends, Python backends, and cloud-native architectures on GCP',
  },
]

const featuredProjects = [
  {
    title: 'Portland Water Bureau Analytics',
    description: 'Equity analysis and Smart Discount program evaluation with RCT methodology',
    tags: ['Looker', 'BigQuery', 'LookML', 'Equity Analytics'],
    link: '/dashboards',
  },
  {
    title: 'Municipal Parking Citations',
    description: 'Cross-city analytics platform for Chicago, comparing enforcement patterns',
    tags: ['Data Pipeline', 'Visualization', 'Policy Analysis'],
    link: '/dashboards',
  },
  {
    title: 'NLP Stance Detection Research',
    description: 'Academic research on stance detection under Professor Loni Hagen at USF',
    tags: ['NLP', 'Python', 'Research', 'Machine Learning'],
    link: '/research',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
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
                I build data pipelines, Looker dashboards, and AI agents that help 
                municipalities make smarter decisions. Currently pursuing my Master's 
                in Data Intelligence while shipping analytics for cities nationwide.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/dashboards"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
                >
                  View Dashboards
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
            
            {/* Live Demo Chart */}
            <div className="lg:pl-8">
              <DemoChart />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-12 text-center">What I Do</h2>
          
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

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold">Featured Work</h2>
            <Link
              to="/projects"
              className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <Link
                key={i}
                to={project.link}
                className="card-hover group p-6 bg-slate-800/50 rounded-xl border border-slate-700"
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-900/30 to-accent-900/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-slate-300 mb-8">
            I'm actively looking for remote Data Analyst and Looker Developer positions.
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
