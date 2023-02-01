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
		let test = await Contract.isGerente();
		if(test){
			document.location.href = "gerencia.html";
		} else {
			document.location.href = "submissao.html";
		}
        });
    });
}