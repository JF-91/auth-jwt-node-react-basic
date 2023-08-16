import { request, response } from "express";
import Task from "../models/task.model.js";

//TODO: GET ALL
export const getTasks = async (req = request, res = response) => {
  const tasks = await Task.find({
        user: req.user.id
    }).populate('user'); // populate relaciona con el user autenticado y trae todos los datos del usuario en otro objeto

  res.status(200).json({ tasks });
};

//TODO: POST CREATE TASK
export const createTask = async (req = request, res = response) => {
  const { title, description, date } = req.body;

  
  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id
  });

  await newTask.save();

  res.status(200).json({
    msg: "task created",
    newTask,
  });
};

//TODO: GET TASK BY ID

export const getTask = async (req = request, res = response) => {
  const taskId = await Task.findById(req.params.id);
  if (!taskId) {
    return res.status(404).json({ msg: "task not found" });
  }

  res.json({
    msg: "task founded",
    taskId,
  });
};

//TODO: DELETE TASK BY ID
export const deleteTask = async (req = request, res = response) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return res.status(404).json({ msg: "task not found" });
  }

  res.json({
    msg: "successfuly task deleted",
    task,
  });
};

//TODO: PUT UPDATE TASK
export const updateTask = async (req = request, res = response) => {
  // el parametro {new:true} significa que mongoose retornara
  // la tarea que ha sido actualizado,
  // normalmente devuelve la tarea antes de actualizarse

  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!task) {
    return res.status(404).json({ msg: "task not found" });
  }

  res.json({
    msg: "successfuly task updated",
    task,
  });
};
