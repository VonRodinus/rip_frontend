import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  artifactFilter: string;
}

const initialState: FilterState = {
  artifactFilter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setArtifactFilter: (state, action: PayloadAction<string>) => {
      state.artifactFilter = action.payload;
    },
    clearArtifactFilter: (state) => {
      state.artifactFilter = '';
    },
  },
});

export const { setArtifactFilter, clearArtifactFilter } = filterSlice.actions;
export default filterSlice.reducer;