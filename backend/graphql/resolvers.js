const Employee = require('../model/EmployeeModel.js');
const { parseISO, addYears, differenceInYears, differenceInMonths, differenceInDays, formatISO } = require('date-fns');

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
    // fetching a single employee by ID
    employee: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        if (!employee) {
          throw new Error('Employee not found');
        }

        if (!employee.dateOfJoining || !employee.age) {
          throw new Error('Required employee data (date of joining or age at joining) is missing');
        }

        const dateOfJoining = parseISO(employee.dateOfJoining);
        const yearsToWork = 60 - employee.age;
        const retirementDate = addYears(dateOfJoining, yearsToWork);
        const currentDate = new Date();

        // Convert both dates to ISO strings to ensure consistent formatting for comparison
        const formattedCurrentDate = formatISO(currentDate);
        const formattedRetirementDate = formatISO(retirementDate);

        let yearsLeft = 0, monthsLeft = 0, daysLeft = 0;

        if (new Date(formattedRetirementDate) > new Date(formattedCurrentDate)) {
          yearsLeft = differenceInYears(parseISO(formattedRetirementDate), parseISO(formattedCurrentDate));
          monthsLeft = differenceInMonths(parseISO(formattedRetirementDate), parseISO(formattedCurrentDate)) % 12;
          daysLeft = differenceInDays(parseISO(formattedRetirementDate), addYears(parseISO(formattedCurrentDate), yearsLeft)) % 30;
        }

        employee.retirementDetails = {
          years: yearsLeft,
          months: monthsLeft,
          days: daysLeft
        };

        return employee;
      } catch (error) {
        console.error('Error fetching employee details:', error);
        throw new Error('Error fetching employee details: ' + error.message);
      }
    },
    upcomingRetirements: async (_, { withinMonths, employeeType }) => {
      console.log("emptyep---", employeeType)
      const currentDate = new Date();
      const allEmployees = await Employee.find(employeeType ? { employeeType } : {});
      return allEmployees.filter(employee => {
        const dateOfJoining = parseISO(employee.dateOfJoining);
        const retirementDate = addYears(dateOfJoining, 60 - employee.age);
        return differenceInMonths(retirementDate, currentDate) <= withinMonths;
      });
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
    deleteEmployee: async (_, { id }) => {
      try {
        return await Employee.findByIdAndDelete(id);
      } catch (error) {
        throw new Error('Error deleting employee');
      }
    },
  }

};

module.exports = resolvers;
