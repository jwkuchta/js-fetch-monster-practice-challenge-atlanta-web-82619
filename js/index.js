const url = `http://localhost:3000/monsters`
const monsterCont = document.querySelector("#monster-container")
const createMonsterDiv = document.querySelector("#create-monster")
const back = document.querySelector("#back")
const fwd = document.querySelector("#forward")
let page

fetchMonsters()
createMonsterForm()

function fetchMonsters() {
    page = 1
    fetch("http://localhost:3000/monsters/?_limit=30&_page=1", {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }).then(resp => resp.json()).then(monsters => {
        monsters.forEach(monster => renderMonster(monster))
    })
}

function renderMonster(monster) {
    let div = document.createElement("div")
    let h2 = document.createElement("h2")
    h2.innerText = monster.name
    let h4 = document.createElement("h4")
    h4.innerText = monster.age
    let p = document.createElement("p")
    p.innerText = monster.description
    div.append(h2, h4, p)
    monsterCont.appendChild(div)
}

back.addEventListener("click", prevPage)
fwd.addEventListener("click", nextPage)

function prevPage() {
    page--
    monsterCont.innerHTML = ''
    fetch(`${url}/?_limit=30&_page=${page}`)
        .then(resp => resp.json())
        .then(monsters => monsters.forEach(monster => renderMonster(monster)))
}

function nextPage() {
    page++
    monsterCont.innerHTML = ''
    fetch(`${url}/?_limit=30&_page=${page}`)
        .then(resp => resp.json())
        .then(monsters => monsters.forEach(monster => renderMonster(monster)))
}

createMonsterDiv.addEventListener("submit", e => {
    e.preventDefault()
    console.log(e.target)
    let nameField = document.querySelector("#name")
    let ageField = document.querySelector("#age")
    let descrField = document.querySelector("#description")
    return fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({name: nameField.value, age: parseInt(ageField.value), description: descrField.value})
    }).then(resp => resp.json()).then(monster => console.log(monster))
})

function createMonsterForm() {
    let form = document.createElement("form")
    form.id = "monster-form"
    let name = document.createElement("input")
    name.id = "name"
    name.placeholder = "name..."
    let age = document.createElement("input")
    age.id = "age"
    age.placeholder = "age..."
    let descr = document.createElement("input")
    descr.id = "description"
    descr.placeholder = "description..."
    let createButton = document.createElement("button")
    createButton.innerText = "Create"
    form.append(name, age, descr, createButton)
    createMonsterDiv.appendChild(form)
}

