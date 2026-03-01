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
}

// =============================
// ATIVAR CODIGO
// =============================
function ativarCodigo(){
let codigo = document.getElementById("codigoVIP").value.trim();
let lista = JSON.parse(localStorage.getItem("codigosVIP")) || {};

if(lista[codigo] && !lista[codigo].usado){

lista[codigo].usado = true;
localStorage.setItem("codigosVIP", JSON.stringify(lista));

localStorage.setItem("vipAtivo", lista[codigo].tipo);

if(lista[codigo].tipo === "mensal"){
localStorage.setItem("vipExpira", Date.now() + (30*24*60*60*1000));
}

alert("VIP ativado com sucesso");
window.location.href = "vip.html";

}else{
alert("Código inválido ou usado");
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
