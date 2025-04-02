import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro("");

    if (!isEmailValid(email)) return setErro("Informe um e-mail válido.");
    if (password !== confirm) return setErro("As senhas não coincidem.");

    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: confirm,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      setErro("Erro ao registrar. Tente novamente.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-wrapper">
        <h4 className="text-center fw-bold mb-4">Cadastro</h4>
        {erro && <div className="alert alert-danger">{erro}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Nome completo</label>
            <input
              type="text"
              className="form-control"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Confirmar senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100" style={{ height: "48px" }}>
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
