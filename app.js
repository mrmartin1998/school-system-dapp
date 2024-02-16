window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access
            await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error("User denied account access...");
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    // Contract addresses
    const studentRegistrationAddress = '0x65C41d0eFB68b67b6d67721E360504277A346078';
    const testManagementAddress = '0x86941FFcA195DE9f2740c367a5C514Ce609fd9F7';

    // ABIs for contracts
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
      ];
    const testManagementABI = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_studentRegAddress",
              "type": "address"
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
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "name": "TestCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "testId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "studentId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "score",
              "type": "uint256"
            }
          ],
          "name": "TestTaken",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "studentTestScores",
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
          "inputs": [],
          "name": "testCount",
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
          "name": "tests",
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
              "internalType": "bool",
              "name": "isActive",
              "type": "bool"
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
          "name": "createTest",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_testId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_studentId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_score",
              "type": "uint256"
            }
          ],
          "name": "recordTestScore",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];

    // Contract instances
    const studentRegistration = new web3.eth.Contract(studentRegistrationABI, studentRegistrationAddress);
    const testManagement = new web3.eth.Contract(testManagementABI, testManagementAddress);

    // UI Elements for Student Registration
    const registerStudentBtn = document.getElementById('registerStudentBtn');
    const getStudentInfoBtn = document.getElementById('getStudentInfoBtn');

    // UI Elements for Test Management
    const createTestBtn = document.getElementById('createTestBtn');
    const submitScoreBtn = document.getElementById('submitScoreBtn');

    // Event listener for registering a student
    registerStudentBtn.addEventListener('click', async () => {
        const name = document.getElementById('studentName').value;
        const accounts = await web3.eth.getAccounts();
        studentRegistration.methods.registerStudent(name).send({ from: accounts[0] })
            .then(result => console.log(result))
            .catch(error => console.error(error));
    });

    // Event listener for getting student information
    getStudentInfoBtn.addEventListener('click', async () => {
        const studentId = document.getElementById('studentId').value;
        studentRegistration.methods.getStudent(studentId).call()
            .then(result => {
                document.getElementById('studentInfo').innerText = `Name: ${result.name}`;
            })
            .catch(error => console.error(error));
    });

    // Event listener for creating a test
    createTestBtn.addEventListener('click', async () => {
        const testName = document.getElementById('testName').value;
        const accounts = await web3.eth.getAccounts();
        testManagement.methods.createTest(testName).send({ from: accounts[0] })
            .then(result => console.log(result))
            .catch(error => console.error(error));
    });

// Event listener for submitting a test score
submitScoreBtn.addEventListener('click', async () => {
    const testId = document.getElementById('testId').value;
    const score = document.getElementById('studentScore').value;
    
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];

    // Assuming the studentId is the same as the index in the studentIds mapping
    studentRegistration.methods.studentIds(currentAccount).call()
        .then(studentId => {
            if(studentId === "0") {
                console.error("Student not registered.");
                return;
            }
            testManagement.methods.recordTestScore(testId, studentId, score).send({ from: currentAccount })
                .then(result => console.log(result))
                .catch(error => console.error(error));
        })
        .catch(error => {
            console.error("Error retrieving student ID:", error);
        });
});

    // ... (any additional functionalities) ...
});
