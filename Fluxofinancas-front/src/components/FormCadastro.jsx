import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import "../pages/TelaCadastro/TelaCadastro.css"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { Link } from "react-router"

const FormCadastro = () => {

  const navigate = useNavigate()

  const { 
    register, 
    handleSubmit, 
    watch, 
    reset,
    formState: { errors } 
  } = useForm()

  const senha = watch("senha")

  const onSubmit = async (data) => {

  try {

    const { cSenha, ...dadosUsuario } = data

    const resposta = await fetch("http://localhost:3000/api/usuarios/cadastros",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(dadosUsuario)
    })

    const resultado = await resposta.json()

    if(!resposta.ok){
      alert(resultado.error || "Erro no cadastro")
      return
    }

    alert("Cadastro realizado com sucesso!")

    reset()

    navigate("/login")

  } catch (erro) {

    console.error(erro)
    alert("Erro ao conectar com o servidor")

  }

}

  return (
      <Row>
        <Col>

          <h1 className="titulo">Cadastre-se</h1>

          <form className="forms-cadastro" onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Nome e Sobrenome"
              className="input-cadastro"
              type="text"
              {...register("nome", {
                required: "O nome é obrigatório",
                minLength:{
                  value:3,
                  message:"O nome precisa ter pelo menos 3 letras"
                }
              })}
            />
            {errors.nome && <p className="erro">{errors.nome.message}</p>}
            <input
              placeholder="Email"
              className="input-cadastro"
              type="email"
              {...register("email", {
                required: "O e-mail é obrigatório",
                pattern:{
                  value:/^\S+@\S+$/i,
                  message:"Digite um email válido"
                }
              })}
            />
            {errors.email && <p className="erro">{errors.email.message}</p>}

            <input
              placeholder="Senha"
              className="input-cadastro"
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

            <input
              placeholder="Confirmar Senha"
              className="input-cadastro"
              type="password"
              {...register("cSenha", {
                required: "Confirme sua senha",
                validate: value =>
                  value === senha || "As senhas não coincidem"
              })}
            />
            {errors.cSenha && <p className="erro">{errors.cSenha.message}</p>}


            <Link to="/login" className="link-login">
              Já possui cadastro? Fazer login
            </Link>

            <button type="submit">
              Fazer cadastro
            </button>

          </form>

        </Col>
      </Row>
  )
}

export default FormCadastro