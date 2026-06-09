import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Package, Store, ShoppingCart, Repeat, PieChart, Users, UserPlus, 
  Landmark, Link, Ticket, HelpCircle, Search, Bell, Menu, Moon, Sun, Filter, 
  ChevronDown, ChevronRight, TriangleAlert, MessageCircleMore, ChevronLeft,
  Flame, SlidersHorizontal, Monitor, CheckSquare, Copy, ArrowUpRight, 
  RefreshCw, Eye, MoreVertical, DownloadCloud, Coins, CalendarDays, PlusCircle,
  BarChart3, CheckCircle2, X, Edit2, Key, Trash2, Gauge, ShoppingBag, CircleDollarSign, FileText, UserSquare, GitBranch, PercentSquare
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { translations } from './i18n';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('pt-BR');
  
  const [faturamentoGoal, setFaturamentoGoal] = useState(10000);
  const [faturamentoCurrent, setFaturamentoCurrent] = useState(0);
  const [faturamentoIcon, setFaturamentoIcon] = useState('🌵');
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [tempGoal, setTempGoal] = useState(10000);
  const [tempCurrent, setTempCurrent] = useState(0);
  const [tempIcon, setTempIcon] = useState('🌵');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('apps');
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false);

  const t = translations[lang];

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const menuItems = [
    { id: 'dashboard', icon: <Gauge size={20} />, label: t.dashboard },
    { id: 'products', icon: <ShoppingBag size={20} />, label: t.products },
    { id: 'vitrine', icon: <ShoppingCart size={20} />, label: t.vitrine },
    { id: 'mySales', icon: <ShoppingBag size={20} />, label: t.mySales },
    { id: 'subscriptions', icon: <CircleDollarSign size={20} />, label: t.subscriptions },
    { id: 'reports', icon: <FileText size={20} />, label: t.reports },
    { id: 'team', icon: <Users size={20} />, label: t.team },
    { id: 'affiliates', icon: <UserSquare size={20} />, label: t.affiliates },
    { id: 'financial', icon: <Landmark size={20} />, label: t.financial },
    { id: 'integrations', icon: <GitBranch size={20} />, label: t.integrations, hasSub: true },
    { id: 'coupons', icon: <PercentSquare size={20} />, label: t.coupons },
    { id: 'quiz', icon: <HelpCircle size={20} />, label: t.quiz },
    { id: 'funeleiro', icon: <Filter size={20} />, label: t.funeleiro },
  ];

  const vitrineProducts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      title: "IA Academy",
      author: "@igxrhenrique",
      temperature: "150°",
      commissionValue: "R$ 145,77",
      tags: ["Order bump", "Página do afiliado"]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      title: "Tok Shop BR",
      author: "Jhonatas Silva",
      temperature: "150°",
      commissionValue: "R$ 234,32",
      tags: ["Order bump"]
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      title: "Mapa dos Fornecedores",
      author: "Premium",
      temperature: "150°",
      commissionValue: "R$ 393,27",
      tags: ["Order bump"]
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      title: "Primeira Venda 24H 3.0",
      author: "Caio Martins",
      temperature: "150°",
      commissionValue: "R$ 10,33",
      tags: ["Order bump", "Upsell", "Página do afiliado"]
    }
  ];

  const revenueData = [
    { date: '01/06', value: 400 },
    { date: '02/06', value: 300 },
    { date: '03/06', value: 550 },
    { date: '04/06', value: 480 },
    { date: '05/06', value: 700 },
    { date: '06/06', value: 650 },
    { date: '07/06', value: 900 }
  ];

  const paymentMethodData = [
    { name: 'Pix', value: 65, color: '#305CDE' },
    { name: 'Cartão', value: 30, color: '#3B82F6' },
    { name: 'Boleto', value: 5, color: '#F59E0B' }
  ];

  const productSalesData = [
    { name: 'IA Academy', value: 12000 },
    { name: 'Tok Shop BR', value: 8500 },
    { name: 'Primeira Venda', value: 5400 },
    { name: 'Mentoria VIP', value: 4100 }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            <div className="page-header" style={{ alignItems: 'flex-start' }}>
              <div>
                <h1 className="page-title">{t.dashboardTitle}</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{t.lastUpdate}</p>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Filter size={14} /> {t.filtersBtn}
                </button>
                <div className="custom-select-wrapper">
                  <select className="custom-select" style={{ minWidth: 120 }}><option>Hoje</option></select>
                  <ChevronDown className="select-icon" size={16} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div className="card" style={{ position: 'relative' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16 }}>{t.revenue}</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>R$ 0,00</div>
                <Eye size={16} style={{ position: 'absolute', bottom: 24, right: 24, color: 'var(--text-secondary)' }} />
              </div>
              <div className="card" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16 }}>
                  <span>{t.salesMade}</span>
                  <span>Boletos impressos</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 32, fontWeight: 700 }}>0</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>0</div>
                </div>
                <Eye size={16} style={{ position: 'absolute', bottom: 24, right: 24, color: 'var(--text-secondary)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 24 }}>
              <div className="card">
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{t.salesOverTime}</div>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="99%" height="100%" minWidth={1} minHeight={1}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#305CDE" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#305CDE" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
                      <RechartsTooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} itemStyle={{ color: '#305CDE' }} />
                      <Area type="monotone" dataKey="value" stroke="#305CDE" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="card" style={{ gridColumn: '1 / -1' }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{t.paymentMethods}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
                  
                  {/* Template 1: Donut Chart */}
                  <div style={{ height: 250, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>Template 1: Donut</div>
                    <ResponsiveContainer width="99%" height="100%" minWidth={1} minHeight={1}>
                      <RechartsPieChart>
                        <Pie
                          data={paymentMethodData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {paymentMethodData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Template 2: Bar Chart */}
                  <div style={{ height: 250, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>Template 2: Bar</div>
                    <ResponsiveContainer width="99%" height="100%" minWidth={1} minHeight={1}>
                      <BarChart data={paymentMethodData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {paymentMethodData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Template 3: Line Chart */}
                  <div style={{ height: 250, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>Template 3: Line</div>
                    <ResponsiveContainer width="99%" height="100%" minWidth={1} minHeight={1}>
                      <AreaChart data={paymentMethodData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorPay" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
                        <Area type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={3} fillOpacity={1} fill="url(#colorPay)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                </div>
              </div>
              <div className="card">
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{t.salesByProduct}</div>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="99%" height="100%" minWidth={1} minHeight={1}>
                    <BarChart data={productSalesData} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
                      <XAxis type="number" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} width={100} />
                      <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
                      <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        );

      case 'vitrine':
        return (
          <>
            <div className="vitrine-banner">
              <div className="vitrine-banner-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'white', padding: '12px 24px', borderRadius: 8, color: '#1A4D2E', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>
                  <span style={{ fontSize: 20 }}>🌵</span>
                  {t.vitrineBannerTitle}
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }}></span>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#305CDE' }}></span>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }}></span>
                </div>
              </div>
            </div>

            <div className="page-header">
              <h1 className="page-title">{t.vitrineTitle}</h1>
            </div>
            
            <div className="filters-row">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={18} />
                <input className="custom-input" type="text" placeholder={t.search} />
              </div>
              <div className="filters-right">
                <div className="custom-select-wrapper">
                  <span style={{ position: 'absolute', top: -10, left: 12, fontSize: 10, background: 'var(--bg-main)', padding: '0 4px', color: 'var(--text-secondary)', zIndex: 1 }}>{t.vitrineCategory}</span>
                  <select className="custom-select"><option>{t.vitrineAllCategories}</option></select>
                  <ChevronDown className="select-icon" size={16} />
                </div>
                <div className="custom-select-wrapper">
                  <span style={{ position: 'absolute', top: -10, left: 12, fontSize: 10, background: 'var(--bg-main)', padding: '0 4px', color: 'var(--text-secondary)', zIndex: 1 }}>{t.vitrineSortBy}</span>
                  <select className="custom-select"><option>{t.vitrineSortHot}</option></select>
                  <ChevronDown className="select-icon" size={16} />
                </div>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <SlidersHorizontal size={16} /> {t.filtersBtn}
                </button>
              </div>
            </div>

            <div className="product-grid">
              {vitrineProducts.map(product => (
                <div className="product-card" key={product.id} onClick={() => setSelectedProduct(product)}>
                  <div className="product-image">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="product-content">
                    <div className="product-header">
                      <h3 className="product-title">{product.title}</h3>
                      <div className="product-temperature">
                        {product.temperature} <Flame size={14} color="#305CDE" />
                      </div>
                    </div>
                    
                    <div className="product-receive">
                      <div className="receive-label">{t.receiveUpTo}</div>
                      <div className="receive-value">{product.commissionValue}</div>
                    </div>

                    <div className="product-tags">
                      {product.tags.map(tag => (
                        <span className="tag" key={tag}>
                          <CheckSquare size={12} color="#305CDE" style={{ marginRight: 4 }} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedProduct && (
              <div className="drawer-overlay" onClick={() => setSelectedProduct(null)}>
                <div className="drawer-content" onClick={e => e.stopPropagation()}>
                  <div className="drawer-header-img">
                    <button className="drawer-close" onClick={() => setSelectedProduct(null)}><X size={16} /></button>
                    <img src={selectedProduct.image} alt={selectedProduct.title} />
                  </div>
                  <div className="drawer-body">
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{selectedProduct.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Por {selectedProduct.author}</p>
                    
                    <div className="drawer-section">
                      <div className="drawer-section-title">Afiliação</div>
                      <button className="btn-primary" style={{ width: '100%', padding: '12px 0', fontWeight: 600, fontSize: 14 }}>{t.reqAffiliation}</button>
                    </div>

                    <div className="drawer-section">
                      <div className="drawer-section-title">{t.prodDetails}</div>
                      <div className="drawer-row">
                        <span className="drawer-row-label">{t.catLabel}</span>
                        <span className="drawer-row-value">{selectedProduct.category || 'Empreendedorismo Digital'}</span>
                      </div>
                      <div className="drawer-row">
                        <span className="drawer-row-label">{t.typeLabel}</span>
                        <span className="drawer-row-value">Pagamento único</span>
                      </div>
                      <div className="drawer-row">
                        <span className="drawer-row-label">{t.receiveUpTo}</span>
                        <span className="drawer-row-value" style={{ color: '#305CDE', fontWeight: 600 }}>{selectedProduct.commissionValue}</span>
                      </div>
                      <div className="drawer-row">
                        <span className="drawer-row-label">{t.commLabel}</span>
                        <span className="drawer-row-value" style={{ color: '#305CDE' }}>50%</span>
                      </div>
                      <div className="drawer-desc">
                        {t.descLabel}:<br/><br/>
                        Comunidade criada para quem quer aprender a construir aplicativos, sistemas, páginas, bots e automações usando o poder da Inteligência Artificial — sem travar, sem depender de programadores e sem precisar dominar código avançado.
                      </div>
                    </div>

                    <div className="drawer-section">
                      <div className="drawer-section-title">{t.detailsLabel}</div>
                      <div className="drawer-row">
                        <span className="drawer-row-label">{t.attrLabel}</span>
                        <span className="drawer-row-value">Último clique</span>
                      </div>
                      <div className="drawer-row">
                        <span className="drawer-row-label">{t.cookieLabel}</span>
                        <span className="drawer-row-value">30</span>
                      </div>
                      <div className="drawer-row">
                        <span className="drawer-row-label">{t.affReqLabel}</span>
                        <span className="drawer-row-value">Não</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </>
        );

      case 'products':
        return (
          <>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="tabs-container" style={{ padding: '24px 24px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 32 }}>
                <div className="tab active">{t.myProductsTab}</div>
                <div className="tab">{t.mySubscriptionsTab}</div>
                <div className="tab">{t.myCoproductionsTab}</div>
                <div className="tab">{t.myAffiliationsTab}</div>
              </div>
              
              <div style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="search-input-wrapper" style={{ margin: 0, maxWidth: 300 }}>
                  <Search className="search-icon" size={18} />
                  <input className="custom-input" type="text" placeholder={t.search} />
                </div>
                <div className="custom-select-wrapper">
                  <span style={{ position: 'absolute', top: -10, left: 12, fontSize: 10, background: 'var(--bg-card)', padding: '0 4px', color: 'var(--text-secondary)', zIndex: 1 }}>Status</span>
                  <select className="custom-select" style={{ minWidth: 120, position: 'relative' }}><option>{t.statusActive}</option></select>
                  <ChevronDown className="select-icon" size={16} />
                </div>
              </div>
              
              <div className="data-table-header" style={{ gridTemplateColumns: '1fr 1fr 1fr 40px' }}>
                <div>{t.colName}</div><div>{t.colPrice}</div><div>{t.colStatus}</div><div></div>
              </div>
              <div style={{ padding: '16px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 40px', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div>Curso de programação</div><div>R$ 20,00</div><div><span className="status-badge status-active">{t.statusActive}</span></div><div style={{ textAlign: 'right' }}><MoreVertical size={16} color="var(--text-secondary)" cursor="pointer" /></div>
              </div>
              <div style={{ padding: '16px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 40px', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div>Curso de programação</div><div>R$ 20,00</div><div><span className="status-badge status-active">{t.statusActive}</span></div><div style={{ textAlign: 'right' }}><MoreVertical size={16} color="var(--text-secondary)" cursor="pointer" /></div>
              </div>
              
              <div style={{ padding: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
                 <ChevronLeft size={16} color="var(--text-secondary)" />
                 <div style={{ width: 24, height: 24, background: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>1</div>
                 <ChevronRight size={16} color="var(--text-secondary)" />
              </div>
            </div>
          </>
        );

      case 'mySales':
        return (
          <>
            <div className="page-header" style={{ alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h1 className="page-title">{t.mySalesTitle}</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{t.lastUpdate}</p>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {t.updateBtn} <RefreshCw size={14} />
                </button>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {t.exportBtn} <ChevronDown size={14} />
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div className="card" style={{ position: 'relative' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16 }}>{t.salesFound}</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>0</div>
                <Eye size={16} style={{ position: 'absolute', bottom: 24, right: 24, color: 'var(--text-secondary)' }} />
              </div>
              <div className="card" style={{ position: 'relative' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16 }}>{t.netValue}</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>R$ 0,00</div>
                <Eye size={16} style={{ position: 'absolute', bottom: 24, right: 24, color: 'var(--text-secondary)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
              <div className="card" style={{ position: 'relative' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16 }}>{t.totalRefunded}</div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>R$ 0,00</div>
                <Eye size={16} style={{ position: 'absolute', bottom: 24, right: 24, color: 'var(--text-secondary)' }} />
              </div>
              <div className="card" style={{ position: 'relative' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16 }}>{t.creditCardSales}</div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>R$ 0,00</div>
                <Eye size={16} style={{ position: 'absolute', bottom: 24, right: 24, color: 'var(--text-secondary)' }} />
              </div>
              <div className="card" style={{ position: 'relative' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16 }}>{t.refundPercentage}</div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>0%</div>
                <Eye size={16} style={{ position: 'absolute', bottom: 24, right: 24, color: 'var(--text-secondary)' }} />
              </div>
              <div className="card" style={{ position: 'relative' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16 }}>{t.chargeback}</div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>R$ 0,00</div>
                <Eye size={16} style={{ position: 'absolute', bottom: 24, right: 24, color: 'var(--text-secondary)' }} />
              </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="tabs-container" style={{ padding: '24px 24px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 32 }}>
                <div className="tab active">{t.tabApproved}</div>
                <div className="tab">{t.tabRefunded}</div>
                <div className="tab">{t.tabChargeback}</div>
                <div className="tab">{t.tabMed}</div>
                <div className="tab">{t.tabAll}</div>
              </div>
              
              <div style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="search-input-wrapper" style={{ margin: 0, maxWidth: 300 }}>
                  <Search className="search-icon" size={18} />
                  <input className="custom-input" type="text" placeholder={t.search} />
                </div>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Filter size={14} /> {t.filtersBtn}
                </button>
              </div>
              
              <div className="data-table-header" style={{ gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1fr 1fr' }}>
                <div>{t.colDate}</div><div>{t.colProduct}</div><div>{t.colClient}</div><div>{t.colStatus}</div><div>{t.colInterest}</div><div>{t.colNetValue}</div>
              </div>
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13 }}>
                {t.noRecords}
              </div>
            </div>
          </>
        );

      case 'subscriptions':
        return (
          <>
            <div className="page-header" style={{ alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h1 className="page-title">{t.subsTitle}</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{t.lastUpdate}</p>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div className="custom-select-wrapper">
                  <span style={{ position: 'absolute', top: -10, left: 12, fontSize: 10, background: 'var(--bg-main)', padding: '0 4px', color: 'var(--text-secondary)', zIndex: 1 }}>Período</span>
                  <select className="custom-select" style={{ minWidth: 120, position: 'relative' }}><option>Sempre</option></select>
                  <ChevronDown className="select-icon" size={16} />
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {t.updateBtn} <RefreshCw size={14} />
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div className="card" style={{ position: 'relative', borderLeft: '4px solid #305CDE' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{t.subsActive} <HelpCircle size={12}/></span>
                  <span>{t.colCommission}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 32, fontWeight: 700 }}>0</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>R$ 0,00</div>
                </div>
                <Eye size={16} style={{ position: 'absolute', bottom: 24, right: 24, color: 'var(--text-secondary)' }} />
              </div>
              <div className="card" style={{ position: 'relative', borderLeft: '4px solid #305CDE' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{t.subsRenewals} <HelpCircle size={12}/></span>
                  <span>{t.colCommission}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 32, fontWeight: 700 }}>0</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>R$ 0,00</div>
                </div>
                <Eye size={16} style={{ position: 'absolute', bottom: 24, right: 24, color: 'var(--text-secondary)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
              <div className="card" style={{ position: 'relative', borderLeft: '4px solid #305CDE' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}>{t.subsLtv} <HelpCircle size={12}/></div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>R$ 0,00</div>
                <Eye size={16} style={{ position: 'absolute', bottom: 24, right: 24, color: 'var(--text-secondary)' }} />
              </div>
              <div className="card" style={{ position: 'relative', borderLeft: '4px solid #FBBF24' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}>{t.subsMrr} <HelpCircle size={12}/></div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>R$ 0,00</div>
                <Eye size={16} style={{ position: 'absolute', bottom: 24, right: 24, color: 'var(--text-secondary)' }} />
              </div>
              <div className="card" style={{ position: 'relative', borderLeft: '4px solid #EF4444' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}>{t.subsChurn} <HelpCircle size={12}/></div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>0%</div>
                <Eye size={16} style={{ position: 'absolute', bottom: 24, right: 24, color: 'var(--text-secondary)' }} />
              </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="search-input-wrapper" style={{ margin: 0, maxWidth: 300 }}>
                  <Search className="search-icon" size={18} />
                  <input className="custom-input" type="text" placeholder={t.search} />
                </div>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Filter size={14} /> {t.filtersBtn}
                </button>
              </div>
              
              <div className="data-table-header" style={{ gridTemplateColumns: '40px 1fr 1fr 1.5fr 1fr 1fr 1fr 1fr 80px' }}>
                <div><input type="checkbox" style={{ accentColor: 'var(--accent-primary)' }}/></div>
                <div>{t.colDate}</div><div>{t.colPlan}</div><div>{t.colProduct}</div><div>{t.colMember}</div><div>{t.colCommission}</div><div>{t.colRenewsOn}</div><div>{t.colStatus}</div><div>{t.colActions}</div>
              </div>
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13 }}>
                {t.noRecords}
              </div>
            </div>
          </>
        );

      case 'reports':
        return (
          <>
            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
              <div className="tabs-container" style={{ padding: '0 24px', display: 'flex', gap: 32 }}>
                <div className="tab active" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '24px 0' }}><Users size={16} /> {t.repCoprod}</div>
                <div className="tab" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '24px 0' }}><BarChart3 size={16} /> {t.repProd}</div>
                <div className="tab" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '24px 0' }}><ShoppingCart size={16} /> {t.repAbandon}</div>
                <div className="tab" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '24px 0' }}><Users size={16} /> {t.repAffiliate}</div>
                <div className="tab" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '24px 0' }}><Coins size={16} /> {t.repBalance}</div>
              </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div className="custom-input-wrapper" style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', top: -10, left: 12, fontSize: 10, background: 'var(--bg-card)', padding: '0 4px', color: 'var(--text-secondary)', zIndex: 1 }}>{t.dateStart}</span>
                      <input className="custom-input" type="text" value="09/05/2026" readOnly style={{ minWidth: 160 }}/>
                      <CalendarDays size={16} color="var(--text-secondary)" style={{ position: 'absolute', right: 12, top: 12 }}/>
                    </div>
                    <div className="custom-input-wrapper" style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', top: -10, left: 12, fontSize: 10, background: 'var(--bg-card)', padding: '0 4px', color: 'var(--text-secondary)', zIndex: 1 }}>{t.dateEnd}</span>
                      <input className="custom-input" type="text" value="09/06/2026" readOnly style={{ minWidth: 160 }}/>
                      <CalendarDays size={16} color="var(--text-secondary)" style={{ position: 'absolute', right: 12, top: 12 }}/>
                    </div>
                  </div>
                  <div className="tabs-container" style={{ display: 'flex', gap: 32 }}>
                    <div className="tab active" style={{ padding: '8px 0' }}>{t.repReceived}</div>
                    <div className="tab" style={{ padding: '8px 0' }}>{t.repSent}</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="custom-select-wrapper">
                    <select className="custom-select" style={{ minWidth: 120 }}><option>Barras</option></select>
                    <ChevronDown className="select-icon" size={16} />
                  </div>
                  <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {t.exportBtn} <ChevronDown size={14} />
                  </button>
                </div>
              </div>
              
              <div style={{ padding: '24px', height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {Array.from({length: 10}).map((_, i) => (
                  <div key={i} style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', height: '10%' }}>
                    <span style={{ position: 'relative', top: -10, color: 'var(--text-secondary)', fontSize: 10 }}>{10 - i}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', height: '0%' }}><span style={{ position: 'relative', top: -10, color: 'var(--text-secondary)', fontSize: 10 }}>0</span></div>
              </div>

              <div className="data-table-header" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div>{t.colDate}</div><div style={{ textAlign: 'center' }}>{t.colTotal}</div>
              </div>
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13 }}>
                {t.noRecords}
              </div>
            </div>
          </>
        );

      case 'affiliates':
        return (
          <>
            <div className="page-header" style={{ alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h1 className="page-title">Meus Afiliados</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 12 }}>Última atualização: menos de um minuto</p>
              </div>
              <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                Atualizar <RefreshCw size={14} />
              </button>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="tabs-container" style={{ padding: '24px 24px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 32 }}>
                <div className="tab active">Ativos</div>
                <div className="tab">Pendentes</div>
                <div className="tab">Desativados</div>
              </div>
              
              <div style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="search-input-wrapper" style={{ margin: 0, maxWidth: 300 }}>
                  <Search className="search-icon" size={18} />
                  <input className="custom-input" type="text" placeholder="Pesquisar" />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MoreVertical size={14} /> Ações
                  </button>
                  <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Filter size={14} /> Filtros
                  </button>
                </div>
              </div>
              
              <div className="data-table-header" style={{ gridTemplateColumns: '40px 1fr 1fr 1.5fr 1fr 1fr 1fr' }}>
                <div><input type="checkbox" style={{ accentColor: 'var(--accent-primary)', width: 16, height: 16, borderRadius: 4, cursor: 'pointer' }}/></div>
                <div>Data</div><div>Nome</div><div>E-Mail</div><div>Produto</div><div>Comissão</div><div>Status</div>
              </div>
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13, borderBottom: '1px solid var(--border-color)' }}>
                Nenhum registro encontrado
              </div>
            </div>
          </>
        );

      case 'financial':
        return (
          <>
            <div className="page-header" style={{ alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h1 className="page-title">Financeiro</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 12 }}>Última atualização: menos de um minuto</p>
              </div>
              <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                Atualizar <RefreshCw size={14} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div className="card" style={{ position: 'relative', borderLeft: '4px solid #00E676', padding: '24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600 }}>Saldo Disponível</div>
                <div style={{ width: '80px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}></div>
              </div>
              <div className="card" style={{ position: 'relative', borderLeft: '4px solid #FBBF24', padding: '24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600 }}>Saldo Pendente</div>
                <div style={{ width: '80px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}></div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
              <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.5, cursor: 'not-allowed' }}>
                Efetuar Saque
              </button>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 32 }}>
              <div className="tabs-container" style={{ padding: '16px 24px 0', display: 'flex', gap: 32, borderBottom: 'none' }}>
                <div className="tab" style={{ padding: '8px 0 16px' }}>Extrato</div>
                <div className="tab" style={{ padding: '8px 0 16px' }}>Dados Bancários</div>
                <div className="tab active" style={{ padding: '8px 0 16px' }}>Identidade</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Completar cadastro</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Preencha seus dados para receber o dinheiro das suas vendas</p>
              </div>
              
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontWeight: 600 }}>
                  <Edit2 size={16} /> Criar cadastro
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 24, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: -8, top: 0, width: 16, height: 16, borderRadius: '50%', background: 'var(--bg-main)', border: '2px solid #00E676', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E676' }}></div>
                    </div>
                    <div style={{ color: '#00E676', fontSize: 14, marginBottom: 16 }}>Criar a minha conta com (CPF)</div>
                    <button className="btn-primary" style={{ background: '#00E676', color: '#101418', fontWeight: 600 }}>Continuar</button>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 14 }}>
                    <PlusCircle size={16} /> Dados cadastrais
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 14 }}>
                    <PlusCircle size={16} /> Confirmar Dados Cadastrais
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 14 }}>
                    <PlusCircle size={16} /> Endereço
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 14 }}>
                    <PlusCircle size={16} /> Confirmar Endereço
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'apps':
        return (
          <>
            <div className="page-header" style={{ marginBottom: 24 }}>
              <h1 className="page-title">Apps</h1>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {[
                { name: 'Notazz', color: '#FF5722', label: 'N', desc: '1 integração' },
                { name: 'TheMembers', color: '#101418', label: 'TM', desc: '0 integrações' },
                { name: 'ActiveCampaign', color: '#0052CC', label: 'AC', desc: '0 integrações' },
                { name: 'Spedy', color: '#4CAF50', label: 'S', desc: '0 integrações' },
                { name: 'ASTRON MEMBERS', color: '#9C27B0', label: 'AM', desc: '0 integrações' },
                { name: 'Memberkit', color: '#E91E63', label: 'M', desc: '0 integrações' },
                { name: 'UTMify', color: '#2196F3', label: 'U', desc: '0 integrações' },
                { name: 'SMSFunnel', color: '#F44336', label: 'SF', desc: '0 integrações' },
                { name: 'Voxuy', color: '#673AB7', label: 'V', desc: '0 integrações' },
                { name: 'Cademí', color: '#3F51B5', label: 'C', desc: '0 integrações' },
                { name: 'Webhooks', color: '#795548', label: 'W', desc: '0 integrações' },
              ].map(app => (
                <div key={app.name} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}>
                  <div style={{ width: 48, height: 48, background: app.color, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>{app.label}</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{app.name}</div>
                    <div style={{ fontSize: 12, color: app.desc === '1 integração' ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>{app.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 'webhooks':
        return (
          <>
            <div className="page-header" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 className="page-title">Webhooks</h1>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
                Dados das últimas 24 horas
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
              {[
                { title: 'Enviados', count: '0', color: '#305CDE' },
                { title: 'Entregues', count: '0', color: '#10B981' },
                { title: 'Em processamento', count: '0', color: '#F59E0B' },
                { title: 'Falharam', count: '0', color: '#EF4444' }
              ].map(stat => (
                <div key={stat.title} className="card" style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{stat.title}</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{stat.count}</div>
                  <div style={{ height: 24, background: 'rgba(255,255,255,0.02)', borderRadius: 4, marginTop: 8 }}></div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
              <div className="card" style={{ padding: 48, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
                <GitBranch size={48} color="var(--text-secondary)" style={{ marginBottom: 16, opacity: 0.5 }} />
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Nenhum webhook encontrado</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Você ainda não criou nenhum webhook. Crie um para começar a receber eventos.</p>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <PlusCircle size={16} /> Criar Novo Webhook
                </button>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Atividades recentes</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13, textAlign: 'center', padding: '32px 0' }}>
                  Nenhuma atividade
                </div>
              </div>
            </div>
          </>
        );

      case 'caktoAPI':
        return (
          <>
            <div className="page-header" style={{ marginBottom: 24 }}>
              <h1 className="page-title">Cakto API</h1>
            </div>

            <div className="card" style={{ padding: 24, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '4px solid var(--accent-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, background: 'rgba(48, 92, 222, 0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 24 }}>🌵</span>
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Documentação Oficial</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Acesse nossa documentação completa para integrar a Cakto ao seu sistema.</p>
                </div>
              </div>
              <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                Acessar Docs <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Chaves de API</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Gerencie suas credenciais de API para integrações personalizadas.</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="search-input-wrapper" style={{ margin: 0 }}>
                    <Search className="search-icon" size={18} />
                    <input className="custom-input" type="text" placeholder="Pesquisar chave..." />
                  </div>
                  <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <PlusCircle size={16} /> Criar Chave API
                  </button>
                </div>
              </div>
              
              <div className="data-table-header" style={{ gridTemplateColumns: '2fr 1fr 1fr 80px' }}>
                <div>Nome da Chave</div><div>Data de Criação</div><div>Permissões</div><div></div>
              </div>
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13, borderBottom: '1px solid var(--border-color)' }}>
                Nenhuma chave de API encontrada
              </div>
            </div>
          </>
        );

      case 'coupons':
        return (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600 }}>{t.coupTitle}</h3>
              <div style={{ display: 'flex', gap: 12 }}>
                <div className="search-input-wrapper" style={{ margin: 0 }}>
                  <Search className="search-icon" size={18} />
                  <input className="custom-input" type="text" placeholder={t.search} />
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <PlusCircle size={16} /> {t.newCoup}
                </button>
              </div>
            </div>
            <div className="data-table-header" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 80px' }}>
              <div>{t.colCode}</div><div>{t.colDiscount}</div><div>{t.colStart}</div><div>{t.colEnd}</div><div>{t.colUses}</div><div></div>
            </div>
            <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13 }}>
              {t.noRecords}
            </div>
          </div>
        );

      default:
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
            Em desenvolvimento...
          </div>
        );
    }
  };

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="https://app.cakto.com.br/assets/cakto-h-logo.svg" alt="cakto" height="32" />
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <React.Fragment key={item.id}>
              <div 
                className={`nav-item ${activeTab === item.id || (item.id === 'integrations' && ['apps', 'webhooks', 'caktoAPI'].includes(activeTab)) ? 'active' : ''}`}
                onClick={() => {
                  if (item.hasSub) {
                    setIsIntegrationsOpen(!isIntegrationsOpen);
                    if (!['apps', 'webhooks', 'caktoAPI'].includes(activeTab)) {
                      setActiveTab('apps');
                    }
                  } else {
                    setActiveTab(item.id);
                  }
                }}
              >
                {item.icon}
                <span className="nav-label">{item.label}</span>
                {item.hasSub && <ChevronRight size={16} className="nav-arrow" style={{ transform: isIntegrationsOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />}
              </div>
              {item.hasSub && isIntegrationsOpen && (
                <div style={{ marginLeft: 36, display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4, marginBottom: 8 }}>
                  <div className={`nav-item ${activeTab === 'apps' ? 'active' : ''}`} onClick={() => setActiveTab('apps')} style={{ padding: '8px 16px', fontSize: 14 }}>Apps</div>
                  <div className={`nav-item ${activeTab === 'webhooks' ? 'active' : ''}`} onClick={() => setActiveTab('webhooks')} style={{ padding: '8px 16px', fontSize: 14 }}>Webhooks</div>
                  <div className={`nav-item ${activeTab === 'caktoAPI' ? 'active' : ''}`} onClick={() => setActiveTab('caktoAPI')} style={{ padding: '8px 16px', fontSize: 14 }}>Cakto API</div>
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <div className="warning-banner">
          <TriangleAlert size={18} />
          <span>{t.warningBanner}</span>
        </div>

        <header className="top-header">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input className="custom-input" type="text" placeholder={t.search} />
          </div>

          <div className="header-actions">
            <div className="custom-select-wrapper">
              <select className="custom-select" style={{ minWidth: 100, border: 'none', background: 'transparent' }} value={lang} onChange={e => setLang(e.target.value)}>
                <option value="pt-BR">PT</option>
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </div>
            <div className="theme-toggle" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </div>
            <div className="notification-bell" style={{ cursor: 'pointer', position: 'relative' }}>
              <Bell size={20} />
              <span className="badge"></span>
            </div>
            <div style={{ position: 'relative' }}>
              <div className="profile-avatar" onClick={() => setIsProfileOpen(!isProfileOpen)} style={{ cursor: 'pointer' }}>N</div>
              
              {isProfileOpen && (
                <div className="profile-dropdown" style={{ width: 300 }}>
                  <div className="sidebar-progress" style={{ border: '1px solid rgba(255, 215, 0, 0.3)', background: 'rgba(255, 215, 0, 0.05)', marginBottom: 16, padding: '12px 16px', borderRadius: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ fontSize: 24 }}>{faturamentoIcon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#FFFFFF', marginBottom: 4 }}>{t.revenue}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>R$ {faturamentoCurrent.toLocaleString('pt-BR')} / R$ {(faturamentoGoal / 1000).toFixed(0)}K</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                      <div className="progress-bar-container" style={{ flex: 1, margin: 0, height: 6, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 3 }}>
                        <div className="progress-bar-fill" style={{ width: `${Math.min((faturamentoCurrent / faturamentoGoal) * 100, 100)}%`, background: 'rgba(255, 255, 255, 0.3)', borderRadius: 3 }}></div>
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#FFFFFF' }}>{((faturamentoCurrent / faturamentoGoal) * 100).toFixed(0)}%</div>
                    </div>
                  </div>
                  
                  <div className="custom-dropdown-item" onClick={() => {
                    setTempGoal(faturamentoGoal);
                    setTempCurrent(faturamentoCurrent);
                    setTempIcon(faturamentoIcon);
                    setIsAdminPanelOpen(true);
                    setIsProfileOpen(false);
                  }}>
                    <Edit2 size={16} /> {t.adminPanel}
                  </div>

                  <div className="profile-dropdown-header" style={{ marginBottom: 8, marginTop: 8 }}>
                    <div style={{ fontWeight: 600 }}>{t.team}</div>
                  </div>
                  <div className="custom-dropdown-item">
                    <Users size={16} /> Meu Perfil
                  </div>
                  <div className="custom-dropdown-item">
                    <HelpCircle size={16} /> Ajuda
                  </div>
                  <div className="custom-dropdown-item" style={{ color: '#EF4444' }}>
                    Sair
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="page-content">
          {renderContent()}
        </div>
      </main>

      {isAdminPanelOpen && (
        <div className="drawer-overlay" style={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsAdminPanelOpen(false)}>
          <div className="card" style={{ width: 400, maxWidth: '90%', margin: 'auto' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: 24, fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Edit2 size={20} color="var(--accent-primary)" /> {t.adminPanel} - {t.editGoal}
            </h3>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>{t.currentRevenue}</label>
              <input type="number" className="custom-input" value={tempCurrent} onChange={e => setTempCurrent(Number(e.target.value))} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>{t.revenueGoal}</label>
              <input type="number" className="custom-input" value={tempGoal} onChange={e => setTempGoal(Number(e.target.value))} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>{t.iconPlaceholder}</label>
              <input type="text" className="custom-input" value={tempIcon} onChange={e => setTempIcon(e.target.value)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button className="btn-secondary" onClick={() => setIsAdminPanelOpen(false)}>{t.cancel}</button>
              <button className="btn-primary" onClick={() => {
                setFaturamentoGoal(tempGoal);
                setFaturamentoCurrent(tempCurrent);
                setFaturamentoIcon(tempIcon);
                setIsAdminPanelOpen(false);
              }}>{t.saveGoal}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
