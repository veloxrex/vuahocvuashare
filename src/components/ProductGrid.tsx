import { PackageSearch } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { ProductListItem } from './ProductListItem';
import type { Product } from '../types/product';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  view: 'grid' | 'list';
}

const SKELETON_ASPECTS = ['aspect-[2/3]','aspect-[3/4]','aspect-[4/5]','aspect-[1/1]','aspect-[3/5]','aspect-[2/3]','aspect-[3/4]','aspect-[4/5]'];

export function ProductGrid({ products, loading, error, view }: ProductGridProps) {
  const gridClass    = 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4';
  const masonryClass = 'columns-2 sm:columns-3 lg:columns-4 gap-x-3 sm:gap-x-4';

  if (loading) {
    return view === 'grid' ? (
      <div className={masonryClass}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="break-inside-avoid mb-3 sm:mb-4 bg-white rounded-2xl overflow-hidden animate-pulse">
            <div className={`${SKELETON_ASPECTS[i]} bg-gray-200`} />
            <div className="p-2.5 space-y-2">
              <div className="h-3.5 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-7 bg-gray-200 rounded-full mt-1" />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col gap-2.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-3 bg-white rounded-xl p-3 animate-pulse">
            <div className="w-14 h-14 rounded-xl bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-400 space-y-2">
        <p className="font-semibold">Lỗi khi tải dữ liệu</p>
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 space-y-3">
        <PackageSearch className="w-14 h-14 mx-auto opacity-40" />
        <p className="text-lg font-medium">Không tìm thấy sách nào</p>
        <p className="text-sm">Thử tìm kiếm với từ khóa khác</p>
      </div>
    );
  }

  if (view === 'list') {
    return (
      <div className="flex flex-col gap-2.5">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}