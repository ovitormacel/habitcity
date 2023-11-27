import { Controller } from "./entities/Controller.js";

const controller = new Controller();

const userData = JSON.parse(localStorage.getItem('user'));
controller.createUser(userData.name, userData.email, '');

controller.renderTaskList()
controller.getTasks();