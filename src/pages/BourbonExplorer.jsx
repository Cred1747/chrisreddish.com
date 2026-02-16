import { useState, useMemo } from 'react'
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  Droplets, 
  DollarSign,
  X,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  LayoutGrid,
  List,
  Sun,
  Moon
} from 'lucide-react'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts'

// Import bourbon data from external file
import { bourbonData } from '../data/bourbonData'

// Flavor color mapping
const flavorColors = {
  caramel: '#D4A574',
  vanilla: '#F3E5AB',
  oak: '#8B4513',
  spice: '#CD853F',
  cherry: '#DC143C',
  honey: '#FFD700',
  fruit: '#FF6B6B',
  chocolate: '#7B3F00',
  cinnamon: '#D2691E',
  rich: '#8B0000',
  dried: '#A0522D',
  dark: '#4A0E0E',
  toasted: '#C4A35A',
  baking: '#D2691E',
  leather: '#8B4513',
  tobacco: '#654321',
}

// Rating color
const getRatingColor = (rating) => {
  if (rating >= 95) return '#22c55e'
  if (rating >= 90) return '#84cc16'
  if (rating >= 85) return '#eab308'
  if (rating >= 80) return '#f97316'
  return '#ef4444'
}

// Value score calculation
const getValueScore = (bourbon) => {
  return ((bourbon.rating / bourbon.price) * 10).toFixed(2)
}

// Light mode flavor colors (darker for better contrast)
const flavorColorsLight = {
  caramel: '#92400e',
  vanilla: '#a16207',
  oak: '#5c2d0c',
  spice: '#9a3412',
  cherry: '#b91c1c',
  honey: '#a16207',
  fruit: '#dc2626',
  chocolate: '#4a2106',
  cinnamon: '#9a3412',
  rich: '#7f1d1d',
  dried: '#78350f',
  dark: '#450a0a',
  toasted: '#92400e',
  baking: '#9a3412',
  leather: '#5c2d0c',
  tobacco: '#422006',
}

// Bourbon Glass SVG Background Component
const BourbonGlassBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Ambient glow */}
    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
    
    {/* Large bourbon glass - right side */}
    <svg 
      className="absolute -right-20 top-20 w-[500px] h-[600px] opacity-[0.07]"
      viewBox="0 0 200 280" 
      fill="none"
    >
      {/* Glass body - Glencairn style */}
      <path 
        d="M50 80 C50 80 35 140 40 180 C45 220 55 250 100 260 C145 250 155 220 160 180 C165 140 150 80 150 80 L50 80 Z" 
        fill="url(#glassGradient)" 
        stroke="#f59e0b" 
        strokeWidth="1"
      />
      {/* Bourbon liquid */}
      <path 
        d="M55 100 C55 100 45 145 48 175 C52 205 60 230 100 238 C140 230 148 205 152 175 C155 145 145 100 145 100 L55 100 Z" 
        fill="url(#bourbonGradient)"
        opacity="0.9"
      />
      {/* Liquid surface highlight */}
      <ellipse cx="100" cy="100" rx="43" ry="8" fill="url(#surfaceGradient)" opacity="0.6" />
      {/* Glass rim */}
      <ellipse cx="100" cy="80" rx="50" ry="10" fill="none" stroke="#f59e0b" strokeWidth="2" />
      {/* Glass stem */}
      <path d="M85 260 L85 275 L115 275 L115 260" fill="url(#glassGradient)" stroke="#f59e0b" strokeWidth="1" />
      {/* Glass base */}
      <ellipse cx="100" cy="275" rx="35" ry="5" fill="url(#glassGradient)" stroke="#f59e0b" strokeWidth="1" />
      
      <defs>
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="bourbonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="50%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
        <radialGradient id="surfaceGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.3" />
        </radialGradient>
      </defs>
    </svg>
    
    {/* Smaller glass - left side */}
    <svg 
      className="absolute -left-10 bottom-40 w-[300px] h-[400px] opacity-[0.05] rotate-12"
      viewBox="0 0 200 280" 
      fill="none"
    >
      <path 
        d="M50 80 C50 80 35 140 40 180 C45 220 55 250 100 260 C145 250 155 220 160 180 C165 140 150 80 150 80 L50 80 Z" 
        fill="url(#glassGradient2)" 
        stroke="#f59e0b" 
        strokeWidth="1"
      />
      <path 
        d="M55 100 C55 100 45 145 48 175 C52 205 60 230 100 238 C140 230 148 205 152 175 C155 145 145 100 145 100 L55 100 Z" 
        fill="url(#bourbonGradient2)"
        opacity="0.8"
      />
      <ellipse cx="100" cy="80" rx="50" ry="10" fill="none" stroke="#f59e0b" strokeWidth="2" />
      <path d="M85 260 L85 275 L115 275 L115 260" fill="url(#glassGradient2)" stroke="#f59e0b" strokeWidth="1" />
      <ellipse cx="100" cy="275" rx="35" ry="5" fill="url(#glassGradient2)" stroke="#f59e0b" strokeWidth="1" />
      
      <defs>
        <linearGradient id="glassGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="bourbonGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>
    </svg>
    
    {/* Floating particles / bubbles */}
    <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-amber-400/20 rounded-full animate-pulse" />
    <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-amber-500/15 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
    <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-orange-400/20 rounded-full animate-pulse" style={{ animationDelay: '700ms' }} />
  </div>
)

export default function BourbonExplorer() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBourbon, setSelectedBourbon] = useState(null)
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 500,
    minAbv: 40,
    maxAbv: 75,
    minRating: 76,
    distillery: 'all',
  })
  const [sortBy, setSortBy] = useState('rating')
  const [sortOrder, setSortOrder] = useState('desc')
  const [visibleCount, setVisibleCount] = useState(30)
  const [selectedFlavors, setSelectedFlavors] = useState([])
  const [flavorMatchMode, setFlavorMatchMode] = useState('any') // 'any' or 'all'
  const [showAllFlavors, setShowAllFlavors] = useState(false)
  const [viewMode, setViewMode] = useState('cards') // 'cards' or 'list'
  const [theme, setTheme] = useState('dark') // 'dark' or 'light'

  // Theme classes
  const themeClasses = {
    dark: {
      bg: 'bg-slate-900',
      card: 'bg-slate-800/40',
      cardHover: 'hover:bg-slate-800/60',
      border: 'border-amber-500/20',
      borderHover: 'hover:border-amber-500/60',
      text: 'text-white',
      textMuted: 'text-slate-400',
      textSecondary: 'text-slate-300',
      input: 'bg-slate-800/70 border-slate-600/50 text-white',
      overlay: 'from-amber-950/20 via-slate-900/95 to-orange-950/20',
    },
    light: {
      bg: 'bg-amber-50',
      card: 'bg-white/70',
      cardHover: 'hover:bg-white/90',
      border: 'border-amber-300/50',
      borderHover: 'hover:border-amber-500',
      text: 'text-slate-900',
      textMuted: 'text-slate-600',
      textSecondary: 'text-slate-700',
      input: 'bg-white/80 border-amber-200 text-slate-900',
      overlay: 'from-amber-100/80 via-amber-50/95 to-orange-100/80',
    }
  }
  const t = themeClasses[theme]

  // Get unique distilleries
  const distilleries = useMemo(() => {
    const unique = [...new Set(bourbonData.map(b => b.distillery))]
    return unique.sort()
  }, [])

  // Get flavor counts for chips
  const flavorCounts = useMemo(() => {
    const counts = {}
    bourbonData.forEach(b => {
      if (b.flavorProfile) {
        b.flavorProfile.split(',').forEach(f => {
          const flavor = f.trim().toLowerCase()
          if (flavor) {
            counts[flavor] = (counts[flavor] || 0) + 1
          }
        })
      }
    })
    // Sort by count and return as array
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([flavor, count]) => ({ flavor, count }))
  }, [])

  // Top flavors to show (expandable)
  const topFlavors = useMemo(() => flavorCounts.slice(0, 12), [flavorCounts])
  const moreFlavors = useMemo(() => flavorCounts.slice(12, 30), [flavorCounts])

  // Get price/rating ranges from data
  const dataRanges = useMemo(() => {
    const prices = bourbonData.map(b => b.price)
    const ratings = bourbonData.map(b => b.rating)
    const abvs = bourbonData.map(b => b.abv)
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices)),
      minRating: Math.floor(Math.min(...ratings)),
      maxRating: Math.ceil(Math.max(...ratings)),
      minAbv: Math.floor(Math.min(...abvs)),
      maxAbv: Math.ceil(Math.max(...abvs)),
    }
  }, [])

  // Filter and sort data
  const filteredData = useMemo(() => {
    let data = bourbonData.filter(bourbon => {
      const matchesSearch = bourbon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bourbon.distillery.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bourbon.flavorProfile.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = bourbon.price >= filters.minPrice && bourbon.price <= filters.maxPrice
      const matchesAbv = bourbon.abv >= filters.minAbv && bourbon.abv <= filters.maxAbv
      const matchesRating = bourbon.rating >= filters.minRating
      const matchesDistillery = filters.distillery === 'all' || bourbon.distillery === filters.distillery
      
      // Flavor filter
      let matchesFlavors = true
      if (selectedFlavors.length > 0) {
        const bourbonFlavors = bourbon.flavorProfile.toLowerCase().split(',').map(f => f.trim())
        if (flavorMatchMode === 'all') {
          matchesFlavors = selectedFlavors.every(sf => bourbonFlavors.some(bf => bf.includes(sf)))
        } else {
          matchesFlavors = selectedFlavors.some(sf => bourbonFlavors.some(bf => bf.includes(sf)))
        }
      }
      
      return matchesSearch && matchesPrice && matchesAbv && matchesRating && matchesDistillery && matchesFlavors
    })

    // Sort
    data.sort((a, b) => {
      let aVal, bVal
      if (sortBy === 'value') {
        aVal = a.rating / a.price
        bVal = b.rating / b.price
      } else if (sortBy === 'name') {
        return sortOrder === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
      } else {
        aVal = a[sortBy] || 0
        bVal = b[sortBy] || 0
      }
      if (sortOrder === 'desc') return bVal - aVal
      return aVal - bVal
    })

    return data
  }, [searchTerm, filters, sortBy, sortOrder, selectedFlavors, flavorMatchMode])

  // Visible data (for lazy loading)
  const visibleData = useMemo(() => {
    return filteredData.slice(0, visibleCount)
  }, [filteredData, visibleCount])

  // Stats for charts - show all filtered bourbons
  const chartData = useMemo(() => {
    return filteredData.map(b => ({
      name: b.name.length > 20 ? b.name.substring(0, 20) + '...' : b.name,
      price: b.price,
      rating: b.rating,
      abv: b.abv,
      value: parseFloat(getValueScore(b)),
      fullName: b.name
    }))
  }, [filteredData])

  // Rating distribution
  const ratingDistribution = useMemo(() => {
    const ranges = [
      { range: '95-100', min: 95, max: 100, count: 0 },
      { range: '90-94', min: 90, max: 94, count: 0 },
      { range: '85-89', min: 85, max: 89, count: 0 },
      { range: '80-84', min: 80, max: 84, count: 0 },
      { range: '<80', min: 0, max: 79, count: 0 },
    ]
    filteredData.forEach(b => {
      const range = ranges.find(r => b.rating >= r.min && b.rating <= r.max)
      if (range) range.count++
    })
    return ranges
  }, [filteredData])

  // Top distilleries by bourbon count
  const topDistilleries = useMemo(() => {
    const counts = {}
    filteredData.forEach(b => {
      const name = b.distillery.length > 15 ? b.distillery.substring(0, 15) + '...' : b.distillery
      counts[name] = (counts[name] || 0) + 1
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }))
  }, [filteredData])

  // Price distribution
  const priceDistribution = useMemo(() => {
    const ranges = [
      { range: '$0-25', min: 0, max: 25, count: 0 },
      { range: '$26-50', min: 26, max: 50, count: 0 },
      { range: '$51-75', min: 51, max: 75, count: 0 },
      { range: '$76-100', min: 76, max: 100, count: 0 },
      { range: '$101-150', min: 101, max: 150, count: 0 },
      { range: '$150+', min: 151, max: 9999, count: 0 },
    ]
    filteredData.forEach(b => {
      const range = ranges.find(r => b.price >= r.min && b.price <= r.max)
      if (range) range.count++
    })
    return ranges
  }, [filteredData])

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
          <p className="font-semibold text-white text-sm">{data.fullName || data.name}</p>
          <p className="text-slate-300 text-xs">Rating: {data.rating}</p>
          <p className="text-slate-300 text-xs">Price: ${data.price}</p>
          <p className="text-slate-300 text-xs">ABV: {data.abv}%</p>
        </div>
      )
    }
    return null
  }

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 30, filteredData.length))
  }

  return (
    <div className={`min-h-screen py-20 relative transition-colors duration-300 ${t.bg}`}>
      {/* Background - only show in dark mode */}
      {theme === 'dark' && <BourbonGlassBackground />}
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${t.overlay} pointer-events-none`} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Header with Glass Effect */}
        <div className={`mb-8 p-6 sm:p-8 rounded-2xl backdrop-blur-md border shadow-2xl ${theme === 'dark' ? 'bg-slate-800/30 border-amber-500/20 shadow-amber-900/20' : 'bg-white/60 border-amber-200 shadow-amber-200/30'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">🥃 Bourbon Explorer</h1>
              <p className={t.textSecondary}>
                Explore {bourbonData.length.toLocaleString()} bourbons - filter by price, rating, ABV, and flavor profile
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-700/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'cards' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'}`}
                  title="Card View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-slate-700/50 text-amber-400 hover:bg-slate-600/50' : 'bg-amber-200 text-amber-700 hover:bg-amber-300'}`}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              {/* GitHub Link */}
              <a
                href="https://github.com/Cred1747/bourbonExplorer"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 backdrop-blur-sm border rounded-lg text-sm transition-all whitespace-nowrap ${theme === 'dark' ? 'bg-slate-800/70 hover:bg-slate-700/80 border-slate-600/50 hover:border-amber-500/50' : 'bg-white/70 hover:bg-white border-amber-200 hover:border-amber-400 text-slate-700'}`}
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>
          
          {/* Search and Filter Toggle */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, distillery, or flavor..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setVisibleCount(30); }}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/70 backdrop-blur-sm border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-slate-800/90 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                showFilters ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Filters Panel - Glassmorphism */}
          {showFilters && (
            <div className="backdrop-blur-md bg-slate-800/40 rounded-xl border border-amber-500/20 p-6 mb-6 shadow-xl shadow-amber-900/10">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Price Range: ${filters.minPrice} - ${filters.maxPrice}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={filters.minPrice}
                      onChange={(e) => { setFilters({...filters, minPrice: parseInt(e.target.value)}); setVisibleCount(30); }}
                      className="flex-1 accent-amber-500"
                    />
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={filters.maxPrice}
                      onChange={(e) => { setFilters({...filters, maxPrice: parseInt(e.target.value)}); setVisibleCount(30); }}
                      className="flex-1 accent-amber-500"
                    />
                  </div>
                </div>

                {/* ABV Range */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    ABV Range: {filters.minAbv}% - {filters.maxAbv}%
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="40"
                      max="75"
                      value={filters.minAbv}
                      onChange={(e) => { setFilters({...filters, minAbv: parseInt(e.target.value)}); setVisibleCount(30); }}
                      className="flex-1 accent-amber-500"
                    />
                    <input
                      type="range"
                      min="40"
                      max="75"
                      value={filters.maxAbv}
                      onChange={(e) => { setFilters({...filters, maxAbv: parseInt(e.target.value)}); setVisibleCount(30); }}
                      className="flex-1 accent-amber-500"
                    />
                  </div>
                </div>

                {/* Min Rating */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Minimum Rating: {filters.minRating}
                  </label>
                  <input
                    type="range"
                    min="76"
                    max="97"
                    value={filters.minRating}
                    onChange={(e) => { setFilters({...filters, minRating: parseInt(e.target.value)}); setVisibleCount(30); }}
                    className="w-full accent-amber-500"
                  />
                </div>

                {/* Distillery */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Distillery</label>
                  <select
                    value={filters.distillery}
                    onChange={(e) => { setFilters({...filters, distillery: e.target.value}); setVisibleCount(30); }}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">All Distilleries ({distilleries.length})</option>
                    {distilleries.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sort Options */}
              <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-slate-700">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="rating">Rating</option>
                    <option value="price">Price</option>
                    <option value="abv">ABV</option>
                    <option value="value">Value Score</option>
                    <option value="name">Name</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Order</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="desc">High to Low</option>
                    <option value="asc">Low to High</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setFilters({ minPrice: 0, maxPrice: 500, minAbv: 40, maxAbv: 75, minRating: 76, distillery: 'all' })
                      setSearchTerm('')
                      setSelectedFlavors([])
                      setVisibleCount(30)
                    }}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-sm transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>

              {/* Flavor Filter Section */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <label className="text-sm font-medium text-slate-300">
                    Filter by Flavor {selectedFlavors.length > 0 && `(${selectedFlavors.length} selected)`}
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Match:</span>
                    <button
                      onClick={() => { setFlavorMatchMode('any'); setVisibleCount(30); }}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        flavorMatchMode === 'any' 
                          ? 'bg-amber-500 text-black font-medium' 
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      Any
                    </button>
                    <button
                      onClick={() => { setFlavorMatchMode('all'); setVisibleCount(30); }}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        flavorMatchMode === 'all' 
                          ? 'bg-amber-500 text-black font-medium' 
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      All
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {topFlavors.map(({ flavor, count }) => {
                    const isSelected = selectedFlavors.includes(flavor)
                    return (
                      <button
                        key={flavor}
                        onClick={() => {
                          setSelectedFlavors(prev => 
                            isSelected 
                              ? prev.filter(f => f !== flavor)
                              : [...prev, flavor]
                          )
                          setVisibleCount(30)
                        }}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-black font-medium shadow-lg shadow-amber-500/25'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                        style={{
                          backgroundColor: isSelected ? (flavorColors[flavor] || '#f59e0b') : undefined,
                          color: isSelected ? '#000' : undefined
                        }}
                      >
                        {flavor} <span className="opacity-60">({count})</span>
                      </button>
                    )
                  })}
                  
                  {!showAllFlavors && moreFlavors.length > 0 && (
                    <button
                      onClick={() => setShowAllFlavors(true)}
                      className="px-3 py-1.5 rounded-full text-sm bg-slate-700/50 text-slate-400 hover:bg-slate-600 hover:text-slate-300 transition-colors"
                    >
                      +{moreFlavors.length} more...
                    </button>
                  )}
                </div>
                
                {showAllFlavors && (
                  <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-slate-700/50">
                    {moreFlavors.map(({ flavor, count }) => {
                      const isSelected = selectedFlavors.includes(flavor)
                      return (
                        <button
                          key={flavor}
                          onClick={() => {
                            setSelectedFlavors(prev => 
                              isSelected 
                                ? prev.filter(f => f !== flavor)
                                : [...prev, flavor]
                            )
                            setVisibleCount(30)
                          }}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                            isSelected
                              ? 'bg-amber-500 text-black font-medium shadow-lg shadow-amber-500/25'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                          style={{
                            backgroundColor: isSelected ? (flavorColors[flavor] || '#f59e0b') : undefined,
                            color: isSelected ? '#000' : undefined
                          }}
                        >
                          {flavor} <span className="opacity-60">({count})</span>
                        </button>
                      )
                    })}
                    <button
                      onClick={() => setShowAllFlavors(false)}
                      className="px-3 py-1.5 rounded-full text-sm bg-slate-700/50 text-slate-400 hover:bg-slate-600 hover:text-slate-300 transition-colors"
                    >
                      Show less
                    </button>
                  </div>
                )}
                
                {selectedFlavors.length > 0 && (
                  <button
                    onClick={() => { setSelectedFlavors([]); setVisibleCount(30); }}
                    className="mt-3 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Clear flavor filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Stats Row - Glass Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className={`backdrop-blur-md rounded-xl border p-4 shadow-lg transition-colors ${theme === 'dark' ? 'bg-slate-800/40 border-amber-500/20 shadow-amber-900/10 hover:border-amber-500/40' : 'bg-white/70 border-amber-200 shadow-amber-100 hover:border-amber-400'}`}>
            <div className="text-2xl font-bold text-amber-500">{filteredData.length.toLocaleString()}</div>
            <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Bourbons Found</div>
          </div>
          <div className={`backdrop-blur-md rounded-xl border p-4 shadow-lg transition-colors ${theme === 'dark' ? 'bg-slate-800/40 border-amber-500/20 shadow-amber-900/10 hover:border-amber-500/40' : 'bg-white/70 border-amber-200 shadow-amber-100 hover:border-amber-400'}`}>
            <div className="text-2xl font-bold text-green-500">
              {filteredData.length > 0 ? (filteredData.reduce((a, b) => a + b.rating, 0) / filteredData.length).toFixed(1) : 0}
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Avg Rating</div>
          </div>
          <div className={`backdrop-blur-md rounded-xl border p-4 shadow-lg transition-colors ${theme === 'dark' ? 'bg-slate-800/40 border-amber-500/20 shadow-amber-900/10 hover:border-amber-500/40' : 'bg-white/70 border-amber-200 shadow-amber-100 hover:border-amber-400'}`}>
            <div className="text-2xl font-bold text-emerald-500">
              ${filteredData.length > 0 ? (filteredData.reduce((a, b) => a + b.price, 0) / filteredData.length).toFixed(0) : 0}
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Avg Price</div>
          </div>
          <div className={`backdrop-blur-md rounded-xl border p-4 shadow-lg transition-colors ${theme === 'dark' ? 'bg-slate-800/40 border-amber-500/20 shadow-amber-900/10 hover:border-amber-500/40' : 'bg-white/70 border-amber-200 shadow-amber-100 hover:border-amber-400'}`}>
            <div className="text-2xl font-bold text-orange-500">
              {filteredData.length > 0 ? (filteredData.reduce((a, b) => a + b.abv, 0) / filteredData.length).toFixed(1) : 0}%
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Avg ABV</div>
          </div>
        </div>

        {/* Charts Section - Glass Panels */}
        {/* Large Scatter Plot - Full Width */}
        <div className={`backdrop-blur-md rounded-xl border p-6 shadow-xl mb-6 ${theme === 'dark' ? 'bg-slate-800/40 border-amber-500/20 shadow-amber-900/10' : 'bg-white/70 border-amber-200 shadow-amber-100'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Price vs Rating ({chartData.length.toLocaleString()} bourbons)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis 
                type="number" 
                dataKey="price" 
                name="Price" 
                unit="$"
                stroke={theme === 'dark' ? '#9ca3af' : '#64748b'}
                tickFormatter={(v) => `${v}`}
                label={{ value: 'Price ($)', position: 'bottom', offset: 0, fill: theme === 'dark' ? '#9ca3af' : '#64748b' }}
              />
              <YAxis 
                type="number" 
                dataKey="rating" 
                name="Rating"
                stroke={theme === 'dark' ? '#9ca3af' : '#64748b'}
                domain={[76, 98]}
                label={{ value: 'Rating', angle: -90, position: 'insideLeft', fill: theme === 'dark' ? '#9ca3af' : '#64748b' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter 
                name="Bourbons" 
                data={chartData} 
                fill="#f59e0b"
                onClick={(data) => {
                  const bourbon = filteredData.find(b => b.name === data.fullName || b.name.startsWith(data.name.replace('...', '')))
                  if (bourbon) setSelectedBourbon(bourbon)
                }}
                cursor="pointer"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Three Medium Charts Row */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Rating Distribution */}
          <div className={`backdrop-blur-md rounded-xl border p-6 shadow-xl ${theme === 'dark' ? 'bg-slate-800/40 border-amber-500/20 shadow-amber-900/10' : 'bg-white/70 border-amber-200 shadow-amber-100'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Rating Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ratingDistribution} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="range" stroke={theme === 'dark' ? '#9ca3af' : '#64748b'} tick={{ fontSize: 11 }} />
                <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#64748b'} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Bar dataKey="count" name="Count">
                  {ratingDistribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? '#22c55e' : index === 1 ? '#84cc16' : index === 2 ? '#eab308' : index === 3 ? '#f97316' : '#ef4444'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Distilleries */}
          <div className={`backdrop-blur-md rounded-xl border p-6 shadow-xl ${theme === 'dark' ? 'bg-slate-800/40 border-amber-500/20 shadow-amber-900/10' : 'bg-white/70 border-amber-200 shadow-amber-100'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Top Distilleries</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topDistilleries} layout="vertical" margin={{ top: 10, right: 10, bottom: 10, left: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                <XAxis type="number" stroke={theme === 'dark' ? '#9ca3af' : '#64748b'} />
                <YAxis type="category" dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#64748b'} tick={{ fontSize: 10 }} width={75} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Bar dataKey="count" name="Bourbons" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Price Distribution */}
          <div className={`backdrop-blur-md rounded-xl border p-6 shadow-xl ${theme === 'dark' ? 'bg-slate-800/40 border-amber-500/20 shadow-amber-900/10' : 'bg-white/70 border-amber-200 shadow-amber-100'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Price Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={priceDistribution} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="range" stroke={theme === 'dark' ? '#9ca3af' : '#64748b'} tick={{ fontSize: 10 }} />
                <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#64748b'} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Bar dataKey="count" name="Bourbons" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bourbon Display - Cards or List */}
        {viewMode === 'cards' ? (
          /* Card Grid View */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleData.map((bourbon, i) => (
              <div
                key={i}
                onClick={() => setSelectedBourbon(bourbon)}
                className={`backdrop-blur-md rounded-xl border p-5 cursor-pointer transition-all hover:shadow-xl group ${theme === 'dark' ? 'bg-slate-800/40 border-amber-500/20 hover:border-amber-500/60 hover:shadow-amber-500/20 hover:bg-slate-800/60' : 'bg-white/70 border-amber-200 hover:border-amber-400 hover:shadow-amber-200/50 hover:bg-white/90'}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`font-semibold text-lg leading-tight pr-2 transition-colors ${theme === 'dark' ? 'group-hover:text-amber-100' : 'text-slate-800 group-hover:text-amber-700'}`}>{bourbon.name}</h3>
                  <div 
                    className="flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: `${getRatingColor(bourbon.rating)}20`, color: getRatingColor(bourbon.rating) }}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    {bourbon.rating}
                  </div>
                </div>

                <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-amber-400/80' : 'text-amber-600'}`}>{bourbon.distillery}</p>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-emerald-500 font-semibold">
                      <DollarSign className="w-4 h-4" />
                      {bourbon.price}
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Price</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-orange-500 font-semibold">
                      <Droplets className="w-4 h-4" />
                      {bourbon.abv}%
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>ABV</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-500 font-semibold">{getValueScore(bourbon)}</div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Value</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {bourbon.flavorProfile.split(', ').slice(0, 4).map((flavor, j) => {
                    const flavorKey = flavor.toLowerCase().trim()
                    const darkColor = flavorColors[flavorKey] || '#64748b'
                    const lightColor = flavorColorsLight[flavorKey] || '#475569'
                    return (
                      <span
                        key={j}
                        className={`px-2 py-0.5 text-xs rounded-full font-medium ${theme === 'light' ? 'border' : ''}`}
                        style={{ 
                          backgroundColor: theme === 'dark' ? `${darkColor}30` : `${darkColor}15`,
                          color: theme === 'dark' ? darkColor : lightColor,
                          borderColor: theme === 'light' ? `${darkColor}40` : 'transparent'
                        }}
                      >
                        {flavor}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className={`backdrop-blur-md rounded-xl border overflow-hidden ${theme === 'dark' ? 'bg-slate-800/40 border-amber-500/20' : 'bg-white/70 border-amber-200'}`}>
            {/* List Header */}
            <div className={`grid grid-cols-12 gap-4 px-4 py-3 text-xs font-semibold uppercase tracking-wider border-b ${theme === 'dark' ? 'bg-slate-800/60 border-slate-700 text-slate-400' : 'bg-amber-50 border-amber-200 text-slate-500'}`}>
              <div className="col-span-5 sm:col-span-4">Name</div>
              <div className="col-span-3 sm:col-span-2 text-center">Rating</div>
              <div className="col-span-2 text-center hidden sm:block">Price</div>
              <div className="col-span-2 text-center hidden sm:block">ABV</div>
              <div className="col-span-4 sm:col-span-2 text-center">Value</div>
            </div>
            
            {/* List Items */}
            {visibleData.map((bourbon, i) => (
              <div
                key={i}
                onClick={() => setSelectedBourbon(bourbon)}
                className={`grid grid-cols-12 gap-4 px-4 py-3 cursor-pointer transition-all border-b last:border-b-0 ${theme === 'dark' ? 'border-slate-700/50 hover:bg-slate-700/50' : 'border-amber-100 hover:bg-amber-50'}`}
              >
                {/* Name & Distillery */}
                <div className="col-span-5 sm:col-span-4">
                  <div className={`font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{bourbon.name}</div>
                  <div className={`text-xs truncate ${theme === 'dark' ? 'text-amber-400/70' : 'text-amber-600'}`}>{bourbon.distillery}</div>
                </div>
                
                {/* Rating */}
                <div className="col-span-3 sm:col-span-2 flex items-center justify-center">
                  <div 
                    className="flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold"
                    style={{ backgroundColor: `${getRatingColor(bourbon.rating)}20`, color: getRatingColor(bourbon.rating) }}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    {bourbon.rating}
                  </div>
                </div>
                
                {/* Price */}
                <div className="col-span-2 items-center justify-center text-emerald-500 font-semibold hidden sm:flex">
                  ${bourbon.price}
                </div>
                
                {/* ABV */}
                <div className="col-span-2 items-center justify-center text-orange-500 font-semibold hidden sm:flex">
                  {bourbon.abv}%
                </div>
                
                {/* Value */}
                <div className="col-span-4 sm:col-span-2 flex items-center justify-center text-purple-500 font-semibold">
                  {getValueScore(bourbon)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {visibleCount < filteredData.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-lg transition-colors"
            >
              Load More ({filteredData.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No bourbons match your filters</p>
            <button
              onClick={() => {
                setFilters({ minPrice: 0, maxPrice: 500, minAbv: 40, maxAbv: 75, minRating: 76, distillery: 'all' })
                setSearchTerm('')
                setVisibleCount(30)
              }}
              className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Detail Modal - Enhanced Glass Effect */}
        {selectedBourbon && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedBourbon(null)}>
            <div 
              className={`backdrop-blur-xl rounded-2xl border p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl ${theme === 'dark' ? 'bg-slate-900/90 border-amber-500/30 shadow-amber-900/30' : 'bg-white/95 border-amber-300 shadow-amber-200/50'}`}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className={`text-xl font-bold pr-4 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{selectedBourbon.name}</h2>
                <button onClick={() => setSelectedBourbon(null)} className={`${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className={`mb-4 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>{selectedBourbon.distillery}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`backdrop-blur-sm rounded-lg p-4 text-center border ${theme === 'dark' ? 'bg-slate-800/60 border-slate-600/30' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="text-3xl font-bold" style={{ color: getRatingColor(selectedBourbon.rating) }}>
                    {selectedBourbon.rating}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Rating</div>
                </div>
                <div className={`backdrop-blur-sm rounded-lg p-4 text-center border ${theme === 'dark' ? 'bg-slate-800/60 border-slate-600/30' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="text-3xl font-bold text-emerald-500">${selectedBourbon.price}</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Price</div>
                </div>
                <div className={`backdrop-blur-sm rounded-lg p-4 text-center border ${theme === 'dark' ? 'bg-slate-800/60 border-slate-600/30' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="text-3xl font-bold text-orange-500">{selectedBourbon.abv}%</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>ABV</div>
                </div>
                <div className={`backdrop-blur-sm rounded-lg p-4 text-center border ${theme === 'dark' ? 'bg-slate-800/60 border-slate-600/30' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="text-3xl font-bold text-purple-500">{getValueScore(selectedBourbon)}</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Value Score</div>
                </div>
              </div>

              {selectedBourbon.aging && (
                <div className="mb-4">
                  <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Age: </span>
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{selectedBourbon.aging} years</span>
                </div>
              )}

              <div className="mb-4">
                <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Mash Bill: </span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{selectedBourbon.mashBill}</span>
              </div>

              <div className="mb-4">
                <span className={`block mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Flavor Profile:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedBourbon.flavorProfile.split(', ').map((flavor, j) => {
                    const flavorKey = flavor.toLowerCase().trim()
                    const darkColor = flavorColors[flavorKey] || '#64748b'
                    const lightColor = flavorColorsLight[flavorKey] || '#475569'
                    return (
                      <span
                        key={j}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${theme === 'light' ? 'border' : ''}`}
                        style={{ 
                          backgroundColor: theme === 'dark' ? `${darkColor}30` : `${darkColor}15`,
                          color: theme === 'dark' ? darkColor : lightColor,
                          borderColor: theme === 'light' ? `${darkColor}40` : 'transparent'
                        }}
                      >
                        {flavor}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Note - Glass Effect */}
        <div className="mt-16 p-6 backdrop-blur-md bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl border border-amber-500/30 shadow-xl shadow-amber-900/20">
          <h3 className="text-lg font-semibold mb-2">About This Project</h3>
          <p className="text-slate-400 text-sm mb-4">
            This is a React rebuild of my original R Shiny bourbon exploration app. The dataset includes 
            {bourbonData.length.toLocaleString()} bourbons with data enriched using GPT-4 for missing flavor profiles and mash bill estimates.
            All AI-enhanced data was manually reviewed and verified.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="https://cred1747.shinyapps.io/bourbon_project/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <ExternalLink className="w-4 h-4" />
              Original Shiny App
            </a>
            <a
              href="https://github.com/Cred1747/bourbonExplorer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
