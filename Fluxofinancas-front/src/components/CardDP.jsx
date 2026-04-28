import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import "../pages/TelaInicial/TelaInicial.css"
import ImgDepesas from '../assets/despesa.png'
import { useEffect, useState } from "react";
import { buscarTotalDespesas } from "../services/api";


function CardDP() {
    
    const [total_despesa, setTotalDespesa] = useState(0);
    
      useEffect(() => {
        async function carregar() {
          const dados = await buscarTotalDespesas();
          setTotalDespesa(dados.total_despesas || 0);
        }
    
        carregar();
    }, []);

  return (
    <div className="cardRD">
      <h1 className="txt-card">Despesas</h1>

      <div className="sessao-img-txt">
        <img className="icone-card" src={ImgDepesas} />

        <p className="txt-despesa">R$ {Number(total_despesa).toFixed(2)}</p>
      </div>
    </div>
  )

}

export default CardDP
