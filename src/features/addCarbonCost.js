export const addCarbonCost = () => {
  const PRICE_BOX_ID = 'priceInsideBuyBox_feature_div'
  const priceElement = document.getElementById(PRICE_BOX_ID)

  const isOnProductPage = !!priceElement

  if (isOnProductPage) {
    const newElement = document.createElement('div')
    const newContent = document.createTextNode('Carbon cost: $0.61')
    newElement.appendChild(newContent)
    
    newElement.style.color = '#419336'
    
    priceElement.parentNode.insertBefore(
      newElement, priceElement.nextSibling
    )
  }
}
