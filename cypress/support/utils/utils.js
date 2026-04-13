
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
        cy.get('body').then(($body) => {
            const element = $body.find(locator)
            if (element.length == 0) {
                cy.log(`${stepName} is Successful`)
            } else {
                throw new Error(`${stepName} Failed ${element.text()}`);
            }
        })
    }
}

export const utils = new Utils()