let characters = [];
let current = [];
let comparisons = 0;

fetch("data/characters.json")
.then(r => r.json())
.then(data => {
    characters = data;
    startSort();
});

function startSort() {
    current = [...characters];
    showPair();
}

function showPair() {
    const box = document.getElementById("characters");
    if (current.length < 2) {
        box.innerHTML = "<h2>Ranking terminado</h2>";
        return;
    }

    box.innerHTML = `
    <div class="card">${current[0].name}</div>
    <div class="card">${current[1].name}</div>
    `;
    update();
}

function vote(choice) {
    comparisons++;

    if (choice === "left") {
        current.push(current.shift());
    } else if (choice === "right") {
        let a = current.shift();
        current.splice(1, 0, a);
    } else if (choice === "tie") {
        current.push(current.shift());
    } else if (choice === "skip") {
        current.splice(0, 2);
    }

    showPair();
}

function update() {
    document.getElementById("counter").innerText =
        "Comparaciones: " + comparisons;
}
