describe('Test for payment initation service with invalid creditor name', () => {

    it('Initate payment with invalid creditor name', () => {
        const body = {
            "amount": 0.01,
            "currencyCode": "EUR",
            "description": "test",
            "bankPaymentMethod": {
                "creditorName": "0",
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
            cy.verifyString(response.body.data, '"bankPaymentMethod.creditorName" length must be at least 3 characters long')
        })
    })
})