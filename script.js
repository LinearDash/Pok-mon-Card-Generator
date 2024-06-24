const url = "https://pokeapi.co/api/v2/pokemon/"
const card = document.getElementById('card')
const button = document.getElementById('button')
const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
};


let getpokeData = () => {

    //Generate a random number from 1 to 150
    let id = (Math.floor(Math.random() * 150) + 1);
    // console.log(id);
    fetch(`${url}${id}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            //store all the required data for convinence 
            let hp = data.stats[0].base_stat;
            let img = data.sprites.other.dream_world.front_default;
            let pokeName = data.name;
            let Attack = data.stats[1].base_stat;
            let Defense = data.stats[2].base_stat;
            let Speed = data.stats[5].base_stat;
            let types = data.types;

            const themeColor = typeColor[data.types[0].type.name];

            card.innerHTML = ` 
            <p class="hp">
            <span>HP</span>
            ${hp}
            </p>
            <img src=${img}>
            <h2 class="pokeName">${pokeName}</h2>
            <div class="types">
            </div>
            <div class="stats">
            <div>
            <h3> ${Attack}</h3>
                <p>Attack</p>
            </div>
            <div>
                <h3>${Defense}</h3>
                <p>Defense</p>
            </div>
            <div>
                <h3>${Speed}</h3>
                <p>Speed</p>
            </div>
            </div>`;

            //function to creat a span for pokemon types
            //essential when there are multiple types
            let appendTypes = (typeArray) => {
                // console.log(typeArray);
                typeArray.forEach(element => {
                    let span = document.createElement("SPAN")
                    span.textContent = element.type.name;
                    document.querySelector(".types").appendChild(span);

                });
            }

            // style the background
            let styleCard = (color) => {
                card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;

            };
            styleCard(themeColor);
            appendTypes(types);
        }

        ).catch()


}

button.addEventListener("click", getpokeData)
