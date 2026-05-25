
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