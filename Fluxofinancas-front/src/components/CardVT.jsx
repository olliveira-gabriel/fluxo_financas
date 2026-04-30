import ImgVT from '../assets/ValorT.png'
import { useEffect, useState } from "react";
import { BuscarTotalReceitas, buscarTotalDespesas } from "../services/api.js";

export default function CardVT({ atualizar }) {

  const [total_receita, setTotalReceita] = useState(0);
  const [total_despesa, setTotalDespesa] = useState(0);

  useEffect(() => {
    async function carregar() {
      try {
        const receitas = await BuscarTotalReceitas();
        const despesas = await buscarTotalDespesas();

        setTotalReceita(receitas.total_receitas || 0);
        setTotalDespesa(despesas.total_despesas || 0);

      } catch (erro) {
        console.error(erro);
      }
    }

    carregar();
  }, [atualizar]); // 🔥 CORREÇÃO AQUI

  const valorTotal = total_receita - total_despesa;

  return (
    <div className="cardRD">
      <div className="sessao-img-txt">
        <img className="icone-card" src={ImgVT} />

        <div className="textos-card">
          <h1 className="txt-card">Saldo Atual</h1>

          <p className="txt-vt">
            R$ {Number(valorTotal).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}