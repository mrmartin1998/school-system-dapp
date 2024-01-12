// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StudentRegistration.sol";

contract GradeManagement {
    StudentRegistration studentRegistration;

    mapping(uint256 => uint256) public grades;

    modifier onlyAuthorized() {
        // Implement your logic for authorization
        _;
    }

    constructor(address studentRegAddress) {
        studentRegistration = StudentRegistration(studentRegAddress);
    }

    function recordGrade(uint256 _studentId, uint256 _grade) public onlyAuthorized {
        require(studentRegistration.isStudentRegistered(_studentId), "Student not registered");
        grades[_studentId] = _grade;
        // Emit an event here if needed
    }

    function getGrade(uint256 _studentId) public view returns (uint256) {
        require(studentRegistration.isStudentRegistered(_studentId), "Student not registered");
        return grades[_studentId];
    }
}
