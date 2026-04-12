
export class Utils {
    generateEmailid(length, serverID ) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        result = result + "_" + "automation" + "@" + serverID + ".mailosaur.net"
        return result;
    }

    
    verifyText(loacator, expectedValue) {
        cy.get(loacator).invoke('text').then(text => {
            expect(text).to.equal(expectedValue)
        })
    }

    verifyvalue(locator, expectedValue) {
        cy.get(locator).invoke('attr', 'value').then(text => {
            expect(text).to.equal(expectedValue)
        })
    }

    verifyclass(locator, expectedValue) {
        cy.get(locator).invoke('attr', 'class').then(text => {
            expect(text).to.equal(expectedValue)
        })
    }

    verifyContainsText(loacator, expectedValue) {
        cy.get(loacator).invoke('text').then(text => {
            expect(text).contains(expectedValue)
        })
    }

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

    enterTextAndPressEnter(locator, desiredText) {
        cy.get(locator).then(locator => {
            cy.wrap(locator).clear().type(desiredText).type('{enter}')
        })
    }

    selcetCountry(locator, countryName) {
        cy.get(locator).then(locator => {
            cy.wait(2000)
            cy.wrap(locator).clear().type(countryName).type('{downarrow}').type('{enter}')
        })
    }

    selectCheckbox() {
        cy.get('[type="checkbox"]').then(checkbox => {
            cy.wrap(checkbox).check({ force: true })
        })
    }

    verifyCSSValue(locator, cssAttr, expectedValue) {
        cy.get(locator).then(locator => {
            cy.wrap(locator).should('have.css', cssAttr, expectedValue)
        })
    }

    selectValueFromDropdown(locator, value) {
        cy.get(locator).then(locator => {
            cy.wrap(locator)
                .find('li')
                .each(listItem => {
                    const listItemText = listItem.text()
                    if (listItemText == value) {
                        cy.wrap(listItem).click()
                    }
                })
        })
    }

    selectradiobuttonUsingTextValue(locator, value){
        cy.get(locator).contains(value)
        .then(locator => {
            cy.wrap(locator)
                .find('[type="radio"]')
                .check({ force: true })
                .should('be.checked')
        })
    }

    acceptCookies() {
        cy.get('body').then(($body) => {
            if ($body.text().includes('Accept All Cookies')) {
                utils.clickwithText('Accept')
            }
        })
    }

    clickwithText(locator) {
        cy.contains(locator).then(locator => {
            cy.wrap(locator).click()
        })
        return cy.wrap(locator)
    }

    clickOutside() {
        cy.clickOutside()
    }

    confirmCaptcha() {
        cy.confirmCaptcha()
    }

    explicitWait(value) {
        cy.wait(value)
    }

    enterCCDetails(creditCardNo, CCValidity, CVC, Zip) {
        cy.get(".__PrivateStripeElement > iframe").then(($element) => {
            const $body = $element.contents().find("body");

            let stripe = cy.wrap($body);
            stripe
                .find('[name="cardnumber"]')
                .click()
                .type(creditCardNo);

            stripe = cy.wrap($body);
            stripe
                .find('[name="exp-date"]')
                .click()
                .type(CCValidity);

            stripe = cy.wrap($body);
            stripe
                .find('[name="cvc"]')
                .click()
                .type(CVC);

            stripe = cy.wrap($body);
            stripe
                .find('[name="postal"]')
                .click()
                .type(Zip);
        })
    }

    navigateToOnboradingURL(registrationReqObject, eventName) {
        cy.get(registrationReqObject)
            .then(applicationID => {
                cy.getLocalStorage('auth_token')
                    .then(token => {
                        let appId = applicationID.response.body.data.applicationId
                        this.genrateInvitationLink('AUTH_SERVICE_HOST', token, appId)
                            .then(url => {
                                cy.clearCookies()
                               if(eventName=='bett'){
                                cy.forceVisit(url.body.data.invitationLink)
                               }
                               else if(eventName=='autumnfair'){
                                cy.forceVisit(Cypress.env('AUTUMNFAIR_BASE_URL') +'onboarding')
                               }
                                
                        })

                    })
            })
    }


    genrateInvitationLink(BaseUri, token, applicationID) {
        return cy.request({
            method: 'POST',
            url: Cypress.env(BaseUri) + '/api-authentication/user/invite',
            failOnStatusCode: false,
            headers: { 'Content-Type': 'application/json' },
            auth: {
                'bearer': token
            },
            body: {
                "applicationId": applicationID
            }
        }).then((response) => {
            return response
        })
    }

    generateAuthToken() {
        cy.clearCookies()
        return cy.request({
            method: 'POST',
            url: Cypress.env('AUTH0_BASE_URL') + 'oauth/token',
            failOnStatusCode: false,
            headers: { 'Content-Type': 'application/json' },
            body: {
                client_id: Cypress.env('M2M_CLIENT_ID'),
                client_secret: Cypress.env('M2M_CLIENT_SECRET'),
                grant_type: Cypress.env('M2M_GRANT_TYPE'),
                audience: Cypress.env('AUTH0_BASE_URL') + 'api/v2/',
            },
        }).then((response) => {
            return response
        })
    }

    clickGetStarted() {
        utils.clickwithText('Get started')
    }

    clickViewProfile() {
        utils.clickwithText('View profile')
    }

    clickSubmit() {
        utils.clickwithText('Submit')
    }

    logOut(eventName) {
        switch (eventName) {
            case 'connectEd':
                let logOutDropDownForConnectEd = '[data-auto="header_account"]'
                let logOutButtonForConnectEd = '[data-auto="logout_button"]'
                utils.click(logOutDropDownForConnectEd)
                utils.click(logOutButtonForConnectEd)
                break

            case 'oracle':
                let logOutDropDownForOracle = '[data-auto="account"]'
                let logOutButtonForOracle = '[data-auto="logout"]'
                utils.click(logOutDropDownForOracle)
                utils.click(logOutButtonForOracle)
                utils.explicitWait(5000)
                break

            case "autumnfair":
                let logOutDropDownForAutumnfair ='[data-auto="profile_block"]'
                let logOutButtonForAutumnfair = '[data-auto="logoutBtn"]'
                utils.click(logOutDropDownForAutumnfair)
                utils.click(logOutButtonForAutumnfair)
                break
        }
    }

    getnewDate(numberOfDays) {
        var today = new Date()
        var tempDate = today.getFullYear() + '-' +
            ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
            ('0' + (today.getDate() + numberOfDays)).slice(-2)
        if (numberOfDays == 1) {
            newEndDate = tempDate + ' ' + '23:59:59'
            cy.log('newEndDate is :' + ' ' + newEndDate)
        }
        else if (numberOfDays == 2) {
            newStartDate = tempDate + ' ' + '00:00:00'
            cy.log('newStartDate is :' + ' ' + newStartDate)
        }
    }

    enableWindow1() {
        this.getnewDate(1)
        this.updateDate(11, 2, 4, 'end_date', newEndDate)
        this.getnewDate(2)
        this.updateDate(13, 2, 4, 'start_date', newStartDate)
    }

    disableWindow1() {
        cy.get('@currentEndDate')
            .then(og_Enddate => {
                cy.log("Original Start date is:" + ' ' + og_Enddate)
                this.revertDate(11, 2, 4, 'end_date', og_Enddate)
            })
        cy.get('@currentStartDate')
            .then(og_Startdate => {
                cy.log("Original Start date is:" + ' ' + og_Startdate)
                this.revertDate(13, 2, 4, 'start_date', og_Startdate)
            })
    }

    updateDate(event_activity_id, event_edition_id, persona_id, column_Name, dateToBeUpdated) {
        cy.task("dbQuery", {
            "query":
                "select *from event_edition_activity where event_activity_id =" + event_activity_id +
                " and event_edition_id =" + event_edition_id +
                " and persona_id =" + persona_id + ";",
            "connection": Cypress.env('db')
        })
            .then(result => {
                switch (column_Name) {
                    case 'end_date':
                        let currentEndDate = result[0].end_date
                        cy.wrap(currentEndDate).as('currentEndDate')
                        break;

                    case 'start_date':
                        let currentStartDate = result[0].start_date
                        cy.wrap(currentStartDate).as('currentStartDate')
                        break;
                }
                cy.task("dbQuery", {
                    "query":
                        "update event_edition_activity set " + column_Name + " ='" + dateToBeUpdated +
                        "' where event_activity_id=" + event_activity_id +
                        " and event_edition_id=" + event_edition_id +
                        " and persona_id=" + persona_id + ";",
                    "connection": Cypress.env('db')
                })
                cy.log("Update query executed for: " + ' ' + column_Name)
            })
    }

    revertDate(event_activity_id, event_edition_id, persona_id, column_Name, og_date) {
        cy.task("dbQuery", {
            "query":
                "update event_edition_activity set " + column_Name + " ='" + og_date +
                "' where event_activity_id=" + event_activity_id +
                " and event_edition_id=" + event_edition_id +
                " and persona_id=" + persona_id + ";",
            "connection": Cypress.env('db')
        })
    }

    hitPOST(BaseUri, EndPoint, body) {
        return cy.request({
            method: 'POST',
            url: Cypress.env(BaseUri) + EndPoint,
            failOnStatusCode: false,
            headers: { 'Content-Type': 'application/json' },
            body: body
        }).then((response) => {
            return response
        })
    }

    generateAuthTokenForUser(userEmailId) {
        return cy.request({
            method: 'POST',
            url: Cypress.env('AUTH0_BASE_URL') + 'oauth/token',
            failOnStatusCode: false,
            headers: { 'Content-Type': 'application/json' },
            body: {
                client_id: Cypress.env('WEBAPP_CLIENT_ID'),
                client_secret: Cypress.env('WEBAPP_CLIENT_SECRET'),
                grant_type: Cypress.env('GRANT_TYPE'),
                audience: Cypress.env('AUTH0_BASE_URL') + 'api/v2/',
                username: userEmailId,
                password: Cypress.env('PASSWORD'),
                redirect_uri: Cypress.env('REDIRECT_URI')
            },
        }).then((response) => {
            return response
        })
    }

    hitGETWithToken(BaseUri, queryParams, token) {
        return cy.request({
            method: 'GET',
            url: Cypress.env(BaseUri) + queryParams,
            failOnStatusCode: false,
            headers: { 'Content-Type': 'application/json' },
            auth: {
                'bearer': token
            }
        }).then((response) => {
            return response
        })
    }

    generateApplicationId(payload) {
        return utils.hitPOST('BETT_REGISTRATION_BASE_URL', '/bett/registration/contact-details', payload)
    }

}

export const utils = new Utils()