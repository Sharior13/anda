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
let score = 0;
const duck = [];
const egg = [];
const gameStart = () => {
    console.log("STARTTTT");
        hasStarted = true;
        window.removeEventListener("keydown", gameStart)
        animate();
};
const titleScreen = ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Press any key to start", canvas.width/2-250, canvas.height/2, 500);
    ctx.closePath();
    window.addEventListener("keydown", gameStart);
}
titleScreen();


const player = new Player({
    position: {
        x: canvas.width/2-50,
        y: 475
    }
});
for(let i=0; i<4; i++){
    duck.push(new Duck({
        position:{
            x: 100+i*400,
            y: 10
        },
        direction:{
            x: (Math.round(Math.random()) *2) - 1,
            y: (Math.round(Math.random()) *2) - 1
        }
    }));
    egg.push(new Egg({
        position:{
            x: duck[i].position.x+50,
            y: duck[i].position.y+150
        },
        original:{   
            x: duck[i].position.x+50,
            y: duck[i].position.y+150
        }
    }));
}


const animate = ()=>{
    if(!hasStarted){
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    line(0, 110, canvas.width, 110);
    line(0, 650, canvas.width, 650);
    player.draw(ctx);

    for(let i=0; i<duck.length; i++){
        for(let j=0; j<duck.length; j++){
            if(duck[i].right>=duck[j].left && duck[i].left<=duck[j].right){
                duck[i].direction.x *= -1;
                duck[j].direction.x *= -1;
            }
        }
        if(duck[i].right>=canvas.width || duck[i].left<= 0){
            duck[i].direction.x *= -1;
        }

        if(player.top <= egg[i].position.y+egg[i].radius.y && player.bottom >= egg[i].position.y+egg[i].radius.y && player.right>= egg[i].position.x-egg[i].radius.x && player.left <= egg[i].position.x+egg[i].radius.x){
            egg[i].isCollected = true;
            score++;
        }
        duck[i].draw(ctx);
        duck[i].move();
        egg[i].original = {
            x: duck[i].position.x+50,
            y: duck[i].position.y+150
        }
        egg[i].draw(ctx);
        egg[i].move();

        // if(egg[i].position.y-egg[i].radius.y > canvas.height){
        //         egg[i].position = {
        //         x: egg[i].original.x,
        //         y: egg[i].original.y
        //     }
        // }
    }
    
    window.addEventListener("keydown",(event)=>{
        player.move(event.key);
    });
    trackScore();
    gameEnd();
    requestAnimationFrame(animate);
};

const line = (x1, y1, x2, y2)=>{
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();  
    ctx.closePath(); 
};

const trackScore = () =>{
    ctx.beginPath();
    ctx.font = "50px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(`Score: ${score}`, canvas.width/2-100, canvas.height-5, 200);
    ctx.closePath();
};

const gameEnd = () =>{
        if(egg.every((anda)=>{
        return anda.position.y-anda.radius.y > canvas.height;
    }))
    {
        hasStarted = false;
        ctx.beginPath();
        ctx.font = "50px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over.", canvas.width/2-150, canvas.height/2, 300);
        ctx.closePath();
        egg.forEach(anda=>{
            anda.position = {
                x: anda.original.x,
                y: anda.original.y
            }
        });
        score = 0;
        setTimeout(()=>{
            titleScreen();
        },2000);
    }
}