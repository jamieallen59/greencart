const AMAZON_FRESH_CATEGORY_NAME = 'Amazon Fresh'

const checkAmazonFreshCategoryIsSelected = () => {
  const SEARCH_DROPDOWN = 'searchDropdownBox'
  const searchDropdownElement = document.getElementById(SEARCH_DROPDOWN)
  
  const { options = [], selectedIndex = 0 } = searchDropdownElement
  const { text: category } = options[selectedIndex]

  return category === AMAZON_FRESH_CATEGORY_NAME
}

const checkisAmazonFreshPage = () => {
  // TODO: Could check for other 'fresh' elements on the page here if needed
  const isAmazonFreshCategory = checkAmazonFreshCategoryIsSelected()

  return isAmazonFreshCategory
}


export const showFoodScoring = () => {
  const isAmazonFreshPage = checkisAmazonFreshPage()

  if (isAmazonFreshPage) {
    console.log('TRUE')
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