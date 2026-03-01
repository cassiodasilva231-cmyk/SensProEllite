function detectarDPI() {
let largura = window.screen.width

if (largura <= 720) return 300
if (largura <= 1080) return 400
if (largura <= 1440) return 500
return 600
}

async function ativar() {

let codigo = document.getElementById("codigo").value
let nome = document.getElementById("nome").value
let celular = document.getElementById("celular").value

const { data, error } = await supabase
.from("codigos")
.select("*")
.eq("codigo", codigo)
.single()

if (!data) {
document.getElementById("status").innerText = "Código inválido"
return
}

if (data.usado) {
document.getElementById("status").innerText = "Código já usado"
return
}

let dpi = detectarDPI()

await supabase
.from("codigos")
.update({
usado: true,
cliente: nome,
celular: celular,
dpi: dpi
})
.eq("codigo", codigo)

document.getElementById("status").innerText =
"Sens ativada! DPI ideal: " + dpi
}
