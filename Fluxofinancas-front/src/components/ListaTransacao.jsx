import React from 'react'

function ListaTransacao({ transacoes }) {

  return (
    <div>
      <h2>Transações</h2>

      {transacoes.length === 0 ? (
        <p>Nenhuma transação encontrada</p>
      ) : (
        <ul>
          {transacoes.map((tr) => (
            <li key={tr.id_transacao}>
              {tr.titulo} - R$ {tr.valor} ({tr.tipo})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListaTransacao