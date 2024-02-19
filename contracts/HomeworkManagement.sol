// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StudentRegistration.sol";

contract HomeworkManagement {
    StudentRegistration studentRegistration;

    struct Homework {
        uint256 id;
        string description;
        uint256 dueDate; // Unix timestamp
    }

    uint256 public homeworkCount = 0;
    mapping(uint256 => Homework) public homeworks;
    mapping(uint256 => mapping(uint256 => bool)) public studentHomeworkCompletion; // Mapping from student ID to homework ID to completion status

    event HomeworkAssigned(uint256 homeworkId, string description);
    event HomeworkCompleted(uint256 studentId, uint256 homeworkId);

    constructor(address studentRegAddress) {
        studentRegistration = StudentRegistration(studentRegAddress);
    }

    function createHomework(string memory _description, uint256 _dueDate) public {
        // Add authorization check if needed
        homeworkCount++;
        homeworks[homeworkCount] = Homework(homeworkCount, _description, _dueDate);
        emit HomeworkAssigned(homeworkCount, _description);
    }

    function markHomeworkAsCompleted(uint256 _studentId, uint256 _homeworkId) public {
        require(studentRegistration.isStudentRegistered(_studentId), "Student not registered");
        require(_homeworkId > 0 && _homeworkId <= homeworkCount, "Invalid homework ID");
        studentHomeworkCompletion[_studentId][_homeworkId] = true;
        emit HomeworkCompleted(_studentId, _homeworkId);
    }

    function isHomeworkCompleted(uint256 _studentId, uint256 _homeworkId) public view returns (bool) {
        require(studentRegistration.isStudentRegistered(_studentId), "Student not registered");
        return studentHomeworkCompletion[_studentId][_homeworkId];
    }
}
