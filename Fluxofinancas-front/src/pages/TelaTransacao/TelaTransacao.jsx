import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { useEffect, useState } from "react";
import "../TelaTransacao/TelaTransacao.css"
import FormTransacao from "../../components/FormTransacao";
import ListaTransacao from "../../components/ListaTransacao";
import { listarTransacoes } from "../../services/api";
import { deletarTransacao } from "../../services/api";
import NavBar from "../../components/NavBar/NavBar.jsx";




function TelaTransacao() {
  const [abrirModal, setAbrirModal] = useState(false);
  const [transacoes, setTransacoes] = useState([]);
  const [transacaoEditando, setTransacaoEditando] = useState(null);


  async function carregarTransacoes() {
      try {
        const dados = await listarTransacoes();
        setTransacoes(dados);
      } catch (erro) {
        console.error(erro);
      }
    }
    useEffect(() => {
      carregarTransacoes();
    }, []);

  function handleEditar(transacao) {
    setTransacaoEditando(transacao);
    setAbrirModal(true);
  }

  async function handleExcluir(id) {
    try {
      await deletarTransacao(id);

      carregarTransacoes();

    } catch (erro) {
      console.error(erro);
      alert("Erro ao excluir");
    }
}

  return (
    <Container>
      <NavBar/>
      <Row>
        <Col className="sessao-modal">
          <h1 className="titulo-tr">Transações</h1>

          <button onClick={() => setAbrirModal(true)}>
            + adicionar transação
          </button>

          {abrirModal && (
            <div className="modal">
              <div className="conteudo-modal">
                <h1 className="titulo">Nova Transação</h1>

                <FormTransacao 
                  transacao={transacaoEditando}
                  atualizarLista={carregarTransacoes}
                  fecharModal={() => {
                    setAbrirModal(false);
                    setTransacaoEditando(null); 
                  }}
                />

                <button onClick={() => setAbrirModal(false)}>
                  Fechar
                </button>
              </div>
            </div>
          )}
        </Col>

        <Col>
          <ListaTransacao 
            transacoes={transacoes} 
            onExcluir={handleExcluir}
            onEditar={handleEditar}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default TelaTransacao