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
    updateEmployee: async (_, { id, firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus }) => {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
          $set: {
            firstName,
            lastName,
            age,
            dateOfJoining,
            title,
            department,
            employeeType,
            currentStatus
          }
        }, { new: true }); // new: true returns the updated object
        return updatedEmployee;
      } catch (error) {
        console.error(error);
        throw new Error('Error updating employee');
      }
    },
    deleteEmployee: async (_, { id }) => {
      try {
        await Employee.findByIdAndDelete(id);
        return `Employee with ID ${id} was deleted successfully.`;
      } catch (error) {
        console.error(error);
        throw new Error('Error deleting employee');
      }
    },
  }

};

module.exports = resolvers;
