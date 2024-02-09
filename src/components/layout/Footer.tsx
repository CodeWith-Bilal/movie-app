export default function Footer() {
  return (
    <footer className="bg-slate-900/90 backdrop-blur-sm border-t border-slate-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-slate-400 text-sm">
              © 2025 MovieApp. Built with Next.js, Redux Toolkit, and Tailwind CSS.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <span>Powered by</span>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              The Movie Database (TMDb)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
