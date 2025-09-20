//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema

let amigos = [];

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();
    if (!nome) {
        alert("É necessário preencher o campo com um nome!");
        return;
    }
    if (!amigos.includes(nome)) {
        amigos.push(nome);
        atualizarLista();
        input.value = '';
    }
}

function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

function sortearAmigoSecreto(participantes) {
    if (participantes.length < 2) {
        throw new Error("É necessário pelo menos 2 participantes.");
    }

    let tentativas = 0;
    const maxTentativas = 1000;

    while (tentativas < maxTentativas) {
        let sorteados = [...participantes];
        for (let i = sorteados.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [sorteados[i], sorteados[j]] = [sorteados[j], sorteados[i]];
        }

        let valido = true;
        for (let i = 0; i < participantes.length; i++) {
            if (participantes[i] === sorteados[i]) {
                valido = false;
                break;
            }
        }

        if (valido) {
            const resultado = {};
            for (let i = 0; i < participantes.length; i++) {
                resultado[participantes[i]] = sorteados[i];
            }
            return resultado;
        }

        tentativas++;
    }

    throw new Error("Não foi possível sortear sem repetir. Tente novamente.");
}

function sortearAmigo() {
    try {
        const resultado = sortearAmigoSecreto(amigos); // Corrigido aqui!
        if (!resultado || typeof resultado !== 'object') {
            throw new Error("O sorteio falhou. Tente novamente.");
        }
        const ulResultado = document.getElementById('resultado');
        ulResultado.innerHTML = '';
        for (const [amigo, sorteado] of Object.entries(resultado)) {
            const li = document.createElement('li');
            li.textContent = `${amigo} → ${sorteado}`;
            ulResultado.appendChild(li);
        }
    } catch (e) {
        alert(e.message);
    }
}

function reiniciarLista() {
    amigos = [];
    atualizarLista();
    document.getElementById('resultado').innerHTML = '';
}
