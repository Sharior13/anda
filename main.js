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

const player = new Player({
    position: {
        x: canvas.width/2-50,
        y: 475
    }
});

const duck = new Duck({
    position:{
        x: 50,
        y: 10
    }
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
    duck.draw(ctx);
    egg.draw(ctx);
    window.addEventListener("keydown",(event)=>{
        player.move(event.key);
    });
    requestAnimationFrame(animate);
};

const line = (x1,y1, x2, y2)=>{
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();  
    ctx.closePath(); 
};

animate();
