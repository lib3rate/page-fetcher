const request = require('request');
const fs = require('fs');

const page = process.argv[2];
const path = process.argv[3];

const fetch = function(path, page) {
  request(page, (error, response, body) => {
    if (error) {
      console.log('The was an error:', error);
      return;
    } else if (response.statusCode !== 200) {
      console.log('Something went wrong:', response && response.statusCode);
      return;
    } else {
      fs.access(path, (err) => { 
        if (err) {
          console.log('The given path does not exist');
          return;
        }
        fs.writeFile(path, body, () => 
          console.log(`Downloaded and saved ${body.length} bytes to ${path}`))
      })
    }
  });
}

fetch(path, page);

// setTimeout(() => console.log(downloaded), 3000);

// fs.writeFile(path, body);

// node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html