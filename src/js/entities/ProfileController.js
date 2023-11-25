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

        this.getHero();
        this.updateProfile();
    }

    getHero(){
        const data = JSON.parse(localStorage.getItem('hero'));
        
        const hero = new Hero(data.username, data.classe, data.level, data.coins, data.xp, data.xpForNext, data.points, data.maxHP, data.hp, data.defense, data.attack, data.items);
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
    }
}

const controller = new ProfileController();