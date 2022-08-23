const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate')

//Read data from file
//Template
const tempAccount = fs.readFileSync(
    `${__dirname}/data/data.json`,
    'utf-8'
);

const templateHTMLCourse = fs.readFileSync(
    `${__dirname}/template/templateCourse.html`,
    'utf-8'
);

const dataObj = JSON.parse(tempAccount); //Convert JSON file Sting to Object

///////////////////////////////
//Create Server
const server = httpServer.createServer((req, res) => { //call back function

    const {query, pathname} = url.parse(req.url, true); //object destructor

    if(query.id) {
        //Accounts page
        if (pathname === '/' || pathname.toLowerCase() === '/accounts') {
            res.writeHead(200, {// everything ran successfully
                'Content-type': 'text/html'
            });
            const account = dataObj[Number(query.id)];
            const strAccountName = JSON.stringify(account);
            const courseHTML = replaceTemplate(templateHTMLCourse, account); 
            res.end(courseHTML);
        } else {
            res.writeHead(404, {//Server did not find what you were looking for
                'Content-type': 'text/html'
            });
            res.end(`resource not found`);
        }
    }
    
});



//Start Listening to requests
server.listen(8000, 'localhost', () => {
    console.log('Listening to requests on port 8000');
});