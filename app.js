const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const team = [];

//Function which prompts the user for the details reqired to build team. 
function newTeam() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter your full name: ",
                name: "name"
            }, {
                type: "list",
                message: "What is your role with the company?",
                choices: ["Manager", "Engineer", "Intern"],
                name: "role"
            }, {
                type: "input",
                message: "Please enter your email: ",
                name: "email"
            }, {
                type: "input",
                message: "Enter your employee ID number:",
                name: "id"
            }
        ])
        //Function which prompts specific questions based on the intended role.
        .then(function (res) {
            console.log(res)
            if (res.role === "Manager") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What is your office number?",
                            name: "officeNumber"
                        }
                    ]).then(function (data) {
                        const Management = new Manager(res.name, res.id, res.email, data.officeNumber)
                        team.push(Management);
                        addAnotherEmployee()
                    })
            }
            else if (res.role === "Engineer") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Please enter your GitHub User Name: ",
                            name: "github"
                        }
                    ]).then(function (data) {
                        const Engin = new Engineer(res.name, res.id, res.email, data.officeNumber)
                        team.push(Engin);
                        addAnotherEmployee()
                    })
            }
            else if (res.role === "Intern") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Please enter the name of your school: ",
                            name: "School"
                        }
                    ]).then(function (data) {
                        const Inte = new Intern(res.name, res.id, res.email, data.officeNumber)
                        team.push(Inte);
                        addAnotherEmployee()
                    })
            }
        })
}

newTeam()

//Function which creates an html file of the team members
function writeTeam() {
    fs.writeFile("team.html", render(team), function (err) {
        if (err) throw error
    })
}

//Function which allows to add aditional members if necessary for the intended project
function addAnotherEmployee() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to add an additional team member?:",
                choices: ["Yes", "No"],
                name: "addOn"
            }
        ])
        .then(function (choice) {
            if (choice.addOn === "Yes") {
                newTeam()
            }
            else {
                writeTeam()
            }
        })
}





