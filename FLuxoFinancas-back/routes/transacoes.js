const express = require("express")
const router = express.Router()
const pool = require("../db")

router.post("/", async (req,res)=> {
 const { titulo, valor, tipo, categoria, data, id_cliente } = req.body; 

 try{
    const result = await pool.query(
        "INSERT INTO transacoes_cliente (titulo, valor, tipo, categoria, data, id_cliente) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [titulo, valor, tipo, categoria, data, id_cliente]
    )
    res.json(result.rows[0])
 }catch(err){
    console.error(err)
    res.status(500).json({error: "Erro ao adicionar transação"})
 }
})

router.get("/:id_cliente", async (req,res)=>{
   const {id_cliente} = req.params

   try{
      const result = await pool.query(
      "SELECT * FROM transacoes_cliente WHERE id_cliente = $1 ORDER BY data DESC", 
      [id_cliente]
      );

       res.json(result.rows);
       
   }catch(err){
      console.erroe(err);
      res.status(500).json({error: "Erro ao buscar transações"})
   }
})

router.delete("/:id_transacao", async (req, res) => {
  const { id_transacao } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM transacoes_cliente WHERE id_transacao = $1 RETURNING *",
      [id_transacao]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }

    res.json({ message: "Transação excluída com sucesso" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir transação" });
  }
});

router.put("/:id_transacao", async (req, res) => {
  const idTransacao = parseInt(req.params.id_transacao);

  const {
    titulo,
    valor,
    tipo,
    categoria,
    data: dataTransacao
  } = req.body;

  if (isNaN(idTransacao)) {
    return res.status(400).json({ error: "ID da transação inválido" });
  }

  try {
    const resultadoAtualizacao = await pool.query(
      `UPDATE transacoes_cliente 
       SET titulo = $1, valor = $2, tipo = $3, categoria = $4, data = $5
       WHERE id_transacao = $6
       RETURNING *`,
      [titulo, valor, tipo, categoria, dataTransacao, idTransacao]
    );

    if (resultadoAtualizacao.rows.length === 0) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }

    const transacaoAtualizada = resultadoAtualizacao.rows[0];

    res.json(transacaoAtualizada);

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao atualizar transação" });
  }
});


module.exports = router