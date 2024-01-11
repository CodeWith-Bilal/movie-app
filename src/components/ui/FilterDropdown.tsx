'use client';

import { ChevronDown } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  className?: string;
  label?: string;
}

export default function FilterDropdown({
  value,
  onChange,
  options,
  placeholder = 'Select option',
  className = '',
  label,
}: FilterDropdownProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-100 backdrop-blur-sm"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-slate-700 text-slate-100">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
      </div>
    </div>
  );
}
