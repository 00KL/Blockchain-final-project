// 1. Declare global variable to store the smart contract instance
let Contract;

// 2. Set contract address and ABI
const Contract_Address = "0xc82ED7D7a6317aE142697022d74C76D83f65B22a";
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
	
	  const checkTeacher = await Contract.getVagaExigencia("gerente");
	  console.log("test",checkTeacher,"test");
	  
	  loadVagaName();
    });
  });

}

/* 2. Crião de vaga */
const setNewVaga = () => {
	const vaga_nome = document.querySelector("#vaga-nome").value;
	const vaga_exigencia = [];
	vaga_exigencia.push(document.querySelector("#vaga-exigencia").value.replace(/\s/g,'').split(","));

	Contract.createVaga(vaga_nome, vaga_exigencia[0]).then((tx) => {
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
	console.log("loadVagaName")
	VagaNameOptions = await Contract.getAllNomesVagas();
      var selectBox = document.querySelector("#result-select");
	  removeOptions(selectBox);
      for(var i = 0, l = VagaNameOptions.length; i < l; i++){
        var codenameOption = VagaNameOptions[i];
        selectBox.options.add( new Option(codenameOption, codenameOption, false) );
	}
}

// Consulta de vagas
