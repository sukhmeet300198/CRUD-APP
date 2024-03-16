const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true, min: 20, max: 70 },
  dateOfJoining: { type: String,required: true},
  title: { type: String, required: true, enum: ['Employee', 'Manager', 'Director', 'VP'] },
  department: { type: String, required: true, enum: ['IT', 'Marketing', 'HR', 'Engineering'] },
  employeeType: { type: String, required: true, enum: ['FullTime', 'PartTime', 'Contract', 'Seasonal'] },
  currentStatus: { type: Boolean, default: 1 } // Assuming '1' is for 'working'
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
