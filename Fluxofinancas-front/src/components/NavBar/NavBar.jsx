import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import logo from "../../assets/logo.png";
import "./NavBar.css";

function NavBar() {
  const [nomeUsuario, setNomeUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("usuario");
    if (dadosSalvos) {
      try {
        const usuario = JSON.parse(dadosSalvos);
        if (usuario?.nome) {
          setNomeUsuario(usuario.nome);
        }
      } catch {
        setNomeUsuario(null);
      }
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("usuario");
    setNomeUsuario(null);
    navigate("/login");
  }

  function handleLogar() {
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="Fluxo Finanças" className="navbar__logo-img" />
      </div>

      <div className="navbar__usuario">
        <FaUserCircle className="navbar__usuario-icone" />

        {nomeUsuario ? (
          <>
            <span className="navbar__usuario-nome">{nomeUsuario}</span>
            <MdLogout
              className="navbar__logout-icone"
              onClick={handleLogout}
              title="Sair da conta"
            />
          </>
        ) : (
          <span
            className="navbar__usuario-nome navbar__usuario-nome--link"
            onClick={handleLogar}
          >
            Logar
          </span>
        )}
      </div>
    </nav>
  );
}

export default NavBar;