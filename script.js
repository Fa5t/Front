let navMenu = document.querySelectorAll(".menuicon");
let content = document.querySelectorAll(".main");

document.addEventListener('DOMContentLoaded', function(){
    content[0].style.display='block';
    
    navMenu.forEach(
        function(e) {
            e.addEventListener("click", showPage);
        }   
    );
});

function showPage(){
    document.querySelector(".clicked").classList.remove("clicked");  
    this.classList.add("clicked");
                    
    let index = Array.prototype.indexOf.call(navMenu, this);
    content.forEach(
        function(e){
            e.style.display = "none";
        }
    );
    content[index].style.display = "block";
}