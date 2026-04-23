import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import ImgFluxoLogin from "../../assets/Fluxo-login.png"
import "../TelaLogin/TelaLogin.css"

const TelaLogin = () => {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {

    try {

      const resposta = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const resultado = await resposta.json()

      if (!resposta.ok) {
        alert(resultado.error || "Erro no login")
        return
      }

      localStorage.setItem("usuario", JSON.stringify(resultado.usuario))


      navigate("/")

    } catch (erro) {

      console.error(erro)
      alert("Erro ao conectar com o servidor")

    }

  }

  return (
   <Container fluid className="p-0 vh-100 overflow-hidden"> 
    <Row className="h-100 g-0 container-login">
      <Col xs={12} md={6} lg={4} className="coluna-forms">
          <h1 className="titulo">Faça Login</h1>

          <form className="forms" onSubmit={handleSubmit(onSubmit)}>
            <input
            placeholder="Email"
              className="input-login"
              type="email"
              {...register("email", {
                required: "O email é obrigatório",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Digite um email válido"
                }
              })}
            />
            {errors.email && <p className="erro">{errors.email.message}</p>}
            <input
              placeholder="Senha"
              className="input-login"
              type="password"
              {...register("senha", {
                required: "A senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha precisa ter no mínimo 6 caracteres"
                }
              })}
            />
            {errors.senha && <p className="erro">{errors.senha.message}</p>}

            <Link to="/cadastro" className="link-login">
              Não possui login? Fazer cadastro!
            </Link>

            <button type="submit">
              Fazer login
            </button>

          </form>
        </Col>
        <Col className="card-Img d-none d-md-flex">
        <img className="img-login" src={ImgFluxoLogin}/></Col>
      </Row>
    </Container>
  )
}

export default TelaLogin