import { Hero } from "./Hero.js";
import { Task } from "./Task.js";

export class User{
    #pass
    constructor(name, email, pass){
        this.self = this;
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
        this.saveUser();
        this.newHero();
    }

    saveUser(){
        localStorage.setItem('user', JSON.stringify({
            'name': this.name,
            'email': this.email,
        }))
    }

    newHero(){
        const data = JSON.parse(localStorage.getItem('hero'));
        
        const hero = new Hero(data.username, data.classe, data.level, data.coins, data.xp, data.xpForNext, data.points, data.maxHP, data.hp, data.defense, data.attack, data.items);
        this.hero = hero;
    }

    //TASKS
    newTask(controller, taskId, title, description, date, coins, xp, color, targetDate, type = 'daily', status = 'pending'){
        const task = new Task(controller, taskId, title, description, date, coins, xp, color, targetDate, type, status);
        
        if(type === 'daily'){
            this.tasks[0].push(task);
        } else if(type === 'main'){
            this.tasks[1].push(task);
        }
    }
}