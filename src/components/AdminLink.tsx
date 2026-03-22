import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Settings } from 'lucide-react';

export const AdminLink: React.FC = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <Link
      to="/admin"
      className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black transition-all hover:scale-105 text-white/30 hover:text-white"
    >
      <Settings className="w-4 h-4" />
      Admin
    </Link>
  );
};