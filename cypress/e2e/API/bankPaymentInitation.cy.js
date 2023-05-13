import Utility from "../../support/Utility"

describe('Test for payment initation service for bank payment method', () => {

    it('Initate payment for Bank', () => {
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
                    "iban": "LT177300010119765165"
                }
            }
        }
        cy.PostAPI('/pis/payment', body).then(function (response) {
            expect(response.status).to.eq(200)
            Utility.setValue('paymentId', response.body.id)
        })
    })

    it('Verify Bank payment initated', () => {
        cy.GetAPI('/pis/payment/' + Utility.getValue('paymentId')).then(function (response) {
            expect(response.status).to.eq(200)
        })
    })

    it('Verify Bank payment status', () => {
        cy.GetAPI('/pis/payment/' + Utility.getValue('paymentId') + '/status').then(function (response) {
            expect(response.status).to.eq(200)
            cy.verifyString(response.body.bankStatus, 'STRD')
        })
    })

    it('Initate Bank payment refund', () => {
        const body = {
            "amount": 0.01
        }
        cy.PostAPI('/pis/payment/' + Utility.getValue('paymentId') + '/refunds', body).then(function (response) {
            expect(response.status).to.eq(400)
            cy.verifyString(response.body.error.name, 'PaymentMustBeCompleted')
        })
    })

    it('Verify Bank payment refund', () => {
        cy.GetAPI('/pis/payment/' + Utility.getValue('paymentId') + '/refunds').then(function (response) {
            expect(response.status).to.eq(200)
            expect(response.body.data.length).to.equal(0)
        })
    })
})