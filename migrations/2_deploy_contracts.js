const StudentRegistration = artifacts.require("StudentRegistration");
const GradeManagement = artifacts.require("GradeManagement");
const PointsManagement = artifacts.require("PointsManagement");
const TestManagement = artifacts.require("TestManagement"); // Corrected typo here

module.exports = async function(deployer) {
    try {
        // Deploy the StudentRegistration contract
        await deployer.deploy(StudentRegistration);
        const studentRegInstance = await StudentRegistration.deployed();

        // Deploy the GradeManagement contract
        await deployer.deploy(GradeManagement, studentRegInstance.address);
        const gradeMgmtInstance = await GradeManagement.deployed();

        // Deploy the PointsManagement contract
        await deployer.deploy(PointsManagement, studentRegInstance.address);
        const pointsMgmtInstance = await PointsManagement.deployed();

        // Deploy the TestManagement contract
        await deployer.deploy(TestManagement, studentRegInstance.address);
        const testMgmtInstance = await TestManagement.deployed();

        // Output the addresses of the deployed contracts
        console.log("Deployed addresses:");
        console.log(`StudentRegistration: ${studentRegInstance.address}`);
        console.log(`GradeManagement: ${gradeMgmtInstance.address}`);
        console.log(`PointsManagement: ${pointsMgmtInstance.address}`);
        console.log(`TestManagement: ${testMgmtInstance.address}`);

    } catch (error) {
        console.error("Error deploying contracts:", error);
    }
};
