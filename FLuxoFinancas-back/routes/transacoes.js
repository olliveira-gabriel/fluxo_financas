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

module.exports = router