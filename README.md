# 🎬 MovieApp - Next.js Movie Discovery App

A modern movie discovery application built with Next.js 14, Redux Toolkit, and Tailwind CSS. Browse, search, and discover movies using The Movie Database (TMDb) API.

## ✨ Features

### 🏠 Core Pages
- **Home/Movies Page (`/movies`)** - Browse paginated movie listings
- **Movie Detail Page (`/movies/[id]`)** - Detailed movie information with cast, genres, and trailers
- **Search & Filter** - Real-time search with genre, year, and rating filters

### 🔧 Components
- **MovieCard** - Displays movie poster, title, rating, and release date
- **SearchBar** - Debounced search input with clear functionality
- **Pagination** - Navigate through movie pages
- **FiltersBar** - Genre, year, and sort filters
- **Loader & Error Components** - User feedback for loading and error states

### 🛠 Technical Features
- **Redux Toolkit** for state management
- **Server-side filtering** and pagination
- **Responsive design** with Tailwind CSS
- **Image optimization** with Next.js Image component
- **TypeScript** for type safety
- **Modern App Router** architecture

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- TMDb API key (free from [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your TMDb API key:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your-actual-api-key-here
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Getting a TMDb API Key

1. Create a free account at [TMDb](https://www.themoviedb.org/signup)
2. Go to your [API settings](https://www.themoviedb.org/settings/api)
3. Follow the instructions to get your API key
4. Add it to your `.env.local` file

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── movies/            # Movies pages
│   │   ├── [id]/          # Dynamic movie detail page
│   │   └── page.tsx       # Movies listing page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (redirects to /movies)
├── components/            # Reusable components
│   ├── layout/           # Header, Footer
│   ├── movies/           # Movie-specific components
│   └── ui/               # Generic UI components
├── lib/                  # Utilities and configuration
│   ├── api/              # API layer (TMDb)
│   └── redux/            # Redux store and slices
└── public/               # Static assets
```

## 🎯 Usage Examples

### Browse Movies
- Visit `/movies` to see popular movies
- Use pagination to browse through results
- Apply filters for genre, year, or sorting

### Search Movies
- Use the search bar to find specific movies
- Search works with pagination and filters
- Clear search to return to browsing mode

### View Movie Details
- Click any movie card to view full details
- See cast, genres, ratings, and budget information
- Watch trailers (when available)

## 🛠 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Redux State Structure
```typescript
{
  movies: {
    movies: Movie[],
    loading: boolean,
    currentPage: number,
    totalPages: number,
    searchQuery: string
  },
  movieDetail: {
    movieDetail: MovieDetail | null,
    cast: CastMember[],
    videos: Video[],
    loading: boolean
  },
  filters: {
    genre: string,
    year: string,
    sortBy: string
  }
}
```

**Built with ❤️ using Next.js, Redux Toolkit, and Tailwind CSS**
