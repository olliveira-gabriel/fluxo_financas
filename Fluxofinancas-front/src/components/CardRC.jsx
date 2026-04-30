import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import ImgReceita from '../assets/receita.png'
import { useEffect, useState } from "react";
import { BuscarTotalReceitas } from "../services/api";

function CardRC({ atualizar }) {

  const [total_receita, setTotalReceita] = useState(0);

  useEffect(() => {
    async function carregar() {
      const dados = await BuscarTotalReceitas();
      setTotalReceita(dados.total_receitas || 0);
    }

    carregar();
  }, [atualizar]); // ✅ AGORA FUNCIONA

  return (
    <div className="cardRD">
      <div className="sessao-img-txt">
        <img className="icone-card" src={ImgReceita} />

        <div className="textos-card">
          <h1 className="txt-card">Receitas</h1>

          <p className="txt-receita">
            R$ {Number(total_receita).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardRC;