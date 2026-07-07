let characters = [];
let ranking = [];
let pair = [];
let history = [];
let comparisons = 0;

fetch("data/characters.json")
.then(res => res.json())
.then(data => {
    characters = data;
    ranking = [...characters];
    nextPair();
});

function nextPair() {
    if (ranking.length < 2) {
        finish();
        return;
    }

    pair = [ranking[0], ranking[1]];
    render();
}

function render() {
    document.getElementById("characters").innerHTML = `
        <div class="card">${pair[0].name}</div>
        <div class="card">${pair[1].name}</div>
    `;

    document.getElementById("counter").innerText =
        "Comparaciones: " + comparisons;

    document.getElementById("progress").innerText =
        "Personajes restantes: " + ranking.length;
}

function vote(choice) {
    comparisons++;

    history.push({
        left: pair[0].name,
        right: pair[1].name,
        choice: choice
    });

    if (choice === "right") {
        [ranking[0], ranking[1]] = [ranking[1], ranking[0]];
    }

    if (choice === "skip") {
        ranking.shift();
    }

    if (choice === "tie") {
        ranking.push(ranking.shift());
    }

    nextPair();
}

function finish() {
    document.getElementById("characters").innerHTML =
        "<h2>Ranking generado</h2><pre>" +
        ranking.map((c,i)=>`${i+1}. ${c.name}`).join("\n") +
        "</pre>";
}
