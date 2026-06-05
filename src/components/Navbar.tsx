import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Settings } from 'lucide-react';
import { checkAdminAuth } from '../hooks/useAdminAuth';

export function Navbar() {
  const { pathname } = useLocation();
  const isAdmin = checkAdminAuth();

  if (!isAdmin) return null;

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 flex items-center gap-1 h-12">
        <Link
          to="/"
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            pathname === '/'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          Sản phẩm
        </Link>

        <Link
          to="/admin/vuahocvuashare"
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            pathname === '/admin/vuahocvuashare'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          Thêm sản phẩm
        </Link>
      </div>
    </nav>
  );
}
