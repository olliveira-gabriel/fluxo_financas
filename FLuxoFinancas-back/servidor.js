const express = require("express");
const cors = require("cors");
const pool = require('./db')

const usuariosRoutes = require("./routes/usuarios");
const transacoesRoutes = require("./routes/transacoes");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/teste-banco", async (req, res) => {

  try {

    const result = await pool.query("SELECT NOW()")

    res.json(result.rows) 

  } catch (err) {

    console.error(err)
    res.status(500).json({ erro: "Erro no banco" })

  }

})

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/transacoes", transacoesRoutes);   

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});