const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Array to hold all employee objects
const employeeInfo = [];

init = () => {
  // Prompts user for manager information
  manager = () => {
    return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is your manager's name?"
      },
      {
        type: 'input',
        name: 'id',
        message: "What is your manager's id?"
      },
      {
        type: 'input',
        name: 'email',
        message: "What is your manager's email?"
      },
      {
        type: 'input',
        name: 'officeNum',
        message: "What is your manager's office number?"
      }
    ]).then(function(response){
      // Creates manager object based on user response
      const manager = new Manager(response.name, response.id, response.email, response.officeNum);
      employeeInfo.push(manager);
      addMember();
    })
  }

  // Prompts user to add more members or not
  addMember = () => {
    return inquirer
    .prompt ([
      {
        type: 'list',
        message: 'Which type of team member would you like to add?',
        choices: ['Engineer', 'Intern', 'No more team members'],
        name: 'addMember'
      }
    ]).then(function(response) {
      switch(response.addMember) {
        case 'Engineer':
          engineer();
          break;
        case 'Intern':
          intern();
          break;
        default:
          createTeam();
      }
    })
  }

  // Prompt and create engineer object
  engineer = () => {
    return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is your engineer's name?"
      },
      {
        type: 'input',
        name: 'id',
        message: "What is your engineer's id?"
      },
      {
        type: 'input',
        name: 'email',
        message: "What is your engineer's email?"
      },
      {
        type: 'input',
        name: 'githubUser',
        message: "What is your engineer's Github username?"
      }
    ]).then(function(response) {
      // Creates engineer object based on user response
      const engineer = new Engineer(response.name, response.id, response.email, response.githubUser);
      employeeInfo.push(engineer);
      addMember();
    })
  }

  // Prompt and create intern object
  intern = () => {
    return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is your intern's name?"
      },
      {
        type: 'input',
        name: 'id',
        message: "What is your intern's id?"
      },
      {
        type: 'input',
        name: 'email',
        message: "What is your intern's email?"
      },
      {
        type: 'input',
        name: 'school',
        message: "What school does your intern come from?"
      }
    ]).then(function(response){
      // Creates intern object based on user response
      const intern = new Intern(response.name, response.id, response.email, response.school);
      employeeInfo.push(intern);
      addMember();
    });
  }

  // Creating team and calling render function with employeeInfo array
  createTeam = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(employeeInfo), 'utf-8');
}
  manager();
}

init();
