export class Hero{
    constructor(username, classe, level = 1, coins = 0, xp = 0.00, xpForNext = 40.00, points = 0, maxHP = 100, hp = 100, defense = 0, attack = 0, items = []){
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
        this.items = items;
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