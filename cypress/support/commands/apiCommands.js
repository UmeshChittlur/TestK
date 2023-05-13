Cypress.Commands.add('PostAPI', (apiurl, body) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('apiUrl') + apiurl,
        failOnStatusCode: false,
        headers: {
            'Client-Id': '84178c6f-15d8-4f68-9f04-b349fc7ec48a',
            'Client-Secret': '31a2055a5a47764c3ad25a54b3c1311f85d341f9db971b1054716f300b49b51f',
            'Redirect-URL': 'https://yourapp.com/callback',
            'Content-Type': 'application/json',
            'Webhook-URL': 'https://yourapp.com/notify'

        },
        body
    }).then(function (response) {
        cy.log(JSON.stringify(response.body))
        cy.wrap(response)
    })
})

Cypress.Commands.add('GetAPI', (apiurl) => {
    cy.request({
        method: 'GET',
        url: Cypress.env('apiUrl') + apiurl,
        failOnStatusCode: false,
        headers: {
            'Client-Id': '84178c6f-15d8-4f68-9f04-b349fc7ec48a',
            'Client-Secret': '31a2055a5a47764c3ad25a54b3c1311f85d341f9db971b1054716f300b49b51f',
            'Content-Type': 'application/json',
            'PSU-IP-Address': '123.123.123.123',
            'PSU-User-Agent': 'PostmanRuntime/7.22.0',
            'PSU-IP-Port': '1337',
            'PSU-Http-Method': 'POST',
            'PSU-Device-ID': '8fc93f50-95fb-4ea0-9ea1-edb7fefcbc69'
        },
    }).then(function (response) {
        cy.wrap(response)
    })
})
