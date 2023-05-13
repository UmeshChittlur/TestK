Cypress.Commands.add('navigateToMenuItems', (menuItem) => {
    cy.get("li[data-testid='navbar-" + menuItem + "']").click()
})

Cypress.Commands.add('verifyURL', (currentURL) => {
    cy.url().should('include', currentURL)
})

Cypress.Commands.add('verifyMandatoryFields', () => {
    cy.get("span[class='_wrapper_1ucqt_1']").first().should('contain', 'Please enter amount')
    cy.get("span[class='_wrapper_1ucqt_1']").eq(1).should('contain', 'Please enter email')
    cy.get("div[role='radiogroup']").eq(1).siblings("span[role='alert']").should('contain', 'Please choose your bank')
    cy.get("div[class*='_container'] span").should('contain', 'You have to agree to the terms and conditions and privacy policy')
})

Cypress.Commands.add('selectPaymentMethod', (paymentOption) => {
    switch (paymentOption) {
        case "Bank Payment":
            cy.get("a[data-testid='bank-payment-btn']").click()
            cy.get("[data-testid='page-headline']").should('contain', 'Bank Payment')
            break;
        case "Card Redirect":
            cy.get("a[data-testid='card-redirect-btn']").click()
            cy.get("[data-testid='page-headline']").should('contain', 'Card Redirect')
            break;
        case "Payment Link":
            cy.get("a[data-testid='payment-link-btn']").click()
            cy.get("[data-testid='page-headline']").should('contain', 'Payment Link')
            break;
    }
})

Cypress.Commands.add('enterBankPaymentDetails', () => {
    cy.get("input[data-testid='amount-input']").type(Cypress.env('amount'))
    cy.get("input[data-testid='email-input']").type(Cypress.env('email'))
})

Cypress.Commands.add('payButton', () => {
    cy.get("button[class*='_primary']").click()
})

Cypress.Commands.add('acceptHomePageCookies', () => {
    cy.get("button[data-testid='CookieBanner-accept-all']").click()
})

Cypress.Commands.add('acceptDemoPageCookies', () => {
    cy.get("button[class*='secondary']").click()
})

Cypress.Commands.add('verifyString', (actualString, expectedString) => {
    expect(actualString).to.be.eq(expectedString)
})

Cypress.Commands.add('verifyRedirectInSuperDomain', () => {
    cy.intercept({
        method: 'GET',
        url: 'banks?countryCode=LT'
    }).as('redirectResponse')
    cy.wait('@redirectResponse').then(($resp) => {
        expect($resp.response.body.data[0].scaApproaches.AIS[0]).to.include("REDIRECT")
    })
})

