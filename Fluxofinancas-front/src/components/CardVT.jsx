import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import "../pages/TelaInicial/TelaInicial.css"
import ImgVT from '../assets/ValorT.png'
import { useEffect, useState } from "react";
import { BuscarTotalReceitas, buscarTotalDespesas } from "../services/api.js";

export default function CardVT() {

  const [total_receita, setTotalReceita] = useState(0);
  const [total_despesa, setTotalDespesa] = useState(0);

  useEffect(() => {
    async function carregar() {
      try {
        const receitas = await BuscarTotalReceitas();
        const despesas = await buscarTotalDespesas();

        console.log("Receitas:", receitas);
        console.log("Despesas:", despesas);

        setTotalReceita(receitas.total_receitas || 0);
        setTotalDespesa(despesas.total_despesas || 0);

      } catch (erro) {
        console.error(erro);
      }
    }

    carregar();
  }, []);

  const valorTotal = total_receita - total_despesa;

  return (
    <div className="cardRD">
      <h1 className="txt-card">Valor Total</h1>

      <div className="sessao-img-txt">
        <img className="icone-card" src={ImgVT} />
        <p className="">R$ {Number(valorTotal).toFixed(2)}</p>
      </div>
    </div>
  );
}
