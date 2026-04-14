import { onExplorePage } from "../support/pages/ExplorePage"

describe('Automation suite for the Insights/Eport module of the ViewIQ platform', () => {
  let serverID
  let password
  let api_token
  let applicationURL
  let userEmailId
  beforeEach(() => {
    cy.env(['MAILOSAUR_SERVER_ID', 'PASSWORD' , 'API_TOKEN']).then((env) => {
      serverID = env.MAILOSAUR_SERVER_ID,
      password = env.PASSWORD
      api_token = env.API_TOKEN
      applicationURL = Cypress.expose('BASE_URL')
      userEmailId = `challenge@${serverID}.mailosaur.net`
      cy.mailosaurDeleteAllMessages(serverID)
      cy.loginWithMailosaur(applicationURL,userEmailId,password,serverID)
    })
  })
  it('Test Case 1 Search Functionality', () => {
    onExplorePage.goToExplore()
    const searchKey = 'Cocomelon - Nursery Rhymes'
    onExplorePage.searchInfluencer(searchKey)
    onExplorePage.verifyNumberofSearchResultonUI(4)
    onExplorePage.verifyallReturnedRecordsAreCorrect(applicationURL, api_token , searchKey)
  })
    it('Test Case 2 Pagination', () => {
    onExplorePage.goToExplore()
    onExplorePage.verifyPagination(32)
  })
})

