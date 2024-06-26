const peso = document.querySelector("#peso");
const altura = document.querySelector("#altura");
const calcular = document.querySelector("#calcular");
const limpar = document.querySelector("#limpar");
const resultadoIMC = document.querySelector(".imc");
const situacaoIMC = document.querySelector(".situacao");
const pagCalculo = document.querySelector(".dados-calculadora");
const pagResultado = document.querySelector(".resultado");
const btnVoltar = document.querySelector(".botao-voltar");
const niveis = document.querySelectorAll(
  ".magreza, .normal, .sobrepeso, .obesidade1, .obesidade2, .obesidade3"
);

// função para calcular o IMC
const calcularImc = () => {
  const pesoTotal = Number(peso.value);
  const alturaTotal = parseFloat(altura.value);

  const imc = pesoTotal / (alturaTotal * alturaTotal);
  return imc.toFixed(2);
};

// botão para calcular o IMC
calcular.addEventListener("click", () => {
  calcularImc();
  if (isNaN(calcularImc()) || calcularImc() <= 0) {
    alert("Preencha os campos corretamente!");
    return null;
  } else {
    pagCalculo.style.display = "none";
    pagResultado.style.display = "flex";
    resultadoIMC.style.color = cores[calcularSituacao()];
    resultadoIMC.textContent = calcularImc();
    situacaoIMC.style.color = cores[calcularSituacao()];
    situacaoIMC.textContent = calcularSituacao();
    if (calcularSituacao() === "Abaixo do peso") {
      niveis[0].style.color = cores["Abaixo do peso"];
    } else if (calcularSituacao() === "Peso normal") {
      niveis[1].style.color = cores["Peso normal"];
    } else if (calcularSituacao() === "Sobrepeso") {
      niveis[2].style.color = cores["Sobrepeso"];
    } else if (calcularSituacao() === "Obesidade grau 1") {
      niveis[3].style.color = cores["Obesidade grau 1"];
    } else if (calcularSituacao() === "Obesidade grau 2") {
      niveis[4].style.color = cores["Obesidade grau 2"];
    } else {
      niveis[5].style.color = cores["Obesidade grau 3"];
    }

    setTimeout(() => {
      pagResultado.classList.add("rotacao");
    }, 10);
    setTimeout(() => {
      pagCalculo.classList.remove("voltar");
    }, 1000);
  }
});

// cores dos níveis

// cores das situações
const cores = {
  "Abaixo do peso": "#f1c40f",
  "Peso normal": "#2ecc71",
  Sobrepeso: "#f39c12",
  "Obesidade grau 1": "#e67e22",
  "Obesidade grau 2": "#d35400",
  "Obesidade grau 3": "#c0392b",
};

// função para calcular a situação do IMC
const calcularSituacao = () => {
  const imc = calcularImc();
  if (imc < 18.5) {
    return "Abaixo do peso";
  } else if (imc >= 18.5 && imc <= 24.9) {
    return "Peso normal";
  } else if (imc >= 25 && imc <= 29.9) {
    return "Sobrepeso";
  } else if (imc >= 30 && imc <= 34.9) {
    return "Obesidade grau 1";
  } else if (imc >= 35 && imc <= 39.9) {
    return "Obesidade grau 2";
  } else {
    return "Obesidade grau 3";
  }
};

// botão para limpar valores
limpar.addEventListener("click", () => {
  peso.value = "";
  altura.value = "";
});

// botão para voltar a página de cálculo
btnVoltar.addEventListener("click", () => {
  pagCalculo.style.display = "flex";
  pagResultado.style.display = "none";
  setTimeout(() => {
    pagCalculo.classList.add("voltar");
  }, 10);
  setTimeout(() => {
    pagResultado.classList.remove("rotacao");
  }, 1000);
  peso.value = "";
  altura.value = "";
  niveis.forEach((nivel) => {
    nivel.style.color = "#fff";
  });
});
