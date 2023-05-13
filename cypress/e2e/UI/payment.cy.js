describe('Testing payment in demo page using bank option', () => {

    it('End to end tests for bank payment', () => {

        cy.visit(Cypress.env('baseUrl'))
        cy.verifyURL(Cypress.env('baseUrl'))
        cy.acceptHomePageCookies()
        cy.navigateToMenuItems('demo')
        cy.verifyURL('/bank-payment-flows/?country=at&bank=erste%2520bank')
        cy.get("a[data-testid='bank-payments-button").should('contain', 'Bank payment flows')
        cy.get("a[data-testid='visit-demo-page-button']").invoke('removeAttr', 'target').click()
        cy.get("[id='scenario-selection-grid-title']").should('contain', 'Select payment flow')
        cy.selectPaymentMethod("Bank Payment")
        cy.acceptDemoPageCookies()
        cy.verifyURL('/bank-payment/LT')
        cy.verifyRedirectInSuperDomain()
        cy.payButton()
        cy.verifyMandatoryFields()
        cy.enterBankPaymentDetails()
        cy.get("label[for=':rc:']").click()
        cy.get("span[class='_checkbox__container_ycqhz_15']").should('not.be.checked')
        cy.payButton()
        cy.get("div[class*='_container'] span").should('contain', 'You have to agree to the terms and conditions and privacy policy')
        cy.get("div[class*='_container'] span").eq(1).should('have.css', 'color', 'rgb(255, 59, 48)')
        cy.get("span[class='_checkbox__container_ycqhz_15']").click()
        cy.payButton()
        cy.origin('https://login.swedbank.lt', () => {
            cy.visit(Cypress.env('baseUrl'))
        })
        cy.getCookie('kevin-user-has-interacted-with-cookies').should('exist')
    })

})