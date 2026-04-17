import { onExplorePage } from "../support/pages/ExplorePage"

describe('Automation suite for the Insights/Eport module of the ViewIQ platform', () => {
  let serverID
  let password
  let api_token
  let applicationURL
  let userEmailId
  beforeEach(() => {
    cy.fixture('explore.json').as('data')
    cy.env(['MAILOSAUR_SERVER_ID', 'PASSWORD', 'API_TOKEN']).then((env) => {
      serverID = env.MAILOSAUR_SERVER_ID,
      password = env.PASSWORD,
      api_token = env.API_TOKEN,
      applicationURL = Cypress.expose('BASE_URL')
      userEmailId = `challenge@${serverID}.mailosaur.net`
      cy.mailosaurDeleteAllMessages(serverID)
      cy.loginWithMailosaur(applicationURL, userEmailId, password, serverID)
    })
  })
  it('Test Case 1 Search Functionality', () => {
    cy.get('@data').then((data) => {
      onExplorePage.goToExplore()
      onExplorePage.searchInfluencer(data.searchKey)
      onExplorePage.verifyNumberofSearchResultonUI(data.Expected_No_of_Search_Result)
      onExplorePage.verifyallReturnedRecordsAreCorrect(applicationURL, api_token, data.searchKey)
    })
  })
  it('Test Case 2 Pagination', () => {
    cy.get('@data').then((data) => {
      onExplorePage.goToExplore()
      onExplorePage.verifyPagination(data.recordsPerPage)
    })
  })
  it('Test Case 3 Filters - Set Min/Max', () => {
    onExplorePage.goToExplore()
    onExplorePage.clickonFilters()
    onExplorePage.assertMinValuesMatchApiAndUI(applicationURL,api_token)
  })
  it('Test Case 4 Suitability Filter + Reset', () => {
    onExplorePage.goToExplore()
    onExplorePage.clickonFilters()
    onExplorePage.selectVettedFilterType('No')
    onExplorePage.clickApplyFilter()
    onExplorePage.verifyNotVettedFilterApplied('have.class', 'applied')
    onExplorePage.verifyAllTheRecordsonThePageareUnvetted()
    onExplorePage.clickonFilters()
    onExplorePage.clickResetFilter()
    onExplorePage.clickonFilters()
    onExplorePage.verifyNotVettedFilterRemoved('not.have.class', 'applied')

  })
})

