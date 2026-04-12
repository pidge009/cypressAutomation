describe('View IQ platform Test Suite', () => {
  it('Connecting to the Mailosaur and getting the login code', () => {
    cy.env(['MAILOSAUR_API_KEY', 'MAILOSAUR_SERVER_ID']).then((env) => {
      getLoginCodeFromMailosaur(env.MAILOSAUR_SERVER_ID).then((message) => {
        return message.html.codes[0].value
      }).as('login_code')
    })
    cy.get('@login_code').then((code) => {
      cy.log(`OTP: ${code}`)
    })
  })

  //function
  const getLoginCodeFromMailosaur = (serverID) => {
    return cy.mailosaurGetMessage(serverID, {
      sentTo: `challenge@${serverID}.mailosaur.net`,
    })
  }
})