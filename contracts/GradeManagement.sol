// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StudentRegistration.sol";

contract GradeManagement {
    StudentRegistration studentRegistration;

    struct Grade {
        mapping(string => uint256) subjectGrades;
    }

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

    // Function to return a list of subjects and grades for a student
    function getGradesForStudent(uint256 _studentId, string[] memory _subjects) public view returns (uint256[] memory) {
        require(studentRegistration.isStudentRegistered(_studentId), "Student not registered");

        uint256[] memory grades = new uint256[](_subjects.length);
        for (uint i = 0; i < _subjects.length; i++) {
            grades[i] = studentGrades[_studentId].subjectGrades[_subjects[i]];
        }
        return grades;
    }

}
