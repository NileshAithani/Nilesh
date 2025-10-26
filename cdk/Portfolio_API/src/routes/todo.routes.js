import { Router } from "express";

import {
  allToDoList,
  createTodos,
  deleteTodos,
  updateTodos,
} from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.route("/getAllTodo").get(allToDoList);
todoRouter.route("/createTodo").post(createTodos);
todoRouter.route("/deleteTodo/:id").delete(deleteTodos);
todoRouter.route("/updateTodo").put(updateTodos);

export default todoRouter;
