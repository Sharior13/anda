class Entity {
    constructor({position}){
        this.position = position;
        this.direction = {
            x: 1,
            y: 1
        }
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
    constructor({position}){
        super({position});
        this.size = {
            width: 100,
            height: 100
        }
        this.velocity = {
            x: 1,
            y: 1
        };
        this.direction = {
            x: (Math.round(Math.random()) *2) - 1,
            y: (Math.round(Math.random()) *2) - 1
        };
        this.color = "orange";
    }

    move() {
        this.position.x += this.velocity.x*this.direction.x;
    }
}

class Egg extends Entity {
    constructor({position, direction, original}){
        super({position, direction});
        this.velocity = {
            x: 1,
            y: 1
        };
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
        this.original = original;
        this.isCollected = false;
    }

    draw(ctx) {
        if(this.isCollected){
            this.position.x = this.original.x;
            this.position.y = this.original.y;
            this.isCollected = false; 
            return;
        }
        ctx.beginPath();
        ctx.ellipse(this.position.x, this.position.y, this.radius.x, this.radius.y, this.rotation, this.angle.start, this.angle.end);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.position.y += this.velocity.y;
    }
}

class Player extends Entity{
    constructor({position, direction}){
        super({position, direction});
        this.size = {
            width: 100,
            height: 175
        };
        this.velocity = {
            x: 1,
            y: 1
        };
        this.color = "red";
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x,this.position.y,this.size.width,this.size.height);
        ctx.closePath();
    }

    move(key) {
        switch(key){
            case "d":{
                this.position.x+=this.velocity.x;
                break;   
            }
            case "a":{
                this.position.x-=this.velocity.x;
                break;
            }
        }
    }
}

export {Duck, Egg, Player};

//015970488

//1660-01-07777