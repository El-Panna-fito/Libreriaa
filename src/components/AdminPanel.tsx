/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit3, Save, X, LayoutDashboard, Book as BookIcon, Settings, DollarSign, CheckCircle, Clock, AlertCircle, TrendingUp, Users, ShoppingBag } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: string;
  audioPrice: string;
  rating: number;
  cover: string;
  description: string;
}

interface Sale {
  id: string;
  bookTitle: string;
  customerName: string;
  date: string;
  status: 'Completada' | 'Pendiente' | 'Cancelada';
  total: string;
}

interface AdminPanelProps {
  books: Book[];
  sales: Sale[];
  onUpdateSales: (sales: Sale[]) => void;
  onAddBook: (book: Book) => void;
  onUpdateBook: (book: Book) => void;
  onDeleteBook: (id: number) => void;
  onClose: () => void;
  onLogout: () => void;
  settings: {
    storeName: string;
    whatsappNumber: string;
    notifications: boolean;
    currencySymbol: string;
    themeColor: string;
    instagramUrl: string;
    twitterUrl: string;
    behanceUrl: string;
    spotifyUrl: string;
  };
  onUpdateSettings: (settings: any) => void;
}

const MOCK_SALES_HISTORY = [
  { name: 'Lun', sales: 4000, orders: 24 },
  { name: 'Mar', sales: 3000, orders: 13 },
  { name: 'Mie', sales: 2000, orders: 98 },
  { name: 'Jue', sales: 2780, orders: 39 },
  { name: 'Vie', sales: 1890, orders: 48 },
  { name: 'Sab', sales: 2390, orders: 38 },
  { name: 'Dom', sales: 3490, orders: 43 },
];

const CATEGORY_DATA = [
  { name: 'Gótico', value: 450 },
  { name: 'Poesía', value: 300 },
  { name: 'Ficción', value: 250 },
  { name: 'Misterio', value: 200 },
];

const COLORS = ['#8B0000', '#B8860B', '#2F4F4F', '#4B0082'];

const MOCK_SALES: Sale[] = [
  { id: 'ORD-7721', bookTitle: 'Promesas de Sangre', customerName: 'Gabriel Solis', date: '2024-05-01', status: 'Completada', total: '$28.99' },
  { id: 'ORD-8812', bookTitle: 'El Vals del Velo', customerName: 'Lucía Fernández', date: '2024-05-03', status: 'Pendiente', total: '$26.50' },
  { id: 'ORD-9903', bookTitle: 'Cadenas de Terciopelo (Audio)', customerName: 'Marcos Rivas', date: '2024-05-05', status: 'Completada', total: '$18.00' },
  { id: 'ORD-1104', bookTitle: 'Ecos del Mausoleo', customerName: 'Elena Troy', date: '2024-05-07', status: 'Cancelada', total: '$22.00' },
];

type View = 'dashboard' | 'catalog' | 'sales' | 'settings';

export const AdminPanel: React.FC<AdminPanelProps> = ({ books, sales, onUpdateSales, onAddBook, onUpdateBook, onDeleteBook, onClose, onLogout, settings, onUpdateSettings }) => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [settingsSubView, setSettingsSubView] = useState<'general' | 'appearance' | 'social'>('general');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Book>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (book: Book) => {
    setEditingId(book.id);
    setFormData(book);
  };

  const handleSave = () => {
    if (editingId) {
      onUpdateBook(formData as Book);
      setEditingId(null);
    } else if (isAdding) {
      onAddBook(formData as Book);
      setIsAdding(false);
    }
    setFormData({});
  };

  const updateSaleStatus = (id: string, newStatus: Sale['status']) => {
    onUpdateSales(sales.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const generateRandomSales = () => {
    const newSales = [...sales];
    const names = ['Gabriel Solis', 'Lucía Fernández', 'Marcos Rivas', 'Elena Troy', 'Amara Thorne', 'Silas Draven', 'Clara Vane', 'Julian Hill', 'Emilia Rose', 'Valerie Draven', 'Mateo Blackwood', 'Adeline Thorne'];
    
    // Generate 15 random sales over the past week
    for (let i = 0; i < 15; i++) {
      const daysAgo = Math.floor(Math.random() * 7);
      const d = new Date();
      d.setDate(d.getDate() - daysAgo);
      const dateStr = d.toISOString().split('T')[0];
      
      const randomBook = books[Math.floor(Math.random() * books.length)] || { title: 'Tomo Secreto', price: '$35000', audioPrice: '$17000' };
      const isAudio = Math.random() > 0.4;
      const total = isAudio ? (randomBook.audioPrice || '$17500') : (randomBook.price || '$34500');
      const id = `OC-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.floor(Math.random() * 900) + 100}`;
      
      newSales.push({
        id,
        bookTitle: randomBook.title + (isAudio ? ' (Audio)' : ''),
        customerName: names[Math.floor(Math.random() * names.length)],
        date: dateStr,
        status: 'Completada',
        total: total
      });
    }
    
    // Sort descending by date
    newSales.sort((a, b) => b.date.localeCompare(a.date));
    onUpdateSales(newSales);
  };

  const clearSales = () => {
    onUpdateSales([]);
  };

  // Dynamic Statistics
  const parsedSales = sales.map(s => ({
    ...s,
    numericTotal: parseFloat((s.total || '').toString().replace(/[^0-9.,]/g, '').replace(',', '.')) || 0
  }));

  const totalIncome = parsedSales.reduce((acc, s) => s.status === 'Completada' ? acc + s.numericTotal : acc, 0);
  const completedSalesCount = sales.filter(s => s.status === 'Completada').length;
  
  // Calculate sales history for chart (grouped by date of last 7 days)
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayName = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'][d.getDay()];
    const daySales = parsedSales
      .filter(s => s.date === dateStr && s.status === 'Completada')
      .reduce((acc, s) => acc + s.numericTotal, 0);
    return { name: dayName, sales: daySales };
  });

  // Calculate category data
  const categoryStats = books.reduce((acc: any, book) => {
    const count = sales.filter(s => s.bookTitle.includes(book.title)).length;
    if (count > 0) {
      acc.push({ name: book.category, value: count });
    }
    return acc;
  }, []);

  const displayCategoryData = categoryStats.length > 0 ? categoryStats : CATEGORY_DATA;

  return (
    <div className="fixed inset-0 z-[200] bg-black flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl p-8 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-crimson rounded shadow-[0_0_10px_rgba(139,0,0,0.5)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">{settings.storeName.charAt(0)}</span>
          </div>
          <span className="font-serif font-bold tracking-tighter text-white">Admin<span className="text-white/40">Panel</span></span>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarLink 
            icon={<LayoutDashboard className="w-4 h-4" />} 
            label="Dashboard" 
            active={activeView === 'dashboard'} 
            onClick={() => setActiveView('dashboard')}
          />
          <SidebarLink 
            icon={<BookIcon className="w-4 h-4" />} 
            label="Catálogo" 
            active={activeView === 'catalog'} 
            onClick={() => setActiveView('catalog')}
          />
          <SidebarLink 
            icon={<DollarSign className="w-4 h-4" />} 
            label="Ventas" 
            active={activeView === 'sales'} 
            onClick={() => setActiveView('sales')}
          />
          <SidebarLink 
            icon={<Settings className="w-4 h-4" />} 
            label="Ajustes" 
            active={activeView === 'settings'} 
            onClick={() => setActiveView('settings')}
          />
        </nav>

        <button 
          onClick={onLogout}
          className="mt-auto py-3 border border-white/10 hover:bg-white/5 transition-all text-xs uppercase tracking-widest text-white/60 hover:text-white"
        >
          Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12 relative bg-[linear-gradient(to_bottom_right,rgba(139,0,0,0.05),transparent)]">
        <div className="max-w-5xl mx-auto">
          
          {activeView === 'catalog' && (
            <>
              <header className="flex justify-between items-end mb-12">
                <div>
                  <h1 className="text-4xl font-serif mb-2 text-white">Gestión de Biblioteca</h1>
                  <p className="text-gray-500 font-light">Controla el inventario del mausoleo literario.</p>
                </div>
                <button 
                  onClick={() => { setIsAdding(true); setFormData({}); }}
                  className="flex items-center gap-2 px-6 py-3 bg-crimson text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                >
                  <Plus className="w-4 h-4" /> Nuevo Libro
                </button>
              </header>

              {/* Form Modal (Add/Edit) */}
              {(editingId || isAdding) && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12 glass p-8 rounded-2xl border-crimson/20"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-serif text-white">{isAdding ? 'Añadir Nueva Obra' : 'Editar Obra'}</h3>
                    <button onClick={() => { setEditingId(null); setIsAdding(false); }} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                      <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Vista Previa</label>
                      <div className="aspect-[3/4] w-full bg-white/5 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center relative">
                        {formData.cover ? (
                          <img 
                            src={formData.cover} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x400?text=URL+Invalido')} 
                          />
                        ) : (
                          <div className="text-gray-700 text-center p-4">
                            <BookIcon className="w-8 h-8 mx-auto mb-2 opacity-20" />
                            <span className="text-[10px] uppercase tracking-tighter">Sin imagen</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2 grid grid-cols-2 gap-6">
                      <Input label="Título" value={formData.title || ''} onChange={v => setFormData({...formData, title: v})} />
                      <Input label="Autor" value={formData.author || ''} onChange={v => setFormData({...formData, author: v})} />
                      <Input label="Categoría" value={formData.category || ''} onChange={v => setFormData({...formData, category: v})} />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="Precio Físico" value={formData.price || ''} onChange={v => setFormData({...formData, price: v})} />
                        <Input label="Precio Audio" value={formData.audioPrice || ''} onChange={v => setFormData({...formData, audioPrice: v})} />
                      </div>
                      <div className="col-span-2">
                        <Input label="Imagen URL" value={formData.cover || ''} onChange={v => setFormData({...formData, cover: v})} />
                        <p className="text-[9px] text-gray-600 mt-1 uppercase tracking-wider">Formatos: JPG, PNG, WEBP. Use enlaces directos (ej: Unsplash).</p>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Sinopsis</label>
                        <textarea 
                          value={formData.description || ''} 
                          onChange={e => setFormData({...formData, description: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-crimson focus:outline-none h-32 transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleSave}
                    className="mt-8 px-10 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-crimson hover:text-white transition-all w-full flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Guardar Cambios en el Registro
                  </button>
                </motion.div>
              )}

              {/* List Table */}
              <div className="glass rounded-2xl overflow-hidden border-white/5">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                      <th className="px-6 py-4 font-bold">Obra</th>
                      <th className="px-6 py-4 font-bold">Género</th>
                      <th className="px-6 py-4 font-bold">Precio</th>
                      <th className="px-6 py-4 font-bold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {books.map(book => (
                      <tr key={book.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-5 flex items-center gap-4">
                          <img 
                            src={book.cover} 
                            className="w-10 h-14 object-cover rounded shadow-md" 
                            alt="" 
                            referrerPolicy="no-referrer" 
                          />
                          <div>
                            <div className="font-medium text-white">{book.title}</div>
                            <div className="text-gray-500 text-xs">{book.author}</div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-[10px] px-2 py-1 bg-white/5 rounded border border-white/10 uppercase tracking-widest text-gray-400">
                            {book.category}
                          </span>
                        </td>
                        <td className="px-6 py-5 font-mono text-crimson">{book.price}</td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-3 text-gray-500">
                            <button onClick={() => handleEdit(book)} className="p-2 hover:text-white transition-colors"><Edit3 className="w-4 h-4" /></button>
                            <button onClick={() => onDeleteBook(book.id)} className="p-2 hover:text-crimson transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeView === 'sales' && (
            <>
              <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-serif mb-2 text-white">Registro de Ventas</h1>
                  <p className="text-gray-500 font-light font-sans">Monitorea los tesoros adquiridos por la hermandad.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={generateRandomSales}
                    className="px-4 py-2.5 bg-crimson hover:brightness-125 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(139,0,0,0.3)] active:scale-95"
                  >
                    <TrendingUp className="w-4 h-4" /> Generar Stock de Ventas (Demo)
                  </button>
                  <button 
                    onClick={clearSales}
                    className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-gray-400 hover:text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 border border-white/5 active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" /> Limpiar Registro
                  </button>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatCard label="Ingresos Totales" value={`${settings.currencySymbol}${totalIncome.toFixed(2)}`} icon={<DollarSign />} color="crimson" />
                <StatCard label="Ventas Completadas" value={completedSalesCount.toString()} icon={<BookIcon />} color="white" />
                <StatCard label="Total Pedidos" value={sales.length.toString()} icon={<AlertCircle />} color="gray" />
              </div>

              <div className="glass rounded-2xl overflow-hidden border-white/5">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                      <th className="px-6 py-4 font-bold">Pedido</th>
                      <th className="px-6 py-4 font-bold">Criterio</th>
                      <th className="px-6 py-4 font-bold">Fecha</th>
                      <th className="px-6 py-4 font-bold text-center">Estado</th>
                      <th className="px-6 py-4 font-bold text-right">Importe</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {sales.map(sale => (
                      <tr key={sale.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-mono text-crimson text-xs">{sale.id}</div>
                          <div className="text-white text-xs">{sale.bookTitle}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">{sale.customerName}</td>
                        <td className="px-6 py-4 text-gray-500 text-xs">{sale.date}</td>
                        <td className="px-6 py-4 text-center">
                          <select 
                            value={sale.status} 
                            onChange={(e) => updateSaleStatus(sale.id, e.target.value as Sale['status'])}
                            className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-black border border-white/10 ${
                              sale.status === 'Completada' ? 'text-green-500' : 
                              sale.status === 'Pendiente' ? 'text-yellow-500' : 'text-red-500'
                            }`}
                          >
                            <option value="Completada">Completada</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Cancelada">Cancelada</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-white">{sale.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeView === 'dashboard' && (
            <div className="space-y-12">
              <header>
                <h1 className="text-4xl font-serif mb-2 text-white">Centro de Mando</h1>
                <p className="text-gray-500 font-light">Análisis en tiempo real de la actividad necroliteraria.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label="Ingresos Reales" value={`${settings.currencySymbol}${totalIncome.toFixed(2)}`} icon={<DollarSign className="w-5 h-5" />} color="crimson" />
                <StatCard label="Pedidos Totales" value={sales.length.toString()} icon={<Users className="w-5 h-5" />} color="gold" />
                <StatCard label="Obras Vendidas" value={completedSalesCount.toString()} icon={<ShoppingBag className="w-5 h-5" />} color="crimson" />
                <StatCard label="Conversión" value={sales.length > 0 ? "100%" : "0%"} icon={<TrendingUp className="w-5 h-5" />} color="white" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="glass p-8 rounded-3xl border-white/5 h-[400px] lg:col-span-2">
                  <h3 className="text-lg font-serif mb-8 text-white flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-crimson" />
                    Ingresos Semanales (Reales)
                  </h3>
                  <div className="w-full h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={last7Days}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B0000" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8B0000" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#444" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="#444" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(value) => `${settings.currencySymbol}${value}`}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '12px' }}
                          itemStyle={{ color: '#8B0000' }}
                          formatter={(value) => [`${settings.currencySymbol}${value}`, 'Ingresos']}
                        />
                        <Area type="monotone" dataKey="sales" stroke="#8B0000" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass p-8 rounded-3xl border-white/5 h-[400px] flex flex-col">
                  <h3 className="text-lg font-serif mb-8 text-white">Esencia Literaria</h3>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={displayCategoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          {displayCategoryData.map((_entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#005', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '12px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {displayCategoryData.map((entry: any, index: number) => (
                      <div key={entry.name} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-3xl border-white/5">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-serif text-white">Invocaciones Recientes</h3>
                    <button onClick={() => setActiveView('sales')} className="text-[10px] uppercase tracking-widest text-crimson font-bold hover:brightness-125 transition-all">Ver todos los registros</button>
                  </div>
                  <div className="space-y-4">
                    {sales.slice(0, 3).map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-crimson/20 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-crimson/10 flex items-center justify-center">
                            <ShoppingBag className="w-5 h-5 text-crimson" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{sale.customerName}</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-tighter">Adquirió "{sale.bookTitle}"</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-mono text-white">{sale.total}</div>
                          <div className="text-[9px] text-gray-600 uppercase tracking-widest">{sale.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass p-8 rounded-3xl border-white/5">
                  <h3 className="text-lg font-serif text-white mb-8">Obras Predilectas</h3>
                  <div className="space-y-4">
                    {books.slice(0, 3).map((book, i) => (
                      <div key={book.id} className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                        <div className="text-2xl font-serif text-crimson opacity-50 italic">0{i+1}</div>
                        <img 
                          src={book.cover} 
                          className="w-12 h-16 object-cover rounded shadow-lg" 
                          alt="" 
                          referrerPolicy="no-referrer" 
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{book.title}</div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-widest">{book.author}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-white">0</div>
                          <div className="text-[9px] text-gray-600 uppercase tracking-widest">Lectores</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'settings' && (
            <div className="max-w-4xl mx-auto py-6">
              <header className="mb-12">
                <h1 className="text-4xl font-serif mb-2 text-white">Configuración</h1>
                <p className="text-gray-500 font-light">Personaliza los parámetros vitales de la plataforma.</p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 space-y-2">
                  <SettingsTab 
                    label="General" 
                    active={settingsSubView === 'general'} 
                    icon={<LayoutDashboard className="w-4 h-4" />} 
                    onClick={() => setSettingsSubView('general')} 
                  />
                  <SettingsTab 
                    label="Apariencia" 
                    active={settingsSubView === 'appearance'} 
                    icon={<Edit3 className="w-4 h-4" />} 
                    onClick={() => setSettingsSubView('appearance')} 
                  />
                  <SettingsTab 
                    label="Social" 
                    active={settingsSubView === 'social'} 
                    icon={<Users className="w-4 h-4" />} 
                    onClick={() => setSettingsSubView('social')} 
                  />
                </div>

                <div className="lg:col-span-3 space-y-8">
                  {settingsSubView === 'general' && (
                    <>
                      {/* General Settings */}
                      <div className="glass p-8 rounded-3xl border-white/5 space-y-6">
                        <h3 className="text-lg font-serif text-white mb-6 border-b border-white/5 pb-4">Información del Negocio</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Input 
                            label="Nombre de la Tienda" 
                            value={settings.storeName} 
                            onChange={v => onUpdateSettings({...settings, storeName: v})} 
                          />
                          <Input 
                            label="WhatsApp para Pedidos" 
                            value={settings.whatsappNumber} 
                            onChange={v => onUpdateSettings({...settings, whatsappNumber: v})} 
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Input 
                            label="Símbolo de Moneda" 
                            value={settings.currencySymbol} 
                            onChange={v => onUpdateSettings({...settings, currencySymbol: v})} 
                          />
                        </div>
                      </div>

                      {/* Notifications Toggle */}
                      <div className="glass p-8 rounded-3xl border-white/5 flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-serif text-white">Notificaciones de Almas</h3>
                          <p className="text-sm text-gray-500 font-light">Alertas de escritorio para nuevos pedidos.</p>
                        </div>
                        <button 
                          onClick={() => onUpdateSettings({...settings, notifications: !settings.notifications})}
                          className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${settings.notifications ? 'bg-crimson' : 'bg-white/10'}`}
                        >
                          <motion.div 
                            animate={{ x: settings.notifications ? 24 : 0 }}
                            className="w-6 h-6 bg-white rounded-full shadow-lg"
                          />
                        </button>
                      </div>

                      <div className="bg-crimson/10 border border-crimson/20 p-6 rounded-2xl flex items-start gap-4">
                        <AlertCircle className="w-5 h-5 text-crimson shrink-0" />
                        <div>
                          <h4 className="text-white text-sm font-bold mb-1 uppercase tracking-widest">Zona de Peligro</h4>
                          <p className="text-xs text-gray-500 mb-4">La limpieza de datos es irreversible.</p>
                          <button className="px-4 py-2 bg-crimson/20 border border-crimson/30 text-crimson text-[10px] uppercase tracking-widest font-bold hover:bg-crimson hover:text-white transition-all rounded-lg">
                            Reiniciar Biblioteca a la Configuración de Fábrica
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {settingsSubView === 'appearance' && (
                    <div className="glass p-8 rounded-3xl border-white/5 space-y-6">
                      <h3 className="text-lg font-serif text-white mb-6 border-b border-white/5 pb-4">Personalización Visual</h3>
                      <div className="flex flex-col gap-4">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Tema Principal (Color de Acento)</label>
                        <div className="flex gap-3 flex-wrap">
                          {['#8B0000', '#B8860B', '#2F4F4F', '#4B0082', '#000000', '#0369a1', '#15803d'].map(color => (
                            <button
                              key={color}
                              onClick={() => {
                                onUpdateSettings({...settings, themeColor: color});
                              }}
                              className={`w-10 h-10 rounded-full border-2 transition-all ${settings.themeColor === color ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                        <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Vista Previa de Acento</span>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: settings.themeColor }} />
                          <span className="text-white font-mono text-xs">{settings.themeColor}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {settingsSubView === 'social' && (
                    /* Social Links */
                    <div className="glass p-8 rounded-3xl border-white/5 space-y-6">
                      <h3 className="text-lg font-serif text-white mb-6 border-b border-white/5 pb-4">Redes Sociales</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input 
                          label="Instagram URL" 
                          value={settings.instagramUrl} 
                          onChange={v => onUpdateSettings({...settings, instagramUrl: v})} 
                        />
                        <Input 
                          label="Twitter URL" 
                          value={settings.twitterUrl} 
                          onChange={v => onUpdateSettings({...settings, twitterUrl: v})} 
                        />
                        <Input 
                          label="Behance URL" 
                          value={settings.behanceUrl} 
                          onChange={v => onUpdateSettings({...settings, behanceUrl: v})} 
                        />
                        <Input 
                          label="Spotify URL" 
                          value={settings.spotifyUrl} 
                          onChange={v => onUpdateSettings({...settings, spotifyUrl: v})} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }: { label: string, value: string, icon: React.ReactNode, color: string }) => (
  <div className="glass p-6 rounded-2xl border-white/5 hover:border-white/10 transition-all">
    <div className="flex justify-between items-start mb-4">
      <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{label}</span>
      <div className={`p-2 rounded-lg bg-white/5 ${color === 'crimson' ? 'text-crimson' : color === 'gold' ? 'text-amber-500' : 'text-white'}`}>
        {icon}
      </div>
    </div>
    <div className="text-3xl font-bold text-white tracking-tighter">{value}</div>
  </div>
);

const SidebarLink = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${active ? 'bg-crimson/10 text-crimson border-r-2 border-crimson' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const SettingsTab = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-widest font-bold transition-all ${active ? 'bg-white/10 text-white border border-white/10' : 'text-gray-500 hover:text-gray-300'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Input = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
  <div>
    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">{label}</label>
    <input 
      type="text" 
      value={value} 
      onChange={e => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:border-crimson focus:outline-none transition-all"
    />
  </div>
);

