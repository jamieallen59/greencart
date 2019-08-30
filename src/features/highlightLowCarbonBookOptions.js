import { createSvgLogo } from '../domElements/createSvgLogo'
import { COLOURS } from '../constants'

// Constants
const CARBON_FRIENDLY_OPTIONS = [
  'Kindle',
  'Audiobook'
]

// Helpers
const hasCarbonFriendlyText = textArray => {
  return CARBON_FRIENDLY_OPTIONS.some(text => {
    return textArray.some(arrayText => arrayText.includes(text))
  })
}

// Returns an array of all the text in a DOM tree
const getAllText = node => {
  function recursor(n) {
    let i
    let array = []

    if (n.nodeType !== 3) {
      if (n.childNodes) {
        for (i = 0; i < n.childNodes.length; ++i) {
          array = array.concat(recursor(n.childNodes[i]))
        }
      }
    } else {
      array.push(n.data)
    }
    
    return array
  }
  return recursor(node)
}

const checkHasBookBuyBox = () => {
  const BOOK_PAGE_BUY_BOX_ID = 'buybox'
  const buyBoxElement = document.getElementById(BOOK_PAGE_BUY_BOX_ID)

  return !!buyBoxElement
}

const getSwatchPricingElements = () => {
  const SWATCH_PRICING_ELEMENT_CLASSNAME = 'swatchElement'
  const swatchPricingElements = document.getElementsByClassName(SWATCH_PRICING_ELEMENT_CLASSNAME)

  return swatchPricingElements
}

const getBookPagePricingElements = () => {
  const hasBookBuyBox = checkHasBookBuyBox()
  const swatchPricingElements = getSwatchPricingElements()

  if (hasBookBuyBox && swatchPricingElements.length) {
    return swatchPricingElements
  }

  return null
}

const applyCarbonFriendlyStyles = (element) => {
  const logo = createSvgLogo()
  logo.style.position = 'absolute'
  logo.style.bottom = '2px'
  logo.style.right = '2px'
  logo.setAttribute('width', '20px')
  logo.setAttribute('height', '20px')

  element.style.boxShadow = `2px 2px 0 2px ${COLOURS.GREENCART_MAIN}`
  element.style.position = 'relative'

  element.appendChild(logo)
}

// Public
export const highlightLowCarbonBookOptions = () => {
  // Check if it is a page with a book
  const bookPagePricingElements = getBookPagePricingElements()

  // If book page elements exist, it is a book page
  if (bookPagePricingElements) {
    for (let swatchPricingElement of bookPagePricingElements) {
      const innerElement = swatchPricingElement.getElementsByClassName('a-button-inner')
      const innerTextElement = innerElement[0].getElementsByClassName('a-button-text')
      console.log('innerTextElement', innerTextElement)
      const allText = getAllText(innerTextElement[0])

      const isCarbonFriendlyOption = hasCarbonFriendlyText(allText)

      if (isCarbonFriendlyOption) {
        applyCarbonFriendlyStyles(innerElement[0])
      }
    }
  }
}
