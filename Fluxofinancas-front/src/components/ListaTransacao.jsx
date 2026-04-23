import React from 'react'
import Table from 'react-bootstrap/Table';
import ImgEditar from '../assets/botaoeditar.png'
import ImgExcluir from '../assets/excluir.png'

function ListaTransacao({ transacoes, onExcluir, onEditar }) {

  function formatarData(data) {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  return (
    <div className="container-tabela">

      {transacoes.length === 0 ? (
        <p className="sem-dados">Nenhuma transação encontrada</p>
      ) : (
        <Table striped hover className="tabela-custom">
          <thead className='sessao-titulos'>
            <tr>
              <th className='titulo-table'>Título</th>
              <th className='titulo-table' >Valor</th>
              <th className='titulo-table'>Tipo</th>
              <th className='titulo-table'>Data</th>
              <th className='titulo-table'>Ações</th>
            </tr>
          </thead>

          <tbody>
            {transacoes.map((tr) => (
              <tr key={tr.id_transacao}>
                <td className='titulo-table'>{tr.titulo}</td>

                <td className={tr.tipo === "receita" ? "valor-receita" : "valor-despesa"}>
                  R$ {tr.valor}
                </td>

                <td>
                  <span className={`badge-tipo ${tr.tipo}`}>
                    {tr.tipo}
                  </span>
                </td>

                <td>{formatarData(tr.data)}</td>

                <td className="acoes">
                  <img 
                    src={ImgEditar} 
                    alt="Editar"
                    className="icone acao-editar"
                    onClick={() => onEditar(tr)}
                  />

                  <img 
                    src={ImgExcluir} 
                    alt="Excluir"
                    className="icone acao-excluir"
                    onClick={() => onExcluir(tr.id_transacao)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

    </div>
  )
}

export default ListaTransacao