import { getManufacturer } from '../utils/getManufacturer'
import { getAsinNumber } from '../utils/getAsinNumber'
import { fetchImpactData } from '../api'
import { createFoodScoringWidget } from '../domElements/createFoodScoringWidget'

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

  const manufacturer = getManufacturer()

  return {
    title,
    description,
    asin,
    by: manufacturer,
    url: document.URL
  }
}

const addFoodScoringWidget = (highlightedColor, description) => {
  const widget = createFoodScoringWidget(highlightedColor, description)

  document.body.appendChild(widget)
}

const getFoodInfo = foodCategory => {
  switch (true) {
  case foodCategory.includes('Dairy Foods'):
  case foodCategory.includes('Meat & Poultry'):
    return {
      trafficLightColor: 'red',
      description: 'You should eat these foods sparingly. These include meats, processed foods, or produce grown out-of-season and shipped long distances.',
    }
  case foodCategory.includes('Fish & Seafood'):
    return {
      trafficLightColor: 'amber',
      description: 'These foods have a medium carbon impact.',
    }
  case foodCategory.includes('Grain, Beans & Nuts'):
  case foodCategory.includes('Vegetable'):
  case foodCategory.includes('Fruits'):
    return {
      trafficLightColor: 'green',
      description: 'This food is environmentally friendly and low carbon-impact. Plants and unprocessed foods fall into this category.',
    }
  default:
    return {}
  }
}

const parseResponseData = (data = {}) => {
  const { fields } = data

  const carbonImpact = fields['Carbon Impact']
  const carbonImpactUnits = fields['Carbon Impact Units']
  const foodCategory = fields['Food Category']

  const { trafficLightColor, description } = getFoodInfo(foodCategory)

  return {
    foodCategory,
    impact: `${carbonImpact} ${carbonImpactUnits}`,
    trafficLightColor,
    description
  }
}

export const showFoodScoring = async () => {
  const isAmazonFreshPage = checkIsAmazonFreshPage()

  if (isAmazonFreshPage) {
    const payload = getProductInformation()

    const { error, ...data } = await fetchImpactData(payload) || {}
    if (error) {
      // TODO: potentially handle in some way. Do nothing for now.
      return
    }

    console.log('------ showFoodScoring ------------')
    console.log('error: ', error)

    console.log('data: ', data)
    const fakeData = {
      id: 123,
      fields: {
        'Carbon Impact': 134.34,
        'Carbon Impact Units': 'kg/m',
        // 'Food Category': 'Dairy Foods',
        // 'Food Category': 'Fish & Seafood',
        'Food Category': 'Vegetable',
      }
    }

    if (fakeData.id) {
      const impactData = parseResponseData(fakeData)
      const { trafficLightColor, description } = impactData
      console.log('trafficLightColor: ', trafficLightColor)

      // TODO: highlight based on response from impact data
      // TODO: show default text otherwise
      if (trafficLightColor) {
        addFoodScoringWidget(trafficLightColor, description)
      }
    }
    // default currently does nothing if we can't match the words on the page
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