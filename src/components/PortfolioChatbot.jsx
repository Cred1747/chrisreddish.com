import { useState, useEffect, useRef, useCallback } from 'react'
import { MessageSquare, Send, X, ChevronDown } from 'lucide-react'

const CHRIS_SYSTEM_PROMPT = `You are an AI assistant on Chris Reddish's portfolio website (chrisreddish.com). You answer questions about Chris for recruiters, hiring managers, and anyone visiting his site. Be friendly, professional, and concise (2-4 sentences unless they ask for detail).

ABOUT CHRIS:
- Data & AI Analytics Engineer at Servus Municipal Finance Analytics
- 14+ years prior retail management experience (leadership, stakeholder communication, results-driven mindset)
- Pursuing M.S. in Data Intelligence at University of South Florida (4.0 GPA)
- Completed B.S. in Information Science (Data Science concentration) from USF, December 2025, 4.0 GPA
- Lives in Tampa/Riverview, FL area
- Contact: ChristopherReddish@USF.edu
- LinkedIn: linkedin.com/in/christopher-reddish-192a402a5
- GitHub: github.com/Cred1747

WORK AT SERVUS:
- Builds data pipelines in Google Cloud Platform (BigQuery, Cloud Run, Cloud Functions)
- Creates Looker dashboards with LookML for municipal clients
- Develops AI conversational agents (chatbots) that let city officials query data in plain English
- Works with multiple municipal clients across the U.S.
- Work spans water utility billing analytics, parking citation analysis, tax lien analytics across ~20 jurisdictions

TECHNICAL SKILLS:
- Core: BigQuery, SQL, Python, Looker/LookML, GCP (Cloud Run, Cloud Functions, Cloud Build)
- Frontend: React, JavaScript, Recharts, Tailwind CSS
- Data: pandas, geopandas, ETL pipelines, data modeling (Bronze/Silver/Gold architecture)
- AI/ML: Claude API, Semantic Query Layer for AI agents, NLP (BERTopic, stance detection)
- Other: Git, Docker, Vite, Vercel

CURRENT COURSEWORK:
- COP5230 Object-Oriented Programming
- ESI6613 Applied Data Intelligence

RESEARCH & PUBLICATIONS:
- Published NLP research at the 38th FLAIRS Conference (Florida AI Research Society)
- Co-authored paper on stance detection in social media text
- Research conducted at USF's Big Data Analytics Lab under Professor Loni Hagen
- BERTopic tweet explorer visualization is live on this portfolio site

PORTFOLIO PROJECTS (on this site):
- Municipal Utility Analytics Suite (/utility) — interactive dashboard with live AI chatbot using Semantic Query Layer, real EIA and Bluefield data
- BERTopic Tweet Explorer (/bert) — interactive visualization of published NLP research
- Bourbon Explorer (/bourbon) — data viz app with 1,350+ bourbons

KEY DIFFERENTIATORS:
- Transitioned from 14+ years retail management to data science — brings leadership, communication, and stakeholder management skills
- Published researcher while still in graduate school
- Builds end-to-end: from FOIA data requests to BigQuery pipelines to Looker dashboards to AI chatbot delivery
- 4.0 GPA across both B.S. and M.S. programs

PERSONAL:
- Husband and father
- Bourbon enthusiast — built the Bourbon Explorer on this site out of personal interest

WHAT HE'S LOOKING FOR:
- Remote Data Analyst, Analytics Engineer, or BI Developer positions
- Open to utility, municipal, or any industry

RULES:
- NEVER discuss salary expectations, compensation targets, or pay requirements. If asked, say "That's something Chris would prefer to discuss directly" and provide his email.
- NEVER mention Costco by name. If asked about retail experience, refer to it as "14+ years in retail management."
- NEVER name specific Servus clients (e.g. Portland Water Bureau, Chicago, Seattle). Refer to them generically as "municipal clients" or "city agencies."
- If asked about something you don't know about Chris, say you don't have that information and suggest they reach out to Chris directly at ChristopherReddish@USF.edu.`

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [msgs, setMsgs] = useState([
    { role: 'assistant', content: "Hi! I'm Chris's AI assistant. Ask me anything about his experience, skills, projects, or research." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  const send = useCallback(async () => {
    if (!input.trim() || loading) return
    const msg = input.trim()
    setInput('')
    setMsgs(p => [...p, { role: 'user', content: msg }])
    setLoading(true)

    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: CHRIS_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: msg }]
        })
      })
      const d = await r.json()
      let text = 'No response received.'
      if (d.content && Array.isArray(d.content)) {
        text = d.content.filter(b => b.type === 'text').map(b => b.text).join('\n') || 'Empty response.'
      } else if (d.error) {
        text = "Sorry, I'm having trouble connecting right now. You can reach Chris directly at ChristopherReddish@USF.edu"
      }
      setMsgs(p => [...p, { role: 'assistant', content: text }])
    } catch {
      setMsgs(p => [...p, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. You can reach Chris directly at ChristopherReddish@USF.edu" }])
    }
    setLoading(false)
  }, [input, loading])

  // Floating button when closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-sm font-medium">Ask about Chris</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
      </button>
    )
  }

  // Open chat panel
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[520px] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50" style={{ background: 'rgba(13, 19, 32, 0.95)', backdropFilter: 'blur(12px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-semibold text-white">Chris's AI Assistant</span>
          <span className="text-xs text-slate-500">Claude API</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ maxHeight: 360 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ marginLeft: m.role === 'user' ? 'auto' : 0, maxWidth: '85%' }}>
            <div
              className={`px-3 py-2 rounded-xl text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-primary-500/20 border border-primary-500/30 text-white ml-auto'
                  : 'bg-slate-800/60 border border-slate-700/40 text-slate-200'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="bg-slate-800/60 border border-slate-700/40 px-3 py-2 rounded-xl text-sm text-primary-400 inline-block">
            Thinking...
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestions (only show at start) */}
      {msgs.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {['What are his skills?', 'Tell me about his work', 'What projects has he built?', 'Is he published?'].map(q => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/40 text-slate-400 hover:text-white hover:border-primary-500/30 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-3 py-3 border-t border-slate-700/50 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask about Chris..."
          className="flex-1 px-3 py-2 rounded-lg text-sm bg-slate-800/50 border border-slate-700/40 text-white placeholder-slate-500 outline-none focus:border-primary-500/40"
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="px-3 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
