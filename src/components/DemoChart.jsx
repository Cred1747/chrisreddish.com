import { useState } from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

// Sample data mimicking municipal analytics
const paymentData = [
  { month: 'Jan', onTime: 78, late: 15, delinquent: 7 },
  { month: 'Feb', onTime: 80, late: 14, delinquent: 6 },
  { month: 'Mar', onTime: 82, late: 12, delinquent: 6 },
  { month: 'Apr', onTime: 79, late: 14, delinquent: 7 },
  { month: 'May', onTime: 85, late: 10, delinquent: 5 },
  { month: 'Jun', onTime: 88, late: 8, delinquent: 4 },
]

const discountImpact = [
  { week: 'W1', control: 62, treatment: 64 },
  { week: 'W2', control: 63, treatment: 68 },
  { week: 'W3', control: 61, treatment: 71 },
  { week: 'W4', control: 64, treatment: 75 },
  { week: 'W5', control: 62, treatment: 78 },
  { week: 'W6', control: 65, treatment: 82 },
]

const citationsByType = [
  { type: 'Street Cleaning', count: 4520 },
  { type: 'Expired Meter', count: 3890 },
  { type: 'No Parking Zone', count: 2340 },
  { type: 'Double Parked', count: 1560 },
  { type: 'Overtime', count: 980 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
        <p className="text-slate-300 text-sm font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function DemoChart() {
  const [activeChart, setActiveChart] = useState('payment')

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-300">Live Demo</h3>
        <div className="flex gap-1">
          {['payment', 'rct', 'citations'].map(chart => (
            <button
              key={chart}
              onClick={() => setActiveChart(chart)}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeChart === chart
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {chart === 'payment' ? 'Payments' : chart === 'rct' ? 'RCT' : 'Citations'}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        {activeChart === 'payment' && (
          <>
            <p className="text-xs text-slate-500 mb-2">Utility Payment Behavior Trends</p>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={paymentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="onTime"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="On Time"
                />
                <Area
                  type="monotone"
                  dataKey="late"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.6}
                  name="Late"
                />
                <Area
                  type="monotone"
                  dataKey="delinquent"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                  name="Delinquent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}

        {activeChart === 'rct' && (
          <>
            <p className="text-xs text-slate-500 mb-2">Smart Discount RCT: Control vs Treatment</p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={discountImpact}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[55, 90]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="control"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  dot={{ fill: '#94a3b8' }}
                  name="Control"
                />
                <Line
                  type="monotone"
                  dataKey="treatment"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                  name="Treatment"
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}

        {activeChart === 'citations' && (
          <>
            <p className="text-xs text-slate-500 mb-2">Parking Citations by Violation Type</p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={citationsByType} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis dataKey="type" type="category" stroke="#94a3b8" fontSize={11} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Citations" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </div>

      <p className="text-xs text-slate-500 mt-4 text-center">
        Sample visualization — see live demos in Projects
      </p>
    </div>
  )
}
