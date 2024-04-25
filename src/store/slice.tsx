//slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CameraPositionState {
    data: number[]; // 2 уровень
}

const initialState: CameraPositionState = {
    data: [0, 40, 20],
};

export const cameraPositionSlice = createSlice({
  name: "cameraPosition",
  initialState,
  reducers: {
    setCameraPosition: (state, action: PayloadAction<number[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setCameraPosition } = cameraPositionSlice.actions;

export default cameraPositionSlice.reducer;