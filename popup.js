
// .storage: Same as local storage
// chrome.storage.sync.get('color', data => {
  //   const { color } = data
  
  //   changeColor.style.backgroundColor = color;
  //   changeColor.setAttribute('value', color);
  // });
  
const changeColor = document.getElementById('tester');
changeColor.onclick = element => {
  // const { value: color } = element.target

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: "alert('it works!')" }
    )

    // chrome.tabs.executeScript(
    //     tabs[0].id,
    //     {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};
