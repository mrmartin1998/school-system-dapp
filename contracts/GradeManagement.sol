// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StudentRegistration.sol";

contract GradeManagement {
    StudentRegistration studentRegistration;

    // New structure for grades to include multiple subjects
    struct Grade {
        mapping(string => uint256) subjectGrades; // subject name to grade mapping
    }

    // Change visibility to private or internal
    mapping(uint256 => Grade) private studentGrades;

    modifier onlyAuthorized() {
        // Implement your logic for authorization
        _;
    }

    constructor(address studentRegAddress) {
        studentRegistration = StudentRegistration(studentRegAddress);
    }

    function recordGrade(uint256 _studentId, string memory _subject, uint256 _grade) public onlyAuthorized {
        require(studentRegistration.isStudentRegistered(_studentId), "Student not registered");
        studentGrades[_studentId].subjectGrades[_subject] = _grade;
    }

    function getGrade(uint256 _studentId, string memory _subject) public view returns (uint256) {
        require(studentRegistration.isStudentRegistered(_studentId), "Student not registered");
        return studentGrades[_studentId].subjectGrades[_subject];
    }

    // Public function to access grades
    function getStudentGrades(uint256 _studentId, string memory _subject) public view returns (uint256) {
        require(studentRegistration.isStudentRegistered(_studentId), "Student not registered");
        return studentGrades[_studentId].subjectGrades[_subject];
    }
}
