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
    })
})