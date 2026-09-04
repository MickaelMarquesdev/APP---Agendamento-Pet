# 🐾 Mundo Pet

Aplicação de agenda para um pet shop, desenvolvida como projeto prático do módulo de JavaScript da trilha **Full-Stack da Rocketseat**. Permite visualizar, criar e remover agendamentos de atendimento, organizados por período do dia (Manhã, Tarde e Noite).

## ✨ Funcionalidades

- 📅 **Visualização por data** — a agenda exibe os agendamentos do dia selecionado, com a data atual pré-selecionada automaticamente
- 🕐 **Agrupamento por período** — os atendimentos são organizados automaticamente em Manhã (09h-12h), Tarde (13h-18h) e Noite (19h-21h), ordenados cronologicamente
- ➕ **Novo agendamento** — modal com formulário para cadastrar tutor, pet, telefone, serviço, data e hora
- 🗑️ **Remoção de agendamento** — exclusão imediata de qualquer atendimento da lista
- ✅ **Validações**:
  - Campos obrigatórios, com mensagens nativas do navegador
  - Horário restrito às janelas de atendimento válidas
  - Prevenção de conflito: bloqueia dois agendamentos na mesma data e horário
  - Bloqueio de datas anteriores ao dia atual no seletor de data
- 💾 **Persistência local** — os agendamentos são salvos no `localStorage` do navegador, permanecendo salvos mesmo após fechar a página
- ♿ **Acessibilidade do modal** — foco automático no primeiro campo ao abrir, bloqueio do scroll de fundo, e fechamento ao clicar fora da caixa

## 🛠️ Tecnologias

- **HTML5** — estrutura semântica da página
- **CSS3** — estilização com variáveis (custom properties), Flexbox, pseudo-classes (`:hover`, `:focus`) e pseudo-elementos
- **JavaScript (Vanilla)** — toda a lógica de interação, manipulação do DOM, validação e persistência de dados, sem uso de frameworks ou bibliotecas

## 🎨 Design

O layout foi desenvolvido a partir de um protótipo no Figma, seguindo um design system com paleta de cores, tipografia (Inter e Inter Tight) e componentes reutilizáveis (botões, campos de texto, cards de lista).

## 🚀 Como executar o projeto

Não é necessário nenhuma instalação ou dependência — é um projeto 100% front-end estático.

1. Clone o repositório:
   ```bash
   git clone https://github.com/MickaelMarquesdev/mundo-pet.git
   ```
2. Entre na pasta do projeto:
   ```bash
   cd mundo-pet
   ```
3. Abra o arquivo `index.html` diretamente no navegador, ou utilize uma extensão como o **Live Server** (VS Code) para servir o projeto localmente.

## 📁 Estrutura do projeto

```
mundo-pet/
├── index.html      # Estrutura da página (agenda + modal)
├── style.css       # Estilização (variáveis, layout, componentes)
├── script.js       # Lógica da aplicação (dados, renderização, eventos)
└── assets/         # Ícones e imagens utilizados na interface
```

## 🧠 Principais conceitos aplicados

- Manipulação do DOM (`querySelector`, `getElementById`, `insertAdjacentHTML`)
- Delegação de eventos (`event.target.closest()`) para elementos criados dinamicamente
- Métodos de array de alta ordem: `filter`, `map`, `sort`, `some`, `forEach`
- Persistência de dados com `localStorage` e `JSON.stringify`/`JSON.parse`
- Renderização declarativa: a interface é sempre redesenhada a partir de uma única fonte de dados (o array `agendamentos`)

---

Feito com 🐾 por MIckael Marques
