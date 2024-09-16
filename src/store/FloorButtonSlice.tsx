//slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FloorButtonState {
    data: boolean[]; // 2 уровень
    visibility: boolean[];
}

const initialState: FloorButtonState = {
    data: [false, false, false, false, false],
    visibility: [false, false, false, false, false]
};

export const floorButtonSlice = createSlice({
  name: "floorButton",
  initialState,
  reducers: {
    setFloorButton: (state, action: PayloadAction<boolean[]>) => {
      state.data = action.payload;
    },
    setFloorButtonVisibility: (state, action: PayloadAction<boolean[]>) => {
      state.visibility = action.payload;
    }
  },
});

export const { setFloorButton } = floorButtonSlice.actions;
export const { setFloorButtonVisibility } = floorButtonSlice.actions;

export default floorButtonSlice.reducer;