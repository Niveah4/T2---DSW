import { configureStore } from "@reduxjs/toolkit";
import tarefasReducer from "../features/tarefasSlice";

export const store = configureStore({
  reducer: {
    tarefas: tarefasReducer,
  },
});
