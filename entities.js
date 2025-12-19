class Entity {
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
    }

    get left () {
        return this.position.x;
    }
    get right () {
        return this.position.x+this.size.width;
    }
    get top () {
        return this.position.y;
    }
    get bottom () {
        return this.position.y +this.size.height;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x,this.position.y,this.size.width,this.size.height);
        ctx.closePath();
    }
}


class Duck extends Entity {
    constructor({position, velocity, color}){
        super({position, velocity});
        this.size = {
            width: 100,
            height: 100
        },
        this.color = color;
    }

    move() {
        this.position.x += this.velocity.x;
    }
}

class Egg extends Entity {
    constructor({position, velocity}){
        super({position, velocity});
        this.radius = {
            x: 30,
            y: 50
        },
        this.rotation = 0;
        this.angle = {
            start: 0,
            end: Math.PI*2
        };
        this.color = "gray";
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.ellipse(this.position.x,this.position.y, this.radius.x, this.radius.y, this.rotation, this.angle.start, this.angle.end);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Player extends Entity{
    constructor({position, velocity}){
        super({position, velocity});
        this.size = {
            width: 100,
            height: 175
        };
        this.color = "red";
    }

    move(key) {
        // switch(key){
        //     case "d":{
        //         this.position.x+=this.velocity.x;
        //         break;   
        //     }
        //     case "a":{
        //         this.position.x-=this.velocity.x;
        //         break;
        //     }
        // }
    }
}

export {Duck, Egg, Player};