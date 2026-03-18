const fs = require('fs');

fs.readFile(`${__dirname}/dog.txt`, (error, data) => {
    console.log(`Breed: ${data}`);
});