window.addEventListener('load', async () => {
    // Initialize Web3
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error("User denied account access...");
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  
    // Manually set contract addresses here
    const contractAddresses = {
      StudentRegistration: '0x622def1878421B73bb9d010Ea1858Ae7D3dB37b9',
      GradeManagement: '0x6DaED9Bcc39db6c8dA5E947FB5eD490023bDa4c3',
      PointsManagement: '0x5eaa70C00eC5E9cfb7E4a7db10CF6173F2A8c7C4',
      TestManagement: '0xdB6ce9B0ff829f15Df69FABAe95Cd8EdD5C1312b'
    };
  
    // Function to load contract data and create a web3 contract instance
    const loadContract = async (name) => {
      const response = await fetch(`./build/contracts/${name}.json`);
      const contractData = await response.json();
      return new web3.eth.Contract(contractData.abi, contractAddresses[name]);
    };
  
    const studentRegContract = await loadContract('StudentRegistration');
    const gradeMgmtContract = await loadContract('GradeManagement');
    const pointsMgmtContract = await loadContract('PointsManagement');
    const testMgmtContract = await loadContract('TestManagement');

    // Check if elements exist on the current page before adding event listeners
    const registerStudentBtn = document.getElementById('registerStudentBtn');
    const getStudentInfoBtn = document.getElementById('getStudentInfoBtn');
    const createTestBtn = document.getElementById('createTestBtn');
    const submitScoreBtn = document.getElementById('submitScoreBtn');
    // ... other UI element selectors

    // Event listener for registering a student
    if (registerStudentBtn) {
        registerStudentBtn.addEventListener('click', async () => {
            const name = document.getElementById('studentName').value;
            const accounts = await web3.eth.getAccounts();
            studentRegContract.methods.registerStudent(name).send({ from: accounts[0] })
                .then(result => console.log(result))
                .catch(error => console.error(error));
        });
    }

    // Event listener for getting student information
    if (getStudentInfoBtn) {
        getStudentInfoBtn.addEventListener('click', async () => {
            const studentId = document.getElementById('studentId').value;
            studentRegContract.methods.getStudent(studentId).call()
                .then(result => {
                    document.getElementById('studentInfo').innerText = `Name: ${result.name}`;
                })
                .catch(error => console.error(error));
        });
    }

    // Event listener for creating a test
    if (createTestBtn) {
        createTestBtn.addEventListener('click', async () => {
            const testName = document.getElementById('testName').value;
            const accounts = await web3.eth.getAccounts();
            testMgmtContract.methods.createTest(testName).send({ from: accounts[0] })
                .then(result => console.log(result))
                .catch(error => console.error(error));
        });
    }

    // Event listener for submitting a test score
    if (submitScoreBtn) {
        submitScoreBtn.addEventListener('click', async () => {
            const testId = document.getElementById('testId').value;
            const score = document.getElementById('studentScore').value;
            const accounts = await web3.eth.getAccounts();
            testMgmtContract.methods.recordTestScore(testId, score).send({ from: accounts[0] })
                .then(result => console.log(result))
                .catch(error => console.error(error));
        });
    }

    // Additional event listeners and functions for other functionalities

    // Function to record a grade for a student
    async function recordGrade(studentId, subject, grade) {
        const accounts = await web3.eth.getAccounts();
        try {
            await gradeMgmtContract.methods.recordGrade(studentId, subject, grade).send({ from: accounts[0] });
            console.log(`Grade recorded for student ${studentId} in ${subject}`);
        } catch (error) {
            console.error("Error recording grade:", error);
        }
    }

    // Function to retrieve a grade for a student
    async function getGrade(studentId, subject) {
        try {
            const grade = await gradeMgmtContract.methods.getGrade(studentId, subject).call();
            console.log(`Grade for student ${studentId} in ${subject}: ${grade}`);
        } catch (error) {
            console.error("Error retrieving grade:", error);
        }
    }

    // Function to create a new homework assignment
    async function createHomework(description, dueDate) {
        const accounts = await web3.eth.getAccounts();
        try {
            await pointsMgmtContract.methods.createHomework(description, dueDate).send({ from: accounts[0] });
            console.log(`Homework created: ${description}`);
        } catch (error) {
            console.error("Error creating homework:", error);
        }
    }

    // Function to mark homework as completed by a student
    async function markHomeworkAsCompleted(studentId, homeworkId) {
        const accounts = await web3.eth.getAccounts();
        try {
            await pointsMgmtContract.methods.markHomeworkAsCompleted(studentId, homeworkId).send({ from: accounts[0] });
            console.log(`Homework ${homeworkId} completed by student ${studentId}`);
        } catch (error) {
            console.error("Error marking homework as completed:", error);
        }
    }

    // Function to award points to a student
    async function awardPoints(studentId, points) {
        const accounts = await web3.eth.getAccounts();
        try {
            await pointsMgmtContract.methods.awardPoints(studentId, points).send({ from: accounts[0] });
            console.log(`Awarded ${points} points to student ${studentId}`);
        } catch (error) {
            console.error("Error awarding points:", error);
        }
    }

    // Function to redeem points for a student
    async function redeemPoints(studentId, points) {
        const accounts = await web3.eth.getAccounts();
        try {
            await pointsMgmtContract.methods.redeemPoints(studentId, points).send({ from: accounts[0] });
            console.log(`Student ${studentId} redeemed ${points} points`);
        } catch (error) {
            console.error("Error redeeming points:", error);
        }
    }

    // Additional functionalities and event listeners can be added here
    // ...
});
