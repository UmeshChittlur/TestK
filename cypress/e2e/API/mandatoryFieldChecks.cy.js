describe('Test for payment initation service for mandatory fields', () => {

    it('Initate payment with no currency code', () => {
        const body = {
            "amount": 0.01,
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
            cy.verifyString(response.body.data, '"currencyCode" is required')
        })
    })

    it('Initate payment with no amount', () => {
        const body = {
            "currencyCode": "EUR",
            "description": "test",
            "bankPaymentMethod": {
                "creditorName": "Padėk gatvės vaikams",
                "endToEndId": "1234567890",
                "informationStructured": {
                    "reference": "test"
                },
                "creditorAccount": {
                    "iban": "LT507044060008113345"
                }
            }
        }
        cy.PostAPI('/pis/payment', body).then(function (response) {
            expect(response.status).to.eq(400)
            cy.verifyString(response.body.error.name, 'InvalidPaymentData')
            cy.verifyString(response.body.data, '"amount" is required')
        })
    })

    it('Initate payment with no IBAN', () => {
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

                }
            }
        }
        cy.PostAPI('/pis/payment', body).then(function (response) {
            expect(response.status).to.eq(400)
            cy.verifyString(response.body.error.name, 'InvalidPaymentData')
            cy.verifyString(response.body.data, '"bankPaymentMethod.creditorAccount" must contain at least one of [iban, sortCodeAccountNumber]')
        })
    })
})