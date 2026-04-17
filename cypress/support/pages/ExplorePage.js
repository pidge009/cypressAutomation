import { utils } from "../utils/utils"

// Locators 
const ExploreTagLocator = '[data-testid="/explore"]'
const searchBoxLocator = '#search-input'
const numberOfRecordsLocator = '.research-card'
const notVettedFilterLocator = '.popover-btn'
const applyfilterLocator = '.apply-btn'
const filterBtnLocator = 'Filters'
const resetfilterLocator = '.reset-btn'
const vettedFilterLocator = '.wide-box'
const unVettedIdicatorOnUI = '.tag'
const minAvgCPVValueLocator = '[id="min-input-ads_stats.average_cpv"]'
const minAvgCPMValueLocator = '[id="min-input-ads_stats.average_cpm"]'
const minCTR_VValueLocator = '[id="min-input-ads_stats.ctr_v"]'
const minCTR_iValueLocator = '[id="min-input-ads_stats.ctr"]'
const minVideoViewRateValueLocator = '[id = "min-input-ads_stats.video_view_rate"]'
const minSubscribersValueLocator = '[id = "min-input-stats.subscribers"]'
const minLast30DaySubscribersValueLocator = '[id = "min-input-stats.last_30day_subscribers"]'
const minLast30DayViewsValueLocator = '[id = "min-input-stats.last_30day_views"]'
const minViewsPerVideoValueLocator = '[id = "min-input-stats.views_per_video"]'


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

    verifyPagination(no_of_records_per_page) {
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

    clickonFilters() {
        utils.clickwithText(filterBtnLocator)
    }

    selectVettedFilterType(filterValue) {
        cy.get(vettedFilterLocator)
            .contains(filterValue)
            .click()
        utils.verifyAttrValue(vettedFilterLocator, 'have.class', 'selected')
    }

    clickApplyFilter() {
        utils.click(applyfilterLocator)
    }

    verifyAllTheRecordsonThePageareUnvetted() {
        cy.get(unVettedIdicatorOnUI).each((element) => {
            utils.verifyAttrValue(element, 'have.class', 'unvetted')
        })
    }

    clickResetFilter() {
        utils.click(resetfilterLocator)
    }

    verifyNotVettedFilterApplied(atrr_to_check, expectedClass) {
        utils.verifyAttrValue(notVettedFilterLocator, atrr_to_check, expectedClass)
    }
    verifyNotVettedFilterRemoved(atrr_to_check, expectedClass) {
        utils.verifyAttrValue(notVettedFilterLocator, atrr_to_check, expectedClass)
    }
    validateFilterMinMaxRange(applicationURL, auth_token, aggregationKey, aggregationKeyParam, locator) {
        cy.request({
            method: 'GET',
            url: `${applicationURL}/api/v1/channels/`,
            headers: {
                Authorization: `Token ${auth_token}`
            },
            qs: {
                size: 0,
                aggregations: `${aggregationKey}:${aggregationKeyParam}`
            }
        }).then((response) => {

            const apiVal = response.body.aggregations[`${aggregationKey}:${aggregationKeyParam}`].value
            cy.log(`Value returned from API: ${apiVal}`)
            cy.get(locator)
                .invoke('attr', aggregationKeyParam)
                .then((uiVal) => {
                    cy.log(`Value returned from UI: ${uiVal}`)
                    expect(Number(uiVal.replace(/,/g, ''))).to.eq(Number(apiVal))
                })
        })
    }
    assertMinValuesMatchApiAndUI(applicationURL, auth_token) {
        this.validateFilterMinMaxRange(applicationURL, auth_token, 'ads_stats.average_cpv', 'min', minAvgCPVValueLocator)
        this.validateFilterMinMaxRange(applicationURL, auth_token, 'ads_stats.average_cpm', 'min', minAvgCPMValueLocator)
        this.validateFilterMinMaxRange(applicationURL, auth_token, 'ads_stats.ctr_v', 'min', minCTR_VValueLocator)
        this.validateFilterMinMaxRange(applicationURL, auth_token, 'ads_stats.ctr', 'min', minCTR_iValueLocator)
        this.validateFilterMinMaxRange(applicationURL, auth_token, 'ads_stats.video_view_rate', 'min', minVideoViewRateValueLocator)
        this.validateFilterMinMaxRange(applicationURL, auth_token, 'ads_stats.video_view_rate', 'min', minVideoViewRateValueLocator)
        this.validateFilterMinMaxRange(applicationURL, auth_token, 'stats.subscribers', 'min', minSubscribersValueLocator)
        this.validateFilterMinMaxRange(applicationURL, auth_token, 'stats.last_30day_subscribers', 'min', minLast30DaySubscribersValueLocator)
        this.validateFilterMinMaxRange(applicationURL, auth_token, 'stats.last_30day_views', 'min', minLast30DayViewsValueLocator)
        this.validateFilterMinMaxRange(applicationURL, auth_token, 'stats.views_per_video', 'min', minViewsPerVideoValueLocator)
    }
}

export const onExplorePage = new ExplorePage()