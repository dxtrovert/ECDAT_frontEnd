import { useMemo, useState, useEffect, type ReactNode } from 'react';
import { 
  Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, Bell, Box, ChevronDown, ChevronRight, 
  CircleDot, Clock3, Cloud, Cpu, Database, FileText, Filter, Globe2, 
  Layers, Lock, Maximize2, Menu, Moon, Network, Package, Play, Radar, RotateCcw, 
  Search, ShieldCheck, SlidersHorizontal, Sparkles, Sun, Target, Terminal, X, Zap, ZoomIn, ZoomOut 
} from 'lucide-react';

type Screen = 'dashboard' | 'scan' | 'inventory' | 'graph' | 'migration' | 'compliance' | 'drift';
type Risk = 'Critical' | 'High' | 'Medium' | 'Low';
type Asset = { id: string; algorithm: string; key: string; app: string; source: string; risk: Risk; exposure: 'External' | 'Internal'; compliance: 'Compliant' | 'Review' | 'Non-compliant'; confidence: number };

const assets: Asset[] = [
  { id: 'CRYPTO-001', algorithm: 'RSA', key: '1024 bits', app: 'payment-api', source: 'source_code', risk: 'Critical', exposure: 'External', compliance: 'Non-compliant', confidence: 94 },
  { id: 'CRYPTO-002', algorithm: 'SHA-1', key: '160 bits', app: 'auth-service', source: 'config_file', risk: 'High', exposure: 'External', compliance: 'Non-compliant', confidence: 88 },
  { id: 'CRYPTO-003', algorithm: 'ECC', key: 'P-256', app: 'user-management', source: 'source_code', risk: 'High', exposure: 'Internal', compliance: 'Review', confidence: 76 },
  { id: 'CRYPTO-004', algorithm: 'TLS', key: '1.0', app: 'legacy-service', source: 'container', risk: 'Critical', exposure: 'External', compliance: 'Non-compliant', confidence: 91 },
  { id: 'CRYPTO-005', algorithm: 'AES', key: '256 bits', app: 'data-processor', source: 'dependency', risk: 'Medium', exposure: 'Internal', compliance: 'Compliant', confidence: 62 },
  { id: 'CRYPTO-006', algorithm: 'RSA', key: '2048 bits', app: 'gateway-core', source: 'source_code', risk: 'Medium', exposure: 'External', compliance: 'Review', confidence: 83 },
  { id: 'CRYPTO-007', algorithm: 'ECDSA', key: 'P-384', app: 'citizen-portal', source: 'certificate', risk: 'Low', exposure: 'External', compliance: 'Compliant', confidence: 97 },
];

const nav = [
  ['dashboard', 'Dashboard', Radar],
  ['scan', 'Scan', Zap],
  ['inventory', 'Crypto Assets', Box],
  ['graph', 'Risk & Blast Radius', Network],
  ['migration', 'PQC Migration', ShieldCheck],
  ['compliance', 'Compliance', FileText],
  ['drift', 'Drift Detection', Activity]
] as const;

function App() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [mobileNav, setMobileNav] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [query, setQuery] = useState('');
  
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('ecdat-theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ecdat-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const filteredAssets = useMemo(() => assets.filter((asset) => `${asset.id} ${asset.algorithm} ${asset.app}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const activeTitle = nav.find(([key]) => key === screen)?.[1] ?? 'Dashboard';

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
      <div className="brand">
        <div className="brand-mark"><span /><span /><span /></div>
        <div>
          <strong>ECDAT</strong>
          <small>DISCOVER · ANALYSE · SECURE<br />FOR A QUANTUM TOMORROW</small>
        </div>
      </div>
      <div className="side-label">COMMAND CENTER</div>
      <nav>
        {nav.map(([key, label, Icon]) => (
          <button key={key} onClick={() => { setScreen(key); setMobileNav(false); }} className={screen === key ? 'active' : ''}>
            <Icon size={16} />
            <span>{label}</span>
            {screen === key && <ChevronRight size={14} className="nav-arrow" />}
          </button>
        ))}
      </nav>
      <div className="sidebar-spacer" />
      <div className="india-note">
        <img src="/assets/branding/Emblem_of_India.svg" alt="Emblem of India" />
        <p>Post-quantum security for a stronger, sovereign India.</p>
      </div>
      <div className="built">
        <span className="flag"><i /><i /><i /></span>
        <div><b>Built for NTRO</b><small>SIH 2026 · PS26164</small></div>
      </div>
    </aside>

    <main className="main-area">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)}><Menu size={18} /></button>
        <div className="global-search">
          <Search size={15} />
          <input placeholder="Search assets, applications, libraries, vulnerabilities..." />
          <kbd>⌘ K</kbd>
        </div>
        <div className="system"><span className="status-dot" /> System Operational</div>
        
        {/* Compact Redesigned Theme Switcher Control */}
        <div 
          className="theme-switcher" 
          onClick={toggleTheme} 
          title={theme === 'light' ? 'Light mode active (click for Dark mode)' : 'Dark mode active (click for Light mode)'}
          aria-label="Toggle light/dark theme"
        >
          <div className="theme-switcher-slider" />
          <span className={`theme-switcher-option ${theme === 'light' ? 'active' : ''}`}>
            <Sun size={13} />
          </span>
          <span className={`theme-switcher-option ${theme === 'dark' ? 'active' : ''}`}>
            <Moon size={13} />
          </span>
        </div>

        <Bell size={18} className="muted" />
        <div className="profile">
          <span className="avatar">AC</span>
          <div><b>Aditya Chavan</b><small>Team PS26164</small></div>
          <ChevronDown size={14} />
        </div>
      </header>

      <div className="content">
        <div className="page-head">
          <div>
            <div className="eyebrow">ECDAT / {activeTitle.toUpperCase()}</div>
            <h1>{screen === 'dashboard' ? <>Secure cryptography<br /><em>for a quantum tomorrow.</em></> : <>{activeTitle}<br /><em>{screen === 'scan' ? 'Observe. Discover. Prioritize.' : screen === 'graph' ? 'Understand what is connected.' : screen === 'migration' ? 'A measured path to PQC readiness.' : 'Signal over noise.'}</em></>}</h1>
            <p className="subhead">{screen === 'dashboard' ? 'Discover. Understand. Prioritize. Migrate.' : 'Enterprise Cryptographic Discovery & Assessment Tool'}</p>
          </div>
          <div className="head-context">
            <div className="context-label">NATIONAL CRITICAL INFRASTRUCTURE</div>
            <b>BHARAT <span className="mini-flag"><i /><i /><i /></span></b>
            <small>Telemetry window · 08 Sep 2026</small>
          </div>
        </div>
        
        {/* Page Container */}
        <div key={screen} className="page-transition">
          {screen === 'dashboard' && <Dashboard onAsset={setSelectedAsset} />}
          {screen === 'scan' && <Scan />}
          {screen === 'inventory' && <Inventory assets={filteredAssets} query={query} setQuery={setQuery} onAsset={setSelectedAsset} />}
          {screen === 'graph' && <Graph />}
          {screen === 'migration' && <Migration />}
          {screen === 'compliance' && <Compliance />}
          {screen === 'drift' && <Drift />}
        </div>
      </div>
    </main>
    {selectedAsset && <AssetDrawer asset={selectedAsset} onClose={() => setSelectedAsset(null)} />}
  </div>;
}

function Panel({ title, eyebrow, children, className = '', action }: { title: string; eyebrow?: string; children: ReactNode; className?: string; action?: ReactNode }) { 
  return <section className={`panel ${className}`}>
    <div className="panel-head">{eyebrow && <span>{eyebrow}</span>}<h3>{title}</h3>{action}</div>
    {children}
  </section>; 
}

function Metric({ icon: Icon, value, label, change, tone = 'blue', loading = false }: { icon: typeof Box; value: string; label: string; change: string; tone?: string; loading?: boolean }) { 
  return <div className={`metric ${tone} ${loading ? 'skeleton' : ''}`}>
    <div className="metric-icon"><Icon size={19} /></div>
    <div><strong>{value}</strong><span>{label}</span></div>
    <b className={change.startsWith('↓') ? 'down' : ''}>{change}</b>
    <div className="spark"><i /><i /><i /><i /><i /></div>
  </div>; 
}

function RiskBadge({ risk }: { risk: Risk }) { 
  return <span className={`risk-badge ${risk.toLowerCase()}`}><CircleDot size={8} />{risk}</span>; 
}

function Dashboard({ onAsset }: { onAsset: (a: Asset) => void }) { 
  const [year, setYear] = useState(2031); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return <><div className="metrics">
    <Metric icon={Box} value="1,248" label="Crypto assets" change="↑ 12%" loading={isLoading} />
    <Metric icon={Zap} value="187" label="Quantum vulnerable" change="↑ 8%" tone="pink" loading={isLoading} />
    <Metric icon={AlertTriangle} value="42" label="Critical risk" change="↑ 5%" tone="red" loading={isLoading} />
    <Metric icon={FileText} value="73" label="Policy violations" change="↓ 18%" tone="cyan" loading={isLoading} />
  </div>
  <div className="dashboard-grid">
    <Panel title="Quantum risk timeline" eyebrow="PROJECTED EXPOSURE" className="timeline-panel" action={<select><option>Q-Day: 2031</option><option>Q-Day: 2035</option></select>}><div className="timeline-copy">Projected risk to cryptographic assets based on Q-Day assumption</div><div className="chart-area"><svg viewBox="0 0 620 190" preserveAspectRatio="none"><path className="gridlines" d="M0 30H620M0 75H620M0 120H620M0 165H620M62 0V190M186 0V190M310 0V190M434 0V190M558 0V190" /><path className="line redline" d="M0 178 C80 178 105 158 160 134 S250 68 340 53 S470 22 620 7" /><path className="line orangeline" d="M0 178 C100 178 120 170 190 148 S290 100 350 83 S500 60 620 42" /><path className="line yellowline" d="M0 178 C110 178 160 176 230 164 S340 132 430 116 S530 96 620 85" /><path className="line blueline" d="M0 178 C140 178 210 177 290 169 S420 151 500 140 S570 133 620 126" /><line x1={year === 2031 ? 322 : 450} x2={year === 2031 ? 322 : 450} y1="0" y2="190" className="qday" /></svg><div className="axis"><span>2026</span><span>2028</span><span>2030</span><span>2032</span><span>2034</span><span>2036</span></div><label className="range-label">Q-DAY ASSUMPTION <b>{year}</b><input type="range" min="2028" max="2035" value={year} onChange={(e) => setYear(Number(e.target.value))} /></label><div className="chart-legend"><span><i className="dot red" /> RSA <b>68%</b></span><span><i className="dot orange" /> ECC <b>52%</b></span><span><i className="dot yellow" /> DSA <b>31%</b></span><span><i className="dot blue" /> AES <b>12%</b></span></div></div></Panel>
    <Panel title="Cryptographic asset distribution" eyebrow="ALGORITHM MIX" className="distribution"><div className="donut"><div><strong>1,248</strong><small>Total assets</small></div></div><div className="legend-list">{[['RSA', '28%', 'red'], ['ECC', '24%', 'orange'], ['Symmetric', '18%', 'yellow'], ['Hash', '12%', 'blue'], ['Certificates', '10%', 'purple'], ['Others', '8%', 'gray']].map(([n, v, c]) => <div key={n}><i className={`dot ${c}`} /><span>{n}</span><b>{v}</b></div>)}</div></Panel>
    <Panel title="Overall risk score" eyebrow="POSTURE INDEX" className="risk-score"><div className="gauge"><div><strong>70%</strong><span>High risk</span></div></div><div className="alert-box"><AlertTriangle size={16} /><span>Your organization has a high quantum exposure. <b>42 critical assets</b> require immediate attention.</span></div></Panel>
    <Panel title="Attack surface & reachability" className="reach"><div className="reach-grid"><div><Globe2 size={18} /><strong>68</strong><span>Externally reachable</span><b>↑ 14%</b></div><div><Database size={18} /><strong>321</strong><span>Protect sensitive data</span><b className="down">↓ 7%</b></div><div><Network size={18} /><strong>12</strong><span>Critical paths</span><b>↑ 33%</b></div></div></Panel>
    <Panel title="Compliance status" className="compliance-mini" action={<button className="text-button">View compliance <ArrowUpRight size={13} /></button>}><div className="compliance-ring"><strong>78%</strong><span>Compliant</span></div><div className="compliance-rows"><span><i className="dot green" />Compliant <b>972</b></span><span><i className="dot red" />Non-compliant <b>187</b></span><span><i className="dot yellow" />Review required <b>89</b></span></div><select><option>Policy: India CII / NTRO</option></select></Panel>
    <Panel title="Top risky applications" className="risky-apps" action={<button className="text-button">View all <ArrowUpRight size={13} /></button>}><div className="app-list">{[['payment-api', 'Critical', 12], ['auth-service', 'High', 8], ['user-management', 'High', 6], ['legacy-service', 'Medium', 5], ['data-processor', 'Medium', 4]].map(([name, risk, n]) => <div key={name}><span><i className={`app-icon ${String(risk).toLowerCase()}`}>!</i>{name}</span><div className="bar"><i style={{ width: `${Number(n) * 7 + 25}%` }} /></div><b>{n}</b></div>)}</div></Panel>
    <Panel title="Recent critical findings" className="findings" action={<button className="outline-button">View all assets <ArrowUpRight size={13} /></button>}><AssetTable assets={assets.slice(0, 5)} onAsset={onAsset} /></Panel>
  </div></>; 
}

function AssetTable({ assets: rows, onAsset }: { assets: Asset[]; onAsset: (asset: Asset) => void }) { 
  return <div className="table-wrap">
    <table>
      <thead>
        <tr><th>Asset</th><th>Algorithm</th><th>Application</th><th>Risk</th><th>Exposure</th><th>Compliance</th><th>Confidence</th><th /></tr>
      </thead>
      <tbody>
        {rows.map((asset) => (
          <tr key={asset.id} onClick={() => onAsset(asset)}>
            <td><b>{asset.id}</b><small>{asset.source}</small></td>
            <td>{asset.algorithm}<small>{asset.key}</small></td>
            <td>{asset.app}</td>
            <td><RiskBadge risk={asset.risk} /></td>
            <td><span className={`exposure ${asset.exposure.toLowerCase()}`}>{asset.exposure}</span></td>
            <td><span className={`compliance-badge ${asset.compliance.toLowerCase().replace('-', '')}`}>{asset.compliance}</span></td>
            <td><div className="confidence"><i style={{ width: `${asset.confidence}%` }} /><span>{asset.confidence}%</span></div></td>
            <td><button className="view-button">View <ChevronRight size={12} /></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>; 
}

function Scan() { 
  const [scanning, setScanning] = useState(false); 
  const [progress, setProgress] = useState(68); 
  return <><div className="scan-layout">
    <Panel title="Launch a discovery scan" eyebrow="NEW SCAN" className="scan-config">
      <label>REPOSITORY / CONTAINER INPUT<div className="input-shell"><Terminal size={15} /><input defaultValue="ntro-infra/payment-platform" /></div></label>
      <div className="two-col">
        <label>BRANCH<select><option>main</option><option>release/2026-q3</option></select></label>
        <label>SCOPE<select><option>Full infrastructure</option><option>Source code only</option></select></label>
      </div>
      <label>SCANNER SELECTION
        <div className="scanner-card">
          <div className="scanner-icon"><Radar size={18} /></div>
          <div><b>ECDAT Discovery Engine</b><small>Source, binary, container and certificate analysis</small></div>
          <span className="enabled">Enabled</span>
        </div>
      </label>
      <div className="toggle-row">
        <span>Deep dependency resolution<small>Trace crypto usage across transitive packages</small></span>
        <button className="toggle on"><i /></button>
      </div>
      <div className="toggle-row">
        <span>Include historical drift<small>Compare against the last known posture</small></span>
        <button className="toggle"><i /></button>
      </div>
      <button className="primary-button" onClick={() => { setScanning(true); setProgress(83); }}>
        <Play size={14} fill="currentColor" /> {scanning ? 'Scan in progress' : 'Start discovery scan'}
      </button>
    </Panel>

    <div className="scan-right">
      <Panel title="Scan telemetry" eyebrow="LIVE SESSION" className="scan-progress">
        <div className="scan-status"><span className="pulse" />{scanning ? 'DISCOVERY IN PROGRESS' : 'READY TO SCAN'}<b>{progress}%</b></div>
        <div className="progress-track"><i style={{ width: `${progress}%` }} /></div>
        <div className="scan-stats">
          <div><strong>1,842</strong><small>Files analyzed</small></div>
          <div><strong>317</strong><small>Assets found</small></div>
          <div><strong>42</strong><small>Critical findings</small></div>
        </div>
        <div className="scan-steps">
          <span className="done">Source discovery <b>Complete</b></span>
          <span className="done">Algorithm identification <b>Complete</b></span>
          <span className={scanning ? 'active-step' : ''}>Dependency mapping <b>{scanning ? 'Running' : 'Queued'}</b></span>
          <span>Risk assessment <b>Queued</b></span>
        </div>
      </Panel>
      <Panel title="Discovery log" eyebrow="STREAM">
        <div className="logs">
          <p><time>14:32:08</time><i className="green-dot" />Connected to source registry <b>OK</b></p>
          <p><time>14:32:14</time><i className="green-dot" />Indexed payment-platform / main <b>1,842 files</b></p>
          <p><time>14:32:21</time><i className="blue-dot" />Detected RSA usage in payment-api <b>CRYPTO-001</b></p>
          <p><time>14:32:27</time><i className="red-dot" />Quantum-vulnerable signature found <b>HIGH</b></p>
          <p><time>14:32:36</time><i className="blue-dot" />Resolving transitive dependencies <b>317 nodes</b></p>
        </div>
      </Panel>
    </div>
  </div>
  <div className="scan-summary">
    <Metric icon={Box} value="317" label="Assets discovered" change="+24 new" />
    <Metric icon={AlertTriangle} value="42" label="Critical findings" change="↑ 5%" tone="red" />
    <Metric icon={ShieldCheck} value="78%" label="Policy coverage" change="↑ 8%" tone="cyan" />
  </div></>; 
}

function Inventory({ assets: rows, query, setQuery, onAsset }: { assets: Asset[]; query: string; setQuery: (v: string) => void; onAsset: (a: Asset) => void }) { 
  return <><div className="inventory-toolbar">
    <div className="search-field">
      <Search size={15} />
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by asset, algorithm or application" />
    </div>
    <button className="outline-button"><Filter size={13} /> Filters <span>3</span></button>
    <button className="outline-button"><SlidersHorizontal size={13} /> Columns</button>
  </div>
  <Panel title={`Cryptographic assets / ${rows.length} shown`} eyebrow="EVIDENCE REGISTER" className="inventory-panel">
    <AssetTable assets={rows} onAsset={onAsset} />
  </Panel>
  <div className="inventory-foot">
    <span>Last updated 08 Sep 2026, 14:32 UTC</span>
    <span>Showing {rows.length} of 1,248 assets</span>
  </div></>; 
}

/* ==========================================================================
   ENHANCED GRAPH COMPONENT WITH REALISTIC NETWORK STRUCTURE
   ========================================================================== */

type NodeType = 'crypto' | 'external' | 'api' | 'app' | 'service' | 'database' | 'cloud' | 'data' | 'dependency';

interface GraphNode {
  id: string;
  name: string;
  type: NodeType;
  risk: Risk;
  x: number;
  y: number;
  meta: string;
  icon: typeof Box;
}

interface GraphEdge {
  from: string;
  to: string;
  type: 'direct' | 'dataflow' | 'network' | 'dependency';
  label: string;
}

const graphNodes: GraphNode[] = [
  { id: 'ext-1', name: 'Internet / Public Client', type: 'external', risk: 'Low', x: 60, y: 140, meta: 'External Endpoint', icon: Globe2 },
  { id: 'gw-1', name: 'API Gateway', type: 'api', risk: 'Medium', x: 180, y: 140, meta: 'Edge Proxy', icon: Zap },
  { id: 'rsa-1', name: 'RSA-1024', type: 'crypto', risk: 'Critical', x: 340, y: 80, meta: 'Cryptographic Asset', icon: ShieldCheck },
  { id: 'app-1', name: 'payment-api', type: 'app', risk: 'Critical', x: 340, y: 220, meta: 'Primary App', icon: Box },
  { id: 'dep-1', name: 'OpenSSL 1.1.1', type: 'dependency', risk: 'High', x: 170, y: 280, meta: 'Crypto Library', icon: Package },
  { id: 'svc-1', name: 'payment-service', type: 'service', risk: 'Critical', x: 520, y: 140, meta: 'Transaction Core', icon: Cpu },
  { id: 'db-1', name: 'transaction-db', type: 'database', risk: 'High', x: 680, y: 100, meta: 'PostgreSQL DB', icon: Database },
  { id: 'data-1', name: 'PII Vault', type: 'data', risk: 'Critical', x: 740, y: 180, meta: 'Sensitive Data', icon: Lock },
  { id: 'svc-2', name: 'auth-service', type: 'service', risk: 'High', x: 520, y: 260, meta: 'Identity Service', icon: Cpu },
  { id: 'db-2', name: 'customer-db', type: 'database', risk: 'High', x: 680, y: 260, meta: 'User Directory', icon: Database },
  { id: 'app-2', name: 'user-management', type: 'app', risk: 'Medium', x: 680, y: 360, meta: 'Admin Portal', icon: Box },
  { id: 'svc-3', name: 'analytics', type: 'service', risk: 'Low', x: 340, y: 360, meta: 'Reporting Queue', icon: Layers },
  { id: 'hsm-1', name: 'Cloud HSM', type: 'cloud', risk: 'Low', x: 520, y: 380, meta: 'KMS Key Store', icon: Cloud },
];

const graphEdges: GraphEdge[] = [
  { from: 'ext-1', to: 'gw-1', type: 'network', label: 'HTTPS / TLS 1.3' },
  { from: 'gw-1', to: 'app-1', type: 'network', label: 'mTLS Ingress' },
  { from: 'rsa-1', to: 'gw-1', type: 'direct', label: 'Handshake Cert' },
  { from: 'rsa-1', to: 'app-1', type: 'direct', label: 'Payload Signer' },
  { from: 'dep-1', to: 'app-1', type: 'dependency', label: 'Imported lib' },
  { from: 'app-1', to: 'svc-1', type: 'dataflow', label: 'gRPC Call' },
  { from: 'app-1', to: 'svc-2', type: 'dataflow', label: 'Auth Token' },
  { from: 'app-1', to: 'svc-3', type: 'dataflow', label: 'Telemetry' },
  { from: 'svc-1', to: 'db-1', type: 'dataflow', label: 'SQL Write' },
  { from: 'svc-1', to: 'data-1', type: 'dataflow', label: 'Encrypted Payload' },
  { from: 'svc-2', to: 'db-2', type: 'dataflow', label: 'Identity Lookup' },
  { from: 'svc-2', to: 'app-2', type: 'dataflow', label: 'Role Sync' },
  { from: 'svc-2', to: 'hsm-1', type: 'network', label: 'Key Request' },
];

// Propagation Path Highlight Sequence
const propagationPath = ['rsa-1', 'app-1', 'svc-1', 'data-1'];

function Graph() {
  const [selectedId, setSelectedId] = useState('rsa-1');
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph');
  const [zoomLevel, setZoomLevel] = useState(1);

  const selectedNode = graphNodes.find(n => n.id === selectedId) || graphNodes[2];

  // Connected node IDs & Edge IDs
  const connectedNodeIds = useMemo(() => {
    const ids = new Set<string>([selectedId]);
    graphEdges.forEach(e => {
      if (e.from === selectedId) ids.add(e.to);
      if (e.to === selectedId) ids.add(e.from);
    });
    return ids;
  }, [selectedId]);

  return <><div className="graph-metrics">
    <Metric icon={AlertTriangle} value="42" label="Critical assets" change="↑ 5%" tone="red" />
    <Metric icon={Box} value="128" label="Affected applications" change="↑ 12%" tone="pink" />
    <Metric icon={Network} value="317" label="Downstream services" change="↑ 8%" />
    <Metric icon={Globe2} value="12" label="Externally reachable" change="↑ 33%" tone="cyan" />
  </div>

  <div className="graph-layout">
    <Panel 
      title="Cryptographic Blast Radius & Dependency Topology" 
      eyebrow="RISK INTELLIGENCE" 
      className="graph-panel" 
      action={
        <div className="segmented-control">
          <button className={viewMode === 'graph' ? 'active' : ''} onClick={() => setViewMode('graph')}>Graph view</button>
          <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>List view</button>
        </div>
      }
    >
      {viewMode === 'graph' ? (
        <div className="graph-canvas-wrap">
          {/* Controls Overlay */}
          <div className="graph-controls-overlay">
            <button className="graph-control-btn" title="Zoom in" onClick={() => setZoomLevel(z => Math.min(1.4, z + 0.1))}><ZoomIn size={14} /></button>
            <button className="graph-control-btn" title="Zoom out" onClick={() => setZoomLevel(z => Math.max(0.7, z - 0.1))}><ZoomOut size={14} /></button>
            <button className="graph-control-btn" title="Fit to screen" onClick={() => setZoomLevel(1)}><Maximize2 size={14} /></button>
            <button className="graph-control-btn" title="Reset selection" onClick={() => { setSelectedId('rsa-1'); setZoomLevel(1); }}><RotateCcw size={14} /></button>
          </div>

          {/* Canvas SVG */}
          <svg className="graph-svg-layer" viewBox="0 0 860 460">
            <defs>
              {/* Radial glow background behind focus node */}
              <radialGradient id="focusGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--red)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--red)" stopOpacity="0" />
              </radialGradient>
              {/* Technical Dot Grid Pattern */}
              <pattern id="dotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="1" fill="var(--graph-grid)" />
              </pattern>
            </defs>

            <g transform={`scale(${zoomLevel})`} style={{ transformOrigin: '430px 230px', transition: 'transform 0.2s ease' }}>
              {/* Background Grid */}
              <rect width="860" height="460" fill="url(#dotGrid)" />

              {/* Focus Aura Glow behind Selected Node */}
              <circle 
                cx={selectedNode.x} 
                cy={selectedNode.y} 
                r="70" 
                fill="url(#focusGlow)" 
                style={{ transition: 'all 0.3s ease' }} 
              />

              {/* Render Edges */}
              {graphEdges.map((edge, idx) => {
                const fromNode = graphNodes.find(n => n.id === edge.from);
                const toNode = graphNodes.find(n => n.id === edge.to);
                if (!fromNode || !toNode) return null;

                const isConnected = edge.from === selectedId || edge.to === selectedId;
                const isPropagation = propagationPath.includes(edge.from) && propagationPath.includes(edge.to) && 
                  Math.abs(propagationPath.indexOf(edge.from) - propagationPath.indexOf(edge.to)) === 1;

                return (
                  <g key={`${edge.from}-${edge.to}-${idx}`}>
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      className={`graph-edge edge-${edge.type} edge-${fromNode.risk.toLowerCase()} ${!isConnected && selectedId ? 'dimmed' : ''}`}
                    />
                    {/* Propagation Animated Line */}
                    {isPropagation && (
                      <line
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        className="graph-edge-path"
                      />
                    )}
                  </g>
                );
              })}

              {/* Render Nodes */}
              {graphNodes.map((node) => {
                const IconComp = node.icon;
                const isSelected = node.id === selectedId;
                const isConnected = connectedNodeIds.has(node.id);
                const boxWidth = node.type === 'crypto' ? 124 : 116;
                const boxHeight = 44;

                return (
                  <g
                    key={node.id}
                    className={`graph-node-group ${isSelected ? 'selected' : ''} ${!isConnected ? 'dimmed' : ''}`}
                    transform={`translate(${node.x - boxWidth / 2}, ${node.y - boxHeight / 2})`}
                    onClick={() => setSelectedId(node.id)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <rect
                      width={boxWidth}
                      height={boxHeight}
                      className={`graph-node-box risk-${node.risk.toLowerCase()}`}
                    />
                    {/* Node Icon */}
                    <g transform="translate(10, 14)">
                      <IconComp size={16} stroke={node.risk === 'Critical' ? 'var(--red)' : node.risk === 'High' ? 'var(--orange)' : 'var(--text-secondary)'} />
                    </g>
                    {/* Node Title & Metadata */}
                    <text x="34" y="19" className="graph-node-title">{node.name}</text>
                    <text x="34" y="32" className="graph-node-meta">{node.meta}</text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Interactive Hover Tooltip */}
          {hoveredNode && (
            <div className="graph-tooltip" style={{ left: `${hoveredNode.x}px`, top: `${hoveredNode.y - 30}px` }}>
              <strong>{hoveredNode.name}</strong>
              <span>{hoveredNode.meta}</span>
              <div>
                <RiskBadge risk={hoveredNode.risk} />
                <small className="mono">{hoveredNode.type.toUpperCase()}</small>
              </div>
            </div>
          )}

          {/* Graph Legend */}
          <div className="graph-legend-bar">
            <span><i className="dot red" /> Critical Risk</span>
            <span><i className="dot orange" /> High Risk</span>
            <span><i className="dot yellow" /> Medium Risk</span>
            <span><i className="dot blue" /> Low Risk</span>
            <span style={{ marginLeft: 'auto', opacity: 0.7 }}>Click any node to inspect blast radius</span>
          </div>
        </div>
      ) : (
        <div style={{ padding: '16px' }}>
          <AssetTable assets={assets} onAsset={() => {}} />
        </div>
      )}
    </Panel>

    {/* Side Details Panel */}
    <aside className="graph-side">
      <Panel title="Selected Focus Node" eyebrow="FOCUS ASSET">
        <div className="selected-asset">
          <div className="selected-icon"><ShieldCheck size={20} /></div>
          <div>
            <h2>{selectedNode.name}</h2>
            <span>{selectedNode.meta} · 12 locations</span>
          </div>
          <RiskBadge risk={selectedNode.risk} />
        </div>
        <div className="detail-list">
          <span>Type <b className="mono">{selectedNode.type}</b></span>
          <span>Algorithm <b>{selectedNode.name.includes('RSA') ? 'RSA' : selectedNode.name}</b></span>
          <span>Exposure <b className={selectedNode.risk === 'Critical' ? 'danger-text' : ''}>External Reachable</b></span>
          <span>Blast Radius Score <b>95 / 100</b></span>
        </div>
      </Panel>

      <Panel title="Blast Radius Summary">
        <div className="blast-grid">
          <div><strong>5</strong><small>Applications</small></div>
          <div><strong>17</strong><small>Services</small></div>
          <div><strong>2</strong><small>Databases</small></div>
          <div><strong>2</strong><small>Endpoints</small></div>
        </div>
        <div className="alert-box">
          <AlertTriangle size={15} />
          <span>Can potentially impact <b>12,430 active users</b></span>
        </div>
      </Panel>

      <Panel title="Risk Propagation Chain">
        <div className="propagation">
          {[
            { name: selectedNode.name, sub: 'Source cryptographic primitive' },
            { name: 'payment-api', sub: 'Primary entry workload' },
            { name: 'payment-service', sub: 'Core transaction engine' },
            { name: 'PII Vault', sub: 'Sensitive data store' }
          ].map((item, idx) => (
            <div key={item.name}>
              <b>{idx + 1}</b>
              <span>{item.name}<small>{item.sub}</small></span>
              <RiskBadge risk={idx === 0 || idx === 3 ? 'Critical' : 'High'} />
            </div>
          ))}
        </div>
      </Panel>
    </aside>
  </div>

  <Panel title="Affected Applications & Workloads / 12" eyebrow="IMPACTED SURFACE" className="affected-table">
    <AssetTable assets={assets.slice(0, 5)} onAsset={() => {}} />
  </Panel></>; 
}

function Migration() { 
  const rows = [['RSA-1024', 'ML-KEM-768', 'Critical', 'Low', 'P0'], ['ECDSA P-256', 'ML-DSA-65', 'High', 'Medium', 'P1'], ['RSA-2048', 'Hybrid X25519 + ML-KEM', 'Medium', 'Low', 'P1'], ['SHA-1', 'SHA-3-256', 'High', 'Low', 'P0']]; 
  return <><div className="migration-banner">
    <div>
      <span className="eyebrow">READINESS PROGRAM / PHASE 01</span>
      <h2>Move from quantum-vulnerable to quantum-ready.</h2>
      <p>A prioritized transition plan based on reachability, sensitivity and migration effort.</p>
    </div>
    <div className="readiness">
      <strong>34%</strong><span>Migration readiness</span>
      <div className="progress-track"><i style={{ width: '34%' }} /></div>
    </div>
  </div>
  <div className="migration-stats">
    <Metric icon={AlertTriangle} value="187" label="Need migration" change="42 critical" tone="red" />
    <Metric icon={Target} value="42" label="P0 priority" change="Immediate" tone="pink" />
    <Metric icon={Clock3} value="6–9 mo" label="Estimated runway" change="Q-Day 2031" />
  </div>
  <Panel title="Migration priority queue" eyebrow="RECOMMENDED REPLACEMENTS" className="migration-table">
    <table>
      <thead>
        <tr><th>Current algorithm</th><th>Recommended replacement</th><th>Risk</th><th>Compatibility</th><th>Priority</th><th>Action</th></tr>
      </thead>
      <tbody>
        {rows.map(([current, replacement, risk, compatibility, priority]) => (
          <tr key={current}>
            <td><b>{current}</b><small>Found across payment-api</small></td>
            <td><span className="pqc-pill"><Sparkles size={12} />{replacement}</span></td>
            <td><RiskBadge risk={risk as Risk} /></td>
            <td>{compatibility}</td>
            <td><span className={`priority ${priority.toLowerCase()}`}>{priority}</span></td>
            <td><button className="view-button">Plan migration <ChevronRight size={12} /></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </Panel>
  <div className="roadmap">
    <Panel title="01 / Contain" eyebrow="NOW · 0–30 DAYS">
      <ShieldCheck size={20} />
      <h3>Reduce exposure</h3>
      <p>Isolate 42 critical assets and rotate keys below 2048 bits.</p>
      <button className="text-button">View actions <ArrowUpRight size={13} /></button>
    </Panel>
    <Panel title="02 / Validate" eyebrow="NEXT · 30–90 DAYS">
      <Target size={20} />
      <h3>Prove compatibility</h3>
      <p>Run hybrid-mode tests across gateways and citizen-facing services.</p>
      <button className="text-button">View actions <ArrowUpRight size={13} /></button>
    </Panel>
    <Panel title="03 / Transition" eyebrow="THEN · 90+ DAYS">
      <Sparkles size={20} />
      <h3>Adopt PQC defaults</h3>
      <p>Move approved services to ML-KEM and ML-DSA baselines.</p>
      <button className="text-button">View actions <ArrowUpRight size={13} /></button>
    </Panel>
  </div></>; 
}

function Compliance() { 
  const [policy, setPolicy] = useState('India CII / NTRO baseline'); 
  return <><div className="compliance-hero">
    <div>
      <span className="eyebrow">POLICY POSTURE / INDIA CII CONTEXT</span>
      <h2>Operational confidence, measured.</h2>
      <p>Review cryptographic controls across systems supporting sovereign and critical infrastructure.</p>
    </div>
    <div className="big-score"><strong>78%</strong><span>Overall compliance</span></div>
  </div>
  <div className="compliance-cards">
    <div><i className="dot green" /><strong>972</strong><span>Compliant assets</span></div>
    <div><i className="dot red" /><strong>187</strong><span>Non-compliant</span></div>
    <div><i className="dot yellow" /><strong>89</strong><span>Review required</span></div>
    <div><i className="dot blue" /><strong>4</strong><span>Policy domains</span></div>
  </div>
  <div className="compliance-toolbar">
    <div>
      <span className="eyebrow">ACTIVE POLICY</span>
      <select value={policy} onChange={(e) => setPolicy(e.target.value)}>
        <option>India CII / NTRO baseline</option>
        <option>Internal PQC readiness</option>
        <option>Certificate hygiene</option>
      </select>
    </div>
    <button className="outline-button"><FileText size={13} /> Export assessment</button>
  </div>
  <Panel title="Policy findings" eyebrow="WHY IT MATTERS" className="policy-table">
    <table>
      <thead>
        <tr><th>Finding</th><th>Policy domain</th><th>Assets</th><th>Severity</th><th>Explanation</th><th /></tr>
      </thead>
      <tbody>
        {[
          ['RSA keys below minimum strength', 'Algorithm strength', '42', 'Critical', '1024-bit RSA keys are present on externally reachable services.'],
          ['Legacy protocol detected', 'Transport security', '18', 'High', 'TLS 1.0 remains enabled on an internet-facing endpoint.'],
          ['Unsupported hash function', 'Integrity controls', '31', 'High', 'SHA-1 is used in signing and integrity verification paths.'],
          ['Certificate expiry window', 'Certificate hygiene', '9', 'Medium', 'Certificates expire within the defined operational window.']
        ].map(([finding, domain, count, risk, explanation]) => (
          <tr key={finding}>
            <td><b>{finding}</b></td>
            <td>{domain}</td>
            <td><b>{count}</b></td>
            <td><RiskBadge risk={risk as Risk} /></td>
            <td className="explanation">{explanation}</td>
            <td><button className="view-button">Review <ChevronRight size={12} /></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </Panel></>; 
}

function Drift() { 
  return <><div className="drift-overview">
    <div>
      <span className="eyebrow">SCAN COMPARISON / 07 SEP → 08 SEP 2026</span>
      <h2>What changed in your posture?</h2>
      <p>One day of telemetry, distilled into decisions.</p>
    </div>
    <button className="outline-button"><Clock3 size={13} /> Compare scans <ChevronDown size={12} /></button>
  </div>
  <div className="drift-cards">
    <div className="drift-card green"><ArrowDownRight size={20} /><strong>-18</strong><span>Net assets</span><small>Fewer unmanaged assets</small></div>
    <div className="drift-card red"><ArrowUpRight size={20} /><strong>+24</strong><span>New crypto assets</span><small>Detected since last scan</small></div>
    <div className="drift-card pink"><Zap size={20} /><strong>+7</strong><span>Quantum vulnerable</span><small>Requires triage</small></div>
    <div className="drift-card yellow"><AlertTriangle size={20} /><strong>+4</strong><span>Policy violations</span><small>New findings</small></div>
  </div>
  <div className="drift-grid">
    <Panel title="Risk movement" eyebrow="7 DAY TREND" className="drift-chart">
      <div className="big-chart">
        <svg viewBox="0 0 700 220" preserveAspectRatio="none">
          <path className="gridlines" d="M0 35H700M0 80H700M0 125H700M0 170H700" />
          <path className="line redline" d="M0 120 L100 110 L200 135 L300 95 L400 110 L500 78 L600 88 L700 45" />
          <path className="line blueline" d="M0 175 L100 165 L200 168 L300 142 L400 150 L500 130 L600 140 L700 112" />
        </svg>
        <div className="axis"><span>02 Sep</span><span>04 Sep</span><span>06 Sep</span><span>08 Sep</span></div>
      </div>
      <div className="chart-legend">
        <span><i className="dot red" />Critical exposure</span>
        <span><i className="dot blue" />Overall risk</span>
      </div>
    </Panel>
    <Panel title="Change summary" eyebrow="SIGNALS">
      <div className="change-list">
        <div>
          <span className="change-icon red"><ArrowUpRight size={15} /></span>
          <div><b>New critical exposure in payment-api</b><small>RSA-1024 · External · 14:32 UTC</small></div>
          <RiskBadge risk="Critical" />
        </div>
        <div>
          <span className="change-icon yellow"><Zap size={15} /></span>
          <div><b>7 assets moved to quantum-vulnerable</b><small>Signature algorithm policy update</small></div>
          <RiskBadge risk="High" />
        </div>
        <div>
          <span className="change-icon green"><ArrowDownRight size={15} /></span>
          <div><b>18 assets remediated</b><small>Certificate rotation completed</small></div>
          <span className="resolved">Resolved</span>
        </div>
      </div>
    </Panel>
  </div>
  <Panel title="Detailed drift register" eyebrow="AUDITABLE CHANGELOG" className="drift-table">
    <table>
      <thead>
        <tr><th>Asset</th><th>Change type</th><th>Previous</th><th>Current</th><th>Detected</th><th /></tr>
      </thead>
      <tbody>
        {[
          ['CRYPTO-021', 'New asset', '—', 'RSA-1024', '08 Sep 2026'],
          ['CRYPTO-084', 'Risk increased', 'Medium', 'High', '08 Sep 2026'],
          ['CRYPTO-113', 'Policy violation', 'Compliant', 'Non-compliant', '08 Sep 2026'],
          ['CRYPTO-044', 'Asset removed', 'ECC P-256', '—', '08 Sep 2026']
        ].map((r) => (
          <tr key={r[0]}>
            <td><b>{r[0]}</b></td>
            <td><span className={`change-type ${r[1].includes('removed') ? 'removed' : r[1].includes('increased') || r[1].includes('violation') ? 'raised' : 'new'}`}>{r[1]}</span></td>
            <td>{r[2]}</td>
            <td>{r[3]}</td>
            <td>{r[4]}</td>
            <td><button className="view-button">Inspect <ChevronRight size={12} /></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </Panel></>; 
}

function AssetDrawer({ asset, onClose }: { asset: Asset; onClose: () => void }) { 
  return <div className="drawer-backdrop" onClick={onClose}>
    <aside className="asset-drawer" onClick={(e) => e.stopPropagation()}>
      <div className="drawer-head">
        <div>
          <span className="eyebrow">ASSET DETAIL / {asset.id}</span>
          <h2>{asset.algorithm} <em>{asset.key}</em></h2>
        </div>
        <button className="icon-button" onClick={onClose}><X size={16} /></button>
      </div>
      <div className="drawer-summary">
        <RiskBadge risk={asset.risk} />
        <span className={`exposure ${asset.exposure.toLowerCase()}`}>{asset.exposure} exposure</span>
        <span>{asset.confidence}% confidence</span>
      </div>
      {[
        ['WHAT', 'A cryptographic primitive identified in a production workload.'],
        ['WHERE', `${asset.app} · ${asset.source} · 12 observed locations`],
        ['WHY', `The ${asset.algorithm} configuration is vulnerable to harvest-now-decrypt-later scenarios and falls below the preferred security baseline.`],
        ['SO WHAT', 'If compromised, downstream transaction and identity services may be exposed.'],
        ['WHAT NEXT', 'Prioritize containment, validate a hybrid replacement, then schedule migration through the PQC program.']
      ].map(([title, copy]) => (
        <div className="drawer-section" key={title}>
          <span>{title}</span>
          <p>{copy}</p>
        </div>
      ))}
      <button className="primary-button">Create migration action <ArrowUpRight size={14} /></button>
    </aside>
  </div>; 
}

export default App;
