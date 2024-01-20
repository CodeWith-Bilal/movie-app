'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  maxVisiblePages = 5,
}: PaginationProps) {
  // Calculate which page numbers to show
  const getVisiblePages = () => {
    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={`p-2 rounded-lg border transition-all duration-200 ${
          isFirstPage
            ? 'border-slate-700 text-slate-600 cursor-not-allowed bg-slate-800/30'
            : 'border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-blue-500 hover:text-blue-400'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* First page if not visible */}
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-blue-500 hover:text-blue-400 transition-all duration-200"
          >
            1
          </button>
          {visiblePages[0] > 2 && (
            <span className="px-2 text-slate-500">...</span>
          )}
        </>
      )}

      {/* Visible page numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
            page === currentPage
              ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
              : 'border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-blue-500 hover:text-blue-400'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last page if not visible */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 text-slate-500">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-blue-500 hover:text-blue-400 transition-all duration-200"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className={`p-2 rounded-lg border transition-all duration-200 ${
          isLastPage
            ? 'border-slate-700 text-slate-600 cursor-not-allowed bg-slate-800/30'
            : 'border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-blue-500 hover:text-blue-400'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
