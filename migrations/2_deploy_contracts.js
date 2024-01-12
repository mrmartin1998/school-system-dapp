const StudentRegistration = artifacts.require("StudentRegistration");
const GradeManagement = artifacts.require("GradeManagement");
const PointsManagement = artifacts.require("PointsManagement");
// Include other contracts as needed, like TestManagement

module.exports = function (deployer) {
  // Deploy the StudentRegistration contract first
  deployer.deploy(StudentRegistration).then(function() {
    // After StudentRegistration is deployed, deploy GradeManagement
    // Pass the address of StudentRegistration to GradeManagement's constructor
    return deployer.deploy(GradeManagement, StudentRegistration.address);
  }).then(function() {
    // Similarly, deploy PointsManagement
    // You can pass StudentRegistration's address if required
    return deployer.deploy(PointsManagement, StudentRegistration.address);
  });
  // Continue with other contracts in a similar fashion
  // .then(function() {
  //   return deployer.deploy(OtherContract, SomeDependency.address);
  // });
};
