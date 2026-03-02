async function ativarCodigo() {

const codigo = document.getElementById("codigo").value;
const nome = document.getElementById("nome").value;
const celular = document.getElementById("celular").value;

const { data, error } = await supabaseClient
.from("codigos")
.select("*")
.eq("codigo", codigo)
.single();

if(error || !data){
document.getElementById("resultado").innerText = "Código inválido";
return;
}

if(data.usado){
document.getElementById("resultado").innerText = "Código já usado";
return;
}

await supabaseClient
.from("codigos")
.update({
usado: true,
cliente: nome,
celular: celular
})
.eq("codigo", codigo);

document.getElementById("resultado").innerText = "Código ativado com sucesso";
}
