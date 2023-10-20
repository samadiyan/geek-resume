
//loading
window.onload = ()=>{
    document.querySelector(".loading").style.opacity = "0"
    setTimeout(()=>{
        document.querySelector(".loading").style.display = "none"
    },850)
}

//menu-side css load
window.scrollTo(0,200)
setTimeout(()=>{
    window.scrollTo(0,0)
},400)

//toggle menu
let toggleIcon = document.querySelector(".toggle-icon")
let toggleCount = 0;
document.getElementById("toggle-menu").addEventListener("click",()=>{
      if(!toggleCount){
        let header = document.getElementById("header")
        header.classList.add("toggle")
        toggleIcon.classList.remove("icon-menu-1")
        toggleIcon.classList.add("icon-close-square")
        toggleCount++
      }else {
        header.classList.remove("toggle")
        toggleIcon.classList.add("icon-menu-1")
        toggleIcon.classList.remove("icon-close-square")
        toggleCount--
      }
})

//menu shine
let shine = document.querySelector(".shine")
document.querySelectorAll(".menu-li").forEach((element) => {
    element.addEventListener("mouseover", () => {
            if(!window.scrollY > 0 && window.innerWidth > 1000){
                shine.style.display = "block"
                let rect = element.getBoundingClientRect()
                shine.style.width = `${rect.width}px`
                shine.style.left = `${rect.left}px`
            }
    })
})
document.getElementById("header").addEventListener("mouseleave", () => {
    shine.style.display = "none"
})

//darkmode
let label = document.querySelector(".check-label")
label.addEventListener("click", () => {
    let checkBox = document.getElementById("night");
    let circle = document.querySelector(".circle").classList
    let sky = document.querySelector(".sky").classList
    //checked to uncheked
    if (checkBox.checked) {
        circle.remove("checked")
        circle.add("not-checked")
        circle.remove("icon-moon")
        circle.add("icon-sun-1")
        sky.add("icon-cloud")
        sky.add("cloud")
        sky.remove("icon-star")
        sky.remove("star")
        document.body.classList.remove("dark-mode")
        localStorage.setItem("mode","light")
    }
    //unchecked to checked
    else {
        circle.add("checked")
        circle.remove("not-checked")
        circle.remove("icon-sun-1")
        circle.add("icon-moon")
        sky.add("icon-star")
        sky.add("star")
        sky.remove("icon-cloud")
        sky.remove("cloud")
        document.body.classList.add("dark-mode")
        document.getElementById("header").style.background = "#dbdbdb52"
        localStorage.setItem("mode","dark")
    }
})
if(localStorage.getItem("mode")){
    if(localStorage.getItem("mode") == "dark"){
        label.click()
    }else{}
}

//menu fixed
document.addEventListener("scroll", () => {
   sideMenu()
   featureCounter()
})
function sideMenu(){
    let scroll = window.scrollY;
    let bodyCheck = document.body.classList
    let header = document.getElementById("header")
    if (scroll > 0 && !bodyCheck.contains("dark-mode")) {
        header.style.background = "#ffffffc9"
        header.style.boxShadow = "0px 0px 8px -5px #002093"
        if(toggleCount){
            header.classList.remove("toggle")
            toggleIcon.classList.add("icon-menu-1")
            toggleIcon.classList.remove("icon-close-square")
            toggleCount--
        }

    } else {
        header.style.background = "#dbdbdb52"
        header.style.boxShadow = "none";
        if(toggleCount){
            header.classList.remove("toggle")
            toggleIcon.classList.add("icon-menu-1")
            toggleIcon.classList.remove("icon-close-square")
            toggleCount--
        }
    }
    if (scroll > 0) {
        document.querySelector("#header").classList.add("side-menu")
    }
    else {
        document.querySelector("#header").classList.remove("side-menu")

    }
}



//features counter
let expireCount = 0
class counting{
    constructor(counts,elem){
        this.counts = counts
        this.elem = elem
    }
    counter(){
        let count = 0
        let myinterval = setInterval(()=>{
            this.elem.innerHTML = `${count} +`
            count++
            if(count > this.counts){
                clearInterval(myinterval)
            }
        },35)
    }
}
function featureCounter(){
      let features = document.querySelector(".features")
      let countElem = document.querySelectorAll(".counter")
      if(window.scrollY + window.innerHeight >= features.offsetTop && !expireCount){
        expireCount++
        countElem.forEach((elem)=>{
            let counterObj = new counting(elem.getAttribute("value"),elem)
            counterObj.counter()
        })
      }
}