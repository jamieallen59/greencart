import { COLOURS } from '../constants'

// Constants
const CARBON_FRIENDLY_OPTIONS = [
  'Kindle Edition',
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
  // element.stlye = {
  //   ...element,
  //   background: COLOURS.GREENCART_MAIN
  // }

  // element.style.background = COLOURS.GREENCART_MAIN
  element.style.boxShadow = `2px 2px 0 2px ${COLOURS.GREENCART_MAIN}`
}

const getGreenCartTag = () => {
  const GREENCART_MAIN_SHADOW = '#30632a'
  const GREENCART_CLASSNAME = 'greencart-tag'

  // create tag element
  const greenCartTag = document.createElement('div')
  greenCartTag.classList.add(GREENCART_CLASSNAME)
  // greenCartTag.style.width = '20px'
  greenCartTag.style.height = '40px'
  greenCartTag.style.position = 'absolute'
  greenCartTag.style.top = '1px'
  greenCartTag.style.left = '1px'

  greenCartTag.style.display = 'flex'
  greenCartTag.style.alignItems = 'center'
  greenCartTag.style.cursor = 'pointer'
  greenCartTag.style.padding = '10px 28px 10px 20px'
  greenCartTag.style.border = '0 solid rgba(0,0,0,0)'
  greenCartTag.style.borderRadius = '4px 1px 1px 4px'
  greenCartTag.style.fontFamily = 'Helvetica sans-serif'
  greenCartTag.style.color = COLOURS.GREENCART_MAIN

  greenCartTag.style.borderLeft = `2px solid ${COLOURS.GREENCART_MAIN}`
  greenCartTag.style.borderTop = `1px solid ${COLOURS.GREENCART_MAIN}`
  greenCartTag.style.boxShadow = `0 5px 0 0 ${GREENCART_MAIN_SHADOW}, 3px 5px 0 0 ${GREENCART_MAIN_SHADOW}`
  greenCartTag.style.transition = 'background-color .1s ease-in-out'
  greenCartTag.style.transform = 'rotate(20deg)'
  greenCartTag.style.zIndex = '1000'

  const css = `
    .greencart-tag:hover{
      background-color: ${COLOURS.GREENCART_MAIN}
    }
  `
  const style = document.createElement('style')

  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  document.getElementsByTagName('head')[0].appendChild(style)


  // &:active {
  //    position: relative;
  //    top: 1px;
  // }
  
  // &:hover {
  //    background: $main;
  //    color: white;
     
  //    &:before {
  //       background: $main;
  //    }
  // }

  // &:before {
  //    display: inline-block;
  //    z-index: 1;
  //    width: $tag-triangle-width;
  //    height: $tag-triangle-width;
  //    position: absolute;
  //    content: "";
  //    cursor: pointer;
  //    top: 8px;
  //    right: -22px;
  //    border-radius: 1px 1px 4px;
  //    font: normal normal normal medium/normal Arial, Helvetica, sans-serif;
  //    color: rgba(255,255,255,0.9);
  //    background: white;
  //    border-right: 1px solid $main;
  //    box-shadow: 0 6px 0 0 $main-shadow;
  //    transition: background-color $hover-transition ease-in-out;
  //    transform: rotateY(1deg) rotateZ(-45deg) scaleX(1) scaleY(1) scaleZ(1);
  // }
  
  // // circle
  // &:after {
  //    display: inline-block;
  //    z-index: 2;
  //    width: 12px;
  //    height: 12px;
  //    position: absolute;
  //    content: "";
  //    cursor: pointer;
  //    top: 24px;
  //    right: -4px;
  //    border: 0 solid $main-shadow;
  //    border-radius: 10px;
  //    background: #fcfcfc;
  //    box-shadow: 5px 5px 0 0 $main-shadow inset;
  // }
  return greenCartTag
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
        const greenCartTag = getGreenCartTag()
        innerElement[0].appendChild(greenCartTag)
      }
    }
  }
}
