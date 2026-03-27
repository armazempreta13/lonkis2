import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Plus, Edit, Trash2, Search, Filter, LogOut, ChevronUp, ChevronDown, Package, DollarSign, TrendingUp, Users } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image?: string;
  colors: string[];
  badge?: string;
  created_at: string;
  updated_at: string;
}

export const AdminProducts: React.FC = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    colors: '',
    badge: '',
  });

  const categories = ['iPhone Novos', 'Video Game', 'AirPods', 'Apple Watch', 'JBL'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedProducts([]);
  }, [searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = {
      ...formData,
      price: parseFloat(formData.price),
      colors: formData.colors.split(',').map(c => c.trim()),
    };

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchProducts();
        setShowModal(false);
        setEditingProduct(null);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      image: product.image || '',
      colors: product.colors.join(', '),
      badge: product.badge || '',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      image: '',
      colors: '',
      badge: '',
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [filteredProducts, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statistics = useMemo(() => {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, product) => sum + product.price, 0);
    const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;
    const categoriesCount = new Set(products.map(p => p.category)).size;

    return {
      totalProducts,
      totalValue,
      averagePrice,
      categoriesCount,
    };
  }, [products]);

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    if (!confirm(`Tem certeza que deseja deletar ${selectedProducts.length} produto(s)?`)) return;

    const token = localStorage.getItem('token');
    try {
      await Promise.all(
        selectedProducts.map(id =>
          fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
          })
        )
      );
      fetchProducts();
      setSelectedProducts([]);
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <div className="border-b border-white/10 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Painel de Produtos</h1>
            <p className="text-white/60">Bem-vindo, {user?.name}</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => { resetForm(); setShowModal(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
            <Button variant="outline" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="p-6 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Total de Produtos</p>
                <p className="text-2xl font-bold text-white">{statistics.totalProducts}</p>
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
                <p className="text-green-400 text-sm font-medium">Valor Total</p>
                <p className="text-2xl font-bold text-white">R$ {statistics.totalValue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">Preço Médio</p>
                <p className="text-2xl font-bold text-white">R$ {statistics.averagePrice.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-400 text-sm font-medium">Categorias</p>
                <p className="text-2xl font-bold text-white">{statistics.categoriesCount}</p>
              </div>
              <Filter className="w-8 h-8 text-orange-400" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex gap-4 flex-1">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20"
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
            >
              <option value="">Todas as categorias</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {selectedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <span className="text-white/60 text-sm">
                {selectedProducts.length} selecionado(s)
              </span>
              <Button
                variant="outline"
                onClick={handleBulkDelete}
                className="text-red-400 hover:text-red-300 border-red-400/20 hover:border-red-400/40"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Deletar
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={paginatedProducts.length > 0 && selectedProducts.length === paginatedProducts.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-white/20 bg-zinc-700 text-blue-500 focus:ring-blue-500"
                  />
                </th>
                <th className="text-left py-3 px-4">Imagem</th>
                <th
                  className="text-left py-3 px-4 cursor-pointer hover:bg-white/5 rounded"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Nome
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th
                  className="text-left py-3 px-4 cursor-pointer hover:bg-white/5 rounded"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-2">
                    Categoria
                    {sortField === 'category' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th
                  className="text-left py-3 px-4 cursor-pointer hover:bg-white/5 rounded"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center gap-2">
                    Preço
                    {sortField === 'price' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="text-left py-3 px-4">Badge</th>
                <th className="text-left py-3 px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map(product => (
                <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                      className="rounded border-white/20 bg-zinc-700 text-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-3 px-4">
                    {product.image && (
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                    )}
                  </td>
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">R$ {product.price.toFixed(2)}</td>
                  <td className="py-3 px-4">{product.badge}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedProducts.length === 0 && (
          <div className="text-center py-12 text-white/60">
            {filteredProducts.length === 0 ? 'Nenhum produto encontrado' : 'Nenhum produto nesta página'}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-white/60 text-sm">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, sortedProducts.length)} de {sortedProducts.length} produtos
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                if (pageNum > totalPages) return null;

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "primary" : "outline"}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Próximo
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-800 border border-white/10 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-6">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2">Nome</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-zinc-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Categoria</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-zinc-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 bg-zinc-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Imagem URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-3 py-2 bg-zinc-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Cores (separadas por vírgula)</label>
                  <input
                    type="text"
                    value={formData.colors}
                    onChange={(e) => setFormData(prev => ({ ...prev, colors: e.target.value }))}
                    className="w-full px-3 py-2 bg-zinc-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
                    placeholder="#FFC0CB, #FFD700, #000000"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                    className="w-full px-3 py-2 bg-zinc-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
                    placeholder="Lacrado, Novo, etc."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingProduct ? 'Atualizar' : 'Criar'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};