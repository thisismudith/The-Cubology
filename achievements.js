var achievements = JSON.parse(localStorage.getItem("cubologyData"))["achievements"];
var ap = parseInt(JSON.parse(localStorage.getItem("cubologyData"))["ap"]);
var achievements_DOM = document.querySelectorAll(".achievement.locked");


function achievement_completed(achievement){
    update("achievements",true,achievement,"completed");
    var points = parseInt(JSON.parse(localStorage.getItem("cubologyData"))["ap"]);
    var achievements = JSON.parse(localStorage.getItem("cubologyData"))["achievements"];
    var ap = points+parseInt(achievements[achievement]["points"]);
    var achievements_DOM = document.querySelectorAll(".achievement.locked");
    update("ap", ap);
    if (home_nav(null,undefined,navigate=false)){
        document.querySelector('.ap-title h1').innerHTML = `Achievements: ${ap}/100 Points`;
        achievements_DOM.forEach(obj => {
            if (obj.querySelector("h4").innerHTML == achievement){
                achievement_retriever(obj);
            }
        }
    )}
    if (confirm(`Whoa!\rYou just unlocked the "${achievement}" achievement!\rGo check it out?`)){
        home_nav('achievements');  
        clickanimation('achievements');
    }
    achievement_checker();        
}


function achievement_retriever(obj){
    obj.classList.remove("locked");
    obj.style.opacity = '1';
    obj.setAttribute("animation", "fadein 2s forwards");
}

function achievement_checker(){ // Check for Completed Achievements and Update
    var achievements = JSON.parse(localStorage.getItem("cubologyData"))["achievements"];
    var completed = [];
    var achievements_DOM = document.querySelectorAll(".achievement.locked");
    var ap = parseInt(JSON.parse(localStorage.getItem("cubologyData"))["ap"]);
    document.querySelector('.ap-title h1').innerHTML = `Achievements: ${ap}/100 Points`;
    achievements_DOM.forEach(obj => {
        for (const [achievement, value] of Object.entries(achievements)){
            let name = obj.querySelector("h4").innerHTML;
            if (name == achievement){
                if (value["completed"]){
                    achievement_retriever(obj);
                    completed.push(achievements[name]);
                    if (obj.hasAttribute("special")){
                        obj.querySelector("h4").innerHTML = achievements[name]["title"];
                        obj.querySelector("p").innerHTML = achievements[name]["desc"];
                        obj.querySelector("img").src = achievements[name]["img"];
                    }
                    obj.setAttribute('title', `${value["points"]} Points | Completed: ${value["completed"]}`);
                }
                if (value["hint_unlocked"]){
                    obj.querySelector('p').innerHTML = value["hint"];
                    obj.setAttribute('title', `${value["points"]} Points | Completed: ${value["completed"]}`);
                }else if (!value["completed"] && !value["hint_unlocked"]){
                    obj.setAttribute("title",`Click to get hint | ${value["points"]} Points | Completed: ${value["completed"]}`);
                }
            }
        }if (completed.length == 9 && !achievements["Easter Bunny"]["completed"]) achievement_completed('Easter Bunny')
    })
}
function achievement_main(){
    var achievements = JSON.parse(localStorage.getItem("cubologyData"))["achievements"];
    var ap = parseInt(JSON.parse(localStorage.getItem("cubologyData"))["ap"]);
    if (['index', '', '#'].includes(document.URL.split("/").at(-1).slice(0,-5)) || document.URL.split("/").at(-1).slice(0,-5).startsWith('#')) document.querySelector('.ap-title h1').innerHTML = `Achievements: ${ap}/100 Points`;
    // Achievement Records
    tab_presses = 0
    $(document).keyup((e) => {
        if (e.key == "Tab"){ // Tab Friend
            tab_presses += 1;
        }else{
            tab_presses = 0;
        }
        if (tab_presses >=5 && !achievements["Tab Friend"]["completed"]){
            // update("achievements",true,"Tab Friend","completed");
            achievements["Tab Friend"]["completed"] = true;
            achievement_completed("Tab Friend");
        }
    })
    
    $(document).keydown((e) => {
        if(((e.key == "F12") || (e.ctrlKey && e.shiftKey && any([e.key=='I', e.key == 'J', e.key == 'C']))) &&  !achievements["The Inspector"]["completed"]){
        achievements["The Inspector"]["completed"] = true;
        achievement_completed("The Inspector");
        }  
    });
    if (document.URL.includes('learn3x3') && !achievements["Hands On"]["completed"]){
        achievements["Hands On"]["completed"] = true;
        achievement_completed("Hands On");
    }
    else if (document.URL.includes('other') && !achievements["Safety First"]["completed"]){
        achievements["Safety First"]["completed"] = true;
        achievement_completed("Safety First");
    }
}

function unlock_hint(elm){
    var achievements = JSON.parse(localStorage.getItem("cubologyData"))["achievements"];
    achievement = elm.querySelector('h4').innerHTML;
    if (elm.classList.contains('locked')){
        if (!achievements[achievement]["hint_unlocked"]){
            let points = parseInt(achievements[achievement]["points"])
            if (confirm(`Are you sure you want to unlock the hint?\rUnlocking the hint will lose 40% (${0.4*points}) points, making the achievement worth ${0.6*points} points!`)){
                update("achievements",0.6*points,achievement,"points");
                update("achievements",true,achievement,"hint_unlocked");
                elm.querySelector('p').innerHTML = achievements[achievement]["hint"];
            }
        }else{
            alert("You have already unlocked the hint for this achievement!");
        }
    }else if (confirm(`You have already unlocked this achievement for ${achievements[achievement]["points"]} points! Go check out the rewards?`)){
        clickanimation('rewards');
    }achievement_checker();
}
function reward_checker(){
    var rewards_DOM = document.querySelectorAll(".reward-claim");
    var ap = JSON.parse(localStorage.getItem("cubologyData"))["ap"];
    var rewards = JSON.parse(localStorage.getItem("cubologyData"))["rewards"];
    rewards_DOM.forEach(reward => {
        if (rewards[reward.getAttribute("points")]["claimed"]){
            reward.classList.add("unlocked");
            reward.innerHTML = "Reward Claimed!";
            reward.setAttribute("onclick",`window.open('${rewards[reward.getAttribute("points")]["reward"]}')`);
            reward.parentElement.setAttribute("custom-title","Reward Unlocked!");
        }else if (ap >= parseInt(reward.getAttribute("points"))){
            reward.classList.add("claim");
            reward.innerHTML = "Claim Reward!";
        }
    })
}
function unlock_reward(elm){
    var ap = JSON.parse(localStorage.getItem("cubologyData"))["ap"];
    var points = parseInt(elm.getAttribute("points"));
    rewards = JSON.parse(localStorage.getItem("cubologyData"))["rewards"];
    if (ap >= points){
        elm.classList = "btn reward-claim unlocked";
        elm.innerHTML = "Reward Claimed!";
        update("rewards",true,points.toString(),"claimed");
        elm.setAttribute("onclick",`window.open('${rewards[points.toString()]["reward"]}')`);
        alert("Reward Claimed!\rYou can now click on the button anytime to access your reward!");
    }else{
        alert(`You don't have enough points!\rPoints: ${ap}\rRequired: ${points}`)
    }
}
