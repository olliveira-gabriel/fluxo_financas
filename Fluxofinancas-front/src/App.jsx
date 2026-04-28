import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelaCadastro from "./pages/TelaCadastro/TelaCadastro.jsx"
import TelaLogin from "./pages/TelaLogin/TelaLogin.jsx"
import './App.css'
import TelaTransacao from "./pages/TelaTransacao/TelaTransacao.jsx";
import TelaInicial from "./pages/TelaInicial/TelaInicial.jsx";





function App() {


  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<TelaCadastro/>}/>
        <Route path="/" element={<TelaInicial/>} />
        <Route path="/home" element={<TelaInicial/>} />
        <Route path="/login" element={<TelaLogin />} />
        <Route path="/transacao" element={<TelaTransacao/>} />
      </Routes>
    </Router>
    
    
  )
}

export default App
