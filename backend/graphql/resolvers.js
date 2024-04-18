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

        if (!employee.dateOfJoining || !employee.dateOfBirth) {
          throw new Error('Required employee data (date of joining or age at joining) is missing');
        }

        const dob = parseISO(employee.dateOfBirth);
        const currentDate = new Date();
        const retirementAge = 65;

        // Calculate the retirement date based on date of birth
        const retirementDate = addYears(dob, retirementAge);

        // Format dates to ISO strings for comparison
        const formattedCurrentDate = formatISO(currentDate);
        const formattedRetirementDate = formatISO(retirementDate);

        let yearsLeft = 0, monthsLeft = 0, daysLeft = 0;

        if (new Date(formattedRetirementDate) > new Date(formattedCurrentDate)) {
          yearsLeft = differenceInYears(parseISO(formattedRetirementDate), parseISO(formattedCurrentDate));
          monthsLeft = differenceInMonths(parseISO(formattedRetirementDate), parseISO(formattedCurrentDate)) % 12;
          daysLeft = differenceInDays(parseISO(formattedRetirementDate), addYears(parseISO(formattedCurrentDate), yearsLeft)) % 30;
        }


        employee.retirementDate = formattedRetirementDate
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

      const currentDate = new Date();
      const retirementAge = 65;
      const allEmployees = await Employee.find(employeeType ? { employeeType } : {});
      return allEmployees.map(employee => {
        const dob = parseISO(employee.dateOfBirth);
        const retirementDate = addYears(dob, retirementAge);
        const monthsUntilRetirement = differenceInMonths(retirementDate, currentDate);

        // Check if the retirement date is within the specified months from now
        if (monthsUntilRetirement <= withinMonths) {
          return {
            ...employee.toObject(),  // Convert Mongoose document to JavaScript object
            id: employee._id.toString(),  // Ensure `id` is a string
            retirementDate: retirementDate.toISOString(),  // Ensure the retirement date is in ISO string format
            monthsUntilRetirement  // Optionally include this if needed in the client
          };
        }
        return null;  // Return null for those who do not meet the condition
      }).filter(emp => emp !== null);  // Filter out null values to only return valid employee objects
    },
  },
  Mutation: {
    createEmployee: async (_, { firstName, lastName, dateOfJoining, dateOfBirth, title, department, employeeType }) => {
      if (!firstName || !lastName || !dateOfJoining || !dateOfBirth || !title || !department || !employeeType || !dateOfBirth) {
        throw new Error('All fields are required');
      }

      const dob = parseISO(dateOfBirth);
      const currentDate = new Date();
      const age = differenceInYears(currentDate, dob);

      if (age < 20 || age > 70) {
        throw new Error('Age must be between 20 and 60');
      }

      const newEmployee = new Employee({
        firstName,
        lastName,
        age,
        dateOfJoining,
        dateOfBirth,
        title,
        department,
        employeeType
      });

      try {
        await newEmployee.save();
        return newEmployee;
      } catch (error) {
        console.error('Error creating new employee:', error);
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
