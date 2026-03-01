const supabase = supabase.createClient(
"https://zrsyfkjmykgkloztgili.supabase.co",
"sb_publishable_-p2uZXfW5GlKe6G60xry0A_nfsTKwK5"
)

async function ativar() {

let nome = document.getElementById("nome").value
let celular = document.getElementById("celular").value
let codigo = document.getElementById("codigo").value

let { data } = await supabase
.from("codigos")
.select("*")
.eq("codigo", codigo)

if(data.length == 0){
document.getElementById("status").innerText = "Código inválido"
return
}

if(data[0].usado){
document.getElementById("status").innerText = "Código já usado"
return
}

await supabase
.from("codigos")
.update({
usado:true,
comprador:nome,
dispositivo:navigator.userAgent
})
.eq("codigo", codigo)

await supabase
.from("clientes")
.insert([
{
nome:nome,
celular:celular,
codigo_ativado:codigo
}
])

document.getElementById("status").innerText = "VIP ativado com sucesso"
}
