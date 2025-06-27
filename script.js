document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saude-btn').addEventListener('click', () => mostrarCategoria('saude'));
    document.getElementById('dieta-btn').addEventListener('click', () => mostrarCategoria('dieta'));
    document.getElementById('treino-btn').addEventListener('click', () => mostrarCategoria('treino'));
    document.getElementById('tmb-btn').addEventListener('click', () => mostrarCategoria('tmb'));
    document.getElementById('tmb-form').addEventListener('submit', calcularTMB);
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

function mostrarCategoria(cat) {
    document.querySelectorAll('.categoria').forEach(sec => sec.classList.remove('active'));
    document.getElementById(cat).classList.add('active');
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
    switch(cat) {
        case 'saude': document.getElementById('saude-btn').classList.add('active'); break;
        case 'dieta': document.getElementById('dieta-btn').classList.add('active'); break;
        case 'treino': document.getElementById('treino-btn').classList.add('active'); break;
        case 'tmb': document.getElementById('tmb-btn').classList.add('active'); break;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function calcularTMB(event) {
    event.preventDefault();
    const sexo = document.getElementById('sexo').value;
    const idade = parseInt(document.getElementById('idade').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const atividade = parseFloat(document.getElementById('atividade').value);
    let tmb = 0;
    if (sexo === "masculino") {
        tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
    } else if (sexo === "feminino") {
        tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
    }
    const manutencao = Math.round(tmb * atividade);
    const ganhoMuscular = Math.round(manutencao * 1.15);
    const perdaGordura = Math.round(manutencao * 0.85);
    document.getElementById('tmb-resultado').innerHTML = `
        <div class="results-grid">
            <div class="result-card">
                <div class="result-label">Taxa Metabólica Basal</div>
                <div class="result-value">${Math.round(tmb)} kcal</div>
                <div>Calorias em repouso</div>
            </div>
            <div class="result-card">
                <div class="result-label">Manutenção</div>
                <div class="result-value">${manutencao} kcal</div>
                <div>Para manter peso</div>
            </div>
            <div class="result-card">
                <div class="result-label">Ganho Muscular</div>
                <div class="result-value">${ganhoMuscular} kcal</div>
                <div>Superávit calórico</div>
            </div>
            <div class="result-card">
                <div class="result-label">Perda de Gordura</div>
                <div class="result-value">${perdaGordura} kcal</div>
                <div>Déficit calórico</div>
            </div>
        </div>
        <div class="info-box" style="margin-top: 1.5rem;">
            <p><i class="fas fa-info-circle"></i> Para ganho muscular, consuma ${ganhoMuscular} kcal/dia com 2g de proteína/kg. Para perda de gordura, consuma ${perdaGordura} kcal/dia mantendo alta ingestão proteica.</p>
        </div>
    `;
}
