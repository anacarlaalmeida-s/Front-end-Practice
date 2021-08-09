const inputNomeOuId = document.querySelector("#nomeOuId");
const nomePokemon = document.querySelector(".nomePokemon");
const habilidadesPokemon = document.querySelector(".habilidadesPokemon");
const imagemPokemon = document.querySelector(".imagemPokemon");
const pokeBolaAberta = document.querySelector(".pokebolaAberta");
const pokeBolaFechada = document.querySelector(".pokebolaFechada");

inputNomeOuId.addEventListener("change", function () {

    const promiseResposta = fetch(`https://pokeapi.co/api/v2/pokemon/${inputNomeOuId.value.toLowerCase()}/`);

    promiseResposta.then(function (resposta) {
        if (!resposta.ok) {
            console.log("ERRO");
            nomePokemon.textContent = "Pokemon não localizado!";
            pokeBolaFechada.classList.remove("escondido");
            pokeBolaAberta.classList.add("escondido");
            habilidadesPokemon.textContent = "";
            imagemPokemon.src = "";
            return;
        };

        const promiseRetorno = resposta.json();

        promiseRetorno.then(function (body) {
            pokeBolaFechada.classList.add("escondido");
            pokeBolaAberta.classList.remove("escondido");

            const nome = body.name.slice(0, 1).toUpperCase() + body.name.slice(1);
            nomePokemon.textContent = nome;

            const habilidades = [];
            for (let item of body.moves) {
                habilidades.push(item.move.name)
            }
            habilidadesPokemon.textContent = "Skills: " + habilidades;

            imagemPokemon.src = body.sprites.front_default;

        });
    });
})
