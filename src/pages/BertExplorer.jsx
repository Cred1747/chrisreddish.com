import { useState, useMemo, useEffect, useCallback } from 'react'
import { 
  ExternalLink, 
  Github, 
  Search,
  X,
  MessageSquare,
  Calendar,
  Hash,
  Sun,
  Moon,
  Loader2,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  Sector
} from 'recharts'
import Papa from 'papaparse'

// GitHub raw URL base for data files
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/Cred1747/BERTopic-Tweet-Explorer/main/data'

// Available datasets configuration
const DATASETS = {
  models: ['BTV3', 'LM', 'UHC'],
  stances: ['positive', 'negative'],
  kValues: {
    BTV3: { positive: [5, 6, 7, 8, 9, 10, 15, 20, 25], negative: [5, 6, 7, 8, 9, 10, 15, 20, 25] },
    LM: { positive: [5, 8, 10, 15, 20, 25], negative: [5, 8, 10, 15, 20, 25] },
    UHC: { positive: [5, 6, 7, 8, 10, 15, 20, 25], negative: [5, 6, 7, 8, 10, 15, 20, 25] }
  },
  primeK: {
    BTV3: { positive: 8, negative: 6 },
    LM: { positive: 8, negative: 8 },
    UHC: { positive: 6, negative: 7 }
  },
  modelLabels: {
    BTV3: 'Brian Thompson',
    LM: 'Luigi Mangione',
    UHC: 'United Healthcare'
  }
}

// Color palette for topics
const TOPIC_COLORS = [
  '#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6',
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
  '#14b8a6', '#f43f5e', '#a855f7', '#22c55e', '#eab308',
  '#0ea5e9', '#d946ef', '#64748b', '#78716c', '#059669',
  '#dc2626', '#7c3aed', '#2563eb', '#c026d3', '#65a30d'
]

export default function BertExplorer() {
  // State
  const [model, setModel] = useState('LM')
  const [stance, setStance] = useState('negative')
  const [kValue, setKValue] = useState(8)
  const [theme, setTheme] = useState('dark')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('bar') // 'bar' or 'sunburst'
  const [activeIndex, setActiveIndex] = useState(null)
  
  // Data state
  const [documentData, setDocumentData] = useState([])
  const [topicLabels, setTopicLabels] = useState({})
  
  // UI state
  const [selectedTweets, setSelectedTweets] = useState([])
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Theme classes
  const t = theme === 'dark' ? {
    bg: 'bg-slate-900',
    card: 'bg-slate-800/40',
    border: 'border-cyan-500/20',
    text: 'text-white',
    textMuted: 'text-slate-400',
    input: 'bg-slate-800/70 border-slate-600/50 text-white',
  } : {
    bg: 'bg-cyan-50',
    card: 'bg-white/70',
    border: 'border-cyan-200',
    text: 'text-slate-900',
    textMuted: 'text-slate-600',
    input: 'bg-white/80 border-cyan-200 text-slate-900',
  }

  // Build file URLs
  const getFileUrl = (type) => {
    // Handle special LM naming convention for k=25
    if (model === 'LM' && kValue === 25) {
      const filename = `lm_stance_70k_4.1mini_${stance}_k=25_${type}.csv`
      return `${GITHUB_RAW_BASE}/${filename}`
    }
    const filename = `${stance}_${model}_70k_k=${kValue}mini_${type}.csv`
    return `${GITHUB_RAW_BASE}/${filename}`
  }

  // Load data when model/stance/k changes
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      setSelectedTweets([])
      setSelectedInfo(null)

      try {
        // Load document info
        const docUrl = getFileUrl('document_info')
        const docResponse = await fetch(docUrl)
        if (!docResponse.ok) throw new Error(`Failed to load document data from ${docUrl}`)
        const docText = await docResponse.text()
        
        const docParsed = Papa.parse(docText, { 
          header: true, 
          skipEmptyLines: true,
          dynamicTyping: true 
        })

        // Load topic representation
        const topicUrl = getFileUrl('topic_representation')
        const topicResponse = await fetch(topicUrl)
        if (!topicResponse.ok) throw new Error(`Failed to load topic data`)
        const topicText = await topicResponse.text()
        
        const topicParsed = Papa.parse(topicText, { 
          header: true, 
          skipEmptyLines: true 
        })

        // Process topic labels
        const labels = {}
        topicParsed.data.forEach(row => {
          if (row.Topic !== undefined && row.Representation) {
            try {
              const repStr = row.Representation.replace(/'/g, '"')
              const words = JSON.parse(repStr)
              labels[row.Topic] = words.slice(0, 4).join(' ')
            } catch {
              labels[row.Topic] = row.Name || `Topic ${row.Topic}`
            }
          }
        })

        setTopicLabels(labels)
        setDocumentData(docParsed.data)
      } catch (err) {
        console.error('Error loading data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [model, stance, kValue])

  // Process data for chart
  const chartData = useMemo(() => {
    if (!documentData.length) return []

    const grouped = {}
    const dateTotals = {}

    documentData.forEach(row => {
      if (!row.Date || row.Topic === undefined) return
      
      let dateStr
      try {
        const d = new Date(row.Date)
        if (!isNaN(d.getTime())) {
          dateStr = d.toISOString().split('T')[0]
        } else {
          return
        }
      } catch {
        return
      }

      const topic = row.Topic
      
      if (!grouped[dateStr]) grouped[dateStr] = {}
      if (!grouped[dateStr][topic]) grouped[dateStr][topic] = 0
      grouped[dateStr][topic]++
      
      dateTotals[dateStr] = (dateTotals[dateStr] || 0) + 1
    })

    const result = Object.entries(grouped)
      .map(([date, topics]) => {
        const total = dateTotals[date]
        const entry = { date, total }
        
        Object.entries(topics).forEach(([topic, count]) => {
          const label = topicLabels[topic] || `Topic ${topic}`
          entry[label] = count / total
          entry[`${label}_count`] = count
          entry[`${label}_topic`] = parseInt(topic)
        })
        
        return entry
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))

    return result
  }, [documentData, topicLabels])

  // Get unique topic labels
  const topicKeys = useMemo(() => {
    if (!chartData.length) return []
    const keys = new Set()
    chartData.forEach(d => {
      Object.keys(d).forEach(k => {
        if (!['date', 'total'].includes(k) && !k.endsWith('_count') && !k.endsWith('_topic')) {
          keys.add(k)
        }
      })
    })
    return Array.from(keys)
  }, [chartData])

  // Sunburst data - aggregate by topic
  const sunburstData = useMemo(() => {
    if (!documentData.length) return []
    
    const topicCounts = {}
    documentData.forEach(row => {
      if (row.Topic === undefined) return
      const topic = row.Topic
      topicCounts[topic] = (topicCounts[topic] || 0) + 1
    })

    return Object.entries(topicCounts)
      .map(([topic, count]) => ({
        topic: parseInt(topic),
        name: topicLabels[topic] || `Topic ${topic}`,
        value: count,
        fill: TOPIC_COLORS[parseInt(topic) % TOPIC_COLORS.length]
      }))
      .sort((a, b) => b.value - a.value)
  }, [documentData, topicLabels])

  // Active shape for sunburst hover
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
    
    return (
      <g>
        <text x={cx} y={cy - 10} textAnchor="middle" fill={theme === 'dark' ? '#fff' : '#1e293b'} className="text-sm font-semibold">
          {payload.name}
        </text>
        <text x={cx} y={cy + 15} textAnchor="middle" fill={theme === 'dark' ? '#94a3b8' : '#64748b'} className="text-xs">
          {value.toLocaleString()} tweets ({(percent * 100).toFixed(1)}%)
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 12}
          outerRadius={outerRadius + 16}
          fill={fill}
        />
      </g>
    )
  }

  const onPieEnter = useCallback((_, index) => {
    setActiveIndex(index)
  }, [])

  const onPieLeave = useCallback(() => {
    setActiveIndex(null)
  }, [])

  // Handle sunburst click
  const handleSunburstClick = (data) => {
    if (!data) return
    const topic = data.topic
    
    const tweets = documentData.filter(row => row.Topic === topic)
    const tweetTexts = tweets
      .map(t => t.Document || t.original_text)
      .filter(Boolean)
      .slice(0, 100)

    setSelectedTweets(tweetTexts)
    setSelectedInfo({
      date: 'All dates',
      topic,
      label: data.name,
      count: data.value
    })
  }

  // Handle bar click
  const handleBarClick = (data, topicLabel) => {
    if (!data) return
    
    const date = data.date
    const topic = data[`${topicLabel}_topic`]
    
    if (topic === undefined) return

    const tweets = documentData.filter(row => {
      if (row.Topic !== topic) return false
      try {
        const rowDate = new Date(row.Date).toISOString().split('T')[0]
        return rowDate === date
      } catch {
        return false
      }
    })

    const tweetTexts = tweets
      .map(t => t.Document || t.original_text)
      .filter(Boolean)
      .slice(0, 100)

    setSelectedTweets(tweetTexts)
    setSelectedInfo({
      date,
      topic,
      label: topicLabel,
      count: data[`${topicLabel}_count`] || tweetTexts.length
    })
  }

  // Filter tweets by search
  const filteredTweets = useMemo(() => {
    if (!searchTerm) return selectedTweets
    return selectedTweets.filter(t => 
      t.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [selectedTweets, searchTerm])

  // Stats
  const stats = useMemo(() => ({
    totalTweets: documentData.length,
    totalDates: chartData.length,
    totalTopics: Object.keys(topicLabels).length
  }), [documentData, chartData, topicLabels])

  const availableKValues = DATASETS.kValues[model]?.[stance] || []
  const primeK = DATASETS.primeK[model]?.[stance]

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null
    
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl max-w-xs">
        <p className="font-semibold text-white text-sm mb-2">{label}</p>
        {payload.slice(0, 5).map((entry, i) => (
          <p key={i} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {(entry.value * 100).toFixed(1)}%
          </p>
        ))}
        {payload.length > 5 && (
          <p className="text-xs text-slate-400">+{payload.length - 5} more...</p>
        )}
      </div>
    )
  }

  return (
    <div className={`min-h-screen py-20 transition-colors duration-300 ${t.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`mb-8 p-6 sm:p-8 rounded-2xl backdrop-blur-md border shadow-2xl ${t.card} ${t.border}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                🐦 BERTopic Tweet Explorer
              </h1>
              <p className={t.textMuted}>
                Explore topic modeling results from Twitter/X data on healthcare CEO discourse
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <div className={`flex rounded-lg overflow-hidden border ${theme === 'dark' ? 'border-slate-600' : 'border-cyan-300'}`}>
                <button
                  onClick={() => setViewMode('bar')}
                  className={`flex items-center gap-1 px-3 py-2 text-sm transition-all ${viewMode === 'bar' 
                    ? (theme === 'dark' ? 'bg-cyan-500 text-white' : 'bg-cyan-500 text-white')
                    : (theme === 'dark' ? 'bg-slate-700/50 text-slate-400 hover:text-white' : 'bg-white text-slate-600 hover:bg-cyan-50')}`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Timeline</span>
                </button>
                <button
                  onClick={() => setViewMode('sunburst')}
                  className={`flex items-center gap-1 px-3 py-2 text-sm transition-all ${viewMode === 'sunburst' 
                    ? (theme === 'dark' ? 'bg-cyan-500 text-white' : 'bg-cyan-500 text-white')
                    : (theme === 'dark' ? 'bg-slate-700/50 text-slate-400 hover:text-white' : 'bg-white text-slate-600 hover:bg-cyan-50')}`}
                >
                  <PieChartIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Sunburst</span>
                </button>
              </div>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-slate-700/50 text-cyan-400 hover:bg-slate-600/50' : 'bg-cyan-200 text-cyan-700 hover:bg-cyan-300'}`}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <a
                href="https://github.com/Cred1747/BERTopic-Tweet-Explorer"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${theme === 'dark' ? 'bg-slate-700/50 hover:bg-slate-600/50' : 'bg-cyan-100 hover:bg-cyan-200 text-cyan-700'}`}
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>

          {/* Controls */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${t.textMuted}`}>Model / Subject</label>
              <select
                value={model}
                onChange={(e) => {
                  setModel(e.target.value)
                  const newPrime = DATASETS.primeK[e.target.value]?.[stance]
                  if (newPrime) setKValue(newPrime)
                }}
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${t.input}`}
              >
                {DATASETS.models.map(m => (
                  <option key={m} value={m}>{DATASETS.modelLabels[m]}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${t.textMuted}`}>Stance</label>
              <select
                value={stance}
                onChange={(e) => {
                  setStance(e.target.value)
                  const newPrime = DATASETS.primeK[model]?.[e.target.value]
                  if (newPrime) setKValue(newPrime)
                }}
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${t.input}`}
              >
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${t.textMuted}`}>
                Number of Topics (k)
                {primeK === kValue && <span className="text-cyan-400 ml-2">★ Prime</span>}
              </label>
              <select
                value={kValue}
                onChange={(e) => setKValue(parseInt(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${t.input}`}
              >
                {availableKValues.map(k => (
                  <option key={k} value={k}>
                    k = {k} {DATASETS.primeK[model]?.[stance] === k ? '(Prime)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Prime K Reference */}
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-cyan-100/50'}`}>
            <h4 className={`text-sm font-semibold mb-2 ${t.text}`}>📊 Recommended k-values:</h4>
            <div className="grid sm:grid-cols-3 gap-2 text-sm">
              <div className={t.textMuted}>BTV3: Pos k=8, Neg k=6</div>
              <div className={t.textMuted}>LM: Pos k=8, Neg k=8</div>
              <div className={t.textMuted}>UHC: Pos k=6, Neg k=7</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`backdrop-blur-md rounded-xl border p-4 shadow-lg ${t.card} ${t.border}`}>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-500" />
              <div className="text-2xl font-bold text-cyan-500">{stats.totalTweets.toLocaleString()}</div>
            </div>
            <div className={`text-sm ${t.textMuted}`}>Total Tweets</div>
          </div>
          <div className={`backdrop-blur-md rounded-xl border p-4 shadow-lg ${t.card} ${t.border}`}>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div className="text-2xl font-bold text-blue-500">{stats.totalDates}</div>
            </div>
            <div className={`text-sm ${t.textMuted}`}>Days</div>
          </div>
          <div className={`backdrop-blur-md rounded-xl border p-4 shadow-lg ${t.card} ${t.border}`}>
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-purple-500" />
              <div className="text-2xl font-bold text-purple-500">{stats.totalTopics}</div>
            </div>
            <div className={`text-sm ${t.textMuted}`}>Topics</div>
          </div>
        </div>

        {/* Chart */}
        <div className={`backdrop-blur-md rounded-xl border p-6 shadow-xl mb-6 ${t.card} ${t.border}`}>
          <h3 className={`text-lg font-semibold mb-4 ${t.text}`}>
            {viewMode === 'bar' ? 'Topic Proportions Over Time' : 'Topic Distribution (Sunburst)'} — {DATASETS.modelLabels[model]}, {stance}, k={kValue}
          </h3>
          
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
              <span className={`ml-3 ${t.textMuted}`}>Loading data from GitHub...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-96 text-red-400">
              <p className="mb-4">Error: {error}</p>
              <p className={`text-sm ${t.textMuted}`}>This model/stance/k combination may not be available.</p>
            </div>
          ) : viewMode === 'bar' ? (
            <ResponsiveContainer width="100%" height={450}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, bottom: 60, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                <XAxis 
                  dataKey="date" 
                  stroke={theme === 'dark' ? '#9ca3af' : '#64748b'}
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#9ca3af' : '#64748b'}
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                  domain={[0, 1]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                {topicKeys.map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    stackId="a"
                    fill={TOPIC_COLORS[index % TOPIC_COLORS.length]}
                    onClick={(data) => handleBarClick(data, key)}
                    cursor="pointer"
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <ResponsiveContainer width="100%" height={450}>
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={sunburstData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={160}
                    paddingAngle={2}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    onClick={(_, index) => handleSunburstClick(sunburstData[index])}
                    cursor="pointer"
                  >
                    {sunburstData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Legend for sunburst */}
              <div className="w-full lg:w-64 max-h-96 overflow-y-auto">
                <h4 className={`text-sm font-semibold mb-3 ${t.text}`}>Topics</h4>
                <div className="space-y-2">
                  {sunburstData.map((entry, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${theme === 'dark' ? 'hover:bg-slate-700/50' : 'hover:bg-cyan-100'}`}
                      onClick={() => handleSunburstClick(entry)}
                    >
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.fill }} />
                      <span className={`text-xs ${t.text} truncate`}>{entry.name}</span>
                      <span className={`text-xs ${t.textMuted} ml-auto`}>{entry.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <p className={`text-sm mt-4 ${t.textMuted}`}>
            💡 {viewMode === 'bar' 
              ? 'Click any bar segment to view tweets for that topic on that date'
              : 'Hover over segments to see details, click to view tweets for that topic'}
          </p>
        </div>

        {/* Tweets Panel */}
        <div className={`backdrop-blur-md rounded-xl border p-6 shadow-xl ${t.card} ${t.border}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${t.text}`}>
              {selectedInfo 
                ? `📅 ${selectedInfo.date} — Topic ${selectedInfo.topic}: ${selectedInfo.label} (${selectedInfo.count} tweets)`
                : '🖱️ Click a bar to see tweets'}
            </h3>
            {selectedTweets.length > 0 && (
              <button
                onClick={() => { setSelectedTweets([]); setSelectedInfo(null); setSearchTerm(''); }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {selectedTweets.length > 0 && (
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tweets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${t.input}`}
              />
            </div>
          )}

          <div className={`max-h-96 overflow-y-auto rounded-lg ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-cyan-50'} p-4`}>
            {filteredTweets.length > 0 ? (
              <div className="space-y-3">
                {filteredTweets.map((tweet, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-slate-700/50 border border-slate-600/30' : 'bg-white border border-cyan-200'}`}
                  >
                    <p className={`text-sm ${t.text}`}>{tweet}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-center py-8 ${t.textMuted}`}>
                {selectedTweets.length > 0 
                  ? 'No tweets match your search'
                  : 'Click on a bar segment to view tweets for that topic and date'}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-8 p-6 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30' : 'bg-gradient-to-r from-cyan-100 to-blue-100 border border-cyan-300'}`}>
          <h3 className={`text-lg font-semibold mb-2 ${t.text}`}>About This Project</h3>
          <p className={`text-sm mb-4 ${t.textMuted}`}>
            Interactive visualization of BERTopic modeling results from Twitter/X data analyzing public discourse 
            around the UnitedHealthcare CEO incident. Built as part of NLP research at USF's Big Data Analytics Lab 
            under Professor Loni Hagen. Data loads directly from GitHub for optimal performance.
          </p>
          <div className="flex flex-wrap gap-2">
            {['BERTopic', 'NLP', 'Topic Modeling', 'React', 'Recharts', 'Stance Detection'].map(tag => (
              <span key={tag} className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyan-200 text-cyan-700'}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
