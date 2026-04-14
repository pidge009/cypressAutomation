
export class Utils {

    click(locator) {
        cy.get(locator).then(locator => {
            cy.wrap(locator).click({ force: true })
        })
        return cy.wrap(locator)
    }

    enterText(locator, desiredText) {
        cy.get(locator).then(locator => {
            cy.wrap(locator).clear({ force: true }).type(desiredText)
        })
    }

    explicitWait(value) {
        cy.wait(value)
    }


    verifyStepIsSuccessful(locator, stepName) {
        this.explicitWait(2000)
        return cy.get('body').then(($body) => {
            const element = $body.find(locator)
            if (element.length == 0) {
                cy.log(`${stepName} is Successful`)
                return cy.wrap(true)
            } else {
                cy.log(`${stepName} Failed ${element.text()}`)
                return cy.wrap(false)
            }
        })
    }

    enterTextAndPressEnter(locator, desiredText) {
        cy.get(locator).then(locator => {
            cy.wrap(locator).clear().type(desiredText).type('{enter}')
        })
    }

    hitGET(baseURL , auth_token , searchKey) {
        return cy.request({
            method: 'GET',
            url: `${baseURL}/api/v1/channels/`,
            headers: {
                Authorization: `Token ${auth_token}`
            },
            qs: {
                size: 32,
                page: 1,
                'general_data.title': searchKey,
                sort: '_score:desc',
            }
        }).then((response) => {
            return response
        })
    }
}

export const utils = new Utils()