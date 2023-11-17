export class Hero{
    constructor(username, classe, level = 1, coins = 0, xp = 0, xpForNext = 40, points = 0, maxHP = 100, hp = 100, defense = 0, attack = 0, items = []){
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
}