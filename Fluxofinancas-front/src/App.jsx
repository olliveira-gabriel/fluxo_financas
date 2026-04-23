import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelaCadastro from "./pages/TelaCadastro/TelaCadastro.jsx"
import TelaLogin from "./pages/TelaLogin/TelaLogin.jsx"
import './App.css'
import TelaTransacao from "./pages/TelaTransacao/TelaTransacao.jsx";


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<TelaCadastro/>}/>
        <Route path="/login" element={<TelaLogin />} />
        <Route path="/transacao" element={<TelaTransacao/>} />
        <Route path="/" element={<TelaTransacao/>} />
      </Routes>
    </Router>
    
    
  )
}

export default App
