const cep = document.querySelector("#cep");
const cidade = document.querySelector("#cidade");
const rua = document.querySelector("#rua");
const modalTamanhoCep = document.querySelector(".modal_tamanhoCEP");
const modalCepInvalido = document.querySelector(".modalCepInvalido");
const btnFecharModal1 = document.querySelector(".btnModal1");
const btnFecharModal2 = document.querySelector(".btnModal2");


cep.addEventListener("change", function () {
    if (cep.value.length !== 8) {
        console.log("Erro: tamanho de Cep inválido");
        tamanhoCepInvalido();
        cidade.value = "";
        rua.value = "";
        return;
    }

    const promiseRetorno = fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

    promiseRetorno.then(function (info) {

        const promiseBody = info.json();

        promiseBody.then(function (body) {
            if (body.erro) {
                console.log("Erro: Cep não localizado.");
                cepInvalido();
                cidade.value = "";
                rua.value = "";
                return;
            }

            cidade.value = body.localidade;
            rua.value = body.logradouro;

        })

    })
})

function tamanhoCepInvalido() {
    modalTamanhoCep.classList.remove("escondido");

    btnFecharModal1.addEventListener("click", () => {
        modalTamanhoCep.classList.add("escondido")
    })
}

function cepInvalido() {
    modalCepInvalido.classList.remove("escondido");

    btnFecharModal2.addEventListener("click", () => {
        modalCepInvalido.classList.add("escondido")
    })
}