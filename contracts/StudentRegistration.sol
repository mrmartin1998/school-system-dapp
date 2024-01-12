// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistration {
    struct Student {
        uint256 id;
        string name;
        address studentAddress;
    }

    uint256 public studentCount = 0;
    mapping(uint256 => Student) public students;
    mapping(address => uint256) public studentIds;

    event StudentRegistered(uint256 indexed id, string name, address studentAddress);

    function registerStudent(string memory _name) public {
        studentCount++;
        students[studentCount] = Student(studentCount, _name, msg.sender);
        studentIds[msg.sender] = studentCount;
        emit StudentRegistered(studentCount, _name, msg.sender);
    }

    function getStudent(uint256 _id) public view returns (Student memory) {
        require(_id > 0 && _id <= studentCount, "Student does not exist.");
        return students[_id];
    }
}
