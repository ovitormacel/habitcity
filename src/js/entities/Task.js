export class Task {
    constructor(controller, taskId, title, description, date, coins = 0, xp = 0, color, targetDate = null, type = 'daily', status = 'pending'){
        this.controller = controller;
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
        this.kebabMenu;
        this.taskCardEl;

        this.formNewTask = document.getElementById('new-task-form');

        this.dailyTasksListEl = document.getElementById('daily-tasks');

        this.editMode = false;
    }

    createTaskElement(){
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
        kebabBtnEdit.id = 'task-btn-edit';
        kebabBtnEdit.innerHTML = '<i class="fa-solid fa-pen"></i> Editar';

        let kebabBtnDelete = document.createElement('button');
        kebabBtnDelete.className = 'task-btn-edit';
        kebabBtnDelete.id = 'task-btn-delete';
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
        this.kebabMenu = document.getElementById(`task-kebab-menu-${this.taskId}`)
        this.taskCardEl = document.getElementById(this.taskId);

        //ADD EVENT LISTENERS
        this.addTaskListeners();
    }

    addTaskListeners(){
        this.kebabEl.addEventListener('click', () => this.openKebabMenu());
        this.taskCardEl.querySelector('.task-check').addEventListener('click', () => this.checkTask());
    
        //EDIT and DELETE task
        this.kebabMenu.querySelector('#task-btn-edit').addEventListener('click', () => this.openEditFormTask(this.taskId));
        this.kebabMenu.querySelector('#task-btn-delete').addEventListener('click', () => this.controller.deleteTask(this.taskId));
    
        this.formNewTask.addEventListener('submit', (e) => this.submitFormEditTask(e))
    }

    openKebabMenu(){
        this.kebabMenu.classList.toggle('opened');
    }

    checkTask(){
        if(this.status === 'pending'){
            this.status = 'complete';
            this.controller.user.hero.coins += Number(this.coins)
            this.controller.user.hero.xp += Number(this.xp);

            this.controller.renderNewAlert({
                type: 'reward',
                icon: '<i class="fa-solid fa-coins"></i>',
                value: this.coins
            });
            this.controller.renderNewAlert({
                type: 'reward',
                icon: '<i class="fa-solid fa-star"></i>',
                value: this.xp
            });

        } else if(this.status === 'complete') {
            this.status = 'fail';
            this.controller.user.hero.coins -= Number(this.coins)
            this.controller.user.hero.xp -= Number(this.xp);

            this.controller.renderNewAlert({
                type: 'fail',
                icon: '<i class="fa-solid fa-coins"></i>',
                value: this.coins
            });
            this.controller.renderNewAlert({
                type: 'fail',
                icon: '<i class="fa-solid fa-star"></i>',
                value: this.xp
            });
        } else{
            this.status = 'pending';
        }

        this.changeCheckTaskButton();
        this.controller.updateProfile();
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

    /* EDIT TASK */
    openEditFormTask(id){
        const bg = document.querySelector('.form-tasks-background');
        const formTasks = bg.querySelector('.form-tasks');

        formTasks.querySelector('.task-form-title').innerText = 'Editar Tarefa';
        
        //UPDATE VALUES
        this.formNewTask.classList.add('edit-mode');
        this.formNewTask.dataset.taskid = id;
        this.formNewTask[0].value = this.title;
        this.formNewTask[1].value = this.description;
        this.formNewTask[10].value = this.date;
        this.formNewTask[11].value = this.coins;
        this.formNewTask[12].value = this.xp;
        this.controller.formColorData = this.color;

        //OPEN FORM
        bg.classList.toggle('opened');
        formTasks.scrollTo({top: 0});
    }

    submitFormEditTask(e){
        e.preventDefault();

        if(this.formNewTask.classList.contains('edit-mode')){
            this.controller.user.tasks[0].forEach((task) => {
                if(task.taskId === this.formNewTask.dataset.taskid){
                    task.title = this.formNewTask[0].value;
                    task.description = this.formNewTask[1].value;
                    task.color = this.controller.formColorData;
                    task.targetDate = this.formNewTask[10].value;
                    task.coins = this.formNewTask[11].value;
                    task.xp = this.formNewTask[12].value;
    
                    const a = this.formNewTask[0].value;
                    console.log(a);

                    this.controller.renderNewAlert({
                        type: 'edit',
                        icon: '',
                        value: 1
                    });
                }
            })
        
            this.controller.renderTaskList();
            this.controller.openNewFormTask();
            
        }
 
    }
}