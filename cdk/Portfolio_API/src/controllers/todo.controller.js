import { asyncHandler } from "../utils/asyncHandler.js";
import { Todo } from "../models/todo.model.js";
import { apiResponseHandler } from "../utils/apiResponseHandler.js";

//=========================Fetch ToDOs==========================

const allToDoList = asyncHandler(async (req, res) => {
  const toDos = await Todo.find();
  if (!toDos) {
    const payload = await apiResponseHandler("Failed", 2000);
    return res.status(400).json({
      data: payload,
    });
  }

  const payload = await apiResponseHandler("Success", 2001, toDos);
  return res.status(200).json({
    data: payload,
  });
});

//=======================Create Todos============================

const createTodos = asyncHandler(async (req, res) => {
  // console.log("dasdasda");
  const { description } = req.body;

  if (!description) {
    const payload = await apiResponseHandler("Failed", 2002);

    return res.status(400).json({
      data: payload,
    });
  }

  // Creating new Todo's
  const response = await Todo.create({ description });

  const payload = await apiResponseHandler("Success", 2003, response);
  return res.status(201).json({
    data: payload,
  });
});

//========================Delete Todos===========================

const deleteTodos = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete(id);

  if (!todo) {
    const payload = await apiResponseHandler("Failed", 2004);

    return res.status(400).json({
      data: payload,
    });
  }

  const payload = await apiResponseHandler("success", 2005, todo);
  return res.status(200).json({
    data: payload,
  });
});

//========================Update Todos===========================

const updateTodos = asyncHandler(async (req, res) => {
  //get id and description from request body
  const { id, description } = req.body;

  if (!id || !description) {
    const payload = await apiResponseHandler("Failed", 2004);

    return res.status(400).json({
      data: payload,
    });
  }

  const todo = await Todo.findByIdAndUpdate(
    id,
    { description },
    { new: true, runValidators: true }
  );

  if (!todo) {
    const payload = await apiResponseHandler("Failed", 2004);

    return res.status(400).json({
      data: payload,
    });
  }

  const payload = await apiResponseHandler("Success", 2006, todo);

  return res.status(200).json({
    data: payload,
  });
});

export { allToDoList, createTodos, deleteTodos, updateTodos };
