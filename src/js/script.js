
const containerProdutos  = document.getElementById("produtos-container");
const containerCarrinho  = document.getElementById("carrinho-container");
const totalElemento      = document.getElementById("total");
const estaEmPages = window.location.pathname.includes('/pages/');
const assetsPath  = estaEmPages ? '../src/assets/' : './src/assets/';



const produtos = [
  {
    id: 1,
    nome: "Voltz EV1",
    preco: 17990.00,
    imagem: "voltz-ev1-sport.webp",
    descricao: "Moto elétrica mais vendida do Brasil, ideal para uso urbano",
    autonomia: "120 km | Motor 3 kW"
  },
  {
    id: 2,
    nome: "Voltz EVS",
    preco: 21490.00,
    imagem: "16170218711237.webp",
    descricao: "Versão esportiva da Voltz com maior potência e autonomia",
    autonomia: "150 km | Motor 5 kW"
  },
  {
    id: 3,
    nome: "Scooter Elétrica W6",
    preco: 19750.00,
    imagem: "WS103-1-scaled1.png",
    descricao: "Elétrica com bateria de lítio removível e carregamento doméstico",
    autonomia: "130 km | Motor 4 kW"
  },
  {
    id: 4,
    nome: "Xiaomi HIMO T1",
    preco: 13900.00,
    imagem: "thequint_2019-04_a712f9cd-0831-4b64-9dd0-814e4b2c82a7_himo_t1.webp",
    descricao: "Compacta e conectada, com app integrado e design moderno",
    autonomia: "100 km | Motor 2,5 kW"
  },
  {
    id: 5,
    nome: "Vmoto Stash",
    preco: 28500.00,
    imagem: "1000002736.webp",
    descricao: "Elétrica premium europeia com alto desempenho e acabamento superior",
    autonomia: "180 km | Motor 7 kW"
  }
];


let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarCarrinho(id) {
  const produto = produtos.find(item => item.id === id);
  carrinho.push(produto);
  salvarCarrinho();
  mostrarNotificacao(`${produto.nome} adicionado ao carrinho ⚡`);
}

function removerCarrinho(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  mostrarCarrinho();
  calcularTotalAutomatico();
}

function mostrarNotificacao(msg) {
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    background:#141B24; border:1px solid #00D97E;
    color:#DFF0FF; padding:12px 20px; border-radius:8px;
    font-family:'Inter',sans-serif; font-size:13px; font-weight:500;
    box-shadow:0 6px 24px rgba(0,0,0,0.4);
    animation: fadeUp 0.3s ease;
  `;

  if (!document.getElementById('toast-style')) {
    const style = document.createElement('style');
    style.id = 'toast-style';
    style.textContent = `@keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }`;
    document.head.appendChild(style);
  }

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

function mostrarProdutos() {
  if (!containerProdutos) return;

  const html = produtos.map(item => `
    <div class="card">
      <img src="${assetsPath}${item.imagem}" alt="${item.nome}" onerror="this.style.background='#0D1520'">
      <span class="card-tag">Elétrica</span>
      <h3>${item.nome}</h3>
      <p class="descricao">${item.descricao}</p>
      <p class="autonomia">⚡ ${item.autonomia}</p>
      <p class="preco">R$ ${item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
      <button onclick="adicionarCarrinho(${item.id})">Adicionar ao carrinho</button>
    </div>
  `).join('');

  containerProdutos.innerHTML = html;
}

function mostrarCarrinho() {
  if (!containerCarrinho) return;

  if (carrinho.length === 0) {
    containerCarrinho.innerHTML = `
      <div class="carrinho-vazio">
        <div class="icone">🏍️</div>
        <p>Seu carrinho está vazio.</p>
      </div>`;
    return;
  }

  const html = carrinho.map((item, index) => `
    <div class="card carrinho-card">
      <img src="${assetsPath}${item.imagem}" alt="${item.nome}" onerror="this.style.background='#0D1520'">
      <div class="info">
        <span class="card-tag">Elétrica</span>
        <h3>${item.nome}</h3>
        <p class="descricao">${item.descricao}</p>
        <p class="autonomia">⚡ ${item.autonomia}</p>
        <p class="preco">R$ ${item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        <button class="btn-perigo" onclick="removerCarrinho(${index})">Remover</button>
      </div>
    </div>
  `).join('');

  containerCarrinho.innerHTML = html;
}


function calcularTotalAutomatico() {
  if (!totalElemento) return;

  const total = carrinho.reduce((acumulador, item) => acumulador + item.preco, 0);

  totalElemento.innerText = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  totalElemento.style.color = ''; 
}

function aplicarDesconto() {
  if (!totalElemento) return;

  const total    = carrinho.reduce((acumulador, item) => acumulador + item.preco, 0);
  const desconto = total * 0.9; 

  totalElemento.innerText    = `R$ ${desconto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  totalElemento.style.color  = '#FF7043'; // Destaca o valor com desconto em laranja

  mostrarNotificacao('Desconto de 10% aplicado! 🎉');
}

mostrarProdutos();
mostrarCarrinho();
calcularTotalAutomatico();


window.aplicarDesconto   = aplicarDesconto;
window.adicionarCarrinho = adicionarCarrinho;
window.removerCarrinho   = removerCarrinho;