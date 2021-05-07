    // Code for changing Theme
    var isLight = false;

    function toLight() {
        isLight = true;
        document.querySelector(".theme").style.animation = "rotateRight .2s linear";
        document.querySelector(".theme").setAttribute("src", "assets/night-mode.svg");
        document.body.style.background = "var(--main-bg-light)";
        document.body.style.color = "var(--text-light)";
        document.querySelector("#loading").style.borderLeft = "2px solid #000";
        document.querySelector(".center").style.background = "var(--center-bg-light)";
        document.querySelector("h1").classList.replace("text-white", "text-dark");
        document.querySelector("h2").classList.replace("text-white","text-dark");
        document.querySelectorAll("HR").forEach(function(element) {
            element.style.background = "#000";
        });
        document.querySelector("#footer").style.background = "var(--main-bg-light)";
        document.querySelector("#footer").style.color = "var(--text-light)";
        document.querySelector(".theme").style.border = "2px dashed #ff0095";
    }

    function toDark(){
        isLight = false;
        document.querySelector(".theme").style.animation = "rotateLeft .2s linear";
        document.querySelector(".theme").setAttribute("src", "assets/brightness.svg");
        document.body.style.background = "var(--main-bg-dark)";
        document.body.style.color = "var(--text-dark)";
        document.querySelector("#loading").style.borderLeft = "2px solid rgb(156, 169, 209)";
        document.querySelector(".center").style.background = "var(--center-bg-dark)";
        document.querySelector("h1").classList.replace("text-dark", "text-white");
        document.querySelector("h2").classList.replace("text-dark","text-white");
        document.querySelector("hr").style.background = "#fff";
        document.querySelector("#footer").style.background = "var(--main-bg-dark)";
        document.querySelector("#footer").style.color = "var(--text-dark)";
        document.querySelector(".theme").style.border = "2px dashed #00ffe5 ";
    }
 
    function changeTheme(){
        if(isLight == false){
            toLight();
        }else{
            toDark();
        }
    }
