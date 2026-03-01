const supabase = supabase.createClient(
"https://zrsyfkjmykgkloztgili.supabase.co",
"sb_publishable_-p2uZXfW5GlKe6G60xry0A_nfsTKwK5"
)

const senhaAdmin = "senspro2025"

function login(){
let senha = document.getElementById("senha").value

if(senha === senhaAdmin){
document.getElementById("painel").style.display = "block"
}
}

function gerarCodigo(){
return "VIP-" + Math.random().toString(36).substring(2,8).toUpperCase()
}

async function criarCodigo(){

let codigo = gerarCodigo()
let tipo = document.getElementById("tipo").value

await supabase
.from("codigos")
.insert([{codigo:codigo, tipo:tipo}])

document.getElementById("novoCodigo").innerText = codigo
}

async function listarClientes(){

let { data } = await supabase
.from("clientes")
.select("*")

let html = ""

data.forEach(c => {
html += `
<div class="cliente">
${c.nome} - ${c.celular} - ${c.codigo_ativado}
<button onclick="banir(${c.id})">Banir</button>
</div>
`
})

document.getElementById("clientes").innerHTML = html
}

async function banir(id){

await supabase
.from("clientes")
.update({banido:true})
.eq("id", id)

listarClientes()
}
