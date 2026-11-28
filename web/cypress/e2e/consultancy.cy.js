describe('Formulário de Consultoria', () => {
    it('Deve solicitar consultoria individual', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.goTo('Formulários', 'Consultoria')

        cy.get('input[placeholder="Digite seu nome completo"]').type('Fernando Papito')
        cy.get('input[placeholder="Digite seu email"]').type('papito@test.com.br')
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type('11999999999')
            .should('have.value', '(11) 99999-9999') 

        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')
        // XPath::: //span[text()="Pessoa Física"]/..//input 
        /* Também é possivel localizar direto pelo label, cypress permite ler texto das classes filhas, elimnando o parent():
            cy.contains('label', 'Pessoa Jurídica') 
            .find('input')
            .click()
        */ 
        cy.contains('span', 'Pessoa Física')
            .parent()       
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF') // Mais intuitivo localizar pelo label, pois o input não tem placeholder (Ex: input[placeholder="000.000.000-00"])
            .parent()
            .find('input')
            .type('50037876007')
            .should('have.value', '500.378.760-07') // Garantir mascara com acentuação de cpf
        
        const discoveryChannels = [
            'Instagram', 
            'LinkedIn', 
            'Udemy', 
            'YouTube', 
            'Indicação de Amigo'
        ]

        discoveryChannels.forEach((channel) => {
            cy.contains('span', channel)
                .parent()
                .find('input')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/document.pdf', { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Gostaria de receber consultoria para melhorar meu desempenho em testes automatizados.')

        const techs = [
            'Cypress',
            'Playwright',
            'Selenium',
            'TestCafe'
        ]

        techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(`${tech}{enter}`)

            // garantir que a tecnologia foi add na tag, procurando diretamente dentro da div.
            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('button', 'Enviar formulário')
            .click()
        
        cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
            .should('be.visible')
    })

    it.only('Deve verificar os campos obrigatórios', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')
        
        cy.contains('button', 'Enviar formulário')
        .click()

        cy.contains('p', 'Digite nome e sobrenome')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)') // Garantir que a cor do texto é vermelha

        cy.contains('p', 'Informe um email válido')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)') // Garantir que a cor do texto é vermelha

        cy.contains('p', 'Você precisa aceitar os termos de uso')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)') // Garantir que a cor do texto é vermelha
    })

})