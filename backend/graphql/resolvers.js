const Employee = require('../model/EmployeeModel.js');

const resolvers = {
  Query: {
    // Fetching all employees
    allEmployees: async (_, { type }) => {
      try {
        // Fetch all employees if no type is specified
        if (!type) {
          return Employee.find();
        }
        // Filter employees by the specified type
        return Employee.find({ employeeType: type });
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching employees');
      }
    },
    // Resolver for fetching a single employee by ID
    employee: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        if (!employee) {
          throw new Error('Employee not found');
        }
        return employee;
      } catch (error) {
        console.log(error);
        throw new Error('Error fetching employee');
      }
    },
  },
  Mutation: {
    createEmployee: async (_, { firstName, lastName, age, dateOfJoining, title, department, employeeType }) => {
      if (!firstName || !lastName || !dateOfJoining || !age || !title || !department || !employeeType) {
        throw new Error('All fields are required');
      }

      if (age < 20 || age > 70) {
        throw new Error('Age must be between 20 and 60');
      }

      const newEmployee = new Employee({
        firstName,
        lastName,
        dateOfJoining,
        age,
        title,
        department,
        employeeType,
      });

      try {
        await newEmployee.save();
        return newEmployee;
      } catch (error) {
        console.log(error);
        throw new Error('Error creating new employee');
      }
    },
    updateEmployee: async (_, { id, title, department, currentStatus }) => {
      try {
        // Find employee by ID and update the specified fields
        const updatedEmployee = await Employee.findByIdAndUpdate(
          id,
          { $set: { title, department, currentStatus } },
          { new: true } // Return the updated document
        );
        if (!updatedEmployee) {
          throw new Error('Employee not found');
        }
        return updatedEmployee;
      } catch (error) {
        console.error('Error updating employee:', error);
        throw new Error(error);
      }
    },
  }

};

module.exports = resolvers;
