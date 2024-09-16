import { configureStore } from "@reduxjs/toolkit";
import cameraPositionSlice from "./CameraPositionSlice"; // Подключение вашего reducer
import floorButtonSlice from "./FloorButtonSlice";

export default configureStore({
  reducer: {
    cameraPosition: cameraPositionSlice, // 1 уровень
    floorButton: floorButtonSlice,
  },
});