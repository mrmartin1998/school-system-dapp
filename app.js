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

  // Define Contract Names
  const contractNames = [
      'StudentRegistration',
      'TestManagement',
      'GradeManagement',
      'HomeworkManagement',
      'PointsManagement'
  ];

  // Load All Contracts
  async function loadAllContracts() {
      let contracts = {};
      let networkId = await web3.eth.net.getId(); // Assuming networkId is obtained here

      for (const name of contractNames) {
          const response = await fetch(`./build/contracts/${name}.json`);
          const contractData = await response.json();

          const abi = contractData.abi;
          const address = contractData.networks[networkId].address;

          contracts[name] = new web3.eth.Contract(abi, address);
      }

      return contracts;
  }

  // Load and use contracts
  const contracts = await loadAllContracts();
  const studentRegContract = contracts['StudentRegistration'];
  const testMgmtContract = contracts['TestManagement'];
  // ... other contracts

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
  studentRegContract.methods.registerStudent(name).send({ from: accounts[0] })
      .then(result => console.log(result))
      .catch(error => console.error(error));
});

// Event listener for getting student information
getStudentInfoBtn.addEventListener('click', async () => {
  const studentId = document.getElementById('studentId').value;
  studentRegContract.methods.getStudent(studentId).call()
      .then(result => {
          document.getElementById('studentInfo').innerText = `Name: ${result.name}`;
      })
      .catch(error => console.error(error));
});

// Event listener for creating a test
createTestBtn.addEventListener('click', async () => {
  const testName = document.getElementById('testName').value;
  const accounts = await web3.eth.getAccounts();
  testMgmtContract.methods.createTest(testName).send({ from: accounts[0] })
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
  studentRegContract.methods.studentIds(currentAccount).call()
      .then(studentId => {
          if (studentId === "0") {
              console.error("Student not registered.");
              return;
          }
          testMgmtContract.methods.recordTestScore(testId, studentId, score).send({ from: currentAccount })
              .then(result => console.log(result))
              .catch(error => console.error(error));
      })
      .catch(error => {
          console.error("Error retrieving student ID:", error);
      });
});

// ... Additional logic for other contracts ...


    // ... (any additional functionalities) ...
});
