const submit =document.getElementById("submit");
const thanks = document.getElementById("thanks");
const feed = document.getElementById("feed");
submit.addEventListener("submit",()=>{
    event.preventDefault();
    thanks.style.display = "block";
    feed.style.display = "none";
});