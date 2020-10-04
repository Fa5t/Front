let navMenu = document.querySelectorAll(".menuicon");
let mainPage = document.querySelectorAll(".main");
let radioButton = document.querySelectorAll(".radio");
let crew = document.querySelectorAll(".teamimage");
let check = document.querySelectorAll(".crewdetails");
document.querySelector("#crewButton").disabled=true;
let shipCapacity = 2;
let crewQuantity=0;
radioButton[0].checked=true;
let selectedTeam = new Map();
let rocket = new Object;
let positionName = new Map();
document.querySelector('#FlyToTheMoon').disabled=true;

document.addEventListener('DOMContentLoaded', function(){
    mainPage[0].style.display='block';
    ClearTeam();
    SetRoleNames();
    
    navMenu.forEach(
        function(e) {
            e.addEventListener("click", showPage);
        }   
    );

    radioButton.forEach(
        function(e) {
            e.addEventListener("click", changeShip);
        });

        document.querySelector("#choose-ship").addEventListener("click", buildRocket);

    crew.forEach(
            function(e){
                e.style.display="none";
            });
	
	check.forEach(
        function(e){
            e.addEventListener("change",changeCrew);
            e.checked=false;
    });
});

function SetRoleNames(){
	RoleNames=new Map();
	RoleNames.set('captain','Капитан');
	RoleNames.set('engineer','Борт инженер');
	RoleNames.set('doctor','Врач');
	RoleNames.set('marine','Космодесантник');
}

function checkStats(){
    let bool = false;
	if (document.querySelectorAll('.stats').length===0) {
		document.querySelector('#FlyToTheMoon').className='activeButton';
        document.querySelector('#FlyToTheMoon').disabled=false;
        bool = true;
	} else {
		document.querySelector('#FlyToTheMoon').className='inactiveButton';
        document.querySelector('#FlyToTheMoon').disabled=true;
        bool = false;
    }
    return bool;
}

function ChangeStats(stat){
	document.querySelector('#stats'+stat).className='stats-good';
	checkStats();
}

function showPage(){
    document.querySelector(".clicked").classList.remove("clicked");  
    this.classList.add("clicked");
                    
    let currentIndex = Array.prototype.indexOf.call(navMenu, this);
    mainPage.forEach(
        function(e, index){
            e.style.display = "none";
            if(index == currentIndex) mainPage[index].style.display = "block";
        }
    );
}

function changeShip(){
    let id = this.id.substring(this.id.length-1);
    let name = document.querySelector("#name" + id).dataset.name;
    let speed = document.querySelector("#speed" + id).dataset.speed;
    let capacity = document.querySelector("#capacity" + id).dataset.capacity;
    document.querySelector("#mainRocket").className="mainRocket-change"+id;
    document.querySelector("#rocket-icon").src = "images/ship" + id + ".svg";
    document.querySelector("#rocket-name").innerHTML = name;
    document.querySelector("#rocket-speed").innerHTML = speed;
    document.querySelector("#rocket-capacity").innerHTML = capacity;
}

function buildRocket() {
    let name = document.querySelector("#rocket-name").innerHTML;
    let speed = document.querySelector("#rocket-speed").innerHTML;
    let capacity = document.querySelector("#rocket-capacity").innerHTML;
    let icon = document.querySelector("#rocket-icon").src
    rocket = new Rocket(name, speed, capacity, icon);
    document.querySelector("#rocket-icon-choose").src= icon;
    document.querySelector("#rocket-name-choose").innerHTML = name;
    document.querySelector("#rocket-speed-choose").innerHTML = speed;
    document.querySelector("#rocket-capacity-choose").innerHTML = capacity;
    shipCapacity = parseInt(capacity, 10);
    ClearTeam();
    ChangeStats('Rocket');  
}

function changeCrew(){
    let icon=this.value;
    let role=this.name;
    if (this.checked) {
        document.querySelector("#"+role+icon).style.display="inline-block";
        crewQuantity+=1;
    }
    else{
        document.querySelector("#"+role+icon).style.display="none";
        crewQuantity-=1;
    }
    crewButton();
}

function crewButton(){
    let crewButton=document.querySelector("#crewButton");
    let bool = false;
    if (crewQuantity===shipCapacity) {
        crewButton.disabled=false;
        crewButton.className="activeButton";
        bool = true;
    }
    else{
        crewButton.disabled=true;
        crewButton.className="inactiveButton";
        bool = false;
    }
    return bool;
}

class Rocket{
    constructor(name, speed, capacity){
        this.name = name;
        this.speed = speed;
        this.teamNumber = capacity;
    }
    launch () {
        document.querySelector('#mainRocket').className+=' rocket-go';
    }
}

class TeamMember{
    constructor(name, icon, role){
        this.name = name;
        this.icon = icon;
        this.role = role;
        this.roleName=RoleNames.get(role);
    }
}

function ClearTeam(){
	document.getElementById("statsCrew").className="stats";
	document.querySelector('#blockCrew').innerHTML='';
}

function ShowTeam(){
	let tempstring='';
	selectedTeam.forEach(function(e){
		tempstring+='<li><span class="leftText '+e.role+'">'+e.roleName+'</span><span class="rightText">'+e.name+'</span></li>'; 
	});
	document.querySelector('#blockCrew').innerHTML=tempstring;
	let temp=document.querySelector('#blockCrew').querySelectorAll('.underline');
	temp[temp.length-1].className='';
}

function WeatherCheck(){
	let tempweather='';
	let place=document.getElementById('verificationPlace').value.trim();
	if (place!=''){
	let url='https://api.openweathermap.org/data/2.5/weather?q='+place+'&appid=28867f40dd391e7ad8706ada68f1cfae';
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {	  
		temperature=data.main.temp-273.15;
		if (data.wind.deg > 350 || data.wind.deg <= 10) direction='С';
		else if (data.wind.deg > 10 && data.wind.deg <= 80) direction='СВ';
		else if (data.wind.deg > 80 && data.wind.deg <= 100) direction='В';
		else if (data.wind.deg > 100 && data.wind.deg <= 170) direction='ЮВ';
		else if (data.wind.deg > 170 && data.wind.deg <= 190) direction='Ю';
		else if (data.wind.deg > 190 && data.wind.deg <= 260) direction='ЮЗ';
		else if (data.wind.deg > 260 && data.wind.deg <= 280) direction='З';
		else if (data.wind.deg > 280 && data.wind.deg <= 350) direction='СЗ';
		else direction='З';
		tempweather='<li><span class="leftText-l">Температура</span><span class="rightText">'+Math.round(temperature)+' °C</span></li>';
		tempweather+='<li><span class="leftText-l">Влажность</span><span class="rightText">'+Math.round(data.main.humidity)+'%</span></li>';
		tempweather+='<li><span class="leftText-l">Ветер</span><span class="rightText">'+Math.round(data.wind.speed)+' м/с, '+direction+'</span></li>';
		ChangeStats('Weather');
		document.getElementById("blockWeather").innerHTML=tempweather;
		document.getElementById("weatherPage").innerHTML='<li><span class="leftText-l">Локация</span><span class="rightText"><input type="text" id="verificationPlace"></span></li>'+tempweather;
    })

  .catch(error => {tempweather='Населённый пункт не найден';
  document.getElementById("blockWeather").innerHTML=tempweather;
  document.getElementById("weatherPage").innerHTML='<li><span class="leftText-l">Локация</span><span class="rightText"><input type="text" id="verificationPlace"></span></li>'+ '<li>'+tempweather+'</li>';
  document.getElementById("statsWeather").className="stats";
  checkStats();})
  
    }
}

function CrewUnification(){
    let i=0;
    selectedTeam = new Map();
    check.forEach(
        function(e){
            if (e.checked) {
                let selectname = e.id;
                let selectrole = e.name;
                let selectid = e.value;
                selectedTeam.set(i,new TeamMember(selectname,selectid,selectrole));
                i+=1;
            }
        });
    ChangeStats('Crew');
    ShowTeam();
}

let weatherUpd = document.querySelector('#weatherUpdate');
weatherUpd.addEventListener('click', () => {
    WeatherCheck(this);
    });

let crewUnic = document.querySelector('#crewButton');
crewUnic.addEventListener('click', () => {
    if (crewButton()) {
        CrewUnification();
    }
});

let launchButton = document.querySelector('#FlyToTheMoon');
launchButton.addEventListener('click', () => {
    if (checkStats()) {
        rocket.launch();
    }
});

