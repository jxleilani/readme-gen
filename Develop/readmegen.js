const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

let licenseBadge = '';

//function to prompt for user input
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the title of your project:"
        },
        {
            type: "input",
            name: "url",
            message: "Enter the URL for your deployed page:"
        },
        {
            type: "input",
            name: "description",
            message: "Enter a description of your project:"
        },
        {
            type: "input",
            name: "installation",
            message: "Installation instructions:"
        },
        {
            type: "input",
            name: "usage",
            message: "Usage information:"
        },
        {
            type: "list",
            name: "license",
            message: "Select a license:",
            choices: ["Apache License 2.0", "MIT", "GNU General Public License v3"]
        },
        {
            type: "input",
            name: "contribution",
            message: "Contribution guidelines:"
        },
        {
            type: "input",
            name: "test",
            message: "Test instructions:"
        },
        {
            type: "input",
            name: "github",
            message: "Github username:"
        },
        {
            type: "input",
            name: "email",
            message: "Email address:"
        }
    ]);
}

// function to write README file
function formattedFile(data) {
    //create license badge based on input
    switch (`${data.license}`){
        case "Apache License 2.0":
            licenseBadge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            break;
        case "GNU General Public License v3":
            licenseBadge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
            break;
        case "MIT":
            licenseBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            break;
    }
//create README.md text
return `
# ${data.title}
${licenseBadge}  
URL: ${data.url}
## Description:
${data.description}
## Table of Contents:
* Installation
* Usage
* Test Instructions
* Contribution Guidelines
* License
* Contact
## Installation Instructions:
${data.installation}
## Usage Information:
${data.usage}
## Test Instructions:
${data.test}
## Contribution Guidelines:
${data.contribution}
## License: ${data.license}
## Contact: 
GitHub: [${data.github}](https://github.com/${data.github})

For additional questions please contact: [${data.email}](mailto:${data.email})
`;
}

const readMeGen = () =>{
    promptUser()
    .then(function(response){
        return writeFileAsync("README.md", formattedFile(response));
    })
    .then(function(){
        console.log("Succesfully created README");
    })
    .catch(function(err){
        console.log(err);
    })

}

module.exports = {
    readmegen: readMeGen
};