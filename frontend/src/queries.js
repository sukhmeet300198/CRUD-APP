import { gql } from '@apollo/client';

// export const GET_ALL_EMPLOYEES = gql`
//   query GetAllEmployees {
//     allEmployees {
//       id
//       firstName
//       lastName
//       age
//       dateOfJoining
//       title
//       department
//       employeeType
//       currentStatus
//     }
//   }
// `;
export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees($type: String) {
    allEmployees(type: $type) {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
  }
`;

export const GET_EMPLOYEES_BY_TYPE = gql`
  query GetEmployeesByType($type: String) {
    employees(type: $type) {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
  }
`;


export const CREATE_EMPLOYEE_MUTATION = gql`
  mutation CreateEmployee($firstName: String!, $lastName: String!,$age:Int!,$dateOfJoining: String!,$title :String!,$department:String!,$employeeType: String!) {
    createEmployee(firstName: $firstName, lastName: $lastName,age:$age,dateOfJoining: $dateOfJoining,title: $title,department:$department,employeeType:$employeeType) {
      id
    }
  }
`;

