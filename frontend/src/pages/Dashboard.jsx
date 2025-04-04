import { useEffect, useState } from "react";
import api from "../axios";

const Dashboard = () => {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState(""); 
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTarefas();
    fetchQuote();
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

  const fetchQuote = async () => {
    try {
      const res = await api.get("/quote", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuote(res.data.quote);
      setAuthor(res.data.author || ""); 
    } catch (err) {
      console.error("Erro ao buscar citação:", err);
    }
  };
  

  const handleCreate = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);
  
    if (!novaTarefa) {
      setErro("O título da tarefa é obrigatório.");
      setLoading(false);
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
    } catch {
      setErro("Erro ao criar tarefa.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTarefas();
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
    }
  };

  const toggleDone = async (id) => {
    try {
      await api.patch(`/tasks/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTarefas();
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    }
  };

  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === "pendentes") return !t.is_done;
    if (filtro === "concluidas") return t.is_done;
    return true;
  });

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-4">Minhas Tarefas</h2>

      {loading && (
        <div className="text-center mb-3">
          <div className="spinner-border text-primary" role="status" style={{ width: "2rem", height: "2rem" }}>
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}

      {/* Formulário */}
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

      {/* Filtro */}
      <div className="d-flex justify-content-center gap-2 mb-4">
        <button
          className={`btn btn-sm ${filtro === "todos" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFiltro("todos")}
        >
          Todos
        </button>
        <button
          className={`btn btn-sm ${filtro === "pendentes" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFiltro("pendentes")}
        >
          Pendentes
        </button>
        <button
          className={`btn btn-sm ${filtro === "concluidas" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFiltro("concluidas")}
        >
          Concluídas
        </button>
      </div>

      {/* Lista de tarefas */}
      <div className="row">
        {tarefasFiltradas.map((task) => (
          <div key={task.id} className="col-md-6 col-lg-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text text-muted">{task.description}</p>
                <p>
                  <span className={`badge ${task.is_done ? "badge-concluida" : "badge-pendente"}`}>
                    {task.is_done ? "Concluída" : "Pendente"}
                  </span>
                </p>
                <div className="mt-auto d-flex gap-2">
                  <button
                    className={`btn btn-sm ${task.is_done ? "btn-secondary" : "btn-success"}`}
                    onClick={() => toggleDone(task.id)}
                  >
                    {task.is_done ? "Desmarcar" : "Concluir"}
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {quote && (
        <div className="d-flex justify-content-end mt-4">
          <blockquote className="quote-text text-end">
            “{quote}”
            <footer className="blockquote-footer mt-2 text-muted fst-italic">{author}</footer>
          </blockquote>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
