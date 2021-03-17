import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './../store';

interface AppState {
  mapLoaded: boolean;
  layerId: string;
}

const initialState: AppState = {
  mapLoaded: false,
  layerId: ''
};

export const mapSlice = createSlice({
  name: 'mapSlice',
  initialState,
  reducers: {
    setMapLoaded: (state, action: PayloadAction<boolean>) => {
      state.mapLoaded = action.payload;
    },
    setLayerId: (state, action: PayloadAction<string>) => {
      state.layerId = action.payload;
    }
  },
});

export const { setMapLoaded, setLayerId } = mapSlice.actions;

export const mapLoaded = (state: RootState) => state.mapSlice.mapLoaded;
export const layerId = (state: RootState) => state.mapSlice.layerId;

export default mapSlice.reducer;
