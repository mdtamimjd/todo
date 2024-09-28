getId("showIcon").addEventListener("click",()=>{
    let icon = getId("showIcon");
    let show = getId("password");
    if(icon.innerText === "visibility"){
        icon.innerText = "visibility_off";
        show.setAttribute("type","text")
    }else{
        icon.innerText = "visibility";
        show.setAttribute("type","password")
    }
})
getId("showIconLogin").addEventListener("click",()=>{
    let icon = getId("showIconLogin");
    let show = getId("passwordLogin");
    if(icon.innerText === "visibility"){
        icon.innerText = "visibility_off";
        show.setAttribute("type","text")
    }else{
        icon.innerText = "visibility";
        show.setAttribute("type","password")
    }
})

// section show and hide

getId("loginSectionBtn").addEventListener("click",()=>{
    document.title = "Login page ToDo";
    let registerSection = getId("loginSection").classList.remove("hidden");
    let loginSection = hide("registerSection");

})
getId("registerSectionBtn").addEventListener("click",()=>{
    document.title = "Register page ToDo";
    let registerSection = getId("registerSection").classList.remove("hidden");
    let loginSection = hide("loginSection");

})