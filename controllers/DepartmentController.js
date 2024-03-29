const { default: mongoose } = require('mongoose');
const Department = require('../database/models/Department');
const User = require('../database/models/User');

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json(departments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Please provide a department id' });
    const department = await Department.findById(id, {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      name: 0,
      description: 0,
    }).populate('members QACordinator', {
      username: 1,
      role: 1,
    });
    if (department) return res.status(200).json(department);
    return res.status(404).json({ error: 'Department with the specified ID does not exists' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createDepartment = async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ error: 'Please provide a department' });

    const department = await Department.create(req.body);
    if (!department) return res.status(400).json({ error: 'Department not created' });
    return res.status(201).json(department);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Please provide a department id' });
    if (!req.body) return res.status(400).json({ error: 'Please provide a department' });

    const existsUser = await Department.findOne({ members: { $in: [req.body.members] } });
    if (existsUser) return res.status(400).json({ error: 'User already exists in the department' });
    const updatedDepartment = await Department.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json(updatedDepartment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Please provide a department id' });
    const deleted = await Department.findByIdAndDelete(id);
    if (deleted) return res.status(200).json(deleted);
    throw new Error('Department not found');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { members } = req.body;
    if (!id) return res.status(400).json({ error: 'Please provide a department id' });
    const existsUser = await Department.findOne({ members: { $in: members } });
    if (existsUser) return res.status(400).json({ error: 'User already exists in the department' });

    const departmentMember = await Department.findByIdAndUpdate(
      id,
      { $push: { members: members } },
      { new: true },
    );

    if (!departmentMember) return res.status(404).json({ error: 'Department not found' });

    return res.status(201).json(departmentMember);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getMembers = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Please provide a department id' });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'Invalid department id' });
    const department = await Department.findById(id);
    if (!department) return res.status(404).json({ error: 'Department not found' });
    return res.status(200).json(department.members);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getMemberById = async (req, res) => {
  try {
    const { id, memberId } = req.params;
    if (!id) return res.status(400).json({ error: 'Please provide a department id' });
    if (!memberId) return res.status(400).json({ error: 'Please provide a member id' });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'Invalid department id' });
    if (!mongoose.Types.ObjectId.isValid(memberId))
      return res.status(400).json({ error: 'Invalid member id' });
    const department = await Department.findById(id);
    if (!department) return res.status(404).json({ error: 'Department not found' });
    const member = await department.members.id(memberId);
    if (member) return res.status(200).json(member);
    return res.status(404).json({ error: 'Member not found' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id, memberId } = req.params;
    if (!id) return res.status(400).json({ error: 'Please provide a department id' });
    if (!memberId) return res.status(400).json({ error: 'Please provide a member id' });

    const RemoveUserInDepartment = await Department.findByIdAndUpdate(
      id,
      { $pull: { members: memberId } },
      { new: true },
    );
    if (!RemoveUserInDepartment) return res.status(404).json({ error: 'Department not found' });
    return res.status(200).json(RemoveUserInDepartment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  addMember,
  getMembers,
  getMemberById,
  deleteMember,
};
