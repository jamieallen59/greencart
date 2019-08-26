import { getManufacturer } from '../utils/getManufacturer'
import { getAsinNumber } from '../utils/getAsinNumber'
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

const createTrafficLight = ({ color, lighterColor, isHighlighted }) => {
  // create outer housing
  const LIGHT_HOUSING_COLOR = '#2d2d2d'
  const LIGHT_HOUSING_SIZE = '32px'

  const lightHousing = document.createElement('div')

  lightHousing.style.display = 'flex'
  lightHousing.style.justifyContent = 'center'
  lightHousing.style.alignItems = 'center'
  lightHousing.style.width = LIGHT_HOUSING_SIZE
  lightHousing.style.height = LIGHT_HOUSING_SIZE
  lightHousing.style.borderRadius = '2px'
  lightHousing.style.backgroundColor = LIGHT_HOUSING_COLOR

  // create inner light
  const LIGHT_SIZE = '26px'

  const trafficLight = document.createElement('div')
  trafficLight.style.width = LIGHT_SIZE
  trafficLight.style.height = LIGHT_SIZE
  trafficLight.style.borderRadius = LIGHT_SIZE
  trafficLight.style.cursor = 'pointer'
  trafficLight.style.transition = '.15s ease-in-out'
  
  if (isHighlighted) {
    trafficLight.style.backgroundColor = lighterColor
    trafficLight.style.boxShadow = `0 0 20px ${lighterColor}`
  } else {
    trafficLight.style.backgroundColor = color
  }

  lightHousing.appendChild(trafficLight)
  
  return lightHousing
}

const addTrafficLights = (highlightedColor) => {
  // create outer wrapper
  const trafficLights = document.createElement('div')
  trafficLights.style.position = 'absolute'
  trafficLights.style.top = '40px'
  trafficLights.style.right = '40px'
  trafficLights.style.display = 'flex'
  trafficLights.style.flexDirection = 'column'
  trafficLights.style.justifyContent = 'space-evenly'
  trafficLights.style.alignItems = 'center'
  trafficLights.style.zIndex = '1000'
  trafficLights.style.width = '40px'
  trafficLights.style.height = '120px'
  trafficLights.style.borderRadius = '4px'
  trafficLights.style.backgroundColor = '#b3b3b3'

  // create individual traffic lights
  const greenLightDetails = {
    color: '#126315',
    lighterColor: '#1b9720',
    isHighlighted: highlightedColor === 'green'
  }
  const amberLightDetails = {
    color: '#F18F01',
    lighterColor: '#ffd462',
    isHighlighted: highlightedColor === 'amber'
  }
  const redLightDetails = {
    color: '#E80B0B',
    lighterColor: '#f63b3b',
    isHighlighted: highlightedColor === 'red'
  }

  const greenLight = createTrafficLight(greenLightDetails)
  const amberLight = createTrafficLight(amberLightDetails)
  const redLight = createTrafficLight(redLightDetails)

  // add them all together and place into the DOM
  trafficLights.appendChild(greenLight)
  trafficLights.appendChild(amberLight)
  trafficLights.appendChild(redLight)

  document.body.appendChild(trafficLights)
}

const getFoodInfo = foodCategory => {
  switch (true) {
  case foodCategory.includes('Dairy Foods'):
  case foodCategory.includes('Meat & Poultry'):
    return {
      trafficLightColor: 'red',
      description: 'You should eat these sparingly. These include meats, processed foods, or produce grown out-of-season and shipped long distances.',
    }
  case foodCategory.includes('Fish & Seafood'):
    return {
      trafficLightColor: 'amber',
      description: 'These foods are medium impact.',
    }
  case foodCategory.includes('Grain, Beans & Nuts'):
  case foodCategory.includes('Vegetable'):
  case foodCategory.includes('Fruits'):
    return {
      trafficLightColor: 'green',
      description: 'This food is environmentally friendly and low-impact. Plants and unprocessed foods fall into this category.',
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

    const { error, ...data } = await fetchImpactData(payload)
    if (error) {
      // TODO: potentially handle in some way. Do nothing for now.
      return
    }

    if (data.id) {
      const impactData = parseResponseData(data)
      const { trafficLightColor } = impactData

      // TODO: highlight based on response from impact data
      // TODO: show default text otherwise
      if (trafficLightColor) {
        addTrafficLights(trafficLightColor)
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