import { ExternalLink, Play, Image as ImageIcon } from 'lucide-react'
import DemoChart from '../components/DemoChart'

const dashboards = [
  {
    title: 'Portland Water Bureau - Smart Discount Analysis',
    description: 'RCT analysis evaluating the effectiveness of discount programs on payment behavior. Includes demographic equity analysis, payment timing patterns, and program impact metrics.',
    type: 'live',
    tags: ['Looker', 'BigQuery', 'LookML', 'RCT Analysis', 'Equity Analytics'],
    highlights: [
      'Control vs Treatment group comparison',
      'Payment behavior before/after enrollment',
      'Demographic breakdown by census tract',
      'Statistical significance testing',
    ],
  },
  {
    title: 'Chicago Parking Citation Analytics',
    description: 'Comprehensive analysis of parking enforcement patterns, violation types, and revenue trends across Chicago neighborhoods.',
    type: 'screenshot',
    tags: ['Data Pipeline', 'Visualization', 'Policy Analysis', 'BigQuery'],
    highlights: [
      'Citation volume trends over time',
      'Top violation types by ward',
      'Payment and dispute rates',
      'Officer productivity metrics',
    ],
  },
  {
    title: 'Municipal Tax Lien Dashboard',
    description: 'Tracking and analysis of tax lien portfolios, including aging analysis, collection rates, and property value correlations.',
    type: 'screenshot',
    tags: ['Financial Analytics', 'Looker', 'Municipal Finance'],
    highlights: [
      'Lien aging buckets',
      'Collection success rates',
      'Property value integration',
      'Forecasting models',
    ],
  },
  {
    title: 'Conversational Analytics Agent',
    description: 'AI-powered natural language interface for querying municipal data. Built with 120+ Golden Queries for common analytical questions.',
    type: 'demo',
    tags: ['AI', 'LLM', 'Golden Queries', 'Natural Language'],
    highlights: [
      'Natural language to SQL conversion',
      'Pre-built query templates',
      'Context-aware responses',
      'Integration with Looker API',
    ],
  },
]

export default function Dashboards() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Dashboards & Visualizations</h1>
          <p className="text-slate-400 max-w-2xl">
            Interactive dashboards and analytics tools I've built for municipal clients. 
            These demos showcase the types of insights I deliver using Looker, BigQuery, and React.
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
          <h2 className="text-xl font-semibold mb-6">Project Showcases</h2>
          <div className="grid gap-8">
            {dashboards.map((dashboard, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {dashboard.type === 'live' && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-accent-500/20 text-accent-400 rounded">
                            Live Data
                          </span>
                        )}
                        {dashboard.type === 'demo' && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-primary-500/20 text-primary-400 rounded">
                            Demo Available
                          </span>
                        )}
                        {dashboard.type === 'screenshot' && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-slate-600/50 text-slate-400 rounded">
                            Screenshots
                          </span>
                        )}
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

                {/* Placeholder for screenshot */}
                <div className="bg-slate-900/50 border-t border-slate-700 p-8 flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Dashboard screenshot coming soon</p>
                    <p className="text-xs mt-1">Replace with actual Looker screenshots</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Note about confidentiality */}
        <div className="mt-12 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-400">
            <strong className="text-slate-300">Note:</strong> Some dashboard details are simplified 
            or use sample data to protect client confidentiality. Actual implementations include 
            additional security, data validation, and client-specific customizations.
          </p>
        </div>
      </div>
    </div>
  )
}
