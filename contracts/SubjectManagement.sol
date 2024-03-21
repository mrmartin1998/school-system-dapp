// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StudentRegistration.sol";

contract SubjectManagement {
    StudentRegistration studentRegistration;

    mapping(string => bool) public subjects; // Registered subjects
    string[] private subjectList; // List to store all subject names

    mapping(uint256 => mapping(string => bool)) studentSubjects; // Mapping of student to subjects

    constructor(address studentRegAddress) {
        studentRegistration = StudentRegistration(studentRegAddress);
    }

    function addSubject(string memory _subjectName) public {
        subjects[_subjectName] = true;
        subjectList.push(_subjectName); // Add the new subject to the list
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

    // Function to return a list of subjects for a student
    function getSubjectsForStudent(uint256 _studentId) public view returns (string[] memory) {
        require(studentRegistration.isStudentRegistered(_studentId), "Student not registered");

        uint256 subjectCount = 0;
        for (uint256 i = 0; i < subjectList.length; i++) {
            if (studentSubjects[_studentId][subjectList[i]]) {
                subjectCount++;
            }
        }

        string[] memory enrolledSubjects = new string[](subjectCount);
        uint256 counter = 0;
        for (uint256 i = 0; i < subjectList.length; i++) {
            if (studentSubjects[_studentId][subjectList[i]]) {
                enrolledSubjects[counter] = subjectList[i];
                counter++;
            }
        }
        return enrolledSubjects;
    }
}
