import { ShoppingCart, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../types/product';
import { ProductModal } from './ProductModal';

interface ProductCardProps {
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

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = toDirectImageUrl(product.image);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="group flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 bg-white cursor-pointer active:scale-95"
        onClick={() => setOpen(true)}
      >
        {/* Image + overlay */}
        <div className="relative overflow-hidden bg-gray-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="aspect-[3/4] flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-gray-300" />
            </div>
          )}

          {/* Hover overlay nhẹ */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
        </div>

        {/* Content — minimal */}
        <div className="p-3 flex flex-col gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug line-clamp-2">
              <span className="text-[#e60023]">#{product.id} </span>{product.name}
            </h3>
            {product.author && (
              <p className="text-xs sm:text-sm text-gray-400 truncate">{product.author}</p>
            )}
          </div>

          <div className="flex gap-1.5">
            {product.link && (
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-1 bg-[#e60023] active:bg-[#ad0818] text-white text-xs font-bold py-1.5 rounded-full transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Mua ngay
              </a>
            )}
            {product.videoLink && (
              <a
                href={product.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center p-1.5 rounded-full border border-gray-200 text-gray-400 hover:border-[#e60023] hover:text-[#e60023] transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
              </a>
            )}
          </div>
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
