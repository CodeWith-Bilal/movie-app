import { AlertCircle, X } from 'lucide-react';

interface ErrorComponentProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export default function ErrorComponent({ 
  message, 
  onRetry, 
  onDismiss, 
  className = '' 
}: ErrorComponentProps) {
  return (
    <div className={`bg-red-900/50 border border-red-700 rounded-lg p-4 backdrop-blur-sm ${className}`}>
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-300 mb-1">Error</h3>
          <p className="text-sm text-red-200">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm bg-red-800/50 hover:bg-red-700/50 text-red-200 px-3 py-1 rounded transition-colors border border-red-600"
            >
              Try Again
            </button>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
