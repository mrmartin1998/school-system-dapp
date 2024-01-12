// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StudentRegistration.sol";

contract PointsManagement {
    StudentRegistration studentRegistration;
    mapping(uint256 => uint256) public studentPoints;

    event PointsAwarded(uint256 studentId, uint256 points);
    event PointsRedeemed(uint256 studentId, uint256 points);

    modifier onlyAuthorized() {
        // Logic to ensure only authorized personnel can award points
        _;
    }

    constructor(address studentRegAddress) {
        studentRegistration = StudentRegistration(studentRegAddress);
    }

    function awardPoints(uint256 _studentId, uint256 _points) public onlyAuthorized {
        require(studentRegistration.isStudentRegistered(_studentId), "Student not registered");
        studentPoints[_studentId] += _points;
        emit PointsAwarded(_studentId, _points);
    }

    function redeemPoints(uint256 _studentId, uint256 _points) public {
        require(studentRegistration.isStudentRegistered(_studentId), "Student not registered");
        require(studentPoints[_studentId] >= _points, "Insufficient points");
        studentPoints[_studentId] -= _points;
        emit PointsRedeemed(_studentId, _points);
        // Add logic for what happens upon redemption (e.g., claiming rewards)
    }

    function getPoints(uint256 _studentId) public view returns (uint256) {
        require(studentRegistration.isStudentRegistered(_studentId), "Student not registered");
        return studentPoints[_studentId];
    }

    // Additional functions and modifiers as needed
}
