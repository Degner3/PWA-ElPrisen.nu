





if(window.innerWidth < 900){
    console.log("more than 700");
    window.location.href = "/index.html"
}
addEventListener("resize", () => {
    console.log("Window Resized");
    if(window.innerWidth < 900){
        console.log("more than 700");
        window.location.href = "/index.html"
    }
})