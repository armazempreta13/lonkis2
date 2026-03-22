import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    }

    if (isLogin && !formData.name) {
      newErrors.name = 'Nome é obrigatório para cadastro';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password, formData.name);
      }
      navigate('/admin');
    } catch (err: any) {
      if (err.response?.data?.error) {
        setErrors({ general: err.response.data.error });
      } else {
        setErrors({ general: 'Erro de conexão. Tente novamente.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-800 border border-white/10 rounded-[3rem] p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </h1>
          <p className="text-white/60">
            {isLogin ? 'Acesse sua conta' : 'Crie sua conta'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-white/80 mb-2">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-zinc-700 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-colors ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-white/20 focus:ring-white/20'
                }`}
                placeholder="Seu nome completo"
                required={!isLogin}
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-white/80 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-zinc-700 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-colors ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-white/20 focus:ring-white/20'
              }`}
              placeholder="seu@email.com"
              required
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-white/80 mb-2">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 pr-12 bg-zinc-700 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-colors ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-white/20 focus:ring-white/20'
                }`}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {errors.general && (
            <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">{errors.general}</div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3"
          >
            {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
          </Button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white/60 hover:text-white transition-colors"
          >
            {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};