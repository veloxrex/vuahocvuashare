interface CategoryFilterProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ categories, active, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
            active === cat
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-400 hover:text-indigo-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
