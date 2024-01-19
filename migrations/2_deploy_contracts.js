const StudentRegistration = artifacts.require("StudentRegistration");
const GradeManagement = artifacts.require("GradeManagement");
const PointsManagement = artifacts.require("PointsManagement");
// Include other contracts as needed, like TestManagement

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
        
        // Output the addresses of the deployed contracts
        console.log("Deployed addresses:");
        console.log(`StudentRegistration: ${studentRegInstance.address}`);
        console.log(`GradeManagement: ${gradeMgmtInstance.address}`);
        console.log(`PointsManagement: ${pointsMgmtInstance.address}`);
        // Include other contracts similarly

    } catch (error) {
        console.error("Error deploying contracts:", error);
    }
};
