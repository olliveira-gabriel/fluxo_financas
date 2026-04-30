import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { useEffect, useState } from "react";
import "../TelaTransacao/TelaTransacao.css"
import FormTransacao from "../../components/FormTransacao";
import ListaTransacao from "../../components/ListaTransacao";
import { listarTransacoes, deletarTransacao } from "../../services/api";
import NavBar from "../../components/NavBar/NavBar.jsx";
import IconeTr from '../../assets/iconeTr.png'
import CardRC from '../../components/CardRC.jsx'
import CardDP from '../../components/CardDP.jsx'
import CardVT from '../../components/CardVT.jsx'

function TelaTransacao() {
  const [abrirModal, setAbrirModal] = useState(false);
  const [transacoes, setTransacoes] = useState([]);
  const [transacaoEditando, setTransacaoEditando] = useState(null);
  const [atualizarCards, setAtualizarCards] = useState(false);

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
      setAtualizarCards(prev => !prev);
    } catch (erro) {
      console.error(erro);
      alert("Erro ao excluir");
    }
  }

  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <Col>
            <div className="sessao-tr">

              <div className="lado-esquerdo">
                <img className="icone-tr" src={IconeTr} />

                <div className="textos-tr">
                  <h1 className="titulo-tr">Transações</h1>
                  <p className="subtitulo-tr">
                    Acompanhe e organize suas movimentações financeiras.
                  </p>
                </div>
              </div>

              <button
                className="btn-add"
                onClick={() => setAbrirModal(true)}
              >
                + adicionar transação
              </button>

            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="cards-container">
              <CardVT atualizar={atualizarCards}/>
              <CardRC atualizar={atualizarCards}/>
              <CardDP atualizar={atualizarCards} />
            </div>
          </Col>
        </Row>
        {abrirModal && (
          <div className="modal">
            <div className="conteudo-modal">
              <h1 className="titulo">Nova Transação</h1>

             <FormTransacao
                key={transacaoEditando?.id_transacao || "novo"} 
                transacao={transacaoEditando}
                atualizarLista={async () => {
                  await carregarTransacoes();
                  setAtualizarCards(prev => !prev);
                }}
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
        <Row>
          <Col>
            <ListaTransacao
              transacoes={transacoes}
              onExcluir={handleExcluir}
              onEditar={handleEditar}
            />
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default TelaTransacao;