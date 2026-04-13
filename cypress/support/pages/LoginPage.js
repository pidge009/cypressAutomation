import { utils } from "../utils/utils"

// Locators 
const userNameValueLocator = '#userName'
const passwordValueLocator = '#password'
const loginBtnLocator = '#login-btn'
const validationMethodselectedLocator = 'input[type="radio"]'
const sendLoginCodeToUserEmailLocator = '[data-testid="next-button-main"]'
const LoginCodeLocator = '.code-input'
const codeMessageLocator = '.code-message'
const errorSendingValidationLocator = '.modal-content'


// Methods

export class LoginPage {

    login(userName, password) {
        utils.enterText(userNameValueLocator, userName)
        utils.enterText(passwordValueLocator, password)
        utils.click(loginBtnLocator)
        utils.explicitWait(2000)
    }

    verifyLoginCodeSendMethodValidation(methodName) {
        cy.contains('label', methodName)
            .prev(validationMethodselectedLocator)
            .should('be.checked')
    }

    sendLoginCodeToUserEmail() {
        utils.click(sendLoginCodeToUserEmailLocator)
    }

    FetchAndEnterLoginCode(serverID, userEmailId) {
        cy.getLoginCode(serverID, userEmailId).then((otp) => {
            cy.log(`OTP: ${otp}`)
            otp = otp.replaceAll("-", "")
            otp.split('').forEach((digit, index) => {
                cy.get(LoginCodeLocator)
                    .eq(index)
                    .type(digit)
            })
        })  
    }
    verifySuccessfulLogin(stepName) {
        utils.verifyStepIsSuccessful(codeMessageLocator , stepName)
    }

     verifyLoginCodeSent(stepName) {
        utils.verifyStepIsSuccessful(errorSendingValidationLocator , stepName)
    }
}

export const onloginPage = new LoginPage()