import { ExternalLink } from 'lucide-react'

export default function BertExplorer() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">🐦 BERTopic Tweet Explorer</h1>
          <p className="text-slate-400 mb-4">
            Interactive NLP visualization tool for exploring topic modeling results from Twitter/X data. 
            Built with Python, Streamlit, and BERTopic as part of my research at USF's Big Data Analytics Lab.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://dash-interactive-viewer.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open in New Tab
            </a>
            <a
              href="https://github.com/Cred1747/BERTopic-Tweet-Explorer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-600 hover:border-slate-500 text-slate-300 rounded-lg transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Embedded App */}
        <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800/50">
          <iframe
            src="https://dash-interactive-viewer.onrender.com/"
            title="BERTopic Tweet Explorer"
            className="w-full h-[800px] border-0"
            loading="lazy"
          />
        </div>

        {/* Info Section */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h3 className="font-semibold mb-2">🔬 Research Context</h3>
            <p className="text-slate-400 text-sm">
              Developed for stance detection research under Professor Loni Hagen at USF's Big Data Analytics Lab.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h3 className="font-semibold mb-2">🛠️ Tech Stack</h3>
            <p className="text-slate-400 text-sm">
              Python, Streamlit, BERTopic, UMAP, HDBSCAN, Sentence Transformers, Plotly
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h3 className="font-semibold mb-2">📊 Features</h3>
            <p className="text-slate-400 text-sm">
              Topic clustering, interactive visualizations, document exploration, and topic hierarchy analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
