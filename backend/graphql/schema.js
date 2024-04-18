const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    allEmployees(type: String): [Employee]
    employee(id: ID!): Employee
    upcomingRetirements(withinMonths: Int!, employeeType: String): [Employee]
  }

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    age:Int!
    dateOfBirth: String! 
    dateOfJoining : String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Int! 
    retirementDate : String!
    retirementDetails: RetirementDetails
  }

  type RetirementDetails {
    years: Int
    months: Int
    days: Int
  }
  
  type Mutation {
    createEmployee(
      firstName: String!, 
      lastName: String!,
      age:Int!,
      dateOfBirth: String! 
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
`;

module.exports = typeDefs;
