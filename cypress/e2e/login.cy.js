import { onloginPage } from "../support/pages/LoginPage"
describe('View IQ platform Test Suite', () => {
  let serverID
  let password
  let applicationURL
  let userEmailId
  before(() => {
    cy.env(['MAILOSAUR_SERVER_ID', 'PASSWORD']).then((env) => {
      serverID = env.MAILOSAUR_SERVER_ID,
      password = env.PASSWORD
      applicationURL = Cypress.expose('BASE_URL')
      userEmailId = `challenge@${serverID}.mailosaur.net`
      cy.visit(applicationURL)
    })
  })
  after(() => {
    cy.mailosaurDeleteAllMessages(serverID)
  })
  it('login with Mailosaur for ViewIQ', () => {
    onloginPage.login(userEmailId, password)
    onloginPage.verifyLoginCodeSendMethodValidation('Email')
    onloginPage.sendLoginCodeToUserEmail()
    onloginPage.FetchAndEnterLoginCode(serverID, userEmailId)
  })
}) 