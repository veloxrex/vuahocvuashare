import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  dark?: boolean;
}

export function SearchBar({ value, onChange, placeholder = 'Tìm kiếm sách...', dark }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${dark ? 'text-white/40' : 'text-gray-400'}`} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-11 pr-10 py-3 rounded-2xl text-sm focus:outline-none transition ${
          dark
            ? 'bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/40'
            : 'bg-[#efefef] border-0 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#e60023]/30 focus:bg-white'
        }`}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${dark ? 'text-white/50 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
          aria-label="Xóa"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
