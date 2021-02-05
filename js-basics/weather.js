const weather = document.querySelector(".js-weather"); //index.html에서 추가해준 후 여기도 추가하기
const API_KEY="93c324a7c3d4608b0561fab7fca1cb40";
const COORDS = 'coords'; // string 상수 하나 만들기
///////
function getWeather(lat, lng) {
    //fetch : 데이터를 얻는 방법 
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=matric`
        //t섭씨 단위를 쓰기 위해선 &units=matric 마지막에 이부분 추가
        ).then(function (response) {
                    return response.json();
                     }).then(function (json) {
    
    // then 은 기본적으로 함수를 호출하는 것 
    // 여기서 우리는 데이터가 우리한테 완전히 넘어왔을때 함수를 호출할것이다
        const temperature = json.main.temp;
        const place = json.name;
    
        weather.innerText = `${temperature} @ ${place}`;
    })
}

    ////
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
//좌표를 가져오는데 성공했을때를 처리하는 함수
function handleGeoSucces(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj = {
        latitude:latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

//좌표를 가져오는데 실패했을때를 처리하는 함수
function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords(){
    const loadedCords= localStorage.getItem(COORDS);
    if(loadedCords===null){
        askForCoords(); //좌표 요청하기 
    } else {
        //get weather
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}


function init(){
    loadCoords();

}

init();