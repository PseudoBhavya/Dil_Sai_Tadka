import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { analyticsAPI, aiAPI } from '../../services/api';
import { StatCard, Badge, LoadingSpinner, SkeletonTable } from '../../components/ui/UIComponents';
import { StaggerContainer, StaggerItem, ScrollReveal, PageTransition } from '../../animations/ScrollAnimations';

// Tailwind color maps
const COLORS = ['#8E5572', '#F2E3D5', '#3A506B', '#5BC0BE', '#CDEAC0'];

export default function ApiDashboard() {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics', 'ai-reviews', 'ai-chatbot'
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Tab 1: Keys Generator State
  const [newPartnerName, setNewPartnerName] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [generatingKey, setGeneratingKey] = useState(false);

  // Tab 2: AI Summarizer State
  const [aiInsight, setAiInsight] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [regeneratingAi, setRegeneratingAi] = useState(false);

  // Tab 3: AI Culinary Advisor State
  const [query, setQuery] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      role: 'assistant',
      content: 'Welcome to the **Dil Sai Tadka AI Culinary Studio**! 🧑‍🍳\n\nAsk me anything! For example: \n- *"Suggest some spicy vegetarian starters and pairing mains."*\n- *"Recommend dinner combos for a family staycation."*\n- *"What are our highest rated Indian classics?"*'
    }
  ]);
  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, logsRes, integrationsRes] = await Promise.all([
        analyticsAPI.getStats(),
        analyticsAPI.getLogs(),
        analyticsAPI.getIntegrations(),
      ]);
      setStats(statsRes.data);
      setLogs(logsRes.data);
      setIntegrations(integrationsRes.data);
    } catch (err) {
      console.error('Error fetching developer dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateKey = async (e) => {
    e.preventDefault();
    if (!newPartnerName.trim()) return;
    try {
      setGeneratingKey(true);
      const res = await analyticsAPI.createIntegration({ name: newPartnerName });
      setGeneratedKey(res.data.apiKey);
      setNewPartnerName('');
      // Refresh list
      const integrationsRes = await analyticsAPI.getIntegrations();
      setIntegrations(integrationsRes.data);
      // Refresh stats count
      const statsRes = await analyticsAPI.getStats();
      setStats(statsRes.data);
    } catch (err) {
      console.error('Error generating partner key:', err);
    } finally {
      setGeneratingKey(false);
    }
  };

  const handleFetchAiInsights = async (force = false) => {
    try {
      if (force) setRegeneratingAi(true);
      else setLoadingAi(true);

      const res = force 
        ? await aiAPI.triggerSummarize() 
        : await aiAPI.getLatestInsights();

      // Content will be JSON string. Parse it into an object
      let parsed = {};
      try {
        parsed = JSON.parse(res.data.content);
      } catch (err) {
        console.error("Failed to parse insight content JSON", err);
        parsed = {
          summary: res.data.content,
          sentimentScore: res.data.sentimentScore || 0.85,
          satisfactionRating: "88%",
          strengths: ["Premium menu flavors", "Poolside hospitality"],
          complaints: ["Occasional high volume booking waits"],
          actionableInsights: ["Increase staff coverage in dining zones"]
        };
      }
      setAiInsight({
        ...res.data,
        parsed
      });
    } catch (err) {
      console.error('Error fetching AI feedback insights:', err);
    } finally {
      setLoadingAi(false);
      setRegeneratingAi(false);
    }
  };

  // Fetch AI insights when active tab shifts
  useEffect(() => {
    if (activeTab === 'ai-reviews' && !aiInsight) {
      handleFetchAiInsights();
    }
  }, [activeTab]);

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!query.trim() || loadingChat) return;

    const userMsg = query;
    setChatLog(prev => [...prev, { role: 'user', content: userMsg }]);
    setQuery('');
    setLoadingChat(true);

    try {
      const res = await aiAPI.getRecommendations(userMsg);
      setChatLog(prev => [...prev, { role: 'assistant', content: res.data.recommendation }]);
    } catch (err) {
      console.error('Error in culinary chatbot:', err);
      setChatLog(prev => [...prev, { role: 'assistant', content: '⚠️ Apologies, I encountered an issue querying the culinary vault. Please check your connectivity.' }]);
    } finally {
      setLoadingChat(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Safe formatting helpers for Recharts Tooltip
  const renderCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface-container-high border border-outline-variant p-3 rounded-xl shadow-warm-xl text-xs font-semibold">
          <p className="text-primary mb-1">{label}</p>
          {payload.map((p, idx) => (
            <p key={idx} style={{ color: p.color }}>
              {p.name}: {p.value} requests
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <PageTransition className="space-y-8">
      {/* Top Banner Tab Control */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-lowest p-4 rounded-3xl border border-outline-variant/30 shadow-warm">
        <div className="flex gap-2 p-1 bg-surface-container rounded-full overflow-hidden w-full md:w-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 md:flex-none px-5 py-2.5 rounded-full text-xs font-bold tracking-tight transition-all duration-200 ${
              activeTab === 'analytics'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Developer Analytics
          </button>
          <button
            onClick={() => setActiveTab('ai-reviews')}
            className={`flex-1 md:flex-none px-5 py-2.5 rounded-full text-xs font-bold tracking-tight transition-all duration-200 ${
              activeTab === 'ai-reviews'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            AI Review Summary
          </button>
          <button
            onClick={() => setActiveTab('ai-chatbot')}
            className={`flex-1 md:flex-none px-5 py-2.5 rounded-full text-xs font-bold tracking-tight transition-all duration-200 ${
              activeTab === 'ai-chatbot'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Culinary AI Assistant
          </button>
        </div>
        <Badge variant="primary" className="border border-primary-container animate-pulse">
          ⚡ SaaS Live Portal
        </Badge>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-surface-container rounded-3xl animate-pulse" />
            ))}
          </div>
          <div className="h-80 bg-surface-container rounded-3xl animate-pulse" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {/* TAB 1: DEVELOPER ANALYTICS & LOGS */}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Stat Cards Grid */}
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                <StaggerItem>
                  <StatCard icon="database" label="Total API Calls" value={stats?.totalRequests || 0} trendLabel="+100%" />
                </StaggerItem>
                <StaggerItem>
                  <StatCard icon="check_circle" label="Successful Requests" value={stats?.successfulRequests || 0} trendLabel="Active" />
                </StaggerItem>
                <StaggerItem>
                  <StatCard icon="error" label="Failed Requests" value={stats?.failedRequests || 0} trendLabel="Handled" />
                </StaggerItem>
                <StaggerItem>
                  <StatCard icon="speed" label="Average Latency" value={`${stats?.averageResponseTimeMs || 105} ms`} trendLabel="Optimize" />
                </StaggerItem>
                <StaggerItem>
                  <StatCard icon="hub" label="Partner Systems" value={stats?.activePartners || 0} trendLabel="Vetted" />
                </StaggerItem>
              </StaggerContainer>

              {/* Recharts Timelines & Splits */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Traffic Area Chart */}
                <ScrollReveal className="lg:col-span-8 bg-surface-container-lowest rounded-[32px] p-6 border border-outline-variant/30 shadow-warm">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-lg font-bold text-primary">Platform Traffic Distribution</h4>
                      <p className="text-xs text-on-surface-variant">Aggregation of requests across partner API gateways</p>
                    </div>
                    <Badge variant="tertiary">Live updates</Badge>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats?.trafficTimeline || []}>
                        <defs>
                          <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-outline-variant)" opacity={0.3} />
                        <XAxis dataKey="day" stroke="var(--color-on-surface-variant)" fontSize={11} tickLine={false} />
                        <YAxis stroke="var(--color-on-surface-variant)" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip content={renderCustomTooltip} />
                        <Area type="monotone" dataKey="requests" stroke="var(--color-primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRequests)" name="Requests" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </ScrollReveal>

                {/* Endpoint Split Donut Chart */}
                <ScrollReveal className="lg:col-span-4 bg-surface-container-lowest rounded-[32px] p-6 border border-outline-variant/30 shadow-warm" delay={0.1}>
                  <h4 className="text-lg font-bold text-primary mb-1">Top Endpoint Traffic</h4>
                  <p className="text-xs text-on-surface-variant mb-6">Split of incoming calls by system resource</p>
                  <div className="h-56 flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats?.endpointTraffic || []}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {(stats?.endpointTraffic || []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute text-center">
                      <span className="material-symbols-outlined text-primary text-3xl">api</span>
                      <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">RESOURCES</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    {(stats?.endpointTraffic || []).map((item, index) => (
                      <div key={item.name} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2 font-semibold text-on-surface">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                          <span className="truncate max-w-[150px]">{item.name.replace('/api/partner/', '')}</span>
                        </div>
                        <span className="font-bold text-primary">{item.value} calls</span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

              {/* Partner Keys Registry & Bar Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Generate New API Keys */}
                <ScrollReveal className="lg:col-span-5 bg-surface-container-low rounded-[32px] p-6 border border-outline-variant/30 shadow-warm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">key</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-primary">Partner API Key Manager</h4>
                        <p className="text-xs text-on-surface-variant">Issue active credentials for aggregators</p>
                      </div>
                    </div>

                    <form onSubmit={handleGenerateKey} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                          Partner/Client Name
                        </label>
                        <input
                          type="text"
                          value={newPartnerName}
                          onChange={(e) => setNewPartnerName(e.target.value)}
                          placeholder="e.g. Swiggy Super Partner"
                          className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={generatingKey || !newPartnerName.trim()}
                        className="w-full py-3 bg-primary text-on-primary font-semibold text-xs rounded-xl shadow hover:bg-primary/95 hover:translate-y-[-1px] transition-all disabled:opacity-50"
                      >
                        {generatingKey ? 'Generating Vault Credential...' : 'Generate Partner API Key'}
                      </button>
                    </form>

                    {generatedKey && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-primary-container/10 border border-primary-container/30 rounded-2xl"
                      >
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Vault Key Generated Successfully</p>
                        <p className="text-[11px] text-on-surface-variant mb-2">Copy this token securely. It will not be shown again.</p>
                        <div className="flex items-center justify-between gap-2 bg-surface-container-lowest p-2 rounded-xl border border-outline-variant">
                          <code className="text-xs text-primary font-bold select-all truncate">{generatedKey}</code>
                          <button
                            onClick={() => copyToClipboard(generatedKey)}
                            className="p-1.5 text-primary hover:bg-primary-container/20 rounded-lg transition-all"
                          >
                            <span className="material-symbols-outlined text-sm">content_copy</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="border-t border-outline-variant/30 pt-4 mt-6">
                    <h5 className="text-xs font-bold text-on-surface mb-2 uppercase tracking-wide">Registered Integrations</h5>
                    <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                      {integrations.map((p) => (
                        <div key={p.id} className="flex justify-between items-center p-2.5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-xs">
                          <div className="font-semibold text-on-surface">{p.name}</div>
                          <div className="flex items-center gap-2">
                            <Badge variant={p.status === 'ACTIVE' ? 'success' : 'error'}>{p.status}</Badge>
                            <button
                              onClick={() => copyToClipboard(p.apiKey)}
                              className="text-on-surface-variant hover:text-primary transition-all"
                              title="Copy saved key"
                            >
                              <span className="material-symbols-outlined text-[14px]">content_copy</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                {/* Partner Splits Bar Chart */}
                <ScrollReveal className="lg:col-span-7 bg-surface-container-lowest rounded-[32px] p-6 border border-outline-variant/30 shadow-warm" delay={0.15}>
                  <h4 className="text-lg font-bold text-primary mb-1">Partner Traffic Volume</h4>
                  <p className="text-xs text-on-surface-variant mb-6">Call volume break down per integrated client network</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats?.partnerActivity || []}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-outline-variant)" opacity={0.3} />
                        <XAxis dataKey="partner" stroke="var(--color-on-surface-variant)" fontSize={11} tickLine={false} />
                        <YAxis stroke="var(--color-on-surface-variant)" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Bar dataKey="calls" fill="var(--color-primary)" radius={[8, 8, 0, 0]} name="API Requests" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </ScrollReveal>
              </div>

              {/* Developer Logs Console */}
              <ScrollReveal className="bg-surface-container-lowest rounded-[32px] p-6 border border-outline-variant/30 shadow-warm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="text-lg font-bold text-primary">Real-time Aggregations Logs Console</h4>
                    <p className="text-xs text-on-surface-variant">Incoming third-party calls trace list with latency</p>
                  </div>
                  <button
                    onClick={fetchDashboardData}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-outline-variant/50 hover:bg-surface-container text-xs font-semibold rounded-xl text-on-surface transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">refresh</span>
                    Sync
                  </button>
                </div>
                <div className="overflow-x-auto">
                  {logs.length === 0 ? (
                    <div className="text-center py-8 text-on-surface-variant text-xs font-semibold">No recent logs recorded. Query partner endpoints to see live updates.</div>
                  ) : (
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-outline-variant/50 text-on-surface-variant font-bold">
                          <th className="pb-3 pl-2">Timestamp</th>
                          <th className="pb-3">Partner Client</th>
                          <th className="pb-3">HTTP Route</th>
                          <th className="pb-3">Method</th>
                          <th className="pb-3">Code</th>
                          <th className="pb-3">Latency</th>
                          <th className="pb-3 pr-2">Logs details / Errors</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map((log) => {
                          const isSuccess = log.statusCode >= 200 && log.statusCode < 300;
                          return (
                            <tr key={log.id} className="border-b border-outline-variant/20 hover:bg-surface-container/20 transition-all font-medium">
                              <td className="py-3 pl-2 text-on-surface-variant font-semibold select-none">
                                {new Date(log.timestamp).toLocaleString()}
                              </td>
                              <td className="py-3 text-on-surface font-bold">{log.partnerName}</td>
                              <td className="py-3"><code className="bg-surface-container px-2 py-0.5 rounded text-primary font-bold">{log.endpoint}</code></td>
                              <td className="py-3"><Badge variant="secondary">{log.method}</Badge></td>
                              <td className="py-3">
                                <Badge variant={isSuccess ? 'success' : 'error'}>{log.statusCode}</Badge>
                              </td>
                              <td className="py-3 font-semibold text-primary">{log.responseTimeMs} ms</td>
                              <td className="py-3 text-on-surface-variant truncate max-w-[200px] pr-2">
                                {log.errorMessage ? <span className="text-error font-bold">{log.errorMessage}</span> : <span className="text-[#1a4d1a]">Transaction safe</span>}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </ScrollReveal>
            </motion.div>
          )}

          {/* TAB 2: AI FEEDBACK SUMMARIZER */}
          {activeTab === 'ai-reviews' && (
            <motion.div
              key="ai-reviews"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {loadingAi ? (
                <div className="flex flex-col items-center justify-center py-24 bg-surface-container-lowest rounded-[32px] border border-outline-variant/30">
                  <LoadingSpinner size="lg" className="mb-4" />
                  <p className="text-sm font-semibold text-primary">Interrogating review vault and compiling AI insights...</p>
                </div>
              ) : aiInsight ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Gauge & Aggregations Dashboard */}
                  <ScrollReveal className="lg:col-span-5 bg-surface-container-lowest rounded-[32px] p-6 border border-outline-variant/30 shadow-warm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <Badge variant="primary" className="border border-primary-container">
                          ✨ Groq Llama3 Engine
                        </Badge>
                        <span className="text-[10px] font-bold text-on-surface-variant">Last updated: {new Date(aiInsight.createdAt).toLocaleTimeString()}</span>
                      </div>

                      <div className="text-center py-6 flex flex-col items-center">
                        <div className="w-36 h-36 rounded-full border-4 border-primary-container/20 flex flex-col items-center justify-center relative mb-4">
                          <h4 className="text-4xl font-extrabold text-primary leading-none">{aiInsight.parsed?.satisfactionRating || '92%'}</h4>
                          <p className="text-[9px] font-bold text-on-surface-variant tracking-wider uppercase mt-1">GUEST SATISFACTION</p>
                          <motion.div
                            initial={{ rotate: -90 }}
                            animate={{ rotate: (aiInsight.parsed?.sentimentScore || 0.85) * 180 - 90 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="absolute w-2 h-16 origin-bottom -translate-y-8"
                            style={{ bottom: '50%' }}
                          >
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </motion.div>
                        </div>
                        <h5 className="text-sm font-bold text-on-surface mb-1">Excellent Sentiment Averages</h5>
                        <p className="text-xs text-on-surface-variant max-w-xs">Our platform averages a sentiment score of **{(aiInsight.parsed?.sentimentScore || 0.85).toFixed(2)} / 1.0** based on customer audits.</p>
                      </div>
                    </div>

                    <div className="border-t border-outline-variant/30 pt-4 mt-6">
                      <button
                        onClick={() => handleFetchAiInsights(true)}
                        disabled={regeneratingAi}
                        className="w-full py-3 bg-primary text-on-primary font-semibold text-xs rounded-xl shadow hover:bg-primary/95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        {regeneratingAi ? (
                          <>
                            <LoadingSpinner size="sm" />
                            Regenerating Vault Audit...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-sm">refresh</span>
                            Regenerate Review Audit
                          </>
                        )}
                      </button>
                    </div>
                  </ScrollReveal>

                  {/* Summary & Bullet Insights */}
                  <ScrollReveal className="lg:col-span-7 bg-surface-container-lowest rounded-[32px] p-6 border border-outline-variant/30 shadow-warm space-y-6" delay={0.1}>
                    <div>
                      <h4 className="text-lg font-bold text-primary mb-1">Executive Summary Insight</h4>
                      <p className="text-xs text-on-surface-variant mb-3">Generative AI narrative summarizing active customer feedback</p>
                      <p className="text-sm text-on-surface leading-relaxed italic bg-surface-container-low/30 p-4 rounded-2xl border border-outline-variant/20">
                        "{aiInsight.parsed?.summary || aiInsight.content}"
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Positive Highlights */}
                      <div className="p-4 bg-primary-container/10 border border-primary-container/20 rounded-2xl">
                        <div className="flex items-center gap-1.5 mb-3 text-[#1a4d1a]">
                          <span className="material-symbols-outlined text-lg">thumb_up</span>
                          <h5 className="text-xs font-bold uppercase tracking-wider">Key Strengths</h5>
                        </div>
                        <ul className="space-y-2 text-xs text-on-surface font-semibold">
                          {(aiInsight.parsed?.strengths || []).map((s, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span>✨</span>
                              <span className="leading-relaxed">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Top Complaints */}
                      <div className="p-4 bg-error-container/10 border border-error-container/20 rounded-2xl">
                        <div className="flex items-center gap-1.5 mb-3 text-error">
                          <span className="material-symbols-outlined text-lg">thumb_down</span>
                          <h5 className="text-xs font-bold uppercase tracking-wider">Active Complaints</h5>
                        </div>
                        <ul className="space-y-2 text-xs text-on-surface font-semibold">
                          {(aiInsight.parsed?.complaints || []).map((c, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span>⚠️</span>
                              <span className="leading-relaxed">{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Actionable Recommendations */}
                    <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/30">
                      <div className="flex items-center gap-2 mb-3 text-primary">
                        <span className="material-symbols-outlined">lightbulb</span>
                        <h5 className="text-xs font-bold uppercase tracking-wider">AI Operations Recommendations</h5>
                      </div>
                      <ol className="space-y-2 text-xs text-on-surface-variant font-semibold list-decimal pl-4">
                        {(aiInsight.parsed?.actionableInsights || []).map((i, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {i}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </ScrollReveal>
                </div>
              ) : (
                <div className="text-center py-20 bg-surface-container-lowest rounded-[32px] border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-5xl mb-3">reviews</span>
                  <h4 className="text-base font-bold text-on-surface">No feedback summary found in PostgreSQL database.</h4>
                  <button
                    onClick={() => handleFetchAiInsights(true)}
                    className="mt-4 px-6 py-2.5 bg-primary text-on-primary text-xs font-bold rounded-xl"
                  >
                    Run First Audit
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: CULINARY AI BOT */}
          {activeTab === 'ai-chatbot' && (
            <motion.div
              key="ai-chatbot"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-surface-container-lowest rounded-[32px] border border-outline-variant/30 shadow-warm overflow-hidden h-[550px] flex flex-col"
            >
              {/* Chat Header */}
              <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary relative">
                    <span className="material-symbols-outlined">restaurant</span>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#CDEAC0] rounded-full border-2 border-surface" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface leading-tight">Culinary Advisor & Recommender</h4>
                    <p className="text-[10px] text-on-surface-variant font-semibold">Groq AI-powered Gastronomy Chatbot</p>
                  </div>
                </div>
                <Badge variant="primary" className="border border-primary-container">
                  Interactive Live
                </Badge>
              </div>

              {/* Chat Message Logs */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatLog.map((msg, i) => {
                  const isUser = msg.role === 'user';
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 max-w-[80%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isUser ? 'bg-primary text-on-primary' : 'bg-primary-container/20 text-primary'}`}>
                        {isUser ? 'U' : 'AI'}
                      </div>
                      <div className={`p-4 rounded-3xl text-xs leading-relaxed font-medium whitespace-pre-line shadow-sm border ${
                        isUser 
                          ? 'bg-primary text-on-primary border-primary rounded-tr-none' 
                          : 'bg-surface-container-low text-on-surface border-outline-variant/35 rounded-tl-none'
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  );
                })}
                {loadingChat && (
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-primary-container/20 text-primary flex items-center justify-center text-xs font-bold">AI</div>
                    <div className="p-4 bg-surface-container-low text-on-surface rounded-3xl rounded-tl-none border border-outline-variant/35 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Footer Form */}
              <form onSubmit={handleSendChat} className="bg-surface-container-low p-4 border-t border-outline-variant/30 flex gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={loadingChat}
                  placeholder="Ask for recommendations... e.g. 'Recommend some family dinner combos'"
                  className="flex-1 px-4 py-3.5 bg-surface-container-lowest border border-outline-variant/50 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
                />
                <button
                  type="submit"
                  disabled={loadingChat || !query.trim()}
                  className="px-5 py-3.5 bg-primary text-on-primary rounded-2xl hover:bg-primary/95 transition-all text-xs font-bold disabled:opacity-50 shrink-0 flex items-center gap-1.5"
                >
                  Query Advisor
                  <span className="material-symbols-outlined text-xs">send</span>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </PageTransition>
  );
}
