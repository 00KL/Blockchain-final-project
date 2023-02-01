import { extractError, removeOptions, Contract_Address, Contract_ABI } from "./base.js";

let Contract;

// Variaveis globais
var VagaNameOptions;

// 1. Carregamento do contrato 
window.onload = async () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
    provider.send("eth_requestAccounts", []).then( () => {
        provider.listAccounts().then( async (accounts) => {
        const signer = provider.getSigner(accounts[0]);
    
        /* Cria instancia do contrato de vagas */
        Contract = new ethers.Contract(
            Contract_Address,
            Contract_ABI,
            signer
        );

		/* Carrega nomes das vagas */
		loadVagaName();

        });
    });
}

const loadVagaName = async () => {
	VagaNameOptions = await Contract.getAllNomesVagas();

	var selectBox = document.querySelector("#vaga-name-select");
	var selectBox2 = document.querySelector("#curriculo-vaga-name-select");
	var selectBoxCPF = document.querySelector("#curriculo-cpf-select");	
	removeOptions(selectBox);
	removeOptions(selectBox2);
	selectBox.options.add (new Option("Selecione uma vaga", "Selecione uma vaga", false));
	selectBox2.options.add (new Option("Selecione uma vaga", "Selecione uma vaga", false));
	selectBoxCPF.options.add (new Option("Selecione um CPF", "Selecione um CPF", false));
	console.log("loadVagaName")
      for(var i = 0, l = VagaNameOptions.length; i < l; i++){
        var codenameOption = VagaNameOptions[i];

        selectBox.options.add( new Option(codenameOption, codenameOption, false) );
		selectBox2.options.add( new Option(codenameOption, codenameOption, false) );
	}
}

/* 2. Crião de vaga */
// ------------------ Criar nova vaga ------------------
const setNewVaga = () => {
	if(document.querySelector("#vaga-nome").value == "" || document.querySelector("#new-vaga-exigencia").value == ""){
		alert("Preencha todos os campos")
		return
	}
	const vaga_nome = document.querySelector("#vaga-nome").value;
	const vaga_exigencia = document.querySelector("#new-vaga-exigencia").value.replace(/\s/g,'').split(",");

	Contract.createVaga(vaga_nome, vaga_exigencia).then((tx) => {
		console.log(tx);
		// loadVagaName();
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

export const loadVagaNameSubmissao = async () => {
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
// ------------------ Criar nova vaga ------------------

// ------------------ Editor de exigencia de vagas ------------------
window.loadConsultaVagaName = async () => {
	console.log("loadConsultaVagaName")
	VagaNameOptions = await Contract.getAllNomesVagas();
	var selectBox = document.querySelector("#vaga-name-select");
    //   var selectBox2 = document.querySelector("#curriculo-vaga-name-select");
	removeOptions(selectBox);
	selectBox.options.add (new Option("Selecione uma vaga", "Selecione uma vaga", false));
	for(var i = 0, l = VagaNameOptions.length; i < l; i++){
		var codenameOption = VagaNameOptions[i];
		selectBox.options.add( new Option(codenameOption, codenameOption, false) );
		// selectBox2.options.add( new Option(codenameOption, codenameOption, false) );
	}
}

// Consulta de vagas
window.loadExigenciasByName = async () => {
	console.log("loadExigenciasByName")
	if(document.querySelector("#vaga-name-select").value == "Selecione uma vaga"){
		document.querySelector("#select-vaga-exigencia").value = ''
		document.getElementById("edit-vaga").disabled = true; 
		document.getElementById("edit-vaga").style.background='#6c757d';
		document.getElementById("edit-vaga").style.border='#6c757d';
		return
	}
	document.getElementById("edit-vaga").disabled = false;
	document.getElementById("edit-vaga").style.background='#198754';
	document.getElementById("edit-vaga").style.border='#198754';

	const selected_vaga =  document.querySelector("#vaga-name-select").value
	const vaga_exigencias = await Contract.getVagaExigencia(selected_vaga)
	console.log("Exigencia da vaga selecionada: ",vaga_exigencias)
	document.querySelector("#select-vaga-exigencia").value = vaga_exigencias
	// loadCurriculo()
}

// Edita vaga
window.editExigencias = async () => {
	console.log("editExigencias")
	const vaga = document.querySelector("#vaga-name-select").value
	const new_exigencias = document.querySelector("#select-vaga-exigencia").value.replace(/\s/g,'').split(",")
	console.log(new_exigencias)
	Contract.setVagaExigencia(vaga, new_exigencias)
}

// ------------------ Editor de exigencia de vagas ------------------

// ------------------ Status curriculo ------------------
window.loadCurriculoVagaName = async () => {
	console.log("loadCurriculoVagaName")
	VagaNameOptions = await Contract.getAllNomesVagas();
	//   var selectBox = document.querySelector("#vaga-name-select");
      var selectBox2 = document.querySelector("#curriculo-vaga-name-select");
	  removeOptions(selectBox2);
	  selectBox2.options.add (new Option("Selecione uma vaga", "Selecione uma vaga", false));
      for(var i = 0, l = VagaNameOptions.length; i < l; i++){
        var codenameOption = VagaNameOptions[i];
		// selectBox.options.add( new Option(codenameOption, codenameOption, false) );
		selectBox2.options.add( new Option(codenameOption, codenameOption, false) );
	}
}

window.loadCurriculoCPF = async () => {
	console.log("loadCurriculoCPF")
	const curriculo_vaga_name = document.querySelector("#curriculo-vaga-name-select").value
	console.log(curriculo_vaga_name)

	const container = document.getElementById("div_show");
	if(curriculo_vaga_name == "Selecione uma vaga") {
		container.innerHTML = '';
		return;
	}

	const CurriculoCPFOptions = await Contract.getVagaCPFsByName(curriculo_vaga_name)
	var selectBox = document.querySelector("#curriculo-cpf-select");
	removeOptions(selectBox);
	selectBox.options.add (new Option("Selecione um CPF", "Selecione um CPF", false));
	for(var i = 0, l = CurriculoCPFOptions.length; i < l; i++){
        var codenameOption = CurriculoCPFOptions[i];
        selectBox.options.add( new Option(codenameOption, codenameOption, false) );
	}
}

window.loadCurriculo = async () => {
	console.log("loadCurriculo")
	const selected_vaga =  document.querySelector("#curriculo-vaga-name-select").value
	const curriculo_cpf = document.querySelector("#curriculo-cpf-select").value

	const container = document.getElementById("div_show");
	let  fields = '';
	if(curriculo_cpf == "Selecione um CPF") {
		container.innerHTML = '';
		document.getElementById("curriculo_vazio").style.display = "block";
		document.getElementById("curriculo_preenchido").style.display = "none";
		document.getElementById("edit-vaga-status").disabled = true; 
		document.getElementById("edit-vaga-status").style.background='#6c757d';
		document.getElementById("edit-vaga-status").style.border='#6c757d';
		return;
	}
	document.getElementById("curriculo_vazio").style.display = "none";
	document.getElementById("curriculo_preenchido").style.display = "block";
	document.getElementById("edit-vaga-status").disabled = false;
	document.getElementById("edit-vaga-status").style.background='#198754';
	document.getElementById("edit-vaga-status").style.border='#198754';

	const curriculo = await Contract.getVagaCurriculoRespostas(selected_vaga, curriculo_cpf)
	const vaga_exigencias = await Contract.getVagaExigencia(selected_vaga)
	console.log(curriculo)
	let cont = 0;
	vaga_exigencias.forEach(item => {
		console.log(item)
		fields += '<div class="form-row">';
		fields += '<div class="form-group col-md">';
		fields += `<label>${item.charAt(0).toUpperCase() + item.slice(1)}</label>`;
		fields += `<input class="form-control" id="exigencia_${item}" value="${curriculo[cont]}" readonly>`;
		fields += '</div>';
		fields += '</div>';
		cont++;
	})
	let status_contratado = await Contract.getVagaCurriculoContratado(selected_vaga, curriculo_cpf);
	console.log(status_contratado)
	fields += `<div class="form-check form-switch" style="padding-top: 0.2em;">`
	if(status_contratado == true) {
		fields += `<input class="form-check-input" type="checkbox" role="switch" id="status-contratado" checked />`
	} else {
		fields += `<input class="form-check-input" type="checkbox" role="switch" id="status-contratado" />`
	}
	fields += `<label class="form-check-label" for="status-contratado">Status de contração</label>`
	fields += `</div>`
	container.innerHTML = fields;
}

window.editCurriculoContratadoStatus = async () => {
	console.log("editCurriculo")
	const selected_vaga =  document.querySelector("#curriculo-vaga-name-select").value
	const curriculo_cpf = document.querySelector("#curriculo-cpf-select").value
	const status_contratado = document.querySelector("#status-contratado").checked
	console.log(status_contratado)
	Contract.contratarVagaCurriculo(selected_vaga, curriculo_cpf, status_contratado)
}

