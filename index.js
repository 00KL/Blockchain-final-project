// 1. Declare global variable to store the smart contract instance
let Contract;

// 2. Set contract address and ABI
const Contract_Address = "0xe8798b0a9690D71D75CfB0f0FF3F78Ac3B822D09";
// The Contract Application Binary Interface (ABI) is the standard way 
// to interact with contracts in the Ethereum ecosystem, both from 
// outside the blockchain and for contract-to-contract interaction. 
// Data is encoded according to its type, as described in this specification. 
// The encoding is not self describing and thus requires a schema in order to decode.
const Contract_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "saTuringAmount",
				"type": "uint256"
			}
		],
		"name": "issueToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "codinome",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "saTuringAmount",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addressToCodename",
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
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
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
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
				"name": "codename",
				"type": "string"
			}
		],
		"name": "balanceOfCodename",
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
				"name": "voter",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "candidate",
				"type": "string"
			}
		],
		"name": "checkVoteOnCodename",
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
				"name": "",
				"type": "string"
			}
		],
		"name": "codenameToAddress",
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
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCodenameList",
		"outputs": [
			{
				"internalType": "string[20]",
				"name": "",
				"type": "string[20]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTeacherCodeName",
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
		"name": "getUserAddress",
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
		"inputs": [],
		"name": "getUserCodeName",
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
		"name": "isTeacher",
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
		"inputs": [],
		"name": "name",
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
		"name": "symbol",
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
		"name": "totalSupply",
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
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "userBlockVote",
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
];

// 4. Creating variables for reusable dom elements
const setVoteButton = document.querySelector("#set-new-vote");
const setIssueTokenButton = document.querySelector("#set-issue-token");
const setEndVotingButton = document.querySelector("#end-voting");
const voteSection = document.querySelector("#vote-section");
const teacherSection = document.querySelector("#teacher-section");
const getVoteButton = document.querySelector("#get-vote");

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

/* 5. Function to set pet details */
const setNewVote = () => {
  const candidate = document.querySelector("#codename-select").value;
  const turingAmount = parseFloat(document.querySelector("#turing-amount").value);
  if(turingAmount > 2){
	document.querySelector("#turing-amount-error").style.display = "block";
	return;
  }
  document.querySelector("#turing-amount-error").style.display = "none";
  const saTuringAmount = turingAmount*(10**18);
  Contract.vote(candidate, String(saTuringAmount)).then((tx) => {
    console.log(tx);
  }).catch((err) => {
	var error = extractError(err);
	console.log("Error: ", error);
	alert(error);
  });
}

const setIssueToken = () => {
  const receiver = document.querySelector("#receiver").value;
  const amount = parseFloat(document.querySelector("#amount").value);
//   console.log("Issue: ",receiver, amount);
  const saTuringAmount = amount*(10**18);
  Contract.issueToken(receiver, String(saTuringAmount)).then((tx) => {
    console.log(tx);
  }).catch((err) => {
	var error = extractError(err);
	console.log("Error: ", error);
	console.log(err);
	alert(error);
  });
}

const setEndVoting = () => {
  Contract.endVoting().then((tx) => {
    console.log(tx);
  }).catch((err) => {
	var error = extractError(err);
	console.log("Error: ", error);
	alert(error);
  });
}

const getVote = () => {
	const candidate = document.querySelector("#result-select").value;
	Contract.balanceOfCodename(candidate).then((tx) => {
		console.log(parseInt(tx["_hex"], 16));
		const result = document.querySelector("#result");
		result.innerHTML = parseInt(tx["_hex"], 16) * 10**(-18);
	});
}

function onlyNumberKey(evt) {
	// Only ASCII character in that range allowed
	var ASCIICode = (evt.which) ? evt.which : evt.keyCode
		if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
			return false;
	return true;
}

// 6. Adding event listeners to the buttons
setVoteButton.addEventListener("click", setNewVote);
setIssueTokenButton.addEventListener("click", setIssueToken);
setEndVotingButton.addEventListener("click", setEndVoting);
getVoteButton.addEventListener("click", getVote);

// 7. Carregamento do contrato 
window.onload = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
  provider.send("eth_requestAccounts", []).then( () => {
    provider.listAccounts().then( async (accounts) => {
      const signer = provider.getSigner(accounts[0]);

      /* 3.1 Create instance of pet smart contract */
      Contract = new ethers.Contract(
        Contract_Address,
        Contract_ABI,
        signer
      );
	
	  const checkTeacher = await Contract.isTeacher();
	  if(checkTeacher){
		  voteSection.style.display = "none";
		  teacherSection.style.display = "block";
	  }else{
		voteSection.style.display = "block";
		teacherSection.style.display = "none";
	  }

      const codename = await Contract.getUserCodeName();
      document.querySelector(".voter-codename").innerText = "Usuário: " + codename;

      const codenameOptions = await Contract.getCodenameList();
      var selectBox = document.querySelector("#codename-select");
	  var selectBox2 = document.querySelector("#result-select");
      for(var i = 0, l = codenameOptions.length; i < l; i++){
        var codenameOption = codenameOptions[i];
        selectBox.options.add( new Option(codenameOption, codenameOption, false) );
		selectBox2.options.add( new Option(codenameOption, codenameOption, false) );
	}
    });
  });

}