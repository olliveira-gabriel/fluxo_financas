import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import "../pages/TelaInicial/TelaInicial.css"
import ImgReceita from '../assets/receita.png'
import { useEffect, useState } from "react";
import { BuscarTotalReceitas } from "../services/api";

function CardRC() {

  const [total_receita, setTotalReceita] = useState(0);

  useEffect(() => {
    async function carregar() {
      const dados = await BuscarTotalReceitas();
        console.log(dados);
      setTotalReceita(dados.total_receitas || 0);
    }

    carregar();
  }, []);

  return (
    <div className="cardRD">
      <h1 className="txt-card">Receitas</h1>

      <div className="sessao-img-txt">
        <img className="icone-card" src={ImgReceita} />

        <p className="txt-receita">R$ {Number(total_receita).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default CardRC