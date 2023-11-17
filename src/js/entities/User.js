import { Hero } from "./Hero.js";
import { Task } from "./Task.js";

export class User{
    #pass
    constructor(name, email, pass){
        this.name = name;
        this.email = email;
        this.#pass = pass;
        this.hero;

        //INDEX 0 = DAILY TASKS | INDEX 1 = MAIN TASKS
        this.tasks = [
            [],
            []
        ]

        //TESTE
        this.newHero('Maceliros', 'Guerreiro')
    }

    newHero(username, classe){
        const hero = new Hero(username, classe);
        this.hero = hero;
    }

    //TASKS
    newTask(title, description, date, coins, xp, color, type = 'daily', status = 'pending'){
        const task = new Task(title, description, date, coins, xp, color, type, status);
        
        if(type === 'daily'){
            this.tasks[0].push(task);
        } else if(type === 'main'){
            this.tasks[1].push(task);
        }

        console.log(this.tasks[0]);
    }
}