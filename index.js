const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Employee = require("./lib/employee");


const avengers = [];


function runManager() {
    askManager().then(function (response) {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber)

        if (response.add == "Add Engineer") {
            avengers.push(manager);
            runEngineer();
        } else if (response.add == "Add Intern") {
            avengers.push(manager);
            runIntern();
        } else if (response.add == "Team Assembled") {
            avengers.push(manager);


            fs.writeFile("./index.html", render(avengers), function (err) {
                if (err) throw err;
                console.log("Team Assembled")
            });
            return;
        }
    })
}

function runEngineer() {
    askEngineer().then(function (response) {
        const engineer = new Engineer(response.name, response.id, response.email, response.github)

        if (response.add == "Add Engineer") {
            avengers.push(engineer);
            runEngineer();
        } else if (response.add == "Add Intern") {
            avengers.push(engineer);
            runIntern();
        } else if (response.add == "Team Assembled") {
            avengers.push(engineer);


            fs.writeFile("./index.html", render(avengers), function (err) {
                if (err) throw err;
                console.log("Team Assembled")
            });
            return;
        }
    })
}

function runIntern() {
    askIntern().then(function (response) {
        const intern = new Intern(response.name, response.id, response.email, response.school)

        if (response.add == "Add Engineer") {
            avengers.push(intern);
            runEngineer();
        } else if (response.add == "Add Intern") {
            avengers.push(intern);
            runIntern();
        } else if (response.add == "Team Assembled") {
            avengers.push(intern);

            // console.log(avengers);
            // console.log(avengers[1].email);
            fs.writeFile("./index.html", render(avengers), function (err) {
                if (err) throw err;
                console.log("Team Assembled")
            });
            return;
        }
    })
}

function askManager() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the Manager's name?",
        },
        {
            type: 'input',
            name: 'id',
            message: 'Employee ID?',
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the manager's email?"
        },
        {
            type: 'input',
            name: 'officenumber',
            message: "What is the manager's number?",
        },
        {
            type: 'list',
            name: 'add',
            message: "Do you want to add an Engineer or Intern?",
            choices: ['Add Engineer', 'Add Intern', 'Team Assembled'],
        },

    ])
};

function askEngineer() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Engineer Name:"
        },
        {
            type: "input",
            name: "id",
            message: "Engineer ID:",

        },
        {
            type: "input",
            name: "email",
            message: "Engineer Email:"
        },
        {
            type: "input",
            name: "github",
            message: "Engineer's GitHub:"
        },
        {
            type: "list",
            name: "add",
            message: "Would you like to add another engineer or intern?",
            choices: ["Add Engineer", "Add Intern", "Team Assembled"]
        },
    ])
};

function askIntern() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Intern Name:"
        },
        {
            type: "input",
            name: "id",
            message: "Intern ID:",
        },
        {
            type: "input",
            name: "email",
            message: "Intern Email:"
        },
        {
            type: "input",
            name: "school",
            message: "Intern School:"
        },
        {
            type: "list",
            name: "add",
            message: "Would you like to add another engineer or intern?",
            choices: ["Add Engineer", "Add Intern", "Team Assembled"]
        },
    ])
};

function render() {
    const tableList = ""
    for (let i = 0; i < avengers.length; i++) {
      
        
        let random = avengers[i].officeNumber || avengers[i].github || avengers[i].school

        const avengeCard = `<div class="card col-md-4">
            <div class="card-body">
              <h5 class="card-title">${avengers[i]}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Name:${avengers[i].name}</h6>
               <p class="card-text">ID:${avengers[i].id}</p>
               <p class="card-text">Email:${avengers[i].email}</p>
               <p class="card-text">${random}</p>
              </div>
          </div>`

        


        tableList.concat(avengeCard);
        console.log(avengeCard);
        if (i = avengers.length) {

            const final = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
      <link ref="stylesheet" href="./style.css">
      <title>Avengers Assemble</title>
    </head>
    <style>
      body {
        text-align: center;
        background-image: url("./src/Avengers.jpg");
        height: 100%;
        background-position: center;
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: cover;
      }
    </style>
    
    <body>
      <!-- Image and text -->
      <div class="container" >
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Avengers Assemble</a>
          </div>
        </nav>
        <div class="row">
         ${tableList}
         
         </div>
    
    
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
          crossorigin="anonymous"></script>
          <script src="./index.js"></script>
    </body>
    
    </html>`
            return final
        }

    }
};


runManager();