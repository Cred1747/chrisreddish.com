import { Play, Lock, Building2, Database, Brain, BarChart3 } from 'lucide-react'
import DemoChart from '../components/DemoChart'

const dashboards = [
  {
    title: 'Water Utility Billing & Equity Analytics',
    description: 'RCT-based analysis evaluating discount program effectiveness on payment behavior. Includes demographic equity analysis, affordability burden metrics, and program impact evaluation.',
    icon: BarChart3,
    tags: ['Looker', 'BigQuery', 'LookML', 'RCT Analysis', 'Equity Analytics'],
    highlights: [
      'Control vs Treatment group comparison',
      'Payment behavior before/after enrollment',
      'Demographic breakdown by census tract',
      'Statistical significance testing',
    ],
  },
  {
    title: 'Municipal Citation & Enforcement Analytics',
    description: 'Comprehensive analysis of citation enforcement patterns, violation types, and revenue trends across urban neighborhoods.',
    icon: Building2,
    tags: ['Data Pipeline', 'Visualization', 'Policy Analysis', 'BigQuery'],
    highlights: [
      'Citation volume trends over time',
      'Violation type analysis by geography',
      'Payment and dispute rates',
      'Operational productivity metrics',
    ],
  },
  {
    title: 'Tax Lien Portfolio Dashboard',
    description: 'Tracking and analysis of municipal tax lien portfolios across multiple jurisdictions, including aging analysis, collection rates, and property value correlations.',
    icon: Database,
    tags: ['Financial Analytics', 'Looker', 'Municipal Finance'],
    highlights: [
      'Lien aging buckets',
      'Collection success rates',
      'Property value integration',
      'Multi-jurisdiction comparison',
    ],
  },
  {
    title: 'AI Conversational Analytics Agent',
    description: 'AI-powered natural language interface for querying municipal data. Uses a Semantic Query Layer to ensure accurate, validated responses.',
    icon: Brain,
    tags: ['AI', 'Claude API', 'Semantic Query Layer', 'Natural Language'],
    highlights: [
      'Natural language to structured query',
      'Pre-validated query templates',
      'Context-aware responses',
      'See it live at /utility on this site',
    ],
  },
]

export default function Dashboards() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Dashboards & Analytics</h1>
          <p className="text-slate-400 max-w-2xl">
            I build interactive dashboards and analytics tools for municipal clients using Looker, BigQuery, and custom React applications. 
            Here's an overview of the types of solutions I deliver.
          </p>
        </div>

        {/* Live Demo Section */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Play className="w-5 h-5 text-accent-400" />
            Interactive Demo
          </h2>
          <div className="max-w-2xl">
            <DemoChart />
          </div>
        </section>

        {/* Dashboard Cards */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Client Projects</h2>
          <div className="grid gap-6">
            {dashboards.map((dashboard, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-500/20 rounded-lg">
                      <dashboard.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold">{dashboard.title}</h3>
                  </div>
                </div>

                <p className="text-slate-400 mb-4">{dashboard.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {dashboard.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-t border-slate-700 pt-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Key Features</h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {dashboard.highlights.map((highlight, j) => (
                      <li key={j} className="text-sm text-slate-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Confidentiality Note */}
        <div className="mt-12 p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-slate-700/50 rounded-lg">
              <Lock className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <h3 className="font-medium text-slate-200 mb-1">Client Confidentiality</h3>
              <p className="text-sm text-slate-400">
                Due to client privacy agreements and data sensitivity, I'm unable to share screenshots 
                or live demos of production dashboards. The descriptions above reflect the types of 
                analytics solutions I build. Feel free to reach out if you'd like to discuss my 
                approach or see sample work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
