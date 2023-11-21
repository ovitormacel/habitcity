import { Controller } from "./Controller.js";

export class Task {
    constructor(user, taskId, title, description, date, coins = 0, xp = 0, color, targetDate = null, type = 'daily', status = 'pending'){
        this.user = user;
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.date = date;
        this.coins = coins;
        this.xp = xp;
        this.color = color;
        this.targetDate = targetDate;
        this.type = type;
        this.status = status; 

        //ELEMENTS
        this.kebabEl;
        this.taskCardEl;

        this.dailyTasksListEl = document.getElementById('daily-tasks');
    }

    createTaskElement(){
        console.log(this.user);
        //TASK CARD
        let taskcard = document.createElement('div');
        taskcard.className = 'task-card';
        taskcard.id = this.taskId;

        //TASK BODY
        let taskbody = document.createElement('div');
        taskbody.className = 'task-body';
        taskbody.classList.add(this.status);

        let taskcolor = document.createElement('span');
        taskcolor.className = 'task-color';
        taskcolor.style = `background-color: ${this.color};`;
   
        let taskcheck = document.createElement('button');
        taskcheck.className = 'task-check';

        //TASK INFOS
        let taskinfos = document.createElement('div');
        taskinfos.className = 'task-infos';

        let tasktitle = document.createElement('p');
        tasktitle.className = 'task-title';
        tasktitle.innerText = this.title;

        let taskdescription = document.createElement('p');
        taskdescription.className = 'task-description';
        taskdescription.innerText = this.description;

        let taskedit = document.createElement('button');
        taskedit.className = 'task-edit';
        taskedit.id = 'task-edit' + this.taskId;
        taskedit.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>'

        //TASK FOOTER
        let taskfooter = document.createElement('div');
        taskfooter.className = 'task-footer';

        let date = document.createElement('p');
        date.className = 'date';
        date.innerText = `Início: ${this.date}`;
    
        let taskrewards = document.createElement('div');
        taskrewards.className = 'task-rewards';

        let rewardsUl = document.createElement('ul');

        let coins = document.createElement('li');
        coins.className = 'task-coins';
        coins.innerHTML = `<i class="fa-solid fa-coins"></i>${this.coins}`;

        let xp = document.createElement('li');
        xp.className = 'task-experience';
        xp.innerHTML = `<i class="fa-solid fa-star"></i>${this.xp}`;

        //TASK KEBAB
        let taskKebab = document.createElement('div');
        taskKebab.className = 'task-kebab-menu';
        taskKebab.id = `task-kebab-menu-${this.taskId}`;

        let kebabBtnEdit = document.createElement('button');
        kebabBtnEdit.className = 'task-btn-edit';
        kebabBtnEdit.innerHTML = '<i class="fa-solid fa-pen"></i> Editar';

        let kebabBtnDelete = document.createElement('button');
        kebabBtnDelete.className = 'task-btn-edit';
        kebabBtnDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i> Excluir';

        //APPENDS
        taskinfos.append(tasktitle, taskdescription);
        taskbody.append(taskcolor, taskcheck, taskinfos, taskedit);

        rewardsUl.append(coins, xp);
        taskrewards.append(rewardsUl)
        taskfooter.append(date, taskrewards);

        taskKebab.append(kebabBtnEdit, kebabBtnDelete);

        taskcard.append(taskbody, taskfooter, taskKebab);

        this.dailyTasksListEl.appendChild(taskcard);

        this.kebabEl = document.getElementById('task-edit' + this.taskId);
        this.taskCardEl = document.getElementById(this.taskId);

        //ADD EVENT LISTENERS
        this.addTaskListeners();
    }

    addTaskListeners(){
        this.kebabEl.addEventListener('click', () => this.openKebabMenu());
        this.taskCardEl.querySelector('.task-check').addEventListener('click', () => this.checkTask());
    }

    openKebabMenu(){
        const kebab = document.getElementById(`task-kebab-menu-${this.taskId}`);
        kebab.classList.toggle('opened');
    }

    checkTask(){
        if(this.status === 'pending'){
            this.status = 'complete';
            this.user.user.hero.coins += Number(this.coins)
            this.user.user.hero.xp += Number(this.xp);

            this.user.renderNewAlert({
                type: 'reward',
                icon: '<i class="fa-solid fa-coins"></i>',
                value: this.coins
            });
            this.user.renderNewAlert({
                type: 'reward',
                icon: '<i class="fa-solid fa-star"></i>',
                value: this.xp
            });

        } else if(this.status === 'complete') {
            this.status = 'fail';
            this.user.user.hero.coins -= Number(this.coins)
            this.user.user.hero.xp -= Number(this.xp);

            this.user.renderNewAlert({
                type: 'fail',
                icon: '<i class="fa-solid fa-coins"></i>',
                value: this.coins
            });
            this.user.renderNewAlert({
                type: 'fail',
                icon: '<i class="fa-solid fa-star"></i>',
                value: this.xp
            });
        } else{
            this.status = 'pending';
        }

        this.changeCheckTaskButton();
        this.user.updateProfile();
    }

    changeCheckTaskButton(){
        const taskBodyEl = this.taskCardEl.querySelector('.task-body');

        taskBodyEl.classList.remove('complete');
        taskBodyEl.classList.remove('fail');

        taskBodyEl.classList.add(this.status);

        if(this.status === 'complete'){
            taskBodyEl.querySelector('.task-check').innerHTML = '<i class="fa-solid fa-check"></i>';
        } else if(this.status === 'fail'){
            taskBodyEl.querySelector('.task-check').innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else{
            taskBodyEl.querySelector('.task-check').innerHTML = '';
        }
    }
}