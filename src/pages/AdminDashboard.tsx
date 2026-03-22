import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import {
  Package,
  Users,
  FileText,
  Wrench,
  TrendingUp,
  Shield,
  Activity,
  Settings,
  LogOut,
  BarChart3,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalQuotes: number;
  totalRepairs: number;
  pendingQuotes: number;
  pendingRepairs: number;
  totalRevenue: number;
  recentActivity: ActivityItem[];
}

interface ActivityItem {
  id: number;
  type: 'product' | 'quote' | 'repair' | 'user';
  action: 'created' | 'updated' | 'deleted';
  description: string;
  timestamp: string;
}

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      // Fetch all data in parallel
      const [productsRes, usersRes, quotesRes, repairsRes] = await Promise.all([
        fetch('/api/products', { headers }),
        fetch('/api/users', { headers }),
        fetch('/api/quotes', { headers }),
        fetch('/api/repairs', { headers })
      ]);

      const [products, users, quotes, repairs] = await Promise.all([
        productsRes.json(),
        usersRes.json(),
        quotesRes.json(),
        repairsRes.json()
      ]);

      // Calculate stats
      const totalRevenue = quotes
        .filter((q: any) => q.status === 'completed')
        .reduce((sum: number, q: any) => sum + (parseFloat(q.price) || 0), 0);

      const pendingQuotes = quotes.filter((q: any) => q.status === 'pending').length;
      const pendingRepairs = repairs.filter((r: any) => r.status === 'pending').length;

      // Generate recent activity (mock data for now)
      const recentActivity: ActivityItem[] = [
        {
          id: 1,
          type: 'product',
          action: 'created',
          description: 'Novo produto "iPhone 15 Pro" adicionado',
          timestamp: new Date().toISOString()
        },
        {
          id: 2,
          type: 'quote',
          action: 'updated',
          description: 'Orçamento #123 aprovado',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 3,
          type: 'repair',
          action: 'created',
          description: 'Nova ordem de reparo criada',
          timestamp: new Date(Date.now() - 7200000).toISOString()
        }
      ];

      setStats({
        totalProducts: products.length,
        totalUsers: users.length,
        totalQuotes: quotes.length,
        totalRepairs: repairs.length,
        pendingQuotes,
        pendingRepairs,
        totalRevenue,
        recentActivity
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando dashboard...</div>
      </div>
    );
  }

  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'quotes', label: 'Orçamentos', icon: FileText },
    { id: 'repairs', label: 'Reparos', icon: Wrench },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <div className="border-b border-white/10 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-white/60 mt-1">Bem-vindo de volta, {user?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-white/60">Último acesso</div>
              <div className="text-sm">{new Date().toLocaleString('pt-BR')}</div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-white/10 p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'overview' && stats && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-400 text-sm font-medium">Total de Produtos</p>
                      <p className="text-3xl font-bold text-white">{stats.totalProducts}</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-400" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-400 text-sm font-medium">Receita Total</p>
                      <p className="text-3xl font-bold text-white">R$ {stats.totalRevenue.toFixed(2)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-400" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-400 text-sm font-medium">Orçamentos Pendentes</p>
                      <p className="text-3xl font-bold text-white">{stats.pendingQuotes}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-400" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-400 text-sm font-medium">Reparos Pendentes</p>
                      <p className="text-3xl font-bold text-white">{stats.pendingRepairs}</p>
                    </div>
                    <Wrench className="w-8 h-8 text-purple-400" />
                  </div>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/admin/products">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-zinc-800/50 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors cursor-pointer"
                  >
                    <Package className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Gerenciar Produtos</h3>
                    <p className="text-white/60">Adicionar, editar ou remover produtos do catálogo</p>
                  </motion.div>
                </Link>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-zinc-800/50 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors cursor-pointer"
                  onClick={() => setActiveTab('quotes')}
                >
                  <FileText className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Orçamentos</h3>
                  <p className="text-white/60">Revisar e gerenciar solicitações de orçamento</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-zinc-800/50 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors cursor-pointer"
                  onClick={() => setActiveTab('repairs')}
                >
                  <Wrench className="w-8 h-8 text-orange-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ordens de Reparo</h3>
                  <p className="text-white/60">Acompanhar e atualizar status dos reparos</p>
                </motion.div>
              </div>

              {/* Recent Activity */}
              <div className="bg-zinc-800/50 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Atividade Recente
                </h3>
                <div className="space-y-4">
                  {stats.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 bg-zinc-700/30 rounded-lg">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.description}</p>
                        <p className="text-xs text-white/60">
                          {new Date(activity.timestamp).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gerenciamento de Produtos</h3>
              <p className="text-white/60 mb-6">Acesse a página completa de produtos</p>
              <Link to="/admin/products">
                <Button>Ir para Produtos</Button>
              </Link>
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gerenciamento de Orçamentos</h3>
              <p className="text-white/60 mb-6">Funcionalidade em desenvolvimento</p>
            </div>
          )}

          {activeTab === 'repairs' && (
            <div className="text-center py-12">
              <Wrench className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ordens de Reparo</h3>
              <p className="text-white/60 mb-6">Funcionalidade em desenvolvimento</p>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gerenciamento de Usuários</h3>
              <p className="text-white/60 mb-6">Funcionalidade em desenvolvimento</p>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Configurações de Segurança</h3>
              <p className="text-white/60 mb-6">Funcionalidade em desenvolvimento</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Configurações do Sistema</h3>
              <p className="text-white/60 mb-6">Funcionalidade em desenvolvimento</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};