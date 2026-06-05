import { ExternalLink, ShoppingCart, User, PlayCircle, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../types/product';
import { ProductModal } from './ProductModal';

interface ProductListItemProps {
  product: Product;
}

function toDirectImageUrl(url: string): string {
  if (!url) return '';
  let fileId = '';
  const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (openMatch) fileId = openMatch[1];
  else if (fileMatch) fileId = fileMatch[1];
  if (fileId) return `https://lh3.googleusercontent.com/d/${fileId}`;
  return url;
}

export function ProductListItem({ product }: ProductListItemProps) {
  const imageUrl = toDirectImageUrl(product.image);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="group flex items-center gap-4 bg-white rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-200 p-3 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {/* Thumbnail */}
        <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-gray-300" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-[#e60023] transition-colors">
            {product.name}
          </h3>
          {product.author && (
            <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-400">
              <User className="w-3 h-3 shrink-0" />
              <span className="truncate">{product.author}</span>
            </div>
          )}
          {product.description && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-1">{product.description}</p>
          )}
        </div>

        {/* Actions */}
        <div className="shrink-0 flex items-center gap-2">
          {product.videoLink && (
            <a
              href={product.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hidden sm:flex items-center gap-1 border border-gray-200 text-gray-500 hover:bg-gray-50 text-xs font-medium px-2.5 py-1.5 rounded-full transition-colors"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              Review
            </a>
          )}
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 bg-[#e60023] hover:bg-[#ad0818] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors shadow-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mua ngay</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#e60023] transition-colors" />
        </div>
      </div>

      {open && (
        <ProductModal
          product={product}
          imageUrl={imageUrl}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
