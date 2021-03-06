const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = []; 


const addEmployee = {
    name: "addEmployee",
    type: "list",
    message: "Select the employee type to add to the team.",
    choices: ["Engineer", "Intern", "None"]
};

const managerQuestions = [{
    name: "name",
    type: "input",
    message: "Enter manager's first and last name."
}, {
    name: "id",
    type: "input",
    message: "Enter the manager's id."
}, {
    name: "email",
    type: "input",
    message: "Enter the manager's email."
}, {
    name: "officeNumber",
    type: "input",
    message: "Enter the manager's office number."
}];

const engineerQuestions = [{
    name: "name",
    type: "input",
    message: "Enter the engineer's first and last name."
}, {
    name: "id",
    type: "input",
    message: "Enter the engineer's employee id."
}, {
    name: "email",
    type: "input",
    message: "Enter the engineer's email."
}, {
    name: "github",
    type: "input",
    message: "Enter the engineer's github."
}];

const internQuestions = [{
    name: "name",
    type: "input",
    message: "Enter the interns's first and last name."
}, {
    name: "id",
    type: "input",
    message: "Enter the intern's employee id."
}, {
    name: "email",
    type: "input",
    message: "Enter the intern's email."
}, {
    name: "school",
    type: "input",
    message: "Enter the intern current school."
}];

const addEmployeePrompt = () => {
    inquirer.prompt(addEmployee).then(input => {
        switch (input.addEmployee) {
            case "Engineer":
                askQuestions("engineer", engineerQuestions);
                break;
            case "Intern":
                askQuestions("intern", internQuestions);
                break;
            case "None":
                fs.writeFile(outputPath, render(employees), (err) => {
                    if (err) throw err;
                    console.log('File is saved in the output folder.');
                })
                break;
        };
    });

};

const askQuestions = (employeeType, questionArray) => {
    inquirer.prompt(questionArray).then(input => {
        switch (employeeType) {
            case "manager":
                employees.push(new Manager(input.name, input.id, input.email, input.officeNumber));
                break;
            case "engineer":
                employees.push(new Engineer(input.name, input.id, input.email, input.github));
                break;
            case "intern":
                employees.push(new Intern(input.name, input.id, input.email, input.school));
                break;
        }
        addEmployeePrompt(); 
    });
};

const init = () => {
    askQuestions("manager", managerQuestions)
};


init(); 