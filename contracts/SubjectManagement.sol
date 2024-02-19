// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StudentRegistration.sol";

contract SubjectManagement {
    StudentRegistration studentRegistration;

    mapping(string => bool) public subjects; // Registered subjects
    mapping(uint256 => mapping(string => bool)) studentSubjects; // Mapping of student to subjects

    constructor(address studentRegAddress) {
        studentRegistration = StudentRegistration(studentRegAddress);
    }

    function addSubject(string memory _subjectName) public {
        // Add authorization check if needed
        subjects[_subjectName] = true;
    }

    function assignSubjectToStudent(uint256 _studentId, string memory _subjectName) public {
        require(studentRegistration.isStudentRegistered(_studentId), "Student not registered");
        require(subjects[_subjectName], "Subject not registered");
        studentSubjects[_studentId][_subjectName] = true;
    }

    function isStudentEnrolledInSubject(uint256 _studentId, string memory _subjectName) public view returns (bool) {
        require(studentRegistration.isStudentRegistered(_studentId), "Student not registered");
        return studentSubjects[_studentId][_subjectName];
    }
}
