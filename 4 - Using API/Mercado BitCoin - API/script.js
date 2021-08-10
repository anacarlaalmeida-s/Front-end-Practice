const inputCriptomoeda = document.querySelector("#criptomoeda");
const maxValor = document.querySelector(".maior_valor");
const quantidade = document.querySelector(".quantidade");
const maxOferta = document.querySelector(".maior_oferta");


inputCriptomoeda.addEventListener("change", function () {
    if (!inputCriptomoeda.value) {
        return;
    }
    if(inputCriptomoeda.value === "none"){
        maxValor.classList.add("escondido");
        quantidade.classList.add("escondido");
        maxOferta.classList.add("escondido");

    }

    const promiseResposta = fetch(`https://www.mercadobitcoin.net/api/${inputCriptomoeda.value}/ticker/`);

    promiseResposta.then(function (resposta) {
        const promiseRetorno = resposta.json();

        promiseRetorno.then(function (body) {
            maxValor.classList.remove("escondido");
            maxValor.textContent = Number(body.ticker.high).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            quantidade.classList.remove("escondido");
            quantidade.textContent = Number(body.ticker.vol).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            maxOferta.classList.remove("escondido");
            maxOferta.textContent = Number(body.ticker.buy).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        });
    });
});