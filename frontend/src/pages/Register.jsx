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

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro("");

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
      setErro("Erro ao registrar.");
    }
  };

  return (
    <div className="col-md-4 offset-md-4">
      <h3>Registrar</h3>
      {erro && <div className="alert alert-danger">{erro}</div>}
      <form onSubmit={handleRegister}>
        <input type="text" className="form-control my-2" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" className="form-control my-2" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="form-control my-2" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" className="form-control my-2" placeholder="Confirmar senha" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <button className="btn btn-success w-100">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
