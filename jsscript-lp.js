import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Seleciona o formulário pelo ID correto do seu HTML
const formulario = document.getElementById('formConsorcio');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Referência ao botão para feedback visual
    const btn = document.getElementById('btnSubmit');
    const originalText = btn.innerText;
    
    // Bloqueia o botão para evitar envios duplos
    btn.disabled = true;
    btn.innerText = "PROCESSANDO...";

    // Captura os valores dos campos
    const nomeLead = document.getElementById('nome').value;
    const interesseLead = document.getElementById('interesse').value;
    const valorNumerico = parseFloat(document.getElementById('range-valor').value) || 0;
    const valorFormatado = document.getElementById('valor-exibido').innerText;

    // Estrutura o objeto EXATAMENTE como o seu CRM espera
    const novoLead = {
        nome: nomeLead,
        email: document.getElementById('email').value,
        telefone: document.getElementById('whatsapp').value,
        bemDesejado: interesseLead,
        valorDoBem: valorNumerico,
        vendedor: "Landing Page", // Identifica a origem no CRM
        situacao: "Lead novo",    // Status que faz cair na primeira coluna da esteira
        timestamp: Date.now(),    // Importante para ordenação na tabela
        data: new Date().toLocaleDateString('pt-BR'),
        proximoPrazo: ""
    };

    try {
        // 1. Salva os dados no Firebase Firestore (Coleção: clientes)
        await addDoc(collection(db, "clientes"), novoLead);
        console.log("Lead salvo com sucesso no CRM!");

        // 2. Tenta enviar para o Formspree em segundo plano (opcional)
        const formData = new FormData(formulario);
        fetch(formulario.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).catch(err => console.log("Formspree ignorado ou erro silencioso"));

        // 3. Prepara a mensagem e abre o WhatsApp
        const mensagemWhatsApp = `Olá! Meu nome é ${nomeLead}. Quero uma proposta para ${interesseLead} no valor de ${valorFormatado}.`;
        const urlWhatsapp = `https://wa.me/5511998884144?text=${encodeURIComponent(mensagemWhatsApp)}`;
        
        window.open(urlWhatsapp, '_blank');

        // 4. Limpa o formulário e redireciona para página de agradecimento
        formulario.reset();
        
        setTimeout(() => {
            window.location.href = 'obrigado.html';
        }, 1000);

    } catch (error) {
        console.error("Erro ao integrar com CRM:", error);
        alert("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.");
        
        // Reativa o botão em caso de erro
        btn.disabled = false;
        btn.innerText = originalText;
    }
});