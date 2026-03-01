let codigosVIP = JSON.parse(localStorage.getItem("codigosVIP")) || {};

function salvarCodigos(){
localStorage.setItem("codigosVIP", JSON.stringify(codigosVIP));
}

function gerarCodigo(){

let codigo = "VIP-" + Math.random().toString(36).substr(2,8).toUpperCase();

codigosVIP[codigo] = {
usado:false,
expira: Date.now() + (30 * 24 * 60 * 60 * 1000)
};

salvarCodigos();
return codigo;
}

function verificarVIP(){
return localStorage.getItem("vipAtivo") === "true";
}

function ativarVIP(){
localStorage.setItem("vipAtivo","true");
}

function verificarExpirados(){

for(let c in codigosVIP){
if(Date.now() > codigosVIP[c].expira){
delete codigosVIP[c];
}
}

salvarCodigos();
}

verificarExpirados();

function detectarCelular(){

let ua = navigator.userAgent.toLowerCase();

if(ua.includes("samsung")) return "Samsung";
if(ua.includes("xiaomi")) return "Xiaomi";
if(ua.includes("motorola")) return "Motorola";
if(ua.includes("iphone")) return "iPhone";

return "Android";
}
