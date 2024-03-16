import { gql } from '@apollo/client';

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

export const GET_EMPLOYEE_BY_ID = gql`
query GetEmployeeById($id: ID!) {
  employee(id: $id) {
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

export const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UpdateEmployee($id: ID!, $title: String, $department: String, $currentStatus: Boolean) {
    updateEmployee(id: $id, title: $title, department: $department, currentStatus: $currentStatus) {
      id
      title
      department
      currentStatus
    }
  }
`;

