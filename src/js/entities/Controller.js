import { User } from "./User.js";

export class Controller {
    constructor(){
        this.user;

        //USER ELEMENTS
        this.usernameEl = document.getElementById('user-username');
        this.userclassEl = document.getElementById('user-userclass');
        this.userHpEl = document.getElementById('user-hp');
        this.lifebarEl = document.querySelector('.lifebar-inside');
        this.userCoinsEl = document.getElementById('user-coins');
        this.userExperienceEl = document.getElementById('user-experience');
        this.userSkillPointsEl = document.getElementById('user-skill-points');
    
    }

    createUser(name, email, password){
        const user = new User(name, email, password);
        this.user = user;
        
        this.updateProfile();
    }

    updateProfile(){
        this.user.hero.hp = 45;

        //Hero HUD
        this.usernameEl.innerText = this.user.hero.username;
        this.userclassEl.innerText = this.user.hero.classe;
        this.userHpEl.innerText = `${this.user.hero.hp}/${this.user.hero.maxHP}`;
        this.lifebarEl.style = `width: ${(100 * this.user.hero.hp) / this.user.hero.maxHP}%;`
        this.userCoinsEl.innerText = this.user.hero.coins;
        this.userExperienceEl.innerText = `${this.user.hero.xp}/${this.user.hero.xpForNext}`;
        this.userSkillPointsEl.innerText = this.user.hero.points;
    
        //Task List
        this.dailyTasksListEl = document.getElementById('daily-tasks-list');
    }

    //TASKS
    createTask(title, description, date, coins, xp, color, type = 'daily', status = 'pending'){
        
        this.user.newTask(title, description, date, coins, xp, color, type, status)
    }

    renderTaskList(){
        // <div class="task-card">
        //     <div class="task-body">
        //         <span class="task-color" style="background-color: #36EE5F;"></span>
        //         <button class="task-check"><!--<i class="fa-solid fa-check"></i>--></button>
        //         <div class="task-infos">
        //             <p class="task-title">Título da Tarefa</p>
        //             <p class="task-description">Descrição do Objetivo com poucos detalhes.</p>
        //         </div>
        //         <button class="task-edit"><i class="fa-solid fa-ellipsis-vertical"></i></button>
        //     </div>
        //     <div class="task-footer">
        //         <p class="date">Início: dd/mm/aaaa</p>
        //         <div class="task-rewards">
        //             <ul>
        //                 <li class="task-coins"><i class="fa-solid fa-coins"></i>999.99</li>
        //                 <li class="task-experience"><i class="fa-solid fa-star"></i>999.99</li>
        //             </ul>
        //         </div>
        //     </div>
        //     <div class="task-kebab-menu">
        //         <button class="task-btn-edit"><i class="fa-solid fa-pen"></i> Editar</button>
        //         <button class="task-btn-edit"><i class="fa-solid fa-trash-can"></i> Excluir</button>
        //     </div>
        // </div>
        
        //TASK CARD
        let taskcard = document.createElement('div');
        taskcard.className = 'task-card';

        //TASK BODY
        let taskbody = document.createElement('div');
        taskbody.className = 'task-body';

        let taskcolor = document.createElement('span');
        taskcolor.className = 'task-color';
        taskcolor.style = `background-color: #36EE5F;`;
   
        let taskcheck = document.createElement('button');
        taskcheck.className = 'task-check'

        //TASK INFOS
        let taskinfos = document.createElement('div');
        taskinfos.className = 'task-infos';

        let tasktitle = document.createElement('p');
        tasktitle.className = 'task-title';
        tasktitle.innerText = 'Título da Tarefa';

        let taskdescription = document.createElement('p');
        taskdescription.className = 'task-description';
        taskdescription.innerText = 'Descrição do Objetivo com poucos detalhes.';

        let taskedit = document.createElement('button');
        taskedit.className = 'task-edit';
        let taskeditIcon = document.createElement('i');
        taskeditIcon.classList.add('fa-solid', 'fa-ellipsis-vertical');

        //TASK FOOTER
        let taskfooter = document.createElement('div');
        taskfooter.className = 'task-footer';

        let date = document.createElement('p');
        date.className = 'date';
        date.innerText = `Início: dd/mm/aaaa`;
    
        let taskrewards = document.createElement('div');
        taskrewards.className = 'task-rewards';

        let rewardsUl = document.createElement('ul');

        let coins = document.createElement('li');
        coins.className = 'task-coins';
        coins.innerHTML = `<i class="fa-solid fa-coins"></i>999.99`;

    }
}