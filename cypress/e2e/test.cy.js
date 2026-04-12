describe('View IQ platform Test Suite', () => {
  it('Get and print login code', () => {
    const applicationURL = Cypress.expose('BASE_URL')
    cy.env(['MAILOSAUR_API_KEY', 'MAILOSAUR_SERVER_ID', 'PASSWORD']).then((env) => {
      const email = `challenge@${env.MAILOSAUR_SERVER_ID}.mailosaur.net`
      cy.mailosaurDeleteAllMessages(env.MAILOSAUR_SERVER_ID);
      cy.visit(applicationURL)
      cy.get('#userName').type(email)
      cy.get('#password').type(env.PASSWORD)
      cy.get('#login-btn').click()
      cy.wait(2000)
      cy.contains('label', 'Email')
        .prev('input[type="radio"]')
        .should('be.checked');
      cy.get('[data-testid="next-button-main"]').click()
      cy.wait(2000)
      cy.getLoginCode(env.MAILOSAUR_SERVER_ID, email).then((otp) => {
        cy.log(`OTP: ${otp}`)
        otp = otp.replaceAll("-", "");
        otp.split('').forEach((digit, index) => {
          // Replace '.digit-input' with your actual CSS selector
          cy.get('.code-input')
            .eq(index)
            .type(digit);
        })
      })
    })
  })
}) 