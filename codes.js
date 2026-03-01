const SUPABASE_URL = "https://zrsyfkjmykgkloztgili.supabase.co";
const SUPABASE_KEY = "sb_publishable_-p2uZXfW5GlKe6G60xry0A_nfsTKwK5";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
// =============================
// CONFIG
// =============================
const ADMIN_SENHA = "123456"; // mude depois
const PRECO_MENSAL = 9.90;
const PRECO_VITALICIO = 29.90;

// =============================
// BANCO LOCAL
// =============================
let codigosVIP = JSON.parse(localStorage.getItem("codigosVIP")) || {};

function salvarCodigos(){
localStorage.setItem("codigosVIP", JSON.stringify(codigosVIP));
}

// =============================
// GERAR CODIGO
// =============================
function gerarCodigo(tipo="mensal"){
let codigo = "VIP-" + Math.random().toString(36).substr(2,8).toUpperCase();

codigosVIP[codigo] = {
usado:false,
tipo:tipo,
expira: tipo === "mensal"
? Date.now() + (30*24*60*60*1000)
: 9999999999999
};

salvarCodigos();

document.getElementById("codigoGerado").innerText = codigo;
async function validarCodigo(codigoDigitado) {
  const { data, error } = await supabase
    .from("codigos")
    .select("*")
    .eq("codigo", codigoDigitado)
    .eq("usado", false)
    .single();

  if (error || !data) {
    alert("Código inválido ou já usado");
    return false;
  }

  // marcar como usado
  await supabase
    .from("codigos")
    .update({ usado: true })
    .eq("id", data.id);

  // salvar tipo de vip
  localStorage.setItem("vipAtivo", data.tipo);

  if (data.tipo === "mensal") {
    const expira = Date.now() + (30 * 24 * 60 * 60 * 1000);
    localStorage.setItem("vipExpira", expira);
  } else {
    localStorage.setItem("vipExpira", "vitalicio");
  }

  return true;
}
// =============================
// ATIVAR CODIGO
// =============================
async function ativarCodigo(){
  let codigoDigitado = document.getElementById("codigoVIP").value.trim();

  const valido = await validarCodigo(codigoDigitado);

  if(valido){
    alert("VIP ativado com sucesso");
    window.location.href = "vip.html";
  }
}

// =============================
// VERIFICAR VIP
// =============================
function verificarVIP(){

let tipo = localStorage.getItem("vipAtivo");
let expira = localStorage.getItem("vipExpira");

if(tipo === "vitalicio") return true;

if(tipo === "mensal"){
if(Date.now() < expira) return true;
}

return false;
}

// =============================
// LOGIN ADMIN
// =============================
function loginAdmin(){

let senha = document.getElementById("senhaAdmin").value;

if(senha === ADMIN_SENHA){
document.getElementById("painelAdmin").style.display = "block";
}else{
alert("Senha errada");
}

}

// =============================
// DETECTAR CELULAR
// =============================
function detectarCelular(){

let ua = navigator.userAgent.toLowerCase();

if(ua.includes("samsung")) return "Samsung";
if(ua.includes("xiaomi")) return "Xiaomi";
if(ua.includes("motorola")) return "Motorola";
if(ua.includes("iphone")) return "iPhone";

return "Android";

 }
