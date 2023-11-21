import { Controller } from "./entities/Controller.js";

const controller = new Controller();

controller.createUser('Vitor Macel', 'macel@email.com', 'senha123');

controller.renderTaskList()