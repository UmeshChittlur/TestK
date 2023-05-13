describe('Test for payment initation service with invalid IBAN', () => {

    it('Initate payment with invalid IBAN', () => {
        const body = {
            "amount": 0.01,
            "currencyCode": "EUR",
            "description": "test",
            "bankPaymentMethod": {
                "creditorName": "Padėk gatvės vaikams",
                "endToEndId": "1234567890",
                "informationStructured": {
                    "reference": "test"
                },
                "creditorAccount": {
                    "iban": "LT177300010119765165123"
                }
            }
        }
        cy.PostAPI('/pis/payment', body).then(function (response) {
            expect(response.status).to.eq(400)
            cy.verifyString(response.body.error.name, 'CreditorIbanNotAllowed')
            cy.verifyString(response.body.error.description, 'Creditor iban is not allowed.')
        })
    })
})