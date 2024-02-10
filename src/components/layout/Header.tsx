'use client';

import Link from 'next/link';
import { Film } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/movies" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-300">
              <Film className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MovieApp
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/movies" 
              className="text-slate-300 hover:text-blue-400 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-slate-700/50"
            >
              Movies
            </Link>
            <Link 
              href="/search" 
              className="text-slate-300 hover:text-purple-400 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-slate-700/50"
            >
              Search
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
