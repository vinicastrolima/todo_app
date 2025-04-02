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

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro("");

    if (!isEmailValid(email)) {
      return setErro("Informe um e-mail válido.");
    }

    if (password !== confirm) {
      return setErro("As senhas não coincidem.");
    }

    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: confirm,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setErro("Erro ao registrar. Verifique os dados.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: 400 }}>
        <h4 className="mb-4 text-center">Cadastro</h4>
        {erro && <div className="alert alert-danger">{erro}</div>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirmar senha"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success w-100">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
