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
        this.warningsEl = document.querySelector('.warnings');

        //METRICS
        this.completedTasks = 0;
        this.failTasks = 0;
        this.allCoinsRewards = 0;
        this.allPointsRewards = 0;
        this.getMetrics();

        //ADD EVENT LISTENERS
        this.addEvents()
    }




    //ADD EVENT LISTENERS
    addEvents(){
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
        this.clearNewFormTask();

        const bg = document.querySelector('.form-tasks-background');
        const formTasks = bg.querySelector('.form-tasks');

        this.formNewTask.classList.remove('edit-mode');
        formTasks.querySelector('.task-form-title').innerText = 'Nova Tarefa';

        bg.classList.toggle('opened');
        formTasks.scrollTo({top: 0});
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

        if(!this.formNewTask.classList.contains('edit-mode')){
            const taskId = this.getTaskId();
            const title = this.formNewTask[0].value;
            const description = this.formNewTask[1].value;
            const targetDate = this.formNewTask[10].value;
            const coins = this.formNewTask[11].value;
            const xp = this.formNewTask[12].value;

            let date = new Date(Date.now()).toLocaleDateString();

            this.createTask(taskId, title, description, date, coins, xp, this.formColorData, targetDate);
        
            this.openNewFormTask();
        }
    }

    clearNewFormTask(){
        this.formNewTask[0].value = '';
        const description = this.formNewTask[1].value = '';
        const targetDate = this.formNewTask[10].value = '';
        const coins = this.formNewTask[11].value = '';
        const xp = this.formNewTask[12].value = '';
    }

    createTask(taskId, title, description, date, coins, xp, color, targetDate, type = 'daily', status = 'pending'){
        this.user.newTask(this.this, taskId, title, description, date, coins, xp, color, targetDate, type, status)
        this.renderTaskList();
        this.saveTasks();
    }

    deleteTask(taskid){
        this.user.tasks[0].forEach((task, i) => {
            if(task.taskId === taskid){
                this.user.tasks[0].splice(i, 1);
            }
        });
    
        this.renderTaskList();
        this.openWarningConfirm();
        this.saveTasks()
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
        } else if(data.type === 'edit'){
            li.innerHTML = `Tarefa Editada`;
        } else if(data.type === 'levelup'){
            li.innerHTML = `${data.icon} Você subiu para o Nível ${data.value}!`;
        } else if(data.type === 'points'){
            li.innerHTML = `${data.icon} Pontos de Habilidade: ${data.value}!`;
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

    openWarningConfirm(taskid){
        this.warningsEl.classList.toggle('opened');

        //WARNINGS
        document.querySelector('.warning-confirm-confirm').addEventListener('click', () => this.deleteTask(taskid));
        document.querySelector('.warning-confirm-cancel').addEventListener('click', () => this.openWarningConfirm());
    }

    //METRICS
    saveMetrics(){
        const data = {
            completedTasks: this.completedTasks,
            failTasks: this.failTasks,
            allCoinsRewards: this.allCoinsRewards,
            allPointsRewards: this.allPointsRewards
        }

        localStorage.setItem('metrics', JSON.stringify(data));
    }

    getMetrics(){
        const data = localStorage.getItem('metrics');

        if(data != null){
            this.completedTasks = JSON.parse(localStorage.getItem('metrics')).completedTasks;
            this.failTasks = JSON.parse(localStorage.getItem('metrics')).failTasks;
            this.allCoinsRewards = JSON.parse(localStorage.getItem('metrics')).allCoinsRewards;
            this.allPointsRewards= JSON.parse(localStorage.getItem('metrics')).allPointsRewards;
        }
    }

    getTasks(){
        const data = JSON.parse(localStorage.getItem('tasks'));
        
        if(data != null){
            data.forEach((task) => {
                this.createTask(task.taskId, task.title, task.description, task.date, task.coins, task.xp, task.color, task.targetDate, task.type, task.status);
            })
        } else{
            this.createTask('01', 'Tarefa de Demonstração', 'Clique no Menu à direita para Editar ou Excluir', 'dd/mm/yyyy', 0, 0)
        }
    }

    saveTasks(){
        let data = []
        
        this.user.tasks[0].forEach((taskData) => {
            let task = {
                taskId: taskData.taskId,
                title: taskData.title,
                description: taskData.description,
                date: taskData.date,
                coins: taskData.coins,
                xp: taskData.xp,
                color: taskData.color,
                targetDate: taskData.targetDate,
                type: taskData.type,
                status: taskData.status
            }

            data.push(task);
        })

        localStorage.setItem('tasks', JSON.stringify(data));
    }
}