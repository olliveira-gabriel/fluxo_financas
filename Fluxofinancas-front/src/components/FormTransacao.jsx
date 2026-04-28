import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { atualizarTransacao } from "../services/api";

const FormTransacao = ({ transacao, atualizarLista, fecharModal }) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (transacao) {
      reset(transacao);
    }
  }, [transacao, reset]);

  const onSubmit = async (data) => {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
      alert("Usuário não autenticado");
      return;
    }

    const valorFormatado = parseFloat(data.valor.toString().replace(",", "."));

    try {


      if (transacao) {
        await atualizarTransacao(transacao.id_transacao, {
          ...data,
          valor: valorFormatado
        });

        alert("Transação atualizada!");

      } else {

        const resposta = await fetch("http://localhost:3000/api/transacoes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            valor: valorFormatado,
            id_cliente: usuario.id
          })
        });

        if (!resposta.ok) {
          alert("Erro ao salvar transação");
          return;
        }

        alert("Transação criada!");
      }

      reset();
      await atualizarLista();
      fecharModal();

    } catch (erro) {
      console.error(erro);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <div>
      <form className='form-tr' onSubmit={handleSubmit(onSubmit)}>

        <input
          placeholder="Título"
          className='input-tr'
          type='text'
          {...register("titulo", { required: "Título é obrigatório" })}
        />
        {errors.titulo && <p className="erro">{errors.titulo.message}</p>}

        <input
          type="text"
          placeholder="Ex: 10,50"
          className='input-tr'
          {...register("valor", {
            required: "O valor é obrigatório",
            validate: (valor) => {
              const regexMoeda = /^\d+(?:[.,]\d{2})?$/;
              return regexMoeda.test(valor) || "Insira um valor válido (ex: 10,50)";
            }
          })}
        />
        {errors.valor && <p className="erro">{errors.valor.message}</p>}

        <select
          className='select-tr'
          {...register("tipo", {
            validate: (value) => value !== "0" || "Selecione o tipo"
          })}
        >
          <option value="0">Tipo</option>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
        {errors.tipo && <p className="erro">{errors.tipo.message}</p>}

        <input
          placeholder="Categoria"
          className='input-tr'
          type='text'
          {...register("categoria", { required: "Categoria é obrigatória" })}
        />
        {errors.categoria && <p className="erro">{errors.categoria.message}</p>}

        <input
          type="date"
          className='input-tr'
          {...register("data", {
            required: "A data é obrigatória"
          })}
        />
        {errors.data && <p className="erro">{errors.data.message}</p>}

        <button type="submit">
          {transacao ? "Salvar Alterações" : "Finalizar Transação"}
        </button>

      </form>
    </div>
  )
}

export default FormTransacao