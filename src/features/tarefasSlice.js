import { createSlice } from "@reduxjs/toolkit";

const tarefasSlice = createSlice({
  name: "tarefas",
  initialState: {
    tarefas: [],
    categorias: [
      { id: 1, nome: "Estudos" },
      { id: 2, nome: "Trabalho" },
    ],
    prioridades: [
      { id: 1, nivel: "Alta" },
      { id: 2, nivel: "Média" },
    ],
    notas: [],
  },
  reducers: {
    addTarefa: (state, action) => {
      state.tarefas.push(action.payload);
    },
    deleteTarefa: (state, action) => {
      state.tarefas = state.tarefas.filter((t) => t.id !== action.payload);
    },
    updateTarefa: (state, action) => {
      const index = state.tarefas.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.tarefas[index] = action.payload;
    },
  },
});

export const { addTarefa, deleteTarefa, updateTarefa } = tarefasSlice.actions;
export default tarefasSlice.reducer;
