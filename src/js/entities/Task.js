export class Task {
    constructor(title, description, date, coins, xp, color, type = 'daily', status = 'pending'){
        this.title = title;
        this.description = description;
        this.date = date;
        this.coins = coins;
        this.xp = xp;
        this.color = color;
        this.type = type;
        this.status = status;
    }
}