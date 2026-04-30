
import ImgDepesas from '../assets/despesa.png'
import { useEffect, useState } from "react";
import { buscarTotalDespesas } from "../services/api";

function CardDP({ atualizar }) {
    
  const [total_despesa, setTotalDespesa] = useState(0);
    
  useEffect(() => {
    async function carregar() {
      const dados = await buscarTotalDespesas();
      setTotalDespesa(dados.total_despesas || 0);
    }

    carregar();
  }, [atualizar]);

  return (
    <div className="cardRD">
      <div className="sessao-img-txt">
        <img className="icone-card" src={ImgDepesas} />

        <div className="textos-card">
          <h1 className="txt-card">Despesas</h1>

          <p className="txt-despesa">
            R$ {Number(total_despesa).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardDP;