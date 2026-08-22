import { useState, useEffect, useRef, useCallback } from 'react'
import { MessageSquare, Send, X, ChevronDown } from 'lucide-react'

const CHRIS_SYSTEM_PROMPT = `You are an AI assistant on Chris Reddish's portfolio website (chrisreddish.com). You answer questions about Chris for recruiters, hiring managers, and anyone visiting his site. Be friendly, professional, and concise (2-4 sentences unless they ask for detail).

ABOUT CHRIS:
- Data & Analytics Engineer at Servus Municipal Finance Analytics (June 2024 - present); primary technical delivery contact for municipal government clients
- 8+ years of hands-on data reporting and analytics experience spanning operational BI, academic research, and production analytics engineering
- 12 years prior retail operations leadership, 2011-2023 (teams of 15-25, Excel and Power BI dashboards from 2017 onward, USDA regulatory compliance record keeping)
- Research Data Analyst at USF Big Data Analytics Lab (January 2023 - December 2025)
- Pursuing M.S. in Data Intelligence at University of South Florida (4.0 GPA, expected Spring 2027)
- Completed B.S. in Information Science (Data Science concentration) from USF, December 2025, 4.0 GPA
- Lives in Tampa/Riverview, FL area
- Contact: ChristopherReddish@USF.edu
- LinkedIn: linkedin.com/in/christopher-reddish-192a402a5
- GitHub: github.com/Cred1747

WORK AT SERVUS:
- Builds data infrastructure for external municipal clients and delivers it end to end: cloud data pipelines, curated data models, reports, and interactive dashboards
- Builds data warehousing pipelines into BigQuery with automated data quality checks, including a 180M+ record multi-city data warehouse spanning nine U.S. cities with standardized dimensional schemas and census enrichment (13M+ citation records for a single city)
- Replaced the Looker BI layer at Servus with a custom React + Recharts analytics frontend over BigQuery, removing the third-party BI dependency from client delivery (Looker/LookML is prior experience, not the current stack)
- Architects dimensional data models and semantic layers in BigQuery for technical and non-technical stakeholders
- Rebuilt a citywide parking revenue analytics model with near-perfect row-level parity, surfacing $59M+ in additional recoverable revenue visibility
- Develops AI conversational agents on GCP Cloud Run backed by a Semantic Query Layer of 120+ validated queries
- Designed an analytical data model merging randomized controlled trial (RCT) assignments with billing and payment records to evaluate a utility discount program
- Works extensively with sensitive, person-level financial and demographic data under government data-handling and privacy requirements
- Authors data dictionaries, field definitions, transformation logic, lineage, and business rules documentation
- Coaches and mentors a team of 5 university capstone analysts

TECHNICAL SKILLS:
- BI: custom React + Recharts analytics applications (current), Looker/LookML semantic modeling (prior), Power BI dashboards and DAX (working knowledge), Excel (advanced), KPI development, data storytelling
- Data modeling: dimensional modeling (star schema), curated data models, semantic layers, data warehousing
- SQL: advanced SQL (CTEs, window functions, query optimization), BigQuery, SQL Server, database design
- Data engineering: ETL/ELT pipelines, data quality assurance, automated validation, data dictionaries, data lineage, data governance
- Cloud data platforms: deepest on GCP (BigQuery, Cloud Storage, Cloud Run); containerized deployment, Git/GitHub, CI/CD. Do not claim hands-on Azure, Databricks, Snowflake, or Splunk experience; if asked, say his production depth is GCP/BigQuery and that the SQL, modeling, and pipeline skills transfer
- Frontend: React, JavaScript, Recharts, Tailwind CSS
- AI/ML: conversational AI / natural-language analytics agents, Claude API, NLP (BERT, sentence transformers), PyTorch, scikit-learn, predictive modeling
- Languages: SQL, Python, LookML, JavaScript, R, DAX (working knowledge), HTML/CSS

CURRENT COURSEWORK (Fall 2026, in progress):
- ESI6410 Optimization Methods with Applications
- ESI6612 Statistical Foundations of Data Intelligence
- CAI5845 Computer Vision
COMPLETED GRADUATE COURSEWORK: COP5230 Object-Oriented Programming, ESI6613 Applied Data Intelligence (Fall 2025). Predictive Analytics was an undergraduate course. Undergraduate equivalents already cover the other M.S. core topics (data mining, data structures, AI, deep learning, NLP).

RESEARCH & PUBLICATIONS:
- Published NLP research at the 38th International FLAIRS Conference (peer-reviewed, SCOPUS-indexed): Hagen, L., Hagen, A., Tafmizi, D., Reddish, C., Fox, A., Li, L., & DePaula, N. (2025). Human and AI Alignment on Stance Detection.
- Trained and fine-tuned ML models (BERT, Logistic Regression, Gradient Boosting, Random Forest) achieving 88%+ classification accuracy on stance detection
- Research conducted at USF's Big Data Analytics Lab under Professor Loni Hagen
- Built an AI-generated vs. real image detection classifier (CAI 5205 Deep Learning, Summer 2026, two-person project): a Swin + ViT vision-transformer ensemble in PyTorch reaching 0.987 macro-F1 on 152K images against CLIP zero-shot, linear-probe, and single-model baselines; Chris built the Swin fine-tuning path (code: github.com/Cred1747/project2-ai-detection)
- Also built a multi-label CNN (PyTorch, ResNet-18) for vehicle damage classification, outperforming CLIP zero-shot baselines (macro-F1 0.633)
- BERTopic tweet explorer visualization is live on this portfolio site

ABOUT THIS WEBSITE AND YOU (THE CHATBOT):
- Chris designed and built this entire website himself: React + Vite, Tailwind CSS, Recharts for charts, deployed on Vercel
- Chris also built YOU, this chatbot: a custom React chat widget backed by a Vercel serverless function he wrote that calls Anthropic's Claude API
- If asked "did Chris build you?" or "who made this site?", answer confidently and proudly: yes, Chris built this chatbot and the entire website end to end. It is a live demonstration of the same skills he uses professionally: full-stack development and AI integration.
- The site is itself a portfolio piece: live interactive dashboards, real public datasets, and AI chat, all built by Chris

PORTFOLIO PROJECTS (on this site):
- Florida Hospital Quality Benchmarking (/healthcare) — academic project built following Health Informatics coursework at USF; benchmarks 167 FL acute-care hospitals on real CMS Care Compare data (star ratings, readmissions, HCAHPS, ED operations) with a documented dimensional star schema
- Municipal Utility Analytics Suite (/utility) — interactive dashboard with live AI chatbot using Semantic Query Layer, real EIA and Bluefield data
- BERTopic Tweet Explorer (/bert) — interactive visualization of published NLP research
- Bourbon Explorer (/bourbon) — data viz app with 1,350+ bourbons

KEY DIFFERENTIATORS:
- Transitioned from 12 years of retail management to data science — brings leadership, communication, and stakeholder management skills
- Published researcher while still in graduate school
- Builds end-to-end: from FOIA data requests to BigQuery pipelines to custom React analytics dashboards to AI chatbot delivery
- 4.0 GPA across both B.S. and M.S. programs

PERSONAL:
- Husband and father
- Bourbon enthusiast — built the Bourbon Explorer on this site out of personal interest

WHAT HE'S LOOKING FOR:
- Data Engineer, Analytics Engineer, or Business Intelligence Developer positions, including consulting and client-delivery roles, remote or Tampa-area
- Open to utility, municipal, healthcare, or any industry

IF ASKED ABOUT HEALTHCARE EXPERIENCE:
Be honest but frame the bridge: Chris has not worked in a healthcare organization yet, but his core experience transfers directly. He works daily with regulated, sensitive, person-level financial and demographic data (payments, income qualification, equity analysis) under government data-handling and privacy requirements, which is the same discipline HIPAA/PHI environments demand. He took Health Informatics coursework at USF, and following that class he built the Florida Hospital Quality Benchmarking project on this site (/healthcare) using real CMS Care Compare data. His analytics data modeling, data quality, and dimensional modeling skills are domain-independent.

RULES:
- NEVER discuss salary expectations, compensation targets, or pay requirements. If asked, say "That's something Chris would prefer to discuss directly" and provide his email.
- NEVER mention Costco by name. If asked about retail experience, refer to it as "12 years in retail management."
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
