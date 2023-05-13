describe('Test for payment initation service with invalid currency code', () => {

    it('Initate payment with invalid currency code', () => {
        const body = {
            "amount": 0.01,
            "currencyCode": "ZZZ",
            "description": "test",
            "bankPaymentMethod": {
                "creditorName": "Padėk gatvės vaikams",
                "endToEndId": "1234567890",
                "informationStructured": {
                    "reference": "test"
                },
                "creditorAccount": {
                    "iban": "LT177300010119765165"
                }
            }
        }
        cy.PostAPI('/pis/payment', body).then(function (response) {
            expect(response.status).to.eq(400)
            cy.verifyString(response.body.error.name, 'InvalidPaymentData')
            cy.verifyString(response.body.data, '"currencyCode" contains an invalid value')
        })
    })
})