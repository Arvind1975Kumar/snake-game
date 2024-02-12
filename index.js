let startGameMusic=new Audio('starte.mp3');
startGameMusic.loop=true;
let snakeEateFood=new Audio('eate.mp3');
let endGameMusic=new Audio('end.mp3');
endGameMusic.loop=false;
let score=0;
// game fuctionalitys
let snakeDirection={x:0,y:0};
let speed=5;
let lastPaintTime=0;
let snakeArray=[
    {x:13,y:15},
];
let food={x:6,y:7};
function main(currentTime){
  window.requestAnimationFrame(main);
    if((currentTime-lastPaintTime)/1000<1/speed){
        // console.log(currentTime);
        return;
    }
    lastPaintTime=currentTime;
    gameEngine();
}
function isCollide(snakeHead){
for (let index = 1; index < snakeArray.length; index++){    if(snakeHead[index].x===snakeHead[0].x&&snakeHead[index].y===snakeHead[0].y){
document.querySelector('.resultArea').style.backgroundImage='url(bg.gif)';
hieScoreBox.style.display='block';
setTimeout(()=>{
hieScoreBox.style.display='none';
},5000);
return true
}
}
// if you bump the wall 
if(snakeHead[0].x>=18||snakeHead[0].x<=0||snakeHead[0].y>=18||snakeHead[0].y<=0){
document.querySelector('.resultArea').style.backgroundImage='url(fr.gif)';
hieScoreBox.style.display='block';
setTimeout(()=>{
hieScoreBox.style.display='none';
},5000);
    return true;
}
}
// main();
function gameEngine(){
    // first part 
    if(isCollide(snakeArray)){
snakeDirection={x:0,y:0};
endGameMusic.play();
startGameMusic.pause();
alert("alert game over press key");
snakeArray=[{x:13,y:15}];
startGameMusic.play();
score=0;
    }
// snake eate the food then score++ and change food place
if(snakeArray[0].y==food.y && snakeArray[0].x==food.x){
    snakeEateFood.play();
    score+=1;
    if(score>hieScoreVal){
    hieScoreBox.style.display='block';
    setTimeout(()=>{
    hieScoreBox.style.display='none';
    },5000);
        hieScoreVal=score;
        localStorage.setItem('hieScore',JSON.stringify(hieScoreVal));
    hieScoreBox.innerHTML=`Hiescore is : ${hieScore}`;
    }
    scoreBox.innerHTML=`Your Score is : ${score}`
snakeArray.unshift({x:snakeArray[0].x+snakeDirection.x,y:snakeArray[0].y+snakeDirection.y});
let a=2;
let b=16;
food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())};
}
// move the snack 
for(let i=snakeArray.length-2;i>=0;i--){
    snakeArray[i+1]={...snakeArray[i]};
}
snakeArray[0].x+=snakeDirection.x;
snakeArray[0].y+=snakeDirection.y;
    // second part 
    ground.innerHTML='';
    snakeArray.forEach((e,index)=>{
snakeElement=document.createElement('div');
snakeElement.style.gridRowStart=e.y;
snakeElement.style.gridColumnStart=e.x;
// snakeElement.classList.add('snake');
if(index===0){
snakeElement.classList.add('head');
}
else{
    snakeElement.classList.add('snake');
}
ground.appendChild(snakeElement);
});
foodElement=document.createElement('div');
foodElement.style.gridRowStart=food.y;
foodElement.style.gridColumnStart=food.x;
foodElement.classList.add('food');
ground.appendChild(foodElement);
}
let hieScore=localStorage.getItem('hieScore');
if(hieScore===null){
    hieScoreVal=0;
    localStorage.setItem('hieScore',JSON.stringify(hieScoreVal));
}
else{
    hieScoreVal=JSON.parse(hieScore);
    hieScoreBox.style.display='block';
    setTimeout(()=>{
        hieScoreBox.style.display='none';
        },5000);
    hieScoreBox.innerHTML=`Hiescore is : ${hieScore}`;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
startGameMusic.play();
snakeDirection={x:0,y:1}//start game
switch(e.key){
    case'ArrowUp':  document.querySelector('.resultArea').style.backgroundImage='url(giphy.gif)';
snakeDirection.x=0;
snakeDirection.y=-1;
break; 
   case'ArrowLeft':  document.querySelector('.resultArea').style.backgroundImage='url(rdmhw9sp.png)';
snakeDirection.x=-1;
snakeDirection.y=0;
break; 
    case'ArrowDown':
    snakeDirection.x=0;
snakeDirection.y=1;
break; 
    case'ArrowRight':
    snakeDirection.x=1;
snakeDirection.y=0;
break; 
default:
    console.log('other');
break; 
}
});