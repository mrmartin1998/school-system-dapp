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
    const studentRegistrationAddress = '0x61d8fEC7E5E752aAa4D80E577E4131E6783F80DA';
    const testManagementAddress = 'Your_TestManagement_Contract_Address';

    // ABIs for contracts
    const studentRegistrationABI = [ /* ...StudentRegistration ABI... */ ];
    const testManagementABI = [ /* ...TestManagement Contract ABI... */ ];

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
        // Retrieve student ID based on your application logic
        const studentId = /* Implement logic to get student ID */;
        const accounts = await web3.eth.getAccounts();
        testManagement.methods.recordTestScore(testId, studentId, score).send({ from: accounts[0] })
            .then(result => console.log(result))
            .catch(error => console.error(error));
    });

    // ... (any additional functionalities) ...
});
