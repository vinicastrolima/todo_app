import { useEffect, useState } from "react";
import api from "../axios";

const Dashboard = () => {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTarefas();
  }, []);

  const fetchTarefas = async () => {
    try {
      const res = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTarefas(res.data);
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setErro("");

    if (!novaTarefa) {
      setErro("O título da tarefa é obrigatório.");
      return;
    }

    try {
      await api.post(
        "/tasks",
        { title: novaTarefa, description: descricao },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNovaTarefa("");
      setDescricao("");
      fetchTarefas();
    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
      setErro("Erro ao criar tarefa.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-4">Minhas Tarefas</h2>

      <form onSubmit={handleCreate} className="card shadow-sm p-4 mb-4 d-grid gap-3">
        <h5 className="fw-semibold">Nova Tarefa</h5>

        {erro && <div className="alert alert-danger">{erro}</div>}

        <input
          type="text"
          className="form-control"
          placeholder="Título da tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />

        <textarea
          className="form-control"
          placeholder="Descrição (opcional)"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        ></textarea>

        <div className="text-end">
          <button className="btn btn-primary">Adicionar</button>
        </div>
      </form>

      <div className="row">
        {tarefas.map((task) => (
          <div key={task.id} className="col-md-6 col-lg-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text text-muted">{task.description}</p>
                <p className="badge bg-secondary">
                  {task.is_done ? "Concluída" : "Pendente"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
