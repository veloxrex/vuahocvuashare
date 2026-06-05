import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { ProductGrid } from './components/ProductGrid';
import { useProducts } from './hooks/useProducts';

import logoImg from './assets/logo.jpg';

const BIO = {
  avatar: logoImg,
  name: 'Vừa học vừa share',
  tagline: 'Sưu tầm các đầu sách chất lượng – review thật, giá tốt',
};

export default function App() {
  const { products, loading, error, searchQuery, setSearchQuery } = useProducts();
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-pattern font-sans">

      {/* ── Hero ── */}
      <header className="relative overflow-hidden bg-white text-gray-900 border-b border-gray-200">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-red-50/80 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-red-50/60 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-5 pt-5 pb-4 flex flex-col items-center text-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#e60023]/15 blur-lg scale-125" />
            <img
              src={BIO.avatar}
              alt={BIO.name}
              className="relative w-16 h-16 rounded-full border-2 border-white/30 object-cover shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">{BIO.name}</h1>
            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">{BIO.tagline}</p>
          </div>
          <div className="w-full max-w-sm">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </header>

      {/* ── Toolbar ── */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <p className="text-xs font-medium text-gray-400">
            {loading ? 'Đang tải...' : searchQuery ? `${products.length} kết quả` : `${products.length} đầu sách`}
          </p>
          <div className="flex items-center bg-white border border-gray-200 rounded-xl p-0.5 shadow-sm">
            <button
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-[#e60023] text-white shadow' : 'text-gray-400'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-[#e60023] text-white shadow' : 'text-gray-400'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-14">
        <ProductGrid products={products} loading={loading} error={error} view={view} />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 py-6 text-center">
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} {BIO.name}</p>
      </footer>
    </div>
  );
}
