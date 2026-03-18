const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) reject("Could not find that file 💥");
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (error) => {
      if (error) reject("Could not write file ❌");
      resolve("Success ✅");
    });
  });
};

readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((response) => {
    console.log(response.body.message);
    return writeFilePromise("dog-img.txt", response.body.message);
  })
  .then(() => {
    console.log("Random dog🐶 image saved to file!");
  })
  .catch((error) => {
    console.log(error);
  });
