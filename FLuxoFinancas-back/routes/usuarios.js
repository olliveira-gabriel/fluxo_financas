const express = require("express")
const router = express.Router()
const pool = require("../db")

router.post("/cadastros", async (req,res)=>{

 const { nome,email,senha } = req.body

 try{

  const result = await pool.query(
   "INSERT INTO Cliente (nome,email,senha) VALUES ($1,$2,$3) RETURNING *",
   [nome,email,senha]
  )

  res.json(result.rows[0])

 }catch(err){

  console.error(err)
  res.status(500).json({error:"Erro ao cadastrar"})

 }

})

router.post("/login", async (req, res) => {

  const { email, senha } = req.body

  try {

    const result = await pool.query(
      "SELECT * FROM Cliente WHERE email = $1",
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Usuário não encontrado" })
    }

    const usuario = result.rows[0]

    if (usuario.senha !== senha) {
      return res.status(401).json({ error: "Senha incorreta" })
    }

    res.json({
      message: "Login realizado com sucesso",
      usuario: {
      id: usuario.id_cliente,
      nome: usuario.nome,
      email: usuario.email
  }
    })

  } catch (err) {

    console.error(err)
    res.status(500).json({ error: "Erro no servidor" })

  }

})


module.exports = router