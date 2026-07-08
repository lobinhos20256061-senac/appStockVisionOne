/**
* STOCKVISION - BARREIRA DE SEGURANÇA DE AUTENTICAÇÃO (Auth Guard)
* Executa imediatamente para bloquear acessos não autorizados e limpar cache de histórico.
*/
(() => {
    const checkAuth = () => {
        const token = localStorage.getItem('sv_token');
        const activeUser = localStorage.getItem('sv_user');
 
        // Se não houver token ou usuário no armazenamento local, barra o acesso imediatamente
        if (!token || !activeUser) {
            window.location.replace('login.html'); // O 'replace' substitui a página atual no histórico para evitar loops do botão voltar
        }
    };
 
    // 1. Executa imediatamente no carregamento inicial do script
    checkAuth();
 
    // 2. Executa toda vez que a página é exibida (Resolve o bug do botão 'Voltar' do navegador)
    window.addEventListener('pageshow', (event) => {
        // Se a página veio do cache do histórico do navegador, força a revalidação do login
        if (event.persisted) {
            checkAuth();
        }
    });
})();