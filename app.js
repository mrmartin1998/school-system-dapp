window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed, you can start interacting with contracts
        } catch (error) {
            console.error("User denied account access...");
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed, you can start interacting with contracts
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    // Your deployed contract addresses
    const studentRegistrationAddress = '0xe3417112C67516F8198d3FB2586721d05F461BC4';
    // Add other contract addresses

    // The ABI for your contracts
    const studentRegistrationABI = [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "studentAddress",
              "type": "address"
            }
          ],
          "name": "StudentRegistered",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "studentCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "studentIds",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "students",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "studentAddress",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            }
          ],
          "name": "registerStudent",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            }
          ],
          "name": "getStudent",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "id",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "studentAddress",
                  "type": "address"
                }
              ],
              "internalType": "struct StudentRegistration.Student",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_studentId",
              "type": "uint256"
            }
          ],
          "name": "isStudentRegistered",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        }
      ]; // Add ABI
    // Add other ABIs

    // Contract instances
    const studentRegistration = new web3.eth.Contract(studentRegistrationABI, studentRegistrationAddress);
    // Add other contract instances

    // UI Elements
    const registerStudentBtn = document.getElementById('registerStudentBtn');
    const getStudentInfoBtn = document.getElementById('getStudentInfoBtn');

    // Event listeners
    registerStudentBtn.addEventListener('click', async () => {
        const name = document.getElementById('studentName').value;
        const accounts = await web3.eth.getAccounts();
        // Call the smart contract to register the student, use the first account
        studentRegistration.methods.registerStudent(name).send({ from: accounts[0] })
            .then(result => {
                console.log(result);
            }).catch(error => {
                console.error(error);
            });
    });

    getStudentInfoBtn.addEventListener('click', async () => {
        const studentId = document.getElementById('studentId').value;
        // Call the smart contract to get student info
        studentRegistration.methods.getStudent(studentId).call()
            .then(result => {
                document.getElementById('studentInfo').innerText = `Name: ${result.name}`;
            }).catch(error => {
                console.error(error);
            });
    });

    // Add more functionalities and event listeners as needed
});
