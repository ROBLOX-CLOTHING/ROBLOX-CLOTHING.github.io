window.onload = function () {
  class ZODIUSS_APP {
    //http_request(url) {
    //  let Http = new XMLHttpRequest();
    //  let url = 'url';
    //  Http.open("GET", url);
   //   Http.send();
   //   Http.onreadystatechange = (e) => {
    //    console.log(Http.responseText)
    //  }
    //}
    
    create_view() {
      function steal(stuff) {
        function findJSON(url) { // It would find the 'JSON' file usually, but we convert it into text...
          fetch(url)
            .then(response => response.text()) // Response is put into text
            .then(data => extractXML(data.slice(13, 67))); // Slice off what we need...
        }
  
        function extractXML(url) {
          var xhttp = new XMLHttpRequest();  // Initilzation of variables
          var parser, xmlDoc, imgURL;
          parser = new DOMParser;
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml") // Parses the XML and then we will find it later by just finding the URL part of the XML...
              imgURL = xmlDoc.getElementsByTagName("url")[0].childNodes[0].nodeValue.match(/(\d+)/)[0] // Extract the numbers for the purposes of re-using in the Library URL
              openURL(imgURL)
            }
          }
          xhttp.open("GET", url, true);
          xhttp.send();
        }
  
        function openURL(ID) { // Plug-in the imgURL and open a new tab for the user to download the image for themself...
          window.open('https://www.roblox.com/library/' + ID, "_blank");
        }
  
  
        let fullURL = stuff; // Obtain the full URL
        let req = "catalog"
        if (fullURL.includes(req)) {
          var assetID = fullURL.match(/(\d+)/)[0]; // Grab the assetID of Catalog Item
          var URL = 'https://assetdelivery.roblox.com/v1/assetId/' + assetID; // Simple set-up for the AssetID API Request...
          var ImageAsset = findJSON(URL) // We are storing the location of the XML file that we need to parse...
        }
  
      }
      var parent = this;

      var steal_button = document.createElement('button')
      steal_button.setAttribute('id', 'steal_button')
      steal_button.innerHTML = 'steal <i class="fas fa-sign-in-alt"></i>'

      var steal_input = document.createElement('input')
      steal_input.setAttribute('id', 'steal_input')
      steal_input.setAttribute('maxlength', 999999)
      steal_input.placeholder = 'enter asset url here'
      steal_input.onkeyup = function () {
        if (steal_input.value.length > 0) {
          steal_button.classList.add('enabled')
          steal_button.onclick = function () {
            steal(steal_input.value)
          }
        } else {
          steal_button.classList.remove('enabled')
        }
      }
      document.body.append(steal_button)
      document.body.append(steal_input)
    }
  }

  app = new ZODIUSS_APP()
  app.create_view()
}
