import { getAsinNumber, getManufacturer } from '../utils/pageHelpers'
import { fetchImpactData } from '../api'

const AMAZON_FRESH_CATEGORY_NAME = 'Amazon Fresh'

const isAmazonFreshCategorySelected = () => {
  const SEARCH_DROPDOWN = 'searchDropdownBox'
  const searchDropdownElement = document.getElementById(SEARCH_DROPDOWN)
  
  const { options = [], selectedIndex = 0 } = searchDropdownElement
  const { text: category } = options[selectedIndex]

  return category === AMAZON_FRESH_CATEGORY_NAME
}

const hasAmazonFreshHeader = () => {
  const FRESH_XPATH = '//div[a[contains(@href, "AmazonFresh")]]'
  
  try {
    const freshHeader = document.evaluate(FRESH_XPATH, document).iterateNext()
    if (freshHeader) {
      return true
    }
    
    return false
  } catch (error) {
    console.log('Error', error)
    return false
  }
}

const checkIsAmazonFreshPage = () => {
  // TODO: Could check for other 'fresh' elements on the page here if needed
  const isAmazonFreshSelected = isAmazonFreshCategorySelected()
  const hasHeader = hasAmazonFreshHeader()

  return isAmazonFreshSelected || hasHeader // TODO: Can be changed to AND for more safety
}

// Returns a dictionary with product information text that can be extracted from the current page
export const getProductInformation = () => {
  const title = document.getElementById('productTitle').textContent
    .trim()
  const description = document.getElementById('feature-bullets').textContent
    .trim()
    .replace(/\s{2,}/g, '\n') // Replace multi-newlines with a single newline

  const asin = getAsinNumber()
  console.log('asin', asin)

  const manufacturer = getManufacturer()
  console.log('manufacturer', manufacturer)
  return {
    title,
    description,
    asin,
    by: manufacturer,
    url: document.URL
  }
}


export const showFoodScoring = async () => {
  const isAmazonFreshPage = checkIsAmazonFreshPage()

  if (isAmazonFreshPage) {
    console.log('isAmazonFreshPage? TRUE')
    const payload = getProductInformation()
    console.log(payload)

    const impactData = await fetchImpactData(payload)

    console.log('impactData', impactData)
  }

  // TODO: MVP
  // check roughly wht type of food it is
  // highlight based on text
  // show generic text on hover of traffic lights
  
  // TODO: Stretch
  // get food ASIN number
  // compare with JSON data
  // highlight traffic light based on choice
  // show specific food info
}