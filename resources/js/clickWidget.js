let button = document.getElementById("clicker");

button.addEventListener("click", async function() {
    const response = await fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const results = await response.json();
        button.innerText = results["clickCount"];
    }
});

var intervalID = window.setInterval(clickerCallback, 1000);

async function clickerCallback() {
    const response = await fetch("/api/click");
    const results = await response.json();

    button.innerText = results["clickCount"];
}