export class Hero{
    constructor(username, classe, level = 1, coins = 0, xp = 0.00, xpForNext = 40.00, points = 0, maxHP = 100, hp = 100, defense = 0, attack = 0, resistence = 0, intuition = 0, items = []){
        this.username = username;
        this.classe = classe;
        this.level = level;
        this.coins = coins;
        this.xp = xp;
        this.xpForNext = xpForNext;
        this.points = points;
        this.maxHP = maxHP;
        this.hp = hp;
        this.defense = defense;
        this.attack = attack;
        this.resistence = resistence;
        this.intuition = intuition;
        this.items = items;

        this.saveHero();
    }

    saveHero(){
        const data = {
            'username': this.username,
            'classe': this.classe,
            'level': this.level,
            'coins': this.coins,
            'xp': this.xp,
            'xpForNext': this.xpForNext,
            'points': this.points,
            'maxHP': this.maxHP,
            'hp': this.hp,
            'defense': this.defense,
            'attack': this.attack,
            'resistence': this.resistence,
            'intuition': this.intuition,
            'items': this.items
        }

        localStorage.setItem('hero', JSON.stringify(data));
    }

    checkLevelUp(){
        if(this.xp >= this.xpForNext){
            this.level++
            this.points += this.level * 3;

            const xpRest = this.xp - this.xpForNext;
            this.xp = Number(xpRest.toFixed(2));
            this.xpForNext = Number((this.xpForNext + (this.xpForNext / 2)).toFixed(2));
            this.checkLevelUp();

            return true;
        }
    }
}