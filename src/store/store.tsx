import { configureStore } from "@reduxjs/toolkit";
import cameraPositionSlice from "./slice"; // Подключение вашего reducer

export default configureStore({
  reducer: {
    cameraPosition: cameraPositionSlice, // 1 уровень
  },
});