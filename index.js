import { getContract, Contract, extractError, removeOptions } from "./base.js";
// Variaveis globais
var VagaNameOptions;

// 1. Carregamento do contrato 
window.onload = async () => {
	await getContract();
}
/* 2. Crião de vaga */
const setNewVaga = () => {
	const vaga_nome = document.querySelector("#vaga-nome").value;
	const vaga_exigencia = document.querySelector("#new-vaga-exigencia").value.replace(/\s/g,'').split(",");

	Contract.createVaga(vaga_nome, vaga_exigencia).then((tx) => {
		console.log(tx);
		loadVagaName();
	}).catch((err) => {
		// console.log(err[0]);
		var error = String(err)
		console.log(error)
	})
  }

// Creating variables for reusable dom elements
const setNewVagaButton = document.querySelector("#set-new-vaga");
// Adding event listeners to the buttons
setNewVagaButton.addEventListener("click", setNewVaga);
const loadVagaName = async () => {
	VagaNameOptions = await Contract.getAllNomesVagas();

	var selectBox = document.querySelector("#vaga-name-select");
	// var selectBox2 = document.querySelector("#status-curriculo-vaga-name-select");
	removeOptions(selectBox);
	// removeOptions(selectBox2);
	selectBox.options.add (new Option("Selecione uma vaga", "Selecione uma vaga", false));
	// selectBox2.options.add (new Option("Selecione uma vaga", "Selecione uma vaga", false));
	console.log("loadVagaName")
      for(var i = 0, l = VagaNameOptions.length; i < l; i++){
        var codenameOption = VagaNameOptions[i];

        selectBox.options.add( new Option(codenameOption, codenameOption, false) );
		// selectBox2.options.add( new Option(codenameOption, codenameOption, false) );
	}
}

const loadVagaNameSubmissao = async () => {
	console.log("loadVagaNameSubmissao")
	VagaNameOptions = await Contract.getAllNomesVagas();
	var selectBox = document.querySelector("#submissao-vaga-name-select");
	removeOptions(selectBox);
	selectBox.options.add (new Option("Selecione uma vaga", "Selecione uma vaga", false));
	for(var i = 0, l = VagaNameOptions.length; i < l; i++){
		var codenameOption = VagaNameOptions[i];
		selectBox.options.add( new Option(codenameOption, codenameOption, false) );
	}
}


const loadCurriculoVagaName = async () => {
	console.log("loadCurriculoVagaName")
	VagaNameOptions = await Contract.getAllNomesVagas();
	//   var selectBox = document.querySelector("#vaga-name-select");
      var selectBox2 = document.querySelector("#curriculo-vaga-name-select");
	  removeOptions(selectBox);
      for(var i = 0, l = VagaNameOptions.length; i < l; i++){
        var codenameOption = VagaNameOptions[i];
		// selectBox.options.add( new Option(codenameOption, codenameOption, false) );
		selectBox2.options.add( new Option(codenameOption, codenameOption, false) );
	}
}

const loadConsultaVagaName = async () => {
	console.log("loadConsultaVagaName")
	VagaNameOptions = await Contract.getAllNomesVagas();
	  var selectBox = document.querySelector("#vaga-name-select");
    //   var selectBox2 = document.querySelector("#curriculo-vaga-name-select");
	  removeOptions(selectBox);
      for(var i = 0, l = VagaNameOptions.length; i < l; i++){
        var codenameOption = VagaNameOptions[i];
		selectBox.options.add( new Option(codenameOption, codenameOption, false) );
		// selectBox2.options.add( new Option(codenameOption, codenameOption, false) );
	}
}

// Consulta de vagas
const loadExigenciasByName = async () => {
	console.log("loadExigenciasByName")
	const selected_vaga =  document.querySelector("#vaga-name-select").value
	const vaga_exigencias = await Contract.getVagaExigencia(selected_vaga)
	console.log("Exigencia da vaga selecionada: ",vaga_exigencias)
	document.querySelector("#select-vaga-exigencia").value = vaga_exigencias
	loadCurriculo()
}

// Edita vaga
const editExigencias = async () => {
	console.log("editExigencias")
	const vaga = document.querySelector("#vaga-name-select").value
	const new_exigencias = document.querySelector("#select-vaga-exigencia").value.replace(/\s/g,'').split(",")
	console.log(new_exigencias)
	Contract.setVagaExigencia(vaga, new_exigencias)
}

// Criar formulario de preenchimento (currículo) 
// baseado nas exigencias da vaga
const loadCurriculo = async () => {
	console.log("show, itens: ")
	const container = document.getElementById("div_show");
	let  fields = '';
	const selected_vaga =  document.querySelector("#curriculo-vaga-name-select").value
	const vaga_exigencias = await Contract.getVagaExigencia(selected_vaga)

	fields += '<div class="form-row">';
	fields += '<div class="form-group col-md">';
	fields += `<label>CPF</label>`;
	fields += `<input class="form-control" id="cpf">`;
	fields += '</div>';
	fields += '</div>';

	for(item of vaga_exigencias) {
		console.log(item)
		fields += '<div class="form-row">';
		fields += '<div class="form-group col-md">';
		fields += `<label>${item.charAt(0).toUpperCase() + item.slice(1)}</label>`;
		fields += `<input class="form-control" id="exigencia_${item}">`;
		fields += '</div>';
		fields += '</div>';
	}
	container.innerHTML = fields;
}

// Curriculo
// Criar novo currículo
const setNewCurriculo = async () => {
	console.log("setNewCurriculo")
	const curriculo_cpf = document.querySelector("#cpf").value
	const selected_vaga =  document.querySelector("#curriculo-vaga-name-select").value
	const vaga_exigencias = await Contract.getVagaExigencia(selected_vaga)
	const curriculo_respostas = []
	for (item of vaga_exigencias) {
		curriculo_respostas.push(document.querySelector("#exigencia_"+item).value)
	}
	console.log(curriculo_respostas)
	Contract.createVagaCurriculo(curriculo_vaga_name, curriculo_cpf, curriculo_respostas)
}

const loadCurriculoCPF = async () => {
	console.log("loadCurriculoCPF")
	const curriculo_vaga_name = document.querySelector("#curriculo-vaga-name-select").value
	console.log(curriculo_vaga_name)
	CurriculoCPFOptions = await Contract.getVagaCPFsByName(curriculo_vaga_name)
		var selectBox = document.querySelector("#curriculo-cpf-select");
		removeOptions(selectBox);
		for(var i = 0, l = CurriculoCPFOptions.length; i < l; i++){
		var codenameOption = CurriculoCPFOptions[i];
		selectBox.options.add( new Option(codenameOption, codenameOption, false) );
	}
}

