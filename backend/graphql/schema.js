const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Query {
    allEmployees(type: String): [Employee]
  }

  type Mutation {
    createEmployee(firstName: String!, lastName: String!,age:Int!, dateOfJoining : String!,title: String!, department: String!, employeeType: String!): Employee
    updateEmployee(id: ID!, firstName: String, lastName: String, age: Int, dateOfJoining: String, title: String, department: String, employeeType: String, currentStatus: Boolean): Employee
    deleteEmployee(id: ID!): String
  }

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    age:Int!
    dateOfJoining : String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Int!
  }
`;

module.exports = typeDefs;
