import { Controller } from "./entities/Controller.js";

const controller = new Controller();
controller.createUser('Vitor Macel', 'macel@email.com', 'senha123');
controller.createTask('Beber Água', 'Beber 3 Litros de Água por dia.', '17/11/2023', 30, 20, '#5CC8FF');