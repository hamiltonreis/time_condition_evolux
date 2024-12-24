// Função para adicionar um novo dia da semana no horário padrão
function addDiaSemana() {
    const container = document.getElementById("dias-semana");
    const novoDia = document.createElement("div");
    novoDia.className = "dia-semana";
    novoDia.innerHTML = `
        <label>Dia da Semana</label>
        <select class="dia-semana-select">
            <option value="segunda">Segunda</option>
            <option value="terça">Terça</option>
            <option value="quarta">Quarta</option>
            <option value="quinta">Quinta</option>
            <option value="sexta">Sexta</option>
            <option value="sábado">Sábado</option>
            <option value="domingo">Domingo</option>
        </select>
        <div class="periodo">
            <label>Início:</label>
            <input type="time" class="hora-inicio" />
            <label>Fim:</label>
            <input type="time" class="hora-fim" />
        </div>
    `;
    container.appendChild(novoDia);
}

// Função para adicionar um novo intervalo de datas
function addIntervalo() {
    const container = document.getElementById("lista-intervalos");
    const novoIntervalo = document.createElement("div");
    novoIntervalo.className = "intervalo";
    novoIntervalo.innerHTML = `
        <label>Data Início</label>
        <input type="date" class="data-inicio">
        <label>Data Fim</label>
        <input type="date" class="data-fim">
        <div class="periodo">
            <label>Início:</label>
            <input type="time" class="hora-inicio" />
            <label>Fim:</label>
            <input type="time" class="hora-fim" />
        </div>
    `;
    container.appendChild(novoIntervalo);
}

// Função para adicionar uma nova data específica
function addDataEspecifica() {
    const container = document.getElementById("lista-datas");
    const novaData = document.createElement("div");
    novaData.className = "data-especifica";
    novaData.innerHTML = `
        <label>Data</label>
        <input type="date" class="data">
        <label>Disponível:</label>
        <select class="disponivel">
            <option value="true">Sim</option>
            <option value="false">Não</option>
        </select>
    `;
    container.appendChild(novaData);
}

// Função para exportar os dados como JSON e exibir em uma pop-up
function exportarJSON() {
    const horarioPadrao = Array.from(document.querySelectorAll(".dia-semana")).map(dia => {
        return {
            dia_semana: dia.querySelector(".dia-semana-select").value,
            periodos: [
                {
                    hora_inicio: dia.querySelector(".hora-inicio").value,
                    hora_fim: dia.querySelector(".hora-fim").value
                }
            ]
        };
    });

    const intervalosDatas = Array.from(document.querySelectorAll(".intervalo")).map(intervalo => {
        return {
            data_inicio: intervalo.querySelector(".data-inicio").value,
            data_fim: intervalo.querySelector(".data-fim").value,
            periodos: [
                {
                    hora_inicio: intervalo.querySelector(".hora-inicio").value,
                    hora_fim: intervalo.querySelector(".hora-fim").value
                }
            ]
        };
    });

    const datasEspecificas = Array.from(document.querySelectorAll(".data-especifica")).map(data => {
        return {
            data: data.querySelector(".data").value,
            disponivel: data.querySelector(".disponivel").value
        };
    });

    const configuracao = {
        horario_padrao: { dias_semana: horarioPadrao },
        intervalos_datas: intervalosDatas,
        datas_especificas: datasEspecificas
    };

    const jsonString = JSON.stringify(configuracao, null, 2);

    // Criar e exibir pop-up com JSON
    const popup = document.createElement("div");
    popup.id = "popup-json";
    popup.innerHTML = `
        <div class="popup-content">
            <h3>JSON Exportado</h3>
            <textarea id="json-output" readonly>${jsonString}</textarea>
            <button onclick="copiarJSON()">Copiar JSON</button>
            <button onclick="fecharPopup()">Fechar</button>
        </div>
    `;
    document.body.appendChild(popup);
}

// Função para copiar JSON para a área de transferência
function copiarJSON() {
    const textarea = document.getElementById("json-output");
    textarea.select();
    document.execCommand("copy");
    alert("JSON copiado para a área de transferência!");
}

// Função para fechar a pop-up
function fecharPopup() {
    const popup = document.getElementById("popup-json");
    if (popup) {
        document.body.removeChild(popup);
    }
}
