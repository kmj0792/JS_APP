const clockContainer=document.querySelector(".js-clock"),
    clockTitle=clockContainer.querySelector("h1");

function getTime() {
    const date=new Date();
    const minutes=date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText=`${hours}:${minutes}:${seconds}`; // 작은 따옴표 아님 주의 
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds}`; // if 문을 사용해 60초에서 다시 1초로 바뀔때 01 이런식으로 되게함.
      }


function init() {
    getTime();
    setInterval(getTime, 1000); // 일초마다 바뀌도록 
    
}
init();
