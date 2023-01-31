// 1. Declare global variable to store the smart contract instance
export let Contract;

// 2. Set contract address and ABI
export const Contract_Address = "0x8A434A21498C8c4B8735838795c6D4fcAcE63E88";
// The Contract Application Binary Interface (ABI) is the standard way 
// to interact with contracts in the Ethereum ecosystem, both from 
// outside the blockchain and for contract-to-contract interaction. 
// Data is encoded according to its type, as described in this specification. 
// The encoding is not self describing and thus requires a schema in order to decode.
export const Contract_ABI = [
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
		"name": "checkIndexCPFVaga",
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
				"name": "cpf",
				"type": "string"
			}
		],
		"name": "deleteCurriculo",
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
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "removeCPFfromVaga",
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
	},
	{
		"inputs": [],
		"name": "test2Uint",
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
		"inputs": [],
		"name": "testString",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
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