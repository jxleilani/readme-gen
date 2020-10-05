const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");


function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the title of your project:"
        },
        {
            type: "input",
            name: "description",
            message: "Enter a description of your project:"
        },
        {
            type: "input",
            name: "contents",
            message: "Table of Contents:"
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
let licenseBadge = '';
function formattedFile(data) {
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

return `
# ${data.title}
${licenseBadge}
## Description:
${data.description}
## Table of Contents:
${data.contents}
## Installation instructions:
${data.installation}
## Usage information:
${data.usage}
## License: ${data.license}
## Contribution guidelines:
${data.contribution}
## Test instructions:
${data.test}
## Contact: 
GitHub: [${data.github}](https://github.com/${data.github})

For additional questions please contact: [${data.email}](mailto:${data.email})
`;
}

//PROMISIFY ----------------------------------------------------------
const writeFileAsync = util.promisify(fs.writeFile);

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

