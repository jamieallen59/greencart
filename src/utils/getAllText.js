
export const getAllText = node => {
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