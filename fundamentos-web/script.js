const formProduto = document.querySelector("#form-produto");
const listaProdutos = document.querySelector("#lista-produtos");
const botaoFormulario = formProduto.querySelector("button");
const contadorProdutos = document.querySelector("#contador-produtos");
const mensagemVazia = document.querySelector("#mensagem-vazia");
const erroQuantidade = document.querySelector("#erro-quantidade");


function atualizarContador() {
  const quantidadeProdutos = listaProdutos.children.length;

  contadorProdutos.textContent =
    `Produtos cadastrados: ${quantidadeProdutos}`;

  if (quantidadeProdutos === 0) {
    mensagemVazia.style.display = "block";
  } else {
    mensagemVazia.style.display = "none";
  }
}

let itemEditando = null;

formProduto.addEventListener("submit", function (evento) {
  evento.preventDefault();

const nome = document.querySelector("#nome").value;
const preco = document.querySelector("#preco").value;
const quantidade = document.querySelector("#quantidade").value;

if (Number(quantidade) <= 0) {
  erroQuantidade.textContent =
    "A quantidade deve ser maior que zero.";
  return;
}
erroQuantidade.textContent = "";

  if (itemEditando) {
    atualizarProduto(itemEditando, nome, preco, quantidade);

    itemEditando = null;
    botaoFormulario.textContent = "Adicionar produto";
  } else {
    criarProduto(nome, preco, quantidade);
  }

  formProduto.reset();
});


function criarProduto(nome, preco, quantidade) {

  const item = document.createElement("li");

  const texto = document.createElement("span");

  texto.textContent =
    `${nome} - R$ ${Number(preco).toFixed(2)} (${quantidade} un.)`;

  item.dataset.nome = nome;
  item.dataset.preco = preco;
  item.dataset.quantidade = quantidade;

  const botaoEditar = document.createElement("button");
  botaoEditar.textContent = "Editar";

  botaoEditar.addEventListener("click", function () {

    document.querySelector("#nome").value = item.dataset.nome;
    document.querySelector("#preco").value = item.dataset.preco;
    document.querySelector("#quantidade").value = item.dataset.quantidade;

    itemEditando = item;

    botaoFormulario.textContent = "Salvar alterações";
  });


  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "Remover";

  botaoRemover.addEventListener("click", function () {
    item.remove();
    atualizarContador();

    if (itemEditando === item) {
      itemEditando = null;
      formProduto.reset();
      botaoFormulario.textContent = "Adicionar produto";
    }
  });

const areaBotoes = document.createElement("div");
areaBotoes.id = "batata";

areaBotoes.appendChild(botaoEditar);
areaBotoes.appendChild(botaoRemover);

item.appendChild(texto);
item.appendChild(areaBotoes);

  listaProdutos.appendChild(item);
  atualizarContador();
}

function atualizarProduto(item, nome, preco, quantidade) {

  item.dataset.nome = nome;
  item.dataset.preco = preco;
  item.dataset.quantidade = quantidade;

  item.querySelector("span").textContent =
    `${nome} - R$ ${Number(preco).toFixed(2)} (${quantidade} un.)`;
}