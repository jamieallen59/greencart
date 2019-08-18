import { getAllText } from '../utils/getAllText'
import { hasCarbonFriendlyText } from '../utils/hasCarbonFriendlyText'

let category

const BOOKS_CATEGORY_NAME = 'Books'

const highlightLowCarbonOptions = () => {
  const BOOK_BUY_BOX = 'buybox'
  const buyBoxElement = document.getElementById(BOOK_BUY_BOX)

  const isOnAProductPage = !!buyBoxElement

  if (isOnAProductPage) {
    const PRICING_ELEMENTS = 'swatchElement'
    const pricingElements = document.getElementsByClassName(PRICING_ELEMENTS)

    for (let element of pricingElements) {
      const innerElement = element.getElementsByClassName('a-button-inner')
      const innerTextElement = innerElement[0].getElementsByClassName('a-button-text')

      const allText = getAllText(innerTextElement[0])

      const isCarbonFriendlyOption = hasCarbonFriendlyText(allText)
      
      if (isCarbonFriendlyOption) {
        innerElement[0].style.background = 'green'
      }
    }
  }
}

const getCategoryProperty = (element = {}) => {
  const target = element.target || element

  const { options, selectedIndex } = target

  const { text: category } = options[selectedIndex]

  return category
}

const setCategory = element => {
  category = getCategoryProperty(element)
  console.log('New category', category)

  if (category === BOOKS_CATEGORY_NAME) {
    highlightLowCarbonOptions()
  }
}

const addCategoryListener = element => {
  element.addEventListener(
    'change',
    setCategory,
    false
  )
}

const getCategory = () => {
  const SEARCH_DROPDOWN = 'searchDropdownBox'
  const searchDropdownElement = document.getElementById(SEARCH_DROPDOWN)

  addCategoryListener(searchDropdownElement)

  setCategory(searchDropdownElement)
}


getCategory()