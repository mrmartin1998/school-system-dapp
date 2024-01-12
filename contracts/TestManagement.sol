// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StudentRegistration.sol";

contract TestManagement {
    StudentRegistration studentRegistration;

    struct Test {
        uint256 id;
        string name;
        bool isActive;
    }

    uint256 public testCount = 0;
    mapping(uint256 => Test) public tests;
    mapping(uint256 => mapping(uint256 => uint256)) public studentTestScores; // Mapping from test ID to student ID to score

    event TestCreated(uint256 indexed id, string name);
    event TestTaken(uint256 indexed testId, uint256 indexed studentId, uint256 score);

    constructor(address _studentRegAddress) {
        studentRegistration = StudentRegistration(_studentRegAddress);
    }

    function createTest(string memory _name) public {
        testCount++;
        tests[testCount] = Test(testCount, _name, true);
        emit TestCreated(testCount, _name);
    }

    function recordTestScore(uint256 _testId, uint256 _studentId, uint256 _score) public {
        // Check if the test exists and is active
        require(_testId > 0 && _testId <= testCount && tests[_testId].isActive, "Test does not exist or is not active.");
        // Check if the student is registered
        require(studentRegistration.getStudent(_studentId).id == _studentId, "Student is not registered.");

        studentTestScores[_testId][_studentId] = _score;
        emit TestTaken(_testId, _studentId, _score);
    }

    // Add other necessary functions and modifiers as needed
}
