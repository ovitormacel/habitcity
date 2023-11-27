import { Hero } from "./Hero.js";

class ProfileController {
    constructor(){
        this.hero;

        //ELEMENTS
        this.usernameEl = document.getElementById('user-username');
        this.userclassEl = document.getElementById('user-userclass');
        this.userlevelEl = document.getElementById('user-level');
        this.levelbarEl = document.querySelector('.levelbar-inside');
        this.coinsEl = document.getElementById('user-coins');
        this.xpEl = document.getElementById('user-experience');
        this.pointsEl = document.getElementById('user-skill-points');

        this.skillPointAttack = document.getElementById('list-of-skills-points-attack');
        this.skillPointDefense = document.getElementById('list-of-skills-points-defense');
        this.skillPointResistence = document.getElementById('list-of-skills-points-resistence');
        this.skillPointIntuition = document.getElementById('list-of-skills-points-intuition');
        this.btnsAddPointsEl = document.querySelectorAll('.add-skill-point-btn');

        this.metricsCompleted = document.getElementById('card-tasks-data-complete');
        this.metricsFail = document.getElementById('card-tasks-data-fail');
        this.metricsCoins = document.getElementById('card-tasks-data-coins');
        this.metricsPoints = document.getElementById('card-tasks-data-points');


        this.addEvents();
        this.getHero();
        this.updateProfile();
        this.updateMetrics();
    }

    addEvents(){
        this.btnsAddPointsEl.forEach((btn) => {
            btn.addEventListener('click', (e) => this.addSkillPoint(e))
        })
    }

    getHero(){
        const data = JSON.parse(localStorage.getItem('hero'));
        
        const hero = new Hero(data.username, data.classe, data.level, data.coins, data.xp, data.xpForNext, data.points, data.maxHP, data.hp, data.defense, data.attack, data.resistence, data.intuition, data.items);
        this.hero = hero;
    }

    updateProfile(){
        this.usernameEl.innerText = this.hero.username;
        this.userclassEl.innerText = this.hero.classe;
        this.userlevelEl.innerText = this.hero.level;

        const barPercent = Math.round((100 * this.hero.xp) / this.hero.xpForNext);
        this.levelbarEl.style = `width: ${barPercent}%`;
        
        this.coinsEl.innerText = this.hero.coins;
        this.xpEl.innerText = `${this.hero.xp}/${this.hero.xpForNext}`;
        this.pointsEl.innerText = this.hero.points;

        this.skillPointAttack.innerText = this.hero.attack;
        this.skillPointDefense.innerText = this.hero.defense;
        this.skillPointResistence.innerText = this.hero.resistence;
        this.skillPointIntuition.innerText = this.hero.intuition;
    }

    updateMetrics(){
        const data = JSON.parse(localStorage.getItem('metrics'));
        
        this.metricsCompleted.innerText = data.completedTasks ? data.completedTasks : 0;
        this.metricsFail.innerText = data.failTasks ? data.failTasks : 0;
        this.metricsCoins.innerText = data.allCoinsRewards ? data.allCoinsRewards : 0;
        this.metricsPoints.innerText = data.allPointsRewards ? data.allPointsRewards : 0;
    }

    addSkillPoint(event){
        const target = event.target.parentElement.dataset.name;
       
        if(this.hero.points > 0){
            switch (target){
                case 'attack':
                    this.hero.attack++
                    break;
                case 'defense':
                    this.hero.defense++
                    break
                case 'resistence':
                    this.hero.resistence++
                    break;
                case 'intuition':
                    this.hero.intuition++
                    break;
                default:
                    break;
            }

            this.hero.points--
        }

        this.hero.saveHero();
        this.updateProfile();
    }
}

const controller = new ProfileController();