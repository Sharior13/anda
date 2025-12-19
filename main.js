const canvas = document.getElementById("canvas");
import { Duck } from "./entities.js";
import { Player } from "./entities.js";
import { Egg } from "./entities.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//make canvas responsive
// window.addEventListener("resize",()=>{
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     console.log(canvas.height, canvas.width);
// });

let ctx = canvas.getContext("2d");

let hasStarted = false;
const gameStart = () => {
        animate();
        console.log("game STARTTTT");
        window.removeEventListener("keydown", gameStart)
};

if(!hasStarted){
    hasStarted = true;
    ctx.font = "50px Arial";
    ctx.fillText("Press any key to start", canvas.width/2-250, canvas.height/2, 500);
    window.addEventListener("keydown", gameStart);
}


const player = new Player({
    position: {
        x: canvas.width/2-50,
        y: 475
    }
});

const duck1 = new Duck({
    position:{
        x: 50,
        y: 10
    },
    velocity:{
        x: 1,
        y: 1
    },
    color: "orange"
});
const duck2 = new Duck({
    position:{
        x: 200,
        y: 10
    },
    velocity:{
        x: 0.5,
        y: 1
    },
    color: "red"
});

const egg = new Egg({
    position:{
        x: 100,
        y: 200
    }
});

const animate = ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    line(0, 110, canvas.width, 110);
    line(0, 650, canvas.width, 650);
    player.draw(ctx);
    duck2.draw(ctx);
    duck1.draw(ctx);
    egg.draw(ctx);
    duck2.move();
    duck1.move();
    // window.addEventListener("keydown",(event)=>{
    //     player.move(event.key);
    // });

    if(doesCollide(duck1,duck2)){
        console.log("quack");
    }
    requestAnimationFrame(animate);
};

const line = (x1, y1, x2, y2)=>{
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();  
    ctx.closePath(); 
};

const doesCollide = (box1,box2)=>{
    let collideX = (box1.right >= box2.left && box2.right >= box1.left);
    let collideY = (box1.bottom >= box2.top && box2.bottom >= box1.top);
    return collideX && collideY;
};
