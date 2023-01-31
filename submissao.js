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

		/* Carrega os nomes das vagas */
		loadVagaNameSubmissao();
		searchCPFBySenderAddress();
		getChangeContratadoEvent();

        });
    });
}

window.getChangeContratadoEvent = async () => {
	console.log("getChangeContratadoEvent")
	Contract.on("changeContratado", (value, event)=>{
		let transferEvent ={
			value: value,
			eventData: event,
		}
		console.log(JSON.stringify(transferEvent, null, 4))
		const status_contratado = document.getElementById("status-contratado");
		console.log(event);
		status_contratado.checked = event
		if(event){
			alert("Você foi contratado!")
		} else {
			alert("Você foi demitido!")
		}
	})
}

window.loadVagaNameSubmissao = async () => {
	console.log("loadVagaNameSubmissao")
	VagaNameOptions = await Contract.getAllNomesVagas();
	var selectBox = document.querySelector("#curriculo-vaga-name-select");
	removeOptions(selectBox);
	selectBox.options.add (new Option("Selecione uma vaga", "Selecione uma vaga", false));
	for(var i = 0, l = VagaNameOptions.length; i < l; i++){
		var codenameOption = VagaNameOptions[i];
		selectBox.options.add( new Option(codenameOption, codenameOption, false) );
	}
}

window.searchCPFBySenderAddress = async () => {
	console.log("searchCPFBySenderAddress")
	const senderCPF = await Contract.checkAddressCPF();
	document.querySelector("#cpf").value = senderCPF;
	console.log(senderCPF)
	if(senderCPF == ''){
		console.log("CPF não encontrado")
	} else{
		console.log("CPF encontrado")
		const selected_vaga =  await Contract.getVagaByCPF(senderCPF);
		const curriculo = await Contract.getVagaCurriculoRespostas(selected_vaga, senderCPF)
		const vaga_exigencias = await Contract.getVagaExigencia(selected_vaga)
		const container = document.getElementById("div_show");
		const status_contratado = document.getElementById("status-contratado");
		status_contratado.checked = await Contract.getVagaCurriculoContratado(selected_vaga, senderCPF);
		console.log("status_contratado: ", status_contratado.checked);

		document.querySelector("#cpf").disabled = true;
		document.querySelector("#curriculo-vaga-name-select").value = selected_vaga; 
		
		let cont = 0;
		let  fields = '';
		vaga_exigencias.forEach(item => {
			console.log(item)
			fields += '<div class="form-row">';
			fields += '<div class="form-group col-md">';
			fields += `<label>${item.charAt(0).toUpperCase() + item.slice(1)}</label>`;
			fields += `<input class="form-control" id="exigencia_${item}" value="${curriculo[cont]}">`;
			fields += '</div>';
			fields += '</div>';
			cont++;
		})
		container.innerHTML = fields;
		document.getElementById("edit-vaga").disabled = false;
		document.getElementById("edit-vaga").style.background='#198754';
		document.getElementById("edit-vaga").style.border='#198754'
	}
}

// Criar formulario de preenchimento (currículo) 
// baseado nas exigencias da vaga
window.loadCurriculo = async () => {
	console.log("show, itens: ")
	const container = document.getElementById("div_show");
	let  fields = '';
	const selected_vaga =  document.querySelector("#curriculo-vaga-name-select").value
	if(selected_vaga == "Selecione uma vaga") {
		container.innerHTML = '';
		document.getElementById("edit-vaga").disabled = true; 
		document.getElementById("edit-vaga").style.background='#6c757d';
		document.getElementById("edit-vaga").style.border='#6c757d'
		return;
	}
	document.getElementById("edit-vaga").disabled = false;
	document.getElementById("edit-vaga").style.background='#198754';
	document.getElementById("edit-vaga").style.border='#198754'
	const vaga_exigencias = await Contract.getVagaExigencia(selected_vaga)

	console.log(vaga_exigencias)

	vaga_exigencias.forEach(item => {
		console.log(item)
		fields += '<div class="form-row">';
		fields += '<div class="form-group col-md">';
		fields += `<label>${item.charAt(0).toUpperCase() + item.slice(1)}</label>`;
		fields += `<input class="form-control" id="exigencia_${item}">`;
		fields += '</div>';
		fields += '</div>';
	})
	container.innerHTML = fields;
  }

  // Curriculo
  // Criar novo currículo
  window.setNewCurriculo = async () => {
	console.log("setNewCurriculo")
	const curriculo_cpf = document.querySelector("#cpf").value
	const selected_vaga =  document.querySelector("#curriculo-vaga-name-select").value
	const vaga_exigencias = await Contract.getVagaExigencia(selected_vaga)
	const curriculo_respostas = []
	for (var item of vaga_exigencias) {
		curriculo_respostas.push(document.querySelector("#exigencia_"+item).value)
		if(document.querySelector("#exigencia_"+item).value == "") {
			alert("Preencha todos os campos")
			return;
		}
	}
	console.log(curriculo_respostas)
	Contract.createVagaCurriculo(selected_vaga, curriculo_cpf, curriculo_respostas)
  }

