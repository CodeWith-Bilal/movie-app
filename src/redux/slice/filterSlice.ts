import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  genre: string;
  year: string;
  rating: string;
  sortBy: string;
}

const initialState: FilterState = {
  genre: '',
  year: '',
  rating: '',
  sortBy: 'popularity.desc',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
    setRating: (state, action: PayloadAction<string>) => {
      state.rating = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.genre = '';
      state.year = '';
      state.rating = '';
      state.sortBy = 'popularity.desc';
    },
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { 
  setGenre, 
  setYear, 
  setRating, 
  setSortBy, 
  clearFilters, 
  setFilters 
} = filtersSlice.actions;

export default filtersSlice.reducer;
