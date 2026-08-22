import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, ComposedChart, Area, ReferenceLine, ScatterChart, Scatter, ZAxis
} from "recharts";

const PALETTES = {
  dark: {
    bg: "#080c14", card: "#0d1320", surface: "#151d2e",
    border: "#1e2d45", text: "#dfe6f0", muted: "#7c8db5", dim: "#4a5e82",
    water: "#06b6d4", electric: "#f59e0b", ai: "#a78bfa", green: "#10b981", red: "#ef4444",
    tip: "rgba(8,12,20,0.95)",
  },
  light: {
    bg: "#f6f8fb", card: "#ffffff", surface: "#eef2f7",
    border: "#d8e0ea", text: "#1a2433", muted: "#5b6b82", dim: "#8494ab",
    water: "#0891b2", electric: "#b45309", ai: "#6d28d9", green: "#047857", red: "#b91c1c",
    tip: "rgba(255,255,255,0.98)",
  },
};
let C = PALETTES.dark;

const nationalReliability = [
  { year: 2014, saidiMED: 236.2, saifiMED: 1.257, saidi: 114.2, saifi: 1.038 },
  { year: 2015, saidiMED: 209, saifiMED: 1.275, saidi: 117, saifi: 1.073 },
  { year: 2016, saidiMED: 268.4, saifiMED: 1.327, saidi: 119.8, saifi: 1.082 },
  { year: 2017, saidiMED: 505.9, saifiMED: 1.42, saidi: 117, saifi: 1.023 },
  { year: 2018, saidiMED: 349.2, saifiMED: 1.34, saidi: 121.4, saifi: 1.051 },
  { year: 2019, saidiMED: 295.5, saifiMED: 1.332, saidi: 122.2, saifi: 1.04 },
  { year: 2020, saidiMED: 456.1, saifiMED: 1.385, saidi: 116, saifi: 1.013 },
  { year: 2021, saidiMED: 475.8, saifiMED: 1.436, saidi: 125.7, saifi: 1.039 },
  { year: 2022, saidiMED: 333, saifiMED: 1.426, saidi: 131.1, saifi: 1.09 },
  { year: 2023, saidiMED: 366.6, saifiMED: 1.348, saidi: 123.9, saifi: 1.022 },
  { year: 2024, saidiMED: 662.6, saifiMED: 1.531, saidi: 131.6, saifi: 1.065 },
];

const stateReliability = [
  { st: "FL", name: "Florida", sM: 1321.5, s: 66.4, fM: 1.77, f: 0.762 },
  { st: "GA", name: "Georgia", sM: 1229.1, s: 212.3, fM: 2.122, f: 1.264 },
  { st: "TX", name: "Texas", sM: 1270.6, s: 129.4, fM: 2.114, f: 1.218 },
  { st: "CA", name: "California", sM: 279.6, s: 169.6, fM: 1.345, f: 1.121 },
  { st: "NY", name: "New York", sM: 219.9, s: 72, fM: 0.91, f: 0.611 },
  { st: "NC", name: "N. Carolina", sM: 1441, s: 141.4, fM: 1.812, f: 1.172 },
  { st: "OH", name: "Ohio", sM: 510.5, s: 133.2, fM: 1.298, f: 0.999 },
  { st: "IL", name: "Illinois", sM: 156.9, s: 59.4, fM: 0.852, f: 0.644 },
  { st: "PA", name: "Penn.", sM: 336.1, s: 131, fM: 1.353, f: 0.971 },
  { st: "OR", name: "Oregon", sM: 564.3, s: 152.4, fM: 1.668, f: 1.078 },
  { st: "AZ", name: "Arizona", sM: 87.5, s: 72, fM: 0.988, f: 0.898 },
  { st: "SC", name: "S. Carolina", sM: 3136.5, s: 117.8, fM: 2.365, f: 1.207 },
];

const waterRates = [
  { city: "San Francisco", water: 122.94, sewer: 58.2, combined: 181.14, region: "West", mhi: 126187 },
  { city: "Seattle", water: 63.45, sewer: 170.4, combined: 233.85, region: "West", mhi: 110781 },
  { city: "Atlanta", water: 72.8, sewer: 98.5, combined: 171.3, region: "South", mhi: 69698 },
  { city: "Cleveland", water: 47.6, sewer: 95.2, combined: 142.8, region: "Midwest", mhi: 33272 },
  { city: "Phoenix", water: 21.76, sewer: 42.1, combined: 63.86, region: "West", mhi: 60931 },
  { city: "San Antonio", water: 19.51, sewer: 38.9, combined: 58.41, region: "South", mhi: 56774 },
  { city: "Chicago", water: 34.5, sewer: 48.7, combined: 83.2, region: "Midwest", mhi: 65781 },
  { city: "Tampa", water: 42.3, sewer: 62.1, combined: 104.4, region: "South", mhi: 58890 },
  { city: "Portland", water: 52.8, sewer: 85.3, combined: 138.1, region: "West", mhi: 78442 },
  { city: "Birmingham", water: 53.1, sewer: 108.7, combined: 161.8, region: "South", mhi: 37220 },
  { city: "Detroit", water: 44.2, sewer: 72.6, combined: 116.8, region: "Midwest", mhi: 34762 },
  { city: "Denver", water: 35.7, sewer: 44.8, combined: 80.5, region: "West", mhi: 85853 },
].map(d => ({ ...d, burden: +((d.combined * 12 / d.mhi) * 100).toFixed(2) }));

const rateTrends = [
  { year: 2017, avgWater: 36.68, avgSewer: 42.71, combined: 79.39 },
  { year: 2019, avgWater: 40.09, avgSewer: 47.17, combined: 87.26 },
  { year: 2021, avgWater: 42.42, avgSewer: 49.53, combined: 91.95 },
  { year: 2023, avgWater: 44.77, avgSewer: 50.17, combined: 94.94 },
  { year: 2024, avgWater: 46.83, avgSewer: 52.48, combined: 99.31 },
];

const affordabilityByIncome = [
  { bracket: "<$15k", pctIncome: 9.8, hoursMinWage: 19.2 },
  { bracket: "$15-25k", pctIncome: 5.7, hoursMinWage: 11.1 },
  { bracket: "$25-35k", pctIncome: 3.9, hoursMinWage: 7.6 },
  { bracket: "$35-50k", pctIncome: 2.6, hoursMinWage: 5.1 },
  { bracket: "$50-75k", pctIncome: 1.7, hoursMinWage: 3.3 },
  { bracket: "$75k+", pctIncome: 0.8, hoursMinWage: 1.6 },
];

const GQ = [
  { id: "national_saidi_trend", intent: ["national SAIDI trend","SAIDI over time","reliability trend","how has SAIDI changed","national reliability"], desc: "National SAIDI trend 2014-2024", src: "EIA Form 861, Table 11.1", q: () => nationalReliability.map(d => `${d.year}: SAIDI=${d.saidi} (excl MED), ${d.saidiMED} (incl MED)`).join("\n") },
  { id: "state_comparison", intent: ["state comparison","compare states","which state","best reliability","worst reliability","state SAIDI","Florida"], desc: "State-level SAIDI/SAIFI 2024", src: "EIA Form 861, Table 11.3", q: () => stateReliability.map(d => `${d.name}: SAIDI=${d.s} (excl MED), ${d.sM} (incl MED)`).join("\n") },
  { id: "water_rates_city", intent: ["water rate","water bill","water cost","water price","cheapest water","expensive water","city water","sewer"], desc: "Water+sewer bills 12 US cities", src: "Bluefield Research 2024", q: () => waterRates.map(d => `${d.city}: Combined=$${d.combined}/mo, Burden=${d.burden}%`).join("\n") },
  { id: "affordability_income", intent: ["affordability","burden","income","low income","afford","percentage income","hours work","minimum wage"], desc: "Water burden by income", src: "Duke Nicholas / AWWA / EPA", q: () => affordabilityByIncome.map(d => `${d.bracket}: ${d.pctIncome}% of income, ${d.hoursMinWage} hrs labor/mo`).join("\n") },
  { id: "rate_trends", intent: ["rate trend","price increase","bills going up","rate change","cost over time"], desc: "Rate trends 2017-2024", src: "Bluefield / AWWA 2023", q: () => rateTrends.map(d => `${d.year}: Combined=$${d.combined}/mo`).join("\n") },
  { id: "med_explanation", intent: ["MED","major event day","hurricane","storm","weather impact","resilience","normalize"], desc: "MED methodology", src: "IEEE 1366-2022", q: () => "2024 national: with MED=662.6, without=131.6 (5x). Florida: with=1321.5, without=66.4 (20x, Helene+Milton)." },
  { id: "epa_threshold", intent: ["EPA threshold","4.5%","unaffordable","affordability threshold"], desc: "EPA affordability threshold", src: "EPA", q: () => "EPA guideline: combined water+sewer ≤4.5% of MHI. Cities exceeding: Birmingham 5.21%, Cleveland 5.15%." },
];

function matchGQ(input) {
  const l = input.toLowerCase(); let best = null, score = 0;
  for (const g of GQ) { let s = 0; for (const i of g.intent) { for (const w of i.split(" ")) if (l.includes(w) && w.length > 2) s++; if (l.includes(i.toLowerCase())) s += 3; } if (s > score) { score = s; best = g; } }
  return score >= 2 ? best : null;
}

const Stat = ({ label, value, unit, sub, color = C.text }) => (<div style={{ padding: "14px 18px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }}><div style={{ fontSize: 10, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div><div style={{ marginTop: 4, display: "flex", alignItems: "baseline", gap: 4 }}><span style={{ fontSize: 26, fontWeight: 800, color, fontFamily: "monospace" }}>{value}</span>{unit && <span style={{ fontSize: 11, color: C.muted }}>{unit}</span>}</div>{sub && <div style={{ marginTop: 3, fontSize: 11, color: C.muted }}>{sub}</div>}</div>);
const Chip = ({ children, active, color, onClick }) => (<button onClick={onClick} style={{ padding: "5px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${active ? color : C.border}`, background: active ? `${color}18` : "transparent", color: active ? color : C.muted }}>{children}</button>);
const TT = ({ active, payload, label }) => { if (!active || !payload?.length) return null; return (<div style={{ background: C.tip, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px" }}><div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 6, fontFamily: "monospace" }}>{label}</div>{payload.map((p, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} /><span style={{ fontSize: 11, color: C.muted }}>{p.name}:</span><span style={{ fontSize: 11, fontWeight: 700, color: C.text, fontFamily: "monospace" }}>{typeof p.value === "number" ? p.value.toLocaleString(undefined, { maximumFractionDigits: 1 }) : p.value}</span></div>))}</div>); };
const Ch = ({ title, sub, children, h = 280 }) => (<div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 20px" }}>{title && <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{title}</div>}{sub && <div style={{ fontSize: 11, color: C.dim, marginBottom: 14 }}>{sub}</div>}<ResponsiveContainer width="100%" height={h}>{children}</ResponsiveContainer></div>);

const Bot = () => {
  const [msgs, setMsgs] = useState([{ role: "assistant", content: "I'm an AI assistant with access to real utility data via a Semantic Query Layer.\n\nDatasets: EIA Form 861, Bluefield/AWWA rates, EPA/Duke affordability\n\nTry: \"How has national SAIDI changed?\" or \"Which cities have expensive water?\"", gq: null }]);
  const [input, setInput] = useState(""); const [loading, setLoading] = useState(false); const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  const send = useCallback(async () => {
    if (!input.trim() || loading) return; const msg = input.trim(); setInput(""); setMsgs(p => [...p, { role: "user", content: msg }]); setLoading(true);
    const gq = matchGQ(msg);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: `You are an AI analytics assistant embedded in a Municipal Utility Analytics Dashboard built by Chris Reddish. ${gq ? `SEMANTIC QUERY MATCHED: "${gq.desc}"\nSOURCE: ${gq.src}\nDATA:\n${gq.q()}\n\nUse this real data to answer the user's question. Cite the source. Be specific with numbers.` : "No semantic query matched. Answer from general knowledge about utility metrics (SAIDI, SAIFI, CAIDI, water affordability, IEEE 1366, EPA guidelines). Note you're answering from general knowledge."} Keep responses concise (2-5 sentences). Use specific numbers when available. Be professional.`,
          messages: [{ role: "user", content: msg }]
        })
      });
      const d = await r.json();
      let text = "No response received.";
      if (d.content && Array.isArray(d.content)) {
        text = d.content.filter(b => b.type === "text").map(b => b.text).join("\n") || "Empty response.";
      } else if (d.error) {
        text = `Error: ${typeof d.error === 'string' ? d.error : JSON.stringify(d.error)}`;
      }
      setMsgs(p => [...p, { role: "assistant", content: text, gq }]);
    } catch (err) {
      setMsgs(p => [...p, { role: "assistant", content: `Connection error: ${err.message}`, gq }]);
    }
    setLoading(false);
  }, [input, loading]);

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column", height: 520 }}>
      <div style={{ padding: "12px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: C.ai, boxShadow: `0 0 8px ${C.ai}` }} /><span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>AI Analytics Assistant</span><span style={{ fontSize: 10, color: C.dim, marginLeft: "auto", fontFamily: "monospace" }}>Semantic Query Layer + Claude API</span></div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => (<div key={i}><div style={{ maxWidth: "85%", padding: "10px 14px", borderRadius: 8, background: m.role === "user" ? `${C.ai}18` : C.surface, border: `1px solid ${m.role === "user" ? `${C.ai}33` : C.border}`, marginLeft: m.role === "user" ? "auto" : 0 }}><div style={{ fontSize: 10, fontWeight: 700, color: m.role === "user" ? C.ai : C.dim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{m.role === "user" ? "You" : "Assistant"}</div><div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{m.content}</div></div>{m.gq && <div style={{ marginTop: 4, marginLeft: 8, padding: "3px 8px", borderRadius: 4, background: `${C.green}10`, border: `1px solid ${C.green}20`, display: "inline-flex", alignItems: "center", gap: 5 }}><div style={{ width: 5, height: 5, borderRadius: "50%", background: C.green }} /><span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>{m.gq.id}</span><span style={{ fontSize: 9, color: C.dim }}>• {m.gq.src}</span></div>}</div>))}
        {loading && <div style={{ padding: "10px", background: C.surface, borderRadius: 8, display: "inline-block" }}><span style={{ color: C.ai, fontSize: 12 }}>Thinking...</span></div>}
        <div ref={endRef} />
      </div>
      <div style={{ padding: "10px 14px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask about utility metrics..." style={{ flex: 1, padding: "9px 12px", borderRadius: 6, fontSize: 13, border: `1px solid ${C.border}`, background: C.surface, color: C.text, outline: "none", fontFamily: "inherit" }} />
        <button onClick={send} disabled={loading || !input.trim()} style={{ padding: "9px 18px", borderRadius: 6, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", background: `linear-gradient(135deg, ${C.ai}, #7c3aed)`, color: "#fff", opacity: loading || !input.trim() ? .5 : 1 }}>Send</button>
      </div>
    </div>
  );
};

const TABS = [
  { id: "water", label: "Water Rates", icon: "💧", color: "water" },
  { id: "electric", label: "Electric Reliability", icon: "⚡", color: "electric" },
  { id: "ai", label: "AI Agent", icon: "🤖", color: "ai" },
  { id: "stack", label: "Methods", icon: "◈", color: "green" },
];

export default function UtilityDashboard() {
  const { theme } = useTheme();
  C = PALETTES[theme] || PALETTES.dark;
  const [tab, setTab] = useState("water");
  const [med, setMed] = useState(false);
  const [fade, setFade] = useState(true);
  useEffect(() => { setFade(false); const t = setTimeout(() => setFade(true), 30); return () => clearTimeout(t); }, [tab]);

  const Water = () => (<div style={{ display: "flex", flexDirection: "column", gap: 18 }}><div><h2 style={{ fontSize: 18, fontWeight: 800, color: C.water, margin: "0 0 4px" }}>💧 Water Rates & Affordability</h2><p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Bluefield 2024 • Teodoro AWWA 2023 • Duke Nicholas • EPA</p></div><div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}><Stat label="Nat'l Avg" value="$99" unit="/mo" sub="Water+Sewer 2024" color={C.water} /><Stat label="5yr Increase" value="24.1" unit="%" sub="2019–2024" color={C.electric} /><Stat label="EPA Threshold" value="4.5" unit="% MHI" color={C.green} /><Stat label="Water Only" value="$44.77" unit="/mo" sub="6,200 gal (AWWA)" color={C.muted} /></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}><Ch title="Combined Bills by City (2024)" sub="Bluefield Research" h={340}><BarChart data={[...waterRates].sort((a,b) => b.combined - a.combined)} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke={C.border} /><XAxis type="number" stroke={C.dim} fontSize={10} unit="$" /><YAxis dataKey="city" type="category" stroke={C.dim} fontSize={10} width={90} /><Tooltip content={({active,payload}) => { if(!active||!payload?.length) return null; const d=payload[0].payload; return <div style={{background: C.tip,border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 14px"}}><div style={{fontSize:13,fontWeight:700,color:C.water}}>{d.city}</div><div style={{fontSize:11,color:C.muted}}>Water: ${d.water} • Sewer: ${d.sewer}</div><div style={{fontSize:11,color:d.burden>4.5?C.red:C.green,fontWeight:700}}>Burden: {d.burden}% MHI</div></div>}} /><Bar dataKey="water" stackId="a" fill={C.water} name="Water" barSize={16} /><Bar dataKey="sewer" stackId="a" fill={`${C.water}66`} name="Sewer" radius={[0,4,4,0]} barSize={16} /><Legend wrapperStyle={{fontSize:11}} /></BarChart></Ch><Ch title="Affordability by Income" sub="Duke Nicholas / AWWA / EPA" h={340}><ComposedChart data={affordabilityByIncome}><CartesianGrid strokeDasharray="3 3" stroke={C.border} /><XAxis dataKey="bracket" stroke={C.dim} fontSize={10} /><YAxis yAxisId="l" stroke={C.dim} fontSize={10} unit="%" /><YAxis yAxisId="r" orientation="right" stroke={C.dim} fontSize={10} unit="hrs" /><Tooltip content={<TT />} /><Bar yAxisId="l" dataKey="pctIncome" name="% Income" radius={[4,4,0,0]} barSize={28}>{affordabilityByIncome.map((d,i) => <Cell key={i} fill={d.pctIncome>4.5?C.red:d.pctIncome>2.5?C.electric:C.water} />)}</Bar><Line yAxisId="r" type="monotone" dataKey="hoursMinWage" stroke={C.ai} strokeWidth={2.5} dot={{r:4,fill:C.ai}} name="Hrs Labor/Mo" /><ReferenceLine yAxisId="l" y={4.5} stroke={C.red} strokeDasharray="6 3" label={{value:"EPA 4.5%",fill:C.red,fontSize:10}} /><Legend wrapperStyle={{fontSize:11}} /></ComposedChart></Ch></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}><Ch title="Rate Trends (2017–2024)" sub="Bluefield / Teodoro AWWA" h={250}><ComposedChart data={rateTrends}><CartesianGrid strokeDasharray="3 3" stroke={C.border} /><XAxis dataKey="year" stroke={C.dim} fontSize={11} /><YAxis stroke={C.dim} fontSize={10} unit="$" /><Tooltip content={<TT />} /><Area type="monotone" dataKey="combined" fill={`${C.water}10`} stroke="transparent" /><Line type="monotone" dataKey="combined" stroke={C.water} strokeWidth={3} dot={{r:5,fill:C.water,strokeWidth:2,stroke:C.bg}} name="Combined" /><Line type="monotone" dataKey="avgWater" stroke={C.green} strokeWidth={2} dot={{r:3}} name="Water" /><Line type="monotone" dataKey="avgSewer" stroke={C.ai} strokeWidth={2} dot={{r:3}} name="Sewer" /><Legend wrapperStyle={{fontSize:11}} /></ComposedChart></Ch><Ch title="Burden vs. Income" sub="Cities above EPA 4.5%" h={250}><ScatterChart><CartesianGrid strokeDasharray="3 3" stroke={C.border} /><XAxis dataKey="mhi" stroke={C.dim} fontSize={10} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`} /><YAxis dataKey="burden" stroke={C.dim} fontSize={10} unit="%" /><ZAxis dataKey="combined" range={[50,250]} /><Tooltip content={({active,payload}) => { if(!active||!payload?.length) return null; const d=payload[0].payload; return <div style={{background: C.tip,border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 14px"}}><div style={{fontSize:13,fontWeight:700,color:C.text}}>{d.city}</div><div style={{fontSize:11,color:C.muted}}>MHI: ${d.mhi.toLocaleString()} • ${d.combined}/mo</div><div style={{fontSize:11,fontWeight:700,color:d.burden>4.5?C.red:C.green}}>Burden: {d.burden}%</div></div>}} /><ReferenceLine y={4.5} stroke={C.red} strokeDasharray="5 5" label={{value:"EPA 4.5%",fill:C.red,fontSize:10}} /><Scatter data={waterRates}>{waterRates.map((d,i)=><Cell key={i} fill={d.burden>4.5?C.red:d.burden>3?C.electric:C.water} />)}</Scatter></ScatterChart></Ch></div></div>);

  const Electric = () => (<div style={{ display: "flex", flexDirection: "column", gap: 18 }}><div><h2 style={{ fontSize: 18, fontWeight: 800, color: C.electric, margin: "0 0 4px" }}>⚡ Electric Reliability</h2><p style={{ fontSize: 13, color: C.muted, margin: 0 }}>EIA Form 861 • IEEE 1366 • 968+ utilities</p></div><div style={{ display: "flex", gap: 8 }}><span style={{ fontSize: 12, color: C.dim, fontWeight: 600, lineHeight: "28px" }}>MED:</span><Chip active={!med} color={C.green} onClick={() => setMed(false)}>Excluded</Chip><Chip active={med} color={C.red} onClick={() => setMed(true)}>Included</Chip></div><div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}><Stat label="Nat'l SAIDI" value={med?"662.6":"131.6"} unit="min" sub={med?"Worst since 2017":"Excl MED"} color={med?C.red:C.electric} /><Stat label="SAIFI" value={med?"1.53":"1.07"} unit="/yr" color={C.electric} /><Stat label="FL SAIDI" value={med?"1,322":"66.4"} unit="min" sub={med?"Helene+Milton":"Best SE"} color={med?C.red:C.green} /><Stat label="IL SAIDI" value={med?"156.9":"59.4"} unit="min" sub="Best large state" color={C.green} /></div><Ch title={`U.S. SAIDI — ${med?"All Events":"Excl. MED"} (2014–2024)`} sub="EIA Table 11.1 • IEEE 1366" h={320}><ComposedChart data={nationalReliability}><CartesianGrid strokeDasharray="3 3" stroke={C.border} /><XAxis dataKey="year" stroke={C.dim} fontSize={11} /><YAxis stroke={C.dim} fontSize={11} /><Tooltip content={<TT />} /><Area type="monotone" dataKey={med?"saidiMED":"saidi"} fill={med?`${C.red}08`:`${C.electric}08`} stroke="transparent" /><Line type="monotone" dataKey={med?"saidiMED":"saidi"} stroke={med?C.red:C.electric} strokeWidth={3} dot={{r:5,fill:med?C.red:C.electric,strokeWidth:2,stroke:C.bg}} name={`SAIDI ${med?"(w/ MED)":"(excl MED)"}`} /><Legend wrapperStyle={{fontSize:11}} /></ComposedChart></Ch><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}><Ch title="State SAIDI — 2024" sub={`${med?"Incl":"Excl"} MED • EIA Table 11.3`} h={300}><BarChart data={[...stateReliability].sort((a,b)=>med?b.sM-a.sM:a.s-b.s)}><CartesianGrid strokeDasharray="3 3" stroke={C.border} /><XAxis dataKey="name" stroke={C.dim} fontSize={9} angle={-30} textAnchor="end" height={50} /><YAxis stroke={C.dim} fontSize={10} /><Tooltip content={({active,payload}) => { if(!active||!payload?.length) return null; const d=payload[0].payload; return <div style={{background: C.tip,border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 14px"}}><div style={{fontSize:13,fontWeight:700,color:C.text}}>{d.name}</div><div style={{fontSize:11,color:C.muted}}>SAIDI: {med?d.sM:d.s} • SAIFI: {med?d.fM:d.f}</div></div>}} /><Bar dataKey={med?"sM":"s"} name="SAIDI" radius={[4,4,0,0]} barSize={22}>{[...stateReliability].sort((a,b)=>med?b.sM-a.sM:a.s-b.s).map((d,i)=><Cell key={i} fill={d.st==="FL"?C.water:`hsl(${30+i*10},55%,${48+i*2}%)`} />)}</Bar><ReferenceLine y={med?611.3:126} stroke={C.red} strokeDasharray="5 5" label={{value:"Nat'l Avg",fill:C.red,fontSize:10}} /></BarChart></Ch><Ch title="MED Volatility (2018–2024)" sub="Raw vs normalized" h={300}><BarChart data={nationalReliability.filter(d=>d.year>=2018)}><CartesianGrid strokeDasharray="3 3" stroke={C.border} /><XAxis dataKey="year" stroke={C.dim} fontSize={11} /><YAxis stroke={C.dim} fontSize={10} /><Tooltip content={<TT />} /><Bar dataKey="saidiMED" fill={`${C.red}55`} name="With MED" radius={[4,4,0,0]} barSize={16} /><Bar dataKey="saidi" fill={C.green} name="Without MED" radius={[4,4,0,0]} barSize={16} /><Legend wrapperStyle={{fontSize:11}} /></BarChart></Ch></div><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18 }}><div style={{ fontSize: 13, fontWeight: 700, color: C.electric, marginBottom: 6 }}>Resilience vs. Reliability</div><p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, margin: 0 }}>2024 national SAIDI with major events was <strong style={{ color: C.text }}>5× higher</strong> than without (662.6 vs 131.6). Florida: <strong style={{ color: C.red }}>20×</strong> (1,322 vs 66.4) from Hurricanes Helene/Milton — yet normalized SAIDI was among the <strong style={{ color: C.green }}>lowest nationally</strong>.</p></div></div>);

  const AITab = () => (<div style={{ display: "flex", flexDirection: "column", gap: 18 }}><div><h2 style={{ fontSize: 18, fontWeight: 800, color: C.ai, margin: "0 0 4px" }}>🤖 AI Analytics Agent</h2><p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Semantic Query Layer + Claude API</p></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}><Bot /><div style={{ display: "flex", flexDirection: "column", gap: 12 }}><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18 }}><div style={{ fontSize: 14, fontWeight: 700, color: C.ai, marginBottom: 10 }}>Architecture</div>{[{s:"1",l:"User Query",d:"Natural language"},{s:"2",l:"Intent Match",d:"Fuzzy match semantic queries"},{s:"3",l:"Data Retrieval",d:"Validated query → dataset"},{s:"4",l:"LLM Synthesis",d:"Claude API + data context"},{s:"5",l:"Source Citation",d:"Query ID + source shown"}].map(({s,l,d})=><div key={s} style={{display:"flex",gap:10,marginBottom:8}}><div style={{width:22,height:22,borderRadius:5,background:`${C.ai}18`,border:`1px solid ${C.ai}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:C.ai,flexShrink:0}}>{s}</div><div><div style={{fontSize:12,fontWeight:700,color:C.text}}>{l}</div><div style={{fontSize:11,color:C.muted}}>{d}</div></div></div>)}</div><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18 }}><div style={{ fontSize: 14, fontWeight: 700, color: C.ai, marginBottom: 10 }}>Semantic Queries ({GQ.length})</div>{GQ.map(g=><div key={g.id} style={{padding:"5px 10px",borderRadius:5,background:C.surface,border:`1px solid ${C.border}`,marginBottom:4,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:C.text,fontFamily:"monospace"}}>{g.id}</span><span style={{fontSize:10,color:C.dim}}>{g.src.split(",")[0]}</span></div>)}</div><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18 }}><div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 6 }}>Why a Semantic Query Layer?</div><p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, margin: 0 }}>Pre-validated query templates prevent hallucinated SQL while enabling natural language data access. Unmatched queries fall back to the LLM's general knowledge with a transparency note.</p></div></div></div></div>);

  const StackTab = () => (<div style={{ display: "flex", flexDirection: "column", gap: 18 }}><div><h2 style={{ fontSize: 18, fontWeight: 800, color: C.green, margin: "0 0 4px" }}>◈ Architecture & Methods</h2></div><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 22 }}><div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 18 }}>Pipeline</div><div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>{[{l:"Public Data",c:C.water,s:"EIA • EPA • Census"},null,{l:"BigQuery",c:C.electric,s:"Bronze → Gold"},null,{l:"Semantic Layer",c:C.ai,s:"SQL models + Semantic Queries"},null,{l:"Delivery",c:C.green,s:"React + AI Chat"}].map((item,i)=>item===null?<div key={i} style={{fontSize:18,color:C.dim,padding:"0 8px"}}>→</div>:<div key={i} style={{padding:"14px 22px",borderRadius:8,background:`${item.c}08`,border:`1px solid ${item.c}28`,textAlign:"center",minWidth:130}}><div style={{fontSize:13,fontWeight:700,color:item.c}}>{item.l}</div><div style={{fontSize:10,color:C.muted,marginTop:4}}>{item.s}</div></div>)}</div></div><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>{[{t:"Data Sources",c:C.water,items:["EIA Form 861","Bluefield Research","Duke Nicholas Institute","Census ACS","EPA","IEEE 1366"]},{t:"Engineering",c:C.electric,items:["Google BigQuery","SQL data models","Python / pandas","GCP Cloud Run","React + Recharts","Git / CI-CD"]},{t:"AI & Analytics",c:C.ai,items:["Semantic Query Layer","Claude API","MED normalization","EPA %MHI analysis","Geographic equity","RCT evaluation"]}].map(({t,c,items})=><div key={t} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:18,position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${c},transparent)`}} /><div style={{fontSize:13,fontWeight:700,color:c,marginBottom:12}}>{t}</div>{items.map((item,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:6}}><div style={{width:4,height:4,borderRadius:1,background:c,marginTop:6,flexShrink:0,opacity:.6}} /><span style={{fontSize:12,color:C.muted}}>{item}</span></div>)}</div>)}</div><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18 }}><div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>Data Sources — All Public</div>{[{s:"EIA Form 861",n:"Tables 11.1, 11.3"},{s:"Bluefield Research",n:"2024 Rate Index"},{s:"Teodoro (AWWA)",n:"Biennial pricing"},{s:"Duke Nicholas",n:"CC0 affordability"},{s:"EPA",n:"Affordability guidelines"},{s:"Census ACS",n:"MHI data"}].map(({s,n})=><div key={s} style={{marginBottom:5}}><span style={{fontSize:12,fontWeight:700,color:C.text}}>{s}</span><span style={{fontSize:11,color:C.dim}}> — {n}</span></div>)}</div></div>);

  const content = { water: Water, electric: Electric, ai: AITab, stack: StackTab };
  const Content = content[tab];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ background: `linear-gradient(180deg, ${C.surface} 0%, ${C.bg} 100%)`, borderBottom: `1px solid ${C.border}`, padding: "28px 32px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 38, height: 38, borderRadius: 9, background: `linear-gradient(135deg, ${C.water}, ${C.electric})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏛</div><h1 style={{ fontSize: 24, fontWeight: 900, margin: 0, letterSpacing: "-0.02em", background: `linear-gradient(135deg, ${C.text} 30%, ${C.water})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Municipal Utility Analytics Suite</h1></div>
            <p style={{ margin: "4px 0 0 48px", fontSize: 13, color: C.muted }}>Water rates • Electric reliability • AI data exploration</p>
          </div>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>Chris Reddish</div><div style={{ fontSize: 12, color: C.muted }}>Data & Analytics Engineer</div></div>
        </div>
        <div style={{ display: "flex", gap: 2, marginTop: 22, marginLeft: 48 }}>{TABS.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "9px 18px", borderRadius: "7px 7px 0 0", fontSize: 13, fontWeight: 700, cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: 6, background: tab === t.id ? C.bg : "transparent", color: tab === t.id ? C[t.color] : C.dim, borderBottom: tab === t.id ? `2px solid ${C[t.color]}` : "2px solid transparent" }}>{t.icon} {t.label}</button>)}</div>
      </div>
      <div style={{ padding: "24px 32px 40px", opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(4px)", transition: "all .2s ease" }}><Content /></div>
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "12px 32px", display: "flex", justifyContent: "space-between" }}><div style={{ fontSize: 10, color: C.dim }}>Data: EIA • Bluefield • AWWA • Duke • EPA • Census ACS</div><div style={{ fontSize: 10, color: C.dim }}>React • Recharts • Claude API • Public data</div></div>
    </div>
  );
}
