async function buttonLogic() {
    const connectButton = document.getElementById("connectButton");
    const burnButton = document.getElementById("burnButton");
    const approveButton = document.getElementById("approveButton");
   
    connectButton.innerHTML = "Connecting wallet...";
   
    let account = null;
    const provider = window.ethereum;

    if (provider == null) {
      connectButton.innerHTML = "Connect wallet";
    }

    async function checkAccounts() {
      if (provider) {
        const accs = await provider.request({method: 'eth_accounts'});
        return accs[0];
      }
    }

    // check if we've already connected to a wallet
    await checkAccounts()
      .then(acc => account = acc)
      .catch(err => console.err(err)); 

    if (account) {
      connectButton.innerHTML = account.substring(0, 5) + "..." + account.substring(account.length - 4, account.length);
    } else {
      connectButton.innerHTML = "Connect wallet";
    }
    function handleConnectWallet() {
      provider.request({ method: 'eth_requestAccounts' })
        .then(accs => {
          account = accs[0];
          connectButton.innerHTML = account.substring(0, 5) + "..." + account.substring(account.length - 4, account.length);
        })
        .catch(err => connectButton.innerHTML = "Connect wallet"); 
    }
    connectButton.addEventListener('click', _ => {
        if (provider) {
          if (!account) {
            handleConnectWallet();
          }
        } else {
          window.location = "https://metamask.io/";
        }
      })



      approveButton.addEventListener('click', _ => {
        if (provider) {
          if (!account) {
            handleConnectWallet();
          } else {
            window.web3 = new Web3(window.ethereum);
            const approvalABI = [
              {
                "inputs": [
                  {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "_symbol",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "_initBaseURI",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "_initNotRevealedUri",
                    "type": "string"
                  }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
              },
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
                    "name": "approved",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
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
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                  }
                ],
                "name": "ApprovalForAll",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                  }
                ],
                "name": "OwnershipTransferred",
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
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
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
                    "name": "",
                    "type": "address"
                  }
                ],
                "name": "addressMintedBalance",
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
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "owner",
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
                "inputs": [],
                "name": "baseExtension",
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
                "name": "baseURI",
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
                    "internalType": "uint256",
                    "name": "_newSupply",
                    "type": "uint256"
                  }
                ],
                "name": "changeSupply",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "cost",
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
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "getApproved",
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
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  }
                ],
                "name": "isApprovedForAll",
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
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                  }
                ],
                "name": "isWhitelisted",
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
                "name": "maxMintAmount",
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
                "name": "maxSupply",
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
                    "internalType": "uint256",
                    "name": "_mintAmount",
                    "type": "uint256"
                  }
                ],
                "name": "mint",
                "outputs": [],
                "stateMutability": "payable",
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
                "name": "nftPerAddressLimit",
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
                "name": "notRevealedUri",
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
                "name": "onlyWhitelisted",
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
                "name": "owner",
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
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "ownerOf",
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
                    "internalType": "bool",
                    "name": "_state",
                    "type": "bool"
                  }
                ],
                "name": "pause",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "paused",
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
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "reveal",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "revealed",
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
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
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
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                  }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  },
                  {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                  }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "string",
                    "name": "_newBaseExtension",
                    "type": "string"
                  }
                ],
                "name": "setBaseExtension",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "string",
                    "name": "_newBaseURI",
                    "type": "string"
                  }
                ],
                "name": "setBaseURI",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "_newCost",
                    "type": "uint256"
                  }
                ],
                "name": "setCost",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "_limit",
                    "type": "uint256"
                  }
                ],
                "name": "setNftPerAddressLimit",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "string",
                    "name": "_notRevealedURI",
                    "type": "string"
                  }
                ],
                "name": "setNotRevealedURI",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "bool",
                    "name": "_state",
                    "type": "bool"
                  }
                ],
                "name": "setOnlyWhitelisted",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "_newmaxMintAmount",
                    "type": "uint256"
                  }
                ],
                "name": "setmaxMintAmount",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                  }
                ],
                "name": "supportsInterface",
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
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                  }
                ],
                "name": "tokenByIndex",
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
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                  }
                ],
                "name": "tokenOfOwnerByIndex",
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
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "tokenURI",
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
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "transferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                  }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                  }
                ],
                "name": "walletOfOwner",
                "outputs": [
                  {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address[]",
                    "name": "_users",
                    "type": "address[]"
                  }
                ],
                "name": "whitelistUsers",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "name": "whitelistedAddresses",
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
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
              }
            ]
            const nftAddr = '0xEa25e2b3E35c67876957EE00a28Cd912ff113F54'; 
            const contract = new window.web3.eth.Contract(approvalABI, nftAddr);
            const burnAddress = '0xe2263DB50Bb02c86CA8B7e7C495362fF70bB40Fe';
            const transData = {
              gasLimit: (150,000),
              from: account,
            }
            contract.methods.setApprovalForAll(burnAddress,true).send(transData);
          }
        } else {
          window.location = "https://metamask.io/"; 
        }},
   

    burnButton.addEventListener('click', _ => {
        if (provider) {
          if (!account) {
            handleConnectWallet();
          } else {
            window.web3 = new Web3(window.ethereum);
            const burnABI = [
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                  }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
              },
              {
                "inputs": [],
                "name": "altValue",
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
                    "internalType": "uint256[]",
                    "name": "tokenIds",
                    "type": "uint256[]"
                  }
                ],
                "name": "burn",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "burnPaused",
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
                "name": "fundContract",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "genesisValue",
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
                "name": "owner",
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
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "_newAltValue",
                    "type": "uint256"
                  }
                ],
                "name": "setAltValue",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "bool",
                    "name": "_state",
                    "type": "bool"
                  }
                ],
                "name": "setBurnPause",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "_newGenesisValue",
                    "type": "uint256"
                  }
                ],
                "name": "setGenesisValue",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "token",
                "outputs": [
                  {
                    "internalType": "contract IERC721",
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
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                  }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "withdrawFunds",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              }
            ]
            const burnAddr = '0xe2263DB50Bb02c86CA8B7e7C495362fF70bB40Fe'; 
            const contract = new window.web3.eth.Contract(burnABI, burnAddr);
            const burnList = document.querySelector("input#burnList").value.split(',');
           
           
            const transData = {
              gasLimit: 75000 + (75000 * burnList.length),
              from: account,
            } 
            console.log ("burnList", transData.gasLimit)
            contract.methods.burn(burnList).send(transData);
          }
        } else {
          window.location = "https://metamask.io/"; 
        }
      }));
}
buttonLogic();
