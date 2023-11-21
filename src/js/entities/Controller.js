import { User } from "./User.js";

export class Controller {
    constructor(){
        this.user;
        this.this = this;

        //USER ELEMENTS
        this.usernameEl = document.getElementById('user-username');
        this.userclassEl = document.getElementById('user-userclass');
        this.userHpEl = document.getElementById('user-hp');
        this.lifebarEl = document.querySelector('.lifebar-inside');
        this.userCoinsEl = document.getElementById('user-coins');
        this.userExperienceEl = document.getElementById('user-experience');
        this.userSkillPointsEl = document.getElementById('user-skill-points');

        //TASKS
        this.dailyTasksListEl = document.getElementById('daily-tasks');
        this.btnNewTaskEl = document.getElementById('btn-new-task');
        this.btnCancelNewTask = document.getElementById('btn-cancel');

        //FORM NEW TASK
        this.formNewTask = document.getElementById('new-task-form');
        this.formColorButtons = document.querySelectorAll('.radio-color');
        this.formColorData = '#36EE5F';

        //ALERTS
        this.alertsListUl = document.getElementById('alerts-list-ul');

        //ADD EVENT LISTENERS
        this.addEventListener()
        
    }

    //ADD EVENT LISTENERS
    addEventListener(){
        //NEW TASK SUBMIT
        this.btnNewTaskEl.addEventListener('click', () => this.openNewFormTask());
        this.btnCancelNewTask.addEventListener('click', () => this.openNewFormTask());
        this.formNewTask.addEventListener('submit', (e) => this.submitFormNewTask(e))
        
        //COLOR BUTTONS
        this.formColorButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => this.changeFormColor(e));
        })
    }

    //USER AND PROFILE
    createUser(name, email, password){
        const user = new User(name, email, password);
        this.user = user;
        
        this.updateProfile();
    }

    updateProfile(){
        //Hero HUD
        this.usernameEl.innerText = this.user.hero.username;
        this.userclassEl.innerText = this.user.hero.classe;
        this.userHpEl.innerText = `${this.user.hero.hp}/${this.user.hero.maxHP}`;
        this.lifebarEl.style = `width: ${(100 * this.user.hero.hp) / this.user.hero.maxHP}%;`
        this.userCoinsEl.innerText = this.user.hero.coins;
        this.userExperienceEl.innerText = `${this.user.hero.xp}/${this.user.hero.xpForNext}`;
        this.userSkillPointsEl.innerText = this.user.hero.points;
    }

    //TASKS
    openNewFormTask(){
        const bg = document.querySelector('.form-tasks-background');
        bg.classList.toggle('opened');
        bg.querySelector('.form-tasks').scrollTo({top: 0});
    }

    changeFormColor(event){
        this.formColorButtons.forEach((btn) => {
            btn.classList.remove('checked');
        })

        event.target.classList.add('checked');
        this.formColorData = event.target.dataset.color;
    }

    getTaskId(){
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    submitFormNewTask(e){
        e.preventDefault();

        const taskId = this.getTaskId();
        const title = this.formNewTask[0].value;
        const description = this.formNewTask[1].value;
        const targetDate = this.formNewTask[10].value;
        const coins = this.formNewTask[11].value;
        const xp = this.formNewTask[12].value;

        let date = new Date(Date.now()).toLocaleDateString();

        this.createTask(taskId, title, description, date, coins, xp, this.formColorData, targetDate);
        this.openNewFormTask();
        this.clearNewFormTask();
    }

    clearNewFormTask(){
        this.formNewTask[0].value = '';
        const description = this.formNewTask[1].value = '';
        const targetDate = this.formNewTask[10].value = '';
        const coins = this.formNewTask[11].value = '0';
        const xp = this.formNewTask[12].value = '0';
    }

    createTask(taskId, title, description, date, coins, xp, color, targetDate, type = 'daily', status = 'pending'){
        this.user.newTask(this.this, taskId, title, description, date, coins, xp, color, targetDate, type, status)
        this.renderTaskList();
    }

    renderTaskList(){
        this.dailyTasksListEl.innerHTML = '';

        this.user.tasks[0].forEach((taskData) => {
            taskData.createTaskElement();
        })
    }

    //ALERTS
    renderNewAlert(data){
        let li = document.createElement('li');
        li.classList.add('alert');
        li.classList.add(data.type);

        if(data.type === 'reward'){
            li.innerHTML = `Você ganhou: ${data.icon} ${data.value}`;
        } else if(data.type === 'fail'){
            li.innerHTML = `Você perdeu: ${data.icon} ${data.value}`;
        }

        if(data.value > 0){
            this.alertsListUl.appendChild(li);

            setTimeout(()=>{
                li.classList.add('opened');
            }, 1)
            setTimeout(()=>{
                li.classList.remove('opened');
            }, 1000 * 2)
            setTimeout(()=>{
                this.alertsListUl.removeChild(li);
            }, 1000 * 4)
        }
    }
}