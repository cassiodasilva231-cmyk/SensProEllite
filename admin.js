const SENHA_ADMIN = "123456"

function login() {
let senha = document.getElementById("senha").value

if (senha === SENHA_ADMIN) {
document.getElementById("login").style.display = "none"
document.getElementById("painel").style.display = "block"
carregarClientes()
}
}

function gerarCodigo() {
return "VIP-" + Math.random().toString(36).substring(2,8).toUpperCase()
}

async function criarCodigo() {

let codigo = gerarCodigo()
let tipo = document.getElementById("tipo").value

await supabase
.from("codigos")
.insert([{ codigo: codigo, tipo: tipo, usado:false }])

document.getElementById("novoCodigo").innerText = codigo
}

async function carregarClientes() {

const { data } = await supabase
.from("codigos")
.select("*")

let html = ""

data.forEach(c => {
html += `
<div class="cliente">
${c.cliente || "—"} | ${c.celular || "—"} | ${c.codigo}
<button onclick="banir('${c.codigo}')">Banir</button>
</div>
`
})

document.getElementById("lista").innerHTML = html
}

async function banir(codigo) {

await supabase
.from("codigos")
.delete()
.eq("codigo", codigo)

carregarClientes()
  }
