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

document.addEventListener('DOMContentLoaded', function(){
    mainPage[0].style.display='block';
    
    navMenu.forEach(
        function(e) {
            e.addEventListener("click", showPage);
        }   
    );

    radioButton.forEach(
        function(e) {
            e.addEventListener("click", changeShip);
        });

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
}

function showPage(){
    document.querySelector(".clicked").classList.remove("clicked");  
    this.classList.add("clicked");
                    
    let index = Array.prototype.indexOf.call(navMenu, this);
    mainPage.forEach(
        function(e){
            e.style.display = "none";
        }
    );
    mainPage[index].style.display = "block";
}

function changeShip(){
    let id = this.id.substring(this.id.length-1);
    let name = document.querySelector("#name" + id).dataset.name;
    let speed = document.querySelector("#speed" + id).dataset.speed;
    let capacity = document.querySelector("#capacity" + id).dataset.capacity;
    shipCapacity = capacity;
    document.querySelectorAll(".ship").forEach(
            function(e){
                e.querySelector("#rocket-icon").src = "images/ship" + id + ".svg";
                e.querySelector("#rocket-name").innerHTML = name;
                e.querySelector("#rocket-speed").innerHTML = speed;
                e.querySelector("#rocket-capacity").innerHTML = capacity;
            });
    crewButton();
}

function buildRocket() {
    let name = document.querySelector("#rocket-name").innerHTML;
    let speed = document.querySelector("#rocket-speed").innerHTML;
    let capacity = document.querySelector("#rocket-capacity").innerHTML;
    let icon = document.querySelector("#rocket-icon").src;
    let rocket = new Rocket(name, speed, capacity, icon);
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
    if (crewQuantity===shipCapacity) {
        crewButton.disabled=false;
        crewButton.className="activeButton";
    }
    else{
        crewButton.disabled=true;
        crewButton.className="inactiveButton";
    }
}

class Rocket{
    constructor(name, speed, capacity, icon){
        this.name = name;
        this.speed = speed;
        this.teamNumber = capacity;
        this.icon = icon;
    }
}

class TeamMember{
    constructor(name, icon, role){
        this.name = name;
        this.icon = icon;
        this.role = role;
    }
}