import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { useEffect, useState } from "react";
import "../TelaTransacao/TelaTransacao.css"
import FormTransacao from "../../components/FormTransacao";
import ListaTransacao from "../../components/ListaTransacao";
import { listarTransacoes } from "../../services/api";

function TelaTransacao() {

  const [abrirModal, setAbrirModal] = useState(false);
  const [transacoes, setTransacoes] = useState([]);

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

  return (
    <Container>
      <Row>
        <Col className="sessao-modal">
          <h1 className="titulo-tr">Transações</h1>

          <button onClick={() => setAbrirModal(true)}>
            + adicionar transação
          </button>

          {abrirModal && (
            <div className="modal">
              <div className="conteudo-modal">
                <h1>Nova Transação</h1>

                <FormTransacao 
                  atualizarLista={carregarTransacoes}
                  fecharModal={() => setAbrirModal(false)}
                />

                <button onClick={() => setAbrirModal(false)}>
                  Fechar
                </button>
              </div>
            </div>
          )}
        </Col>

        <Col>
          <ListaTransacao transacoes={transacoes} />
        </Col>
      </Row>
    </Container>
  )
}

export default TelaTransacao