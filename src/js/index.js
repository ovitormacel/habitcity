import { Controller } from "./entities/Controller.js";

const controller = new Controller();

const userData = JSON.parse(localStorage.getItem('user'));
controller.createUser(userData.name, userData.email, '');

controller.createTask('124', 'Beber Água', 'Beber 1Litro de Água por dia', '21/11/2023', '230', '23', '#5CC8FF', '21/12/2023');
controller.createTask('125', 'Meditar', 'Meditar 5 Minutos por dia', '21/11/2023', '100', '50', '#F1F1F1', '21/12/2023');

controller.renderTaskList()