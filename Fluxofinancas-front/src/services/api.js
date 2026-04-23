const API = "http://localhost:3000/api/usuarios";

export async function cadastrarUsuario(dados) {

  const resposta = await fetch(`${API}/cadastros`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  });

  return resposta.json();
}

export async function loginUsuario(dados){

  const resposta = await fetch(`${API}/login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(dados)
  })

  return resposta.json()
}
export async function criarTransacao(dados) {
  const resposta = await fetch("http://localhost:3000/api/transacoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  });

  return resposta.json();
}

export async function listarTransacoes() {

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    Error("Usuário não encontrado");
  }

  const resposta = await fetch(
    `http://localhost:3000/api/transacoes/${usuario.id}`
  );

  if (!resposta.ok) {
    Error("Erro ao buscar transações");
  }

  const dados = await resposta.json();

  return dados;
}
export async function deletarTransacao(id) {
  const resposta = await fetch(`http://localhost:3000/api/transacoes/${id}`, {
    method: "DELETE"
  });

  return resposta.json();
}
export async function atualizarTransacao(id, dados) {
  const resposta = await fetch(`http://localhost:3000/api/transacoes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  });

  return resposta.json();
}