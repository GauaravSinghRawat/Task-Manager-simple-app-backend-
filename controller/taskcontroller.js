const asyncWrapper = require("../middlewares/asyncwrapper");
const taskSchema = require("../mongo/models/taskSchema");
const Task = require("../mongo/models/taskSchema");
const {createCustomError} =  require("../errors/custome-error");


const controller = {
  gettask: asyncWrapper(async (req, res) => {
    const alltasks = await Task.find();
    res.status(200).json({ data: alltasks });
  }),

  getSingleTask: asyncWrapper( async (req, res, next) => {
    
      const { id } = req.params; 

      const task = await Task.findById(id);
    //   if (!task) return res.status(200).json({ data: "no task found" });
    //  or using create custome eerror derived from error class
    if(!task){
        return next(createCustomError("no task found for your search", 404))
        
    }
      res.status(200).json({ data: task });
    
  }),

  createTask: asyncWrapper( async (req, res) => {
   
      const { name } = req.body;
      const newtask = await Task.create({ name });
      res.status(201).json({ data: newtask });
   
  }),

  updateTask: asyncWrapper( async (req, res) => {
    
      const { id } = req.params;
      const { name, completed } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { name, completed },
        { new: true }
      );
      if(!updatedTask) {
        return next(createCustomError("no task found for your search", 404))
      }
      res.status(201).json({ updatedTask });
    
  }),

  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedItem = await Task.findByIdAndDelete(id);
      res.status(201).json({ data: "successfully deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateUsingPut: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, completed } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { name, completed },
        { new: true, overwrite: true }
      );
      res.status(201).json({ updatedTask });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

//  while using PUT, we are trying to replace the exixting document while in PATCH in methid we are only updating the partial document. We have "OVERWRITE in PUT to overwrite or replace the complete document "

module.exports = controller;

