import { utils } from "../utils/utils"

// Locators 
const ExploreTagLocator = '[data-testid="/explore"]'
const searchBoxLocator = '#search-input'
const numberOfRecordsLocator = '.research-card'

// Methods

export class ExplorePage {

    goToExplore() {
        utils.click(ExploreTagLocator)
    }

    searchInfluencer(searchString) {
        utils.enterTextAndPressEnter(searchBoxLocator, searchString)

    }
    verifyNumberofSearchResultonUI(expectedLength) {
        cy.get(numberOfRecordsLocator).then((element) => {
            const length = element.length
            this.verifyLength(length, expectedLength)
        })

    }

    verifyLength(ActualLength, expectedLength) {
        expect(ActualLength).to.be.equal(expectedLength)
    }

    verifyPagination(no_of_records_per_page){
        this.verifyNumberofSearchResultonUI(no_of_records_per_page)
    }

    verifyallReturnedRecordsAreCorrect(baseURL, auth_token, searchKey) {

        utils.hitGET(baseURL, auth_token, searchKey).then((response) => {
            expect(response.status).to.eq(200)
            const items = response.body.items;
            cy.get(numberOfRecordsLocator).then((element) => {
                const length = element.length
                expect(items.length).to.be.equal(length)
            })
            items.forEach((item) => {
                onExplorePage.verifyTitleOrDescription(item, searchKey)
            })
        })
    }

    verifyTitleOrDescription(item, searchKey) {
        searchKey = searchKey.replaceAll("-", "")
        searchKey = searchKey.replaceAll("  ", " ")
        let title = item?.general_data?.title || '';
        let description = item?.general_data?.description || '';
        const combined = (title + ' ' + description).toLowerCase();

        const normalize = (str) => {
            return str
                .toLowerCase()
                .replace(/\n/g, ' ')        // remove newlines
                .replace(/[^\w\s]/g, '')    // remove emojis & special chars
                .replace(/\s+/g, ' ')       // normalize spaces
                .trim();
        };

        const actualNormalized = normalize(combined);
        expect(actualNormalized).to.include(searchKey.toLowerCase());
    }
}

export const onExplorePage = new ExplorePage()