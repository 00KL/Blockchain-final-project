// 1. Declare global variable to store the smart contract instance
export let Contract;

// 2. Set contract address and ABI
export const Contract_Address = "0x9aEE797f7e908abBecc16Ecd6F7901F82a21C217";
// The Contract Application Binary Interface (ABI) is the standard way 
// to interact with contracts in the Ethereum ecosystem, both from 
// outside the blockchain and for contract-to-contract interaction. 
// Data is encoded according to its type, as described in this specification. 
// The encoding is not self describing and thus requires a schema in order to decode.
export const Contract_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "cpf",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"name": "changeContratado",
		"type": "event"
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
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"name": "contratarVagaCurriculo",
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
		"name": "checkAddressCPF",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
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
				"name": "cpf",
				"type": "string"
			}
		],
		"name": "getVagaByCPF",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
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
		"name": "getVagaCurriculoContratado",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
	},
	{
		"inputs": [],
		"name": "isGerente",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Extrator de erro
export const extractError = (err) => {
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

export function removeOptions(selectElement) {
	var i, L = selectElement.options.length - 1;
	for(i = L; i >= 0; i--) {
	   selectElement.remove(i);
	}
 }