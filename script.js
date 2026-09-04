// Referencia DOM

const modalOverlay = document.getElementById("modalOverlay");
const btnNovoAgendamento = document.querySelector(".btn-novo-agendamento");
const formAgendamento = document.getElementById("formAgendamento");
const inputDataTopo = document.querySelector(".input-data")

// Dados
let agendamentosPadrao = [
    {
        id: 1,
        tutor: "Fernanda Costa",
        pet: "Thor",
        telefone: "(11) 9 9999-0000",
        servico: "Vacinação",
        data: "2024-01-10",
        hora: "09:00"
    },

    {
        id: 2,
        tutor: "João Souza",
        pet: "Mel",
        telefone: "(11) 9 8888-0000",
        servico: "Corte de Unhas",
        data: "2024-01-10",
        hora: "13:00"
    },

    {
        id: 3,
        tutor: "Pedro Martins",
        pet: "Bella",
        telefone: "(11) 9 7777-0000",
        servico: "Aplicação Anti-pulgas",
        data: "2024-01-10",
        hora: "14:00"
    },

    {
        id: 4,
        tutor: "Juliana Rocha",
        pet: "Simba",
        telefone: "(11) 9 6666-0000",
        servico: "Tosa Higiênica",
        data: "2024-01-10",
        hora: "15:00"
    },

    {
        id: 5,
        tutor: "Camila Santos",
        pet: "Max",
        telefone: "(11) 9 5555-0000",
        servico: "Limpeza de Dentes",
        data: "2024-01-10",
        hora: "20:00"
    }
]

const salvos = localStorage.getItem("agendamentos")
let agendamentos = salvos ? JSON.parse(salvos) : agendamentosPadrao

function renderizarAgendamentos() {
    const listaManha = document.getElementById("lista-manha");
    const listaTarde = document.getElementById("lista-tarde");
    const listaNoite = document.getElementById("lista-noite");

    listaManha.innerHTML = "";
    listaTarde.innerHTML = "";
    listaNoite.innerHTML = "";

    const dataSelecionada = inputDataTopo.value

    const agendamentosFiltrados = agendamentos.filter(function(agendamento) {
        return agendamento.data === dataSelecionada
    })  

    agendamentosFiltrados.sort(function(a,b) {
        return a.hora.localeCompare(b.hora)
    })

    agendamentosFiltrados.forEach(function(agendamento) {

        const html = 
        `
            <li class="agendamento" data-id="${agendamento.id}">
                <span class="horario">${agendamento.hora}</span>
                <strong>${agendamento.pet}</strong> / ${agendamento.tutor}
                <span class="servico">${agendamento.servico}</span>
                <button class="remover">Remover agendamento</button>
            </li>
        `;

        const horaNumero = Number(agendamento.hora.split(":")[0])

        if(horaNumero >= 9 && horaNumero <= 12) {
            listaManha.insertAdjacentHTML("beforeend", html);
        } else if (horaNumero >= 13 && horaNumero <= 18) {
            listaTarde.insertAdjacentHTML("beforeend", html);
        } else {
            listaNoite.insertAdjacentHTML('beforeend', html);
        }
    })
}

function salvarAgendamentos() {
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos))
}
function obterDataDeHoje() {
    const hoje = new Date()
    const ano = hoje.getFullYear()
    const mes = String(hoje.getMonth() + 1).padStart(2, "0")
    const dia = String(hoje.getDate()).padStart(2, "0")

    return `${ano}-${mes}-${dia}`
}

inputDataTopo.addEventListener("change", renderizarAgendamentos)

btnNovoAgendamento.addEventListener("click", () => {
    modalOverlay.classList.add("ativo")
    document.getElementById("tutor").focus()
    document.body.style.overflow = "hidden"

    const dataDeHoje = obterDataDeHoje();
    document.getElementById("data").value = dataDeHoje;
    document.getElementById("data").min = dataDeHoje;
})

modalOverlay.addEventListener("click", (event) => {
    if(event.target === modalOverlay) {
        modalOverlay.classList.remove("ativo")
        document.body.style.overflow = ""
    }
})

document.addEventListener("click", (event) => {
        const botaoRemover = event.target.closest(".remover")

        if(!botaoRemover) {
            return
        }

        const li = botaoRemover.closest(".agendamento")
        const idParaRemover = Number(li.dataset.id)

        agendamentos = agendamentos.filter( agendamento => {
            return agendamento.id !== idParaRemover
        })

        salvarAgendamentos() 
        renderizarAgendamentos()
    })

formAgendamento.addEventListener("submit", (event) => {
    event.preventDefault();

    const tutor = document.getElementById("tutor").value
    const pet = document.getElementById("pet").value
    const telefone = document.getElementById("telefone").value
    const servico = document.getElementById("servico").value
    const data = document.getElementById("data").value
    const hora = document.getElementById("hora").value

    if (!tutor || !pet || !telefone || !servico || !data || !hora) {
        alert("Preencha todos os campos antes de agendar.");
        return
    }

    const horaNumero = Number(hora.split(":")[0])

    const dentroDaManha = horaNumero >= 9 && horaNumero <= 12;
    const dentroDaTarde = horaNumero >= 13 && horaNumero <= 18;
    const dentroDaNoite = horaNumero >= 19 && horaNumero <= 21;

    if(!dentroDaManha && !dentroDaTarde && !dentroDaNoite) {
        alert("Escolha um horário dentro das janelas de atendimento (09h-12h, 13h-18h ou 19h-21h")
        return
    }

    const conflito = agendamentos.some((agendamento) => {
        return agendamento.data === data && agendamento.hora === hora
    })

    if(conflito) {
        alert("Já existe um agendamento nesse horário para essa data.")
        return
    }

    const novoId = agendamentos.length > 0
    ? Math.max(...agendamentos.map(a => a.id)) + 1
    : 1;

    const novoAgendamento = {
        id: novoId,
        tutor: tutor,
        pet: pet, 
        telefone: telefone,
        servico: servico,
        data: data,
        hora: hora
    }

    agendamentos.push(novoAgendamento)
    salvarAgendamentos()
    renderizarAgendamentos()

    modalOverlay.classList.remove("ativo")
    formAgendamento.reset()
    document.body.style.overflow = ""
})

// Chamda Inicial
inputDataTopo.value = obterDataDeHoje()
renderizarAgendamentos()






