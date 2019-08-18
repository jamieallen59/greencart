
export const getAllText = node => {
  function recursor(n) {
      var i, a = [];
      if (n.nodeType !== 3) {
          if (n.childNodes)
               for (i = 0; i < n.childNodes.length; ++i)
                   a = a.concat(recursor(n.childNodes[i]));
      } else
          a.push(n.data);
      return a;
  }
  return recursor(node);
}