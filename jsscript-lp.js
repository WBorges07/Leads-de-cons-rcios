import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const formulario = document.getElementById('formLandingPage');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('btnEnviar');
    btn.disabled = true;
    btn.innerText = "Enviando...";

    // Mapeamento dos dados para o formato que seu CRM (esteira/tabela) lê
    const novoLead = {
        nome: document.getElementById('nomeLead').value,
        email: document.getElementById('emailLead').value,
        telefone: document.getElementById('telLead').value,
        bemDesejado: document.getElementById('bemLead').value,
        valorDoBem: parseFloat(document.getElementById('valorLead').value) || 0,
        vendedor: "A definir", 
        situacao: "Lead novo", // Isso faz o card aparecer na primeira coluna da Esteira
        timestamp: Date.now(),
        data: new Date().toLocaleDateString('pt-BR'),
        proximoPrazo: ""
    };

    try {
        // Salva na coleção "clientes" (mesma usada no seu CRM)
        await addDoc(collection(db, "clientes"), novoLead);
        
        alert("Dados enviados com sucesso! Em breve entraremos em contato.");
        formulario.reset();
    } catch (error) {
        console.error("Erro ao integrar com CRM:", error);
        alert("Ocorreu um erro ao enviar. Tente novamente mais tarde.");
    } finally {
        btn.disabled = false;
        btn.innerText = "Quero uma simulação";
    }
});