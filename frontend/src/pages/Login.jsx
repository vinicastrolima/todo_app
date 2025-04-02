import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setErro("Credenciais inválidas.");
    }
  };

  return (
    <div className="col-md-4 offset-md-4">
      <h3>Login</h3>
      {erro && <div className="alert alert-danger">{erro}</div>}
      <form onSubmit={handleLogin}>
        <input type="email" className="form-control my-2" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="form-control my-2" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
