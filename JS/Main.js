


if(window.innerWidth > 950){
    console.log("more than 700");
    window.location.href = "/dashboard.html"
}
addEventListener("resize", () => {
    console.log("Window Resized");
    if(window.innerWidth > 950){
        console.log("more than 700");
        window.location.href = "/dashboard.html"
    }
});