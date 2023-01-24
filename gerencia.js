// 1. Declare global variable to store the smart contract instance
let Contract;

// 2. Set contract address and ABI
const Contract_Address = "0xFF144cb8c9DCFA7431Fb2835022ee31470D2C3F1";
// The Contract Application Binary Interface (ABI) is the standard way 
// to interact with contracts in the Ethereum ecosystem, both from 
// outside the blockchain and for contract-to-contract interaction. 
// Data is encoded according to its type, as described in this specification. 
// The encoding is not self describing and thus requires a schema in order to decode.
const Contract_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nome_vaga",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "exigencias",
				"type": "string[]"
			}
		],
		"name": "createVaga",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nome_vaga",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cpf",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "respostas",
				"type": "string[]"
			}
		],
		"name": "createVagaCurriculo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nome_vaga",
				"type": "string"
			}
		],
		"name": "decrementaVagaDisponibilidade",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nome_vaga",
				"type": "string"
			}
		],
		"name": "incrementaVagaDisponibilidade",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nome_vaga",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cpf",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "respostas",
				"type": "string[]"
			}
		],
		"name": "setVagaCurriculoRespostas",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nome_vaga",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "exigencia",
				"type": "string[]"
			}
		],
		"name": "setVagaExigencia",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllNomesVagas",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nome_vaga",
				"type": "string"
			}
		],
		"name": "getVagaAddressByName",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nome_vaga",
				"type": "string"
			}
		],
		"name": "getVagaCPFsByName",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nome_vaga",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cpf",
				"type": "string"
			}
		],
		"name": "getVagaCurriculoAddressByCPF",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nome_vaga",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cpf",
				"type": "string"
			}
		],
		"name": "getVagaCurriculoRespostas",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nome_vaga",
				"type": "string"
			}
		],
		"name": "getVagaDisponibilidade",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nome_vaga",
				"type": "string"
			}
		],
		"name": "getVagaExigencia",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Extrator de erro
const extractError = (err) => {
	var erro = String(err)
	var mySubString = erro.substring(
		erro.indexOf(",\"message") + 1, 
		erro.indexOf(",\"data\"")
	);

	var aux = mySubString.substring(
		mySubString.indexOf(":") + 1, 
		mySubString.length
	);

	var aux2 = aux.substring(
		aux.indexOf(":") + 1, 
		aux.length -1
	);
	if (aux2.length == 0) {
		return "Error on transaction"
	}
	return aux2;
}

function removeOptions(selectElement) {
	var i, L = selectElement.options.length - 1;
	for(i = L; i >= 0; i--) {
	   selectElement.remove(i);
	}
 }

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
	
	//   const checkTeacher = await Contract.getVagaExigencia("gerente");
	//   console.log("test",checkTeacher,"test");
	  
	  loadVagaName();
	//   loadVagaNameSubmissao();
    });
  });

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
	var selectBox2 = document.querySelector("#status-curriculo-vaga-name-select");
	removeOptions(selectBox);
	removeOptions(selectBox2);
	selectBox.options.add (new Option("Selecione uma vaga", "Selecione uma vaga", false));
	selectBox2.options.add (new Option("Selecione uma vaga", "Selecione uma vaga", false));
	console.log("loadVagaName")
      for(var i = 0, l = VagaNameOptions.length; i < l; i++){
        var codenameOption = VagaNameOptions[i];

        selectBox.options.add( new Option(codenameOption, codenameOption, false) );
		selectBox2.options.add( new Option(codenameOption, codenameOption, false) );
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

