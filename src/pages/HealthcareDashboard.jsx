import { useState, useEffect, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, ReferenceLine, ScatterChart, Scatter, ZAxis
} from "recharts";
import { HOSPITALS, FL_AVERAGES } from "../data/hospitalData";

// sequential ramps (one hue, monotonic lightness) for 1-5 star distributions
const PALETTES = {
  dark: {
    bg: "#080c14", card: "#0d1320", surface: "#151d2e",
    border: "#1e2d45", text: "#dfe6f0", muted: "#7c8db5", dim: "#4a5e82",
    quality: "#06b6d4", readm: "#f59e0b", px: "#a78bfa", ed: "#10b981", red: "#ef4444",
    tip: "rgba(8,12,20,0.95)",
    cyanRamp: ["#164e63", "#155e75", "#0e7490", "#0891b2", "#22d3ee"],
    violetRamp: ["#312e81", "#4338ca", "#6366f1", "#818cf8", "#c7d2fe"],
  },
  light: {
    bg: "#f6f8fb", card: "#ffffff", surface: "#eef2f7",
    border: "#d8e0ea", text: "#1a2433", muted: "#5b6b82", dim: "#8494ab",
    quality: "#0891b2", readm: "#b45309", px: "#6d28d9", ed: "#047857", red: "#b91c1c",
    tip: "rgba(255,255,255,0.98)",
    cyanRamp: ["#cffafe", "#a5f3fc", "#22d3ee", "#0891b2", "#155e75"],
    violetRamp: ["#e0e7ff", "#c7d2fe", "#818cf8", "#4f46e5", "#312e81"],
  },
};
let C = PALETTES.dark;

const REGIONS = {
  "All Florida": null,
  "Tampa Bay": ["HILLSBOROUGH", "PINELLAS", "PASCO", "POLK", "MANATEE", "SARASOTA"],
  "Orlando": ["ORANGE", "SEMINOLE", "OSCEOLA", "LAKE"],
  "South Florida": ["MIAMI-DADE", "BROWARD", "PALM BEACH"],
  "Jacksonville": ["DUVAL", "CLAY", "ST. JOHNS", "NASSAU"],
};

const titleCase = s => s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()).replace(/\bOf\b/g, "of").replace(/\bAnd\b/g, "and");

const ownershipGroup = o => {
  if (!o) return "Other";
  if (o.includes("non-profit")) return "Non-profit";
  if (o.includes("Proprietary") || o.includes("Physician")) return "For-profit";
  if (o.includes("Government")) return "Government";
  return "Other";
};

const avg = (arr, sel, digits = 1) => {
  const vals = arr.map(sel).filter(v => v != null);
  return vals.length ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(digits) : null;
};

const Stat = ({ label, value, unit, sub, color = C.text }) => (
  <div style={{ padding: "14px 18px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
    <div style={{ marginTop: 4, display: "flex", alignItems: "baseline", gap: 4 }}>
      <span style={{ fontSize: 26, fontWeight: 800, color, fontFamily: "monospace" }}>{value ?? "n/a"}</span>
      {unit && <span style={{ fontSize: 11, color: C.muted }}>{unit}</span>}
    </div>
    {sub && <div style={{ marginTop: 3, fontSize: 11, color: C.muted }}>{sub}</div>}
  </div>
);

const Chip = ({ children, active, color, onClick }) => (
  <button onClick={onClick} style={{ padding: "5px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${active ? color : C.border}`, background: active ? `${color}18` : "transparent", color: active ? color : C.muted }}>{children}</button>
);

const TT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.tip, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
          <span style={{ fontSize: 11, color: C.muted }}>{p.name}:</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.text, fontFamily: "monospace" }}>{typeof p.value === "number" ? p.value.toLocaleString(undefined, { maximumFractionDigits: 1 }) : p.value}</span>
        </div>
      ))}
    </div>
  );
};

const Ch = ({ title, sub, children, h = 280 }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 20px" }}>
    {title && <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{title}</div>}
    {sub && <div style={{ fontSize: 11, color: C.dim, marginBottom: 14 }}>{sub}</div>}
    <ResponsiveContainer width="100%" height={h}>{children}</ResponsiveContainer>
  </div>
);

const SchemaTable = ({ name, kind, fields, color }) => (
  <div style={{ background: C.surface, border: `1px solid ${color}44`, borderRadius: 8, overflow: "hidden", minWidth: 190 }}>
    <div style={{ padding: "8px 12px", background: `${color}14`, borderBottom: `1px solid ${color}33` }}>
      <div style={{ fontSize: 9, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.1em" }}>{kind}</div>
      <div style={{ fontSize: 13, fontWeight: 800, color: C.text, fontFamily: "monospace" }}>{name}</div>
    </div>
    <div style={{ padding: "8px 12px" }}>
      {fields.map(f => (
        <div key={f.n} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 3 }}>
          <span style={{ fontSize: 11, color: f.k ? color : C.muted, fontFamily: "monospace", fontWeight: f.k ? 700 : 400 }}>{f.k ? `${f.k} ` : ""}{f.n}</span>
          <span style={{ fontSize: 10, color: C.dim }}>{f.t}</span>
        </div>
      ))}
    </div>
  </div>
);

const TABS = [
  { id: "quality", label: "Quality Ratings", icon: "★", color: "quality" },
  { id: "readm", label: "Readmissions", icon: "↩", color: "readm" },
  { id: "px", label: "Patient Experience", icon: "☺", color: "px" },
  { id: "ed", label: "ED Operations", icon: "⏱", color: "ed" },
  { id: "model", label: "Data Model & Methods", icon: "◈", color: "quality" },
];

export default function HealthcareDashboard() {
  const { theme } = useTheme();
  C = PALETTES[theme] || PALETTES.dark;
  const [tab, setTab] = useState("quality");
  const [region, setRegion] = useState("All Florida");
  const [fade, setFade] = useState(true);
  useEffect(() => { setFade(false); const t = setTimeout(() => setFade(true), 30); return () => clearTimeout(t); }, [tab]);

  const data = useMemo(() => {
    const counties = REGIONS[region];
    return counties ? HOSPITALS.filter(h => counties.includes(h.county)) : HOSPITALS;
  }, [region]);

  const rated = data.filter(h => h.rating != null);

  const Quality = () => {
    const dist = [1, 2, 3, 4, 5].map(r => ({ stars: `${r} star${r > 1 ? "s" : ""}`, count: rated.filter(h => h.rating === r).length, r }));
    const top = [...rated].sort((a, b) => b.rating - a.rating || (b.hcahps.summary ?? 0) - (a.hcahps.summary ?? 0)).slice(0, 12).map(h => ({ name: titleCase(h.name), rating: h.rating, hcahps: h.hcahps.summary ?? 0, city: titleCase(h.city) }));
    const own = ["Non-profit", "For-profit", "Government"].map(g => {
      const grp = rated.filter(h => ownershipGroup(h.ownership) === g);
      return { group: g, avgRating: avg(grp, h => h.rating), count: grp.length };
    }).filter(d => d.count > 0);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: C.quality, margin: "0 0 4px" }}>★ CMS Overall Hospital Quality</h2>
          <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>CMS Care Compare overall star ratings (1-5) summarize up to 46 quality measures</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          <Stat label="Hospitals" value={data.length} sub={`${rated.length} with a star rating`} color={C.quality} />
          <Stat label="Avg Rating" value={avg(rated, h => h.rating)} unit="/ 5" sub={`FL statewide: ${FL_AVERAGES.rating}`} color={C.quality} />
          <Stat label="5-Star" value={rated.filter(h => h.rating === 5).length} sub="Top-rated hospitals" color={C.ed} />
          <Stat label="1-2 Star" value={rated.filter(h => h.rating <= 2).length} sub="Below-average ratings" color={C.red} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Ch title="Star Rating Distribution" sub="Count of hospitals per CMS overall rating" h={300}>
            <BarChart data={dist}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="stars" stroke={C.dim} fontSize={11} />
              <YAxis stroke={C.dim} fontSize={10} allowDecimals={false} />
              <Tooltip content={<TT />} />
              <Bar dataKey="count" name="Hospitals" radius={[4, 4, 0, 0]} barSize={38}>
                {dist.map((d, i) => <Cell key={i} fill={C.cyanRamp[d.r - 1]} />)}
              </Bar>
            </BarChart>
          </Ch>
          <Ch title="Average Rating by Ownership" sub="CMS ownership categories, grouped" h={300}>
            <BarChart data={own}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="group" stroke={C.dim} fontSize={11} />
              <YAxis stroke={C.dim} fontSize={10} domain={[0, 5]} />
              <Tooltip content={({ active, payload }) => { if (!active || !payload?.length) return null; const d = payload[0].payload; return <div style={{ background: C.tip, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px" }}><div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{d.group}</div><div style={{ fontSize: 11, color: C.muted }}>Avg rating: {d.avgRating} ({d.count} hospitals)</div></div>; }} />
              <ReferenceLine y={FL_AVERAGES.rating} stroke={C.dim} strokeDasharray="6 3" label={{ value: "FL avg", fill: C.dim, fontSize: 10 }} />
              <Bar dataKey="avgRating" name="Avg rating" fill={C.quality} radius={[4, 4, 0, 0]} barSize={38} />
            </BarChart>
          </Ch>
        </div>
        <Ch title={`Top-Rated Hospitals - ${region}`} sub="Ranked by CMS overall star; HCAHPS patient experience star shown alongside" h={380}>
          <BarChart data={top} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis type="number" stroke={C.dim} fontSize={10} domain={[0, 5]} />
            <YAxis dataKey="name" type="category" stroke={C.dim} fontSize={10} width={220} />
            <Tooltip content={({ active, payload }) => { if (!active || !payload?.length) return null; const d = payload[0].payload; return <div style={{ background: C.tip, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px" }}><div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{d.name}</div><div style={{ fontSize: 11, color: C.muted }}>{d.city} • Overall: {d.rating} • HCAHPS: {d.hcahps || "n/a"}</div></div>; }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="rating" name="Overall star" fill={C.quality} radius={[0, 4, 4, 0]} barSize={9} />
            <Bar dataKey="hcahps" name="HCAHPS star" fill={C.px} radius={[0, 4, 4, 0]} barSize={9} />
          </BarChart>
        </Ch>
      </div>
    );
  };

  const Readm = () => {
    const withHWR = data.filter(h => h.readm.hospWide != null);
    const byCondition = [
      { cond: "Heart Attack", rate: avg(data, h => h.readm.heartAttack) },
      { cond: "Hip / Knee", rate: avg(data, h => h.readm.hipKnee) },
      { cond: "Pneumonia", rate: avg(data, h => h.readm.pneumonia) },
      { cond: "Hospital-Wide", rate: avg(data, h => h.readm.hospWide) },
      { cond: "COPD", rate: avg(data, h => h.readm.copd) },
      { cond: "Heart Failure", rate: avg(data, h => h.readm.heartFailure) },
    ].filter(d => d.rate != null).sort((a, b) => a.rate - b.rate);
    const best = [...withHWR].sort((a, b) => a.readm.hospWide - b.readm.hospWide).slice(0, 12).map(h => ({ name: titleCase(h.name), rate: h.readm.hospWide, city: titleCase(h.city), flag: h.readm.hospWideVsNational }));
    const betterCount = withHWR.filter(h => (h.readm.hospWideVsNational || "").startsWith("Better")).length;
    const worseCount = withHWR.filter(h => (h.readm.hospWideVsNational || "").startsWith("Worse")).length;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: C.readm, margin: "0 0 4px" }}>↩ 30-Day Unplanned Readmissions</h2>
          <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Risk-standardized readmission rates. Lower is better; CMS flags each hospital vs the national rate</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          <Stat label="Avg Hospital-Wide" value={avg(withHWR, h => h.readm.hospWide)} unit="%" sub={`FL statewide: ${FL_AVERAGES.readmHospWide}%`} color={C.readm} />
          <Stat label="Best" value={withHWR.length ? Math.min(...withHWR.map(h => h.readm.hospWide)) : null} unit="%" color={C.ed} />
          <Stat label="Better Than Nat'l" value={betterCount} sub="Per CMS comparison flag" color={C.ed} />
          <Stat label="Worse Than Nat'l" value={worseCount} sub="Per CMS comparison flag" color={C.red} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Ch title="Average Readmission Rate by Condition" sub={`${region} • condition-specific 30-day measures`} h={320}>
            <BarChart data={byCondition} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis type="number" stroke={C.dim} fontSize={10} unit="%" />
              <YAxis dataKey="cond" type="category" stroke={C.dim} fontSize={11} width={110} />
              <Tooltip content={<TT />} />
              <Bar dataKey="rate" name="Avg rate" fill={C.readm} radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </Ch>
          <Ch title="Lowest Hospital-Wide Readmission Rates" sub="Hybrid hospital-wide readmission measure" h={320}>
            <BarChart data={best} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis type="number" stroke={C.dim} fontSize={10} unit="%" domain={[0, "auto"]} />
              <YAxis dataKey="name" type="category" stroke={C.dim} fontSize={9} width={200} />
              <Tooltip content={({ active, payload }) => { if (!active || !payload?.length) return null; const d = payload[0].payload; return <div style={{ background: C.tip, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px" }}><div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{d.name}</div><div style={{ fontSize: 11, color: C.muted }}>{d.city} • {d.rate}%</div><div style={{ fontSize: 10, color: C.dim }}>{d.flag}</div></div>; }} />
              <ReferenceLine x={FL_AVERAGES.readmHospWide} stroke={C.dim} strokeDasharray="6 3" label={{ value: "FL avg", fill: C.dim, fontSize: 10 }} />
              <Bar dataKey="rate" name="Rate" fill={C.readm} radius={[0, 4, 4, 0]} barSize={14} />
            </BarChart>
          </Ch>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.readm, marginBottom: 6 }}>Why readmissions matter</div>
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, margin: 0 }}>30-day readmission rates are a core quality and cost signal: CMS reduces payments to hospitals with excess readmissions under the Hospital Readmissions Reduction Program. Rates shown are risk-standardized, so hospitals treating sicker populations are compared fairly.</p>
        </div>
      </div>
    );
  };

  const Px = () => {
    const withPx = data.filter(h => h.hcahps.summary != null);
    const components = [
      { comp: "Nurse Communication", v: avg(withPx, h => h.hcahps.nurse) },
      { comp: "Doctor Communication", v: avg(withPx, h => h.hcahps.doctor) },
      { comp: "Cleanliness", v: avg(withPx, h => h.hcahps.clean) },
      { comp: "Quietness", v: avg(withPx, h => h.hcahps.quiet) },
      { comp: "Would Recommend", v: avg(withPx, h => h.hcahps.recommend) },
    ].filter(d => d.v != null);
    const dist = [1, 2, 3, 4, 5].map(r => ({ stars: `${r} star${r > 1 ? "s" : ""}`, count: withPx.filter(h => h.hcahps.summary === r).length, r }));
    const top = [...withPx].sort((a, b) => b.hcahps.summary - a.hcahps.summary || (b.hcahps.recommend ?? 0) - (a.hcahps.recommend ?? 0)).slice(0, 12).map(h => ({ name: titleCase(h.name), stars: h.hcahps.summary, recommend: h.hcahps.recommend ?? 0, city: titleCase(h.city) }));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: C.px, margin: "0 0 4px" }}>☺ HCAHPS Patient Experience</h2>
          <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Standardized national patient survey. Star ratings 1-5 from patient responses after discharge</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          <Stat label="Surveyed" value={withPx.length} sub="Hospitals with HCAHPS stars" color={C.px} />
          <Stat label="Avg Summary Star" value={avg(withPx, h => h.hcahps.summary)} unit="/ 5" sub={`FL statewide: ${FL_AVERAGES.hcahpsSummary}`} color={C.px} />
          <Stat label="4+ Stars" value={withPx.filter(h => h.hcahps.summary >= 4).length} color={C.ed} />
          <Stat label="Avg Recommend" value={avg(withPx, h => h.hcahps.recommend)} unit="/ 5" sub="Would recommend hospital" color={C.px} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Ch title="Average Star by Survey Component" sub={`${region} • HCAHPS component star ratings`} h={300}>
            <BarChart data={components} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis type="number" stroke={C.dim} fontSize={10} domain={[0, 5]} />
              <YAxis dataKey="comp" type="category" stroke={C.dim} fontSize={11} width={150} />
              <Tooltip content={<TT />} />
              <Bar dataKey="v" name="Avg star" fill={C.px} radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </Ch>
          <Ch title="Summary Star Distribution" sub="HCAHPS summary star rating" h={300}>
            <BarChart data={dist}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="stars" stroke={C.dim} fontSize={11} />
              <YAxis stroke={C.dim} fontSize={10} allowDecimals={false} />
              <Tooltip content={<TT />} />
              <Bar dataKey="count" name="Hospitals" radius={[4, 4, 0, 0]} barSize={38}>
                {dist.map((d, i) => <Cell key={i} fill={C.violetRamp[d.r - 1]} />)}
              </Bar>
            </BarChart>
          </Ch>
        </div>
        <Ch title={`Best Patient Experience - ${region}`} sub="Ranked by HCAHPS summary star; would-recommend star shown alongside" h={380}>
          <BarChart data={top} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis type="number" stroke={C.dim} fontSize={10} domain={[0, 5]} />
            <YAxis dataKey="name" type="category" stroke={C.dim} fontSize={10} width={220} />
            <Tooltip content={({ active, payload }) => { if (!active || !payload?.length) return null; const d = payload[0].payload; return <div style={{ background: C.tip, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px" }}><div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{d.name}</div><div style={{ fontSize: 11, color: C.muted }}>{d.city} • Summary: {d.stars} • Recommend: {d.recommend || "n/a"}</div></div>; }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="stars" name="Summary star" fill={C.px} radius={[0, 4, 4, 0]} barSize={9} />
            <Bar dataKey="recommend" name="Would recommend" fill={C.ed} radius={[0, 4, 4, 0]} barSize={9} />
          </BarChart>
        </Ch>
      </div>
    );
  };

  const Ed = () => {
    const VOLS = ["low", "medium", "high", "very high"];
    const VOL_COLORS = { low: C.quality, medium: C.px, high: C.readm, "very high": C.red };
    const withEd = data.filter(h => h.timely.edMedianMinutes != null);
    const byVol = VOLS.map(v => {
      const grp = withEd.filter(h => h.timely.edVolume === v);
      return { vol: titleCase(v), minutes: avg(grp, h => h.timely.edMedianMinutes, 0), count: grp.length };
    }).filter(d => d.count > 0);
    const scatter = withEd.filter(h => h.timely.leftBeforeSeenPct != null && h.timely.edVolume).map(h => ({ name: titleCase(h.name), x: h.timely.edMedianMinutes, y: h.timely.leftBeforeSeenPct, vol: h.timely.edVolume }));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: C.ed, margin: "0 0 4px" }}>⏱ Emergency Department Operations</h2>
          <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Timely and effective care measures: ED wait times, walkouts, and sepsis care compliance</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          <Stat label="Median ED Visit" value={avg(withEd, h => h.timely.edMedianMinutes, 0)} unit="min" sub={`FL statewide: ${Math.round(FL_AVERAGES.edMedianMinutes)} min`} color={C.ed} />
          <Stat label="Left Before Seen" value={avg(data, h => h.timely.leftBeforeSeenPct)} unit="%" sub="Patients who walked out" color={C.readm} />
          <Stat label="Sepsis Care" value={avg(data, h => h.timely.sepsisCarePct, 0)} unit="%" sub="SEP-1 bundle compliance" color={C.quality} />
          <Stat label="Very High Volume EDs" value={data.filter(h => h.timely.edVolume === "very high").length} sub="60k+ annual visits" color={C.px} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Ch title="Median ED Time by Volume Category" sub="Median minutes from arrival to departure (OP-18b)" h={320}>
            <BarChart data={byVol}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="vol" stroke={C.dim} fontSize={11} />
              <YAxis stroke={C.dim} fontSize={10} unit="m" />
              <Tooltip content={({ active, payload }) => { if (!active || !payload?.length) return null; const d = payload[0].payload; return <div style={{ background: C.tip, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px" }}><div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{d.vol} volume</div><div style={{ fontSize: 11, color: C.muted }}>Avg median: {d.minutes} min ({d.count} EDs)</div></div>; }} />
              <Bar dataKey="minutes" name="Avg median minutes" fill={C.ed} radius={[4, 4, 0, 0]} barSize={38} />
            </BarChart>
          </Ch>
          <Ch title="Wait Time vs Walkout Rate" sub="Each dot is a hospital, colored by ED volume" h={320}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="x" name="Median ED minutes" stroke={C.dim} fontSize={10} unit="m" type="number" />
              <YAxis dataKey="y" name="Left before seen" stroke={C.dim} fontSize={10} unit="%" type="number" />
              <ZAxis range={[60, 60]} />
              <Tooltip content={({ active, payload }) => { if (!active || !payload?.length) return null; const d = payload[0].payload; return <div style={{ background: C.tip, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px" }}><div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{d.name}</div><div style={{ fontSize: 11, color: C.muted }}>{d.x} min • {d.y}% walked out • {d.vol} volume</div></div>; }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {VOLS.map(v => <Scatter key={v} name={titleCase(v)} data={scatter.filter(d => d.vol === v)} fill={VOL_COLORS[v]} />)}
            </ScatterChart>
          </Ch>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ed, marginBottom: 6 }}>Operational reading</div>
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, margin: 0 }}>Median ED visit times in Florida cluster near two and a half hours across every volume tier, while walkout rates range from under 1% to 4% hospital to hospital, suggesting throughput depends more on process than size. CMS publishes the volume tier alongside these measures so hospitals are benchmarked against true peers.</p>
        </div>
      </div>
    );
  };

  const Model = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: C.quality, margin: "0 0 4px" }}>◈ Data Model & Methods</h2>
        <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>How this dashboard is modeled: a dimensional star schema over CMS Care Compare data</p>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 22 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>Star Schema</div>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 18 }}>Grain: one row per hospital x measure x reporting period. Dimensions conform across all four CMS source datasets.</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 16, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <SchemaTable name="dim_hospital" kind="Dimension" color={C.px} fields={[
              { n: "hospital_key", t: "PK", k: "PK" },
              { n: "facility_id", t: "CCN" },
              { n: "hospital_name", t: "string" },
              { n: "ownership_group", t: "string" },
              { n: "ed_volume_tier", t: "string" },
            ]} />
            <SchemaTable name="dim_geography" kind="Dimension" color={C.ed} fields={[
              { n: "geo_key", t: "PK", k: "PK" },
              { n: "city", t: "string" },
              { n: "county", t: "string" },
              { n: "metro_region", t: "derived" },
              { n: "state", t: "string" },
            ]} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <SchemaTable name="fact_hospital_measure" kind="Fact" color={C.quality} fields={[
              { n: "hospital_key", t: "FK", k: "FK" },
              { n: "geo_key", t: "FK", k: "FK" },
              { n: "measure_key", t: "FK", k: "FK" },
              { n: "period_key", t: "FK", k: "FK" },
              { n: "score", t: "numeric" },
              { n: "denominator", t: "numeric" },
              { n: "vs_national_flag", t: "string" },
            ]} />
            <div style={{ fontSize: 10, color: C.dim, textAlign: "center" }}>Many-to-one joins from fact to each dimension (1 - *)</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <SchemaTable name="dim_measure" kind="Dimension" color={C.readm} fields={[
              { n: "measure_key", t: "PK", k: "PK" },
              { n: "measure_id", t: "CMS ID" },
              { n: "measure_group", t: "string" },
              { n: "unit", t: "string" },
              { n: "better_direction", t: "up/down" },
            ]} />
            <SchemaTable name="dim_period" kind="Dimension" color={C.px} fields={[
              { n: "period_key", t: "PK", k: "PK" },
              { n: "start_date", t: "date" },
              { n: "end_date", t: "date" },
              { n: "release", t: "string" },
            ]} />
          </div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 22 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 18 }}>Pipeline</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { l: "CMS Provider Data API", c: C.quality, s: "4 Care Compare datasets" },
            null,
            { l: "Extract & Join", c: C.readm, s: "Automated fetch, keyed on CCN" },
            null,
            { l: "Curated Model", c: C.px, s: "Typed, validated, null-handled" },
            null,
            { l: "Delivery", c: C.ed, s: "React + Recharts" },
          ].map((item, i) => item === null
            ? <div key={i} style={{ fontSize: 18, color: C.dim, padding: "0 8px" }}>→</div>
            : <div key={i} style={{ padding: "14px 22px", borderRadius: 8, background: `${item.c}08`, border: `1px solid ${item.c}28`, textAlign: "center", minWidth: 140 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.c }}>{item.l}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{item.s}</div>
              </div>)}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.quality, marginBottom: 10 }}>Data Quality Notes</div>
          {[
            "All figures are unmodified CMS values; nothing is estimated or imputed",
            "\"Not Available\" and small-sample suppressed values are stored as nulls and excluded from averages, never zero-filled",
            "Readmission rates are risk-standardized by CMS for fair comparison",
            "Specialty and PPS-exempt hospitals are excluded; acute-care only",
            "Each measure keeps its CMS reporting period; periods differ across measure groups",
          ].map((t, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}><div style={{ width: 4, height: 4, borderRadius: 1, background: C.quality, marginTop: 7, flexShrink: 0, opacity: .6 }} /><span style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{t}</span></div>)}
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.px, marginBottom: 10 }}>About This Project</div>
          <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, margin: "0 0 10px" }}>Built after taking Health Informatics at USF: an exercise in applying the same analytics data modeling I use professionally (dimensional models, curated semantic layers, data quality checks) to healthcare quality data.</p>
          <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, margin: 0 }}>All data is public, from the CMS Provider Data Catalog (data.cms.gov/provider-data). This is an independent academic project, not affiliated with or endorsed by CMS or any hospital. Star ratings summarize complex care into a single number and should not be the sole basis for choosing a hospital.</p>
        </div>
      </div>
    </div>
  );

  const Content = { quality: Quality, readm: Readm, px: Px, ed: Ed, model: Model }[tab];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ padding: "26px 32px 0", borderBottom: `1px solid ${C.border}`, background: `linear-gradient(180deg, ${C.card}, ${C.bg})` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: `linear-gradient(135deg, ${C.quality}, ${C.px})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>⚕</div>
              <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0, letterSpacing: "-0.02em", background: `linear-gradient(135deg, ${C.text} 30%, ${C.quality})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Florida Hospital Quality Benchmarking</h1>
            </div>
            <p style={{ margin: "4px 0 0 48px", fontSize: 13, color: C.muted }}>167 acute-care hospitals • Real CMS Care Compare data • Academic project following Health Informatics coursework at USF</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>Chris Reddish</div>
            <div style={{ fontSize: 12, color: C.muted }}>Data Analyst & Analytics Engineer</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16, marginLeft: 48, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: C.dim, fontWeight: 600 }}>Region:</span>
          {Object.keys(REGIONS).map(r => <Chip key={r} active={region === r} color={C.quality} onClick={() => setRegion(r)}>{r}</Chip>)}
        </div>
        <div style={{ display: "flex", gap: 2, marginTop: 16, marginLeft: 48, flexWrap: "wrap" }}>
          {TABS.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "9px 18px", borderRadius: "7px 7px 0 0", fontSize: 13, fontWeight: 700, cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: 6, background: tab === t.id ? C.bg : "transparent", color: tab === t.id ? C[t.color] : C.dim, borderBottom: tab === t.id ? `2px solid ${C[t.color]}` : "2px solid transparent" }}>{t.icon} {t.label}</button>)}
        </div>
      </div>
      <div style={{ padding: "24px 32px 40px", opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(4px)", transition: "all .2s ease" }}><Content /></div>
    </div>
  );
}
