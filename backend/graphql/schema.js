const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    allEmployees(type: String): [Employee]
    employee(id: ID!): Employee
  }
  
  type Mutation {
    createEmployee(
      firstName: String!, 
      lastName: String!,
      age:Int!,
      dateOfJoining : String!,
      title: String!,
      department: String!,
      employeeType: String!
    ): Employee

    updateEmployee(
      id: ID!,
      title: String,
      department: String,
      currentStatus: Boolean
    ): Employee
    
    deleteEmployee(id: ID!): Employee
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
