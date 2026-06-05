import { X, ShoppingCart, ExternalLink, PlayCircle, User } from 'lucide-react';
import { useEffect } from 'react';
import type { Product } from '../types/product';

interface ProductModalProps {
  product: Product;
  imageUrl: string;
  onClose: () => void;
}

export function ProductModal({ product, imageUrl, onClose }: ProductModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Sheet — slides from bottom on mobile, centered modal on desktop */}
      <div
        className="relative bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl animate-[slideUp_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="relative h-52 sm:h-64 bg-gray-100 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <ShoppingCart className="w-14 h-14 text-gray-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-12">
            <h2 className="text-lg font-extrabold text-white leading-tight drop-shadow-md line-clamp-2">
              {product.name}
            </h2>
            {product.author && (
              <div className="flex items-center gap-1.5 mt-1 text-xs text-white/75">
                <User className="w-3 h-3" />
                {product.author}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 pb-safe">
          {product.description && (
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          )}

          <div className="flex flex-col gap-2.5">
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#e60023] active:bg-[#ad0818] text-white font-bold py-3.5 rounded-2xl transition-colors shadow-md text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              Mua ngay
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {product.videoLink && (
              <a
                href={product.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600 active:bg-gray-50 font-medium py-3 rounded-2xl transition-colors text-sm"
              >
                <PlayCircle className="w-4 h-4" />
                Xem video review
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
