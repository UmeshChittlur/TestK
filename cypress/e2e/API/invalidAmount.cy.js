import Utility from "../../support/Utility"

describe('Test for payment initation service with invalid Bank payment details', () => {

    it('Initate Bank payment with invalid amount', () => {
        const body = {
            "amount": 0.00,
            "currencyCode": "EUR",
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
            Utility.setValue('paymentId', response.body.id)
            cy.verifyString(response.body.error.name, 'InvalidPaymentData')
            cy.verifyString(response.body.data, '"amount" must be greater than or equal to 0.01')

        })
    })

    it('Verify invalid Bank payment is not successful', () => {
        cy.GetAPI('/pis/payment/' + Utility.getValue('paymentId')).then(function (response) {
            expect(response.status).to.eq(400)
            cy.verifyString(response.body.error.name, 'InvalidPaymentId')
        })
    })

    it('Verify Bank payment status is invalid', () => {
        cy.GetAPI('/pis/payment/' + Utility.getValue('paymentId') + '/status').then(function (response) {
            expect(response.status).to.eq(400)
            cy.verifyString(response.body.error.name, 'InvalidPaymentId')
        })
    })

    it('Initate Bank payment refund on invalid payment', () => {
        const body = {
            "amount": 0.01
        }
        cy.PostAPI('/pis/payment/' + Utility.getValue('paymentId') + '/refunds', body).then(function (response) {
            expect(response.status).to.eq(400)
            cy.verifyString(response.body.error.name, 'InvalidPaymentId')
        })
    })

    it('Verify Bank payment refund on invalid payment', () => {
        cy.GetAPI('/pis/payment/' + Utility.getValue('paymentId') + '/refunds').then(function (response) {
            expect(response.status).to.eq(400)
            cy.verifyString(response.body.error.name, 'InvalidPaymentId')
        })
    })
})