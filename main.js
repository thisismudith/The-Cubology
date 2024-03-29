function update(key,value,sub_key=null,sub_sub_key=null){
    data = JSON.parse(localStorage.getItem("cubologyData"));
    if (sub_sub_key){
        data[key][sub_key][sub_sub_key] = value;
    }else if (sub_key){
        data[key][sub_key] = value;
    }else{
        data[key] = value;
    }
    localStorage.setItem("cubologyData",JSON.stringify(data));
} // Updates the localStorage with specific value

function any(iterable) {
    for (var index = 0; index < iterable.length; index++) {
        if (iterable[index]) return true;
    }
    return false;
}

function arraysEqual(a, b, notations=false) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;  
    for (var i = 0; i < a.length; ++i){
        if (!notations){
            if (a[i] !== b[i]) return false;
        }else{
            if (!adjacent_moves(a[i],b[i]) && a[i] !== b[i]) return false;
        } 
    }
    return true;
}
var data = JSON.parse(localStorage.getItem("cubologyData"))
if (data && data["achievements"] && data["rewards"] && data["levels"] && data["ap"] && data["3x3"]){
    if (!(data && Object.keys(data["achievements"]).length == 10 && Object.keys(data["rewards"]).length == 3 && Object.keys(data["levels"]).length == 4 && Object.keys(data["3x3"]).length == 3)){
        console.log('reset')
        reset();
    }
    // Work on other and more page, and also work on feature page images
}else reset();
function reset(){
    localStorage.setItem("cubologyData", JSON.stringify({
        "achievements": {
            "Tab Friend": {"points": 5, "completed": false, "hint_unlocked": false, "hint": "Press <kbd>tab</kbd> 5 times"},
            "Hands On": {"points": 5, "completed": false, "hint_unlocked": false, "hint": "Open <kbd>Learn the 3x3</kbd> page"},
            "Safety First": {"points": 5, "completed": false, "hint_unlocked": false, "hint": "Open <kbd>privacy policy</kbd> section"},
            "Cubing Spirit": {"points": 10, "completed": false, "hint_unlocked": false, "hint": "Redirect to WCA!"},
            "The Inspector": {"points": 10, "completed": false, "hint_unlocked": false, "hint": "Inspect me with your gun!"},
            "The Terminator": {"points": 10, "completed": false, "hint_unlocked": false, "hint": "Escape the cube animation!"},
            "Smart Dev": {"points": 10, "completed": false, "hint_unlocked": false, "hint": "It's a secret function!"},
            "All-Rounder": {"points": 15, "completed": false, "hint_unlocked": false, "hint": "Finish Level 3 in Cube Simulator"},
            "?????": {"points": 15, "completed": false, "hint_unlocked": false, "hint": "Get Scammed!", "title": "Here's Your Free Cube!", "desc": "Get Rickrolled!", "img": "uploads/images/rickastley.png"},
            "Easter Bunny": {"points": 15, "completed": false, "hint_unlocked": false},
        },
        "rewards": {
            20: {"claimed": false, "reward": "https://gitfront.io/r/TheMyth1710/KNCfhmNEkiER/TicTacToe/"},
            50: {"claimed": false, "reward": "https://gitfront.io/r/TheMyth1710/4edPb7MA22Vc/Temporary-Files-Remover/"},
            100: {"claimed": false, "reward": "https://gitfront.io/r/TheMyth1710/WoK6x9GK6sxe/Jarvis/"}
        },
        "ap": 0,
        "levels": {
            0: true, 
            1: false, 
            2: false, 
            3: false
        },
        "3x3": {
            "Cube Notations": false,
            "The Beginner's Method": false,
            "The CFOP Method": false
        }
    }))
}
function clickanimation(id, key='background-color', before='', after='orange', time='1'){
    const obj = document.getElementById(id);
    if (['2x-faster-solutions','3+-different-solutions','straightforward-ui','better-graphs'].includes(id)) before = '#252E51';
    var style = document.createElement("style");
    style.innerHTML = `@keyframes clickanimation{0%{${key}: ${before};}50%{${key}: ${after};}100%{${key}: ${before};}}`;
    document.getElementsByTagName('head')[0].appendChild(style);
    obj.style.animation = `clickanimation ${time}s`;
    let execute = 0
    obj.addEventListener("animationend",()=>{
        obj.style.animation = '';
        if (document.URL.includes('?click=true') && !execute){obj.click(); execute=1};
    })
    if (document.readyState === "complete"){
        obj.scrollIntoView();
    }
    
}

function home_nav(nav=null, start_page = 'index.html', navigate=true){
    args = start_page.slice(0,-5);
    if (start_page == 'index.html'){
        args = ['index','','#'];
    }
    if (navigate){
        if (!args.includes(document.URL.split("/").at(-1).slice(0,-5)) || !document.URL.split("/").at(-1).startsWith("#")){
            window.location = `${start_page}#${nav}`;
        }
    }else{
        if (args.includes(document.URL.split("/").at(-1).slice(0,-5)) || document.URL.split("/").at(-1).startsWith("#"))return true;
    }
}

var navbar = document.querySelector('.navbar');
var lastScrollTop = 0;
document.querySelectorAll('img').forEach((img) => {img.setAttribute('loading', 'lazy')});
document.onscroll = function(){
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop && st > 50){
        navbar.style.visibility = 'hidden'
        navbar.style.animation = '';
        navbar.style.animation = 'popup-navbar 1s forwards'
    } else {
        navbar.style.animation = 'popdown-navbar 1s forwards'
        navbar.style.visibility = 'visible'
    }
    lastScrollTop = st <= 0 ? 0 : st;
}

function displayNavbar(){
    navbar.style.animation = 'popdown-navbar 1s forwards'
    navbar.style.visibility = 'visible'
}
function toggleClass(elem, className){
    if (window.innerWidth <= 991) document.querySelector(".navbar-toggler").click();
    document.querySelectorAll('.dropdown-menu').forEach(drop => {if (drop.id != elem.slice(1)) drop.classList.remove(className)})
    document.querySelector(elem).classList.toggle(className);
    document.addEventListener('keydown', (e)=>{if (e.key == "Escape") document.querySelector(elem).classList.remove(className);})
    window.addEventListener('click', function(e){
        if (document.querySelector(elem).parentElement != e.target && !e.target.classList.contains('new-cube-btn')) document.querySelector(elem).classList.remove(className)
      });
}   

document.querySelectorAll(".dropdown").forEach(dropdown => (dropdown.hasAttribute("toggleClass")) ? dropdown.querySelector("button").setAttribute("onclick", `toggleClass('#${dropdown.querySelector(".dropdown-menu").id}', 'active')`) : "");

function easter(){
    setTimeout(console.log.bind(console, '%cYes, dev! It worked!', 'font-size: 16px'))
    achievement_completed('Smart Dev')
}