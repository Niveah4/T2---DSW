import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTarefa,
  deleteTarefa,
  updateTarefa,
} from "../features/tarefasSlice";
import "../styles/Tarefas.css";

function Tarefas() {
  const { tarefas, categorias, prioridades } = useSelector(
    (state) => state.tarefas
  );
  const dispatch = useDispatch();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState(1);
  const [prioridadeId, setPrioridadeId] = useState(1);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tarefa = {
      id: editId || Date.now(),
      titulo,
      descricao,
      categoriaId,
      prioridadeId,
    };
    if (editId) {
      dispatch(updateTarefa(tarefa));
      setEditId(null);
    } else {
      dispatch(addTarefa(tarefa));
    }
    setTitulo("");
    setDescricao("");
  };

  const handleEdit = (tarefa) => {
    setEditId(tarefa.id);
    setTitulo(tarefa.titulo);
    setDescricao(tarefa.descricao);
    setCategoriaId(tarefa.categoriaId);
    setPrioridadeId(tarefa.prioridadeId);
  };

  const handleDelete = (id) => {
    dispatch(deleteTarefa(id));
  };

  return (
    <div className="tarefas-container">
      <h1>Projeto 2 - DSW: Gerenciador de Tarefas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título da tarefa"
          required
        />
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
        />
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(Number(e.target.value))}
        >
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>
        <select
          value={prioridadeId}
          onChange={(e) => setPrioridadeId(Number(e.target.value))}
        >
          {prioridades.map((pri) => (
            <option key={pri.id} value={pri.id}>
              {pri.nivel}
            </option>
          ))}
        </select>
        <button type="submit">{editId ? "Atualizar" : "Adicionar"}</button>
      </form>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <span>
              {tarefa.titulo} - {tarefa.descricao} | Categoria:{" "}
              {categorias.find((c) => c.id === tarefa.categoriaId)?.nome} |
              Prioridade:{" "}
              {prioridades.find((p) => p.id === tarefa.prioridadeId)?.nivel}
            </span>
            <button onClick={() => handleEdit(tarefa)}>Editar</button>
            <button onClick={() => handleDelete(tarefa.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tarefas;
