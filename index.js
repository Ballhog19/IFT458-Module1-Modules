const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate')

//Read data from file
//Template
const tempCourse = fs.readFileSync(
    `${__dirname}/data/data.json`,
    'utf-8'
);

const templateHTMLCourse = fs.readFileSync(
    `${__dirname}/template/templateCourse.html`,
    'utf-8'
);

/*const replaceTemplate = (htmlStr, course) => {
    let output = htmlStr.replace(/{%NAME%/g, course.courseName);
    output = output.replace(/{%IMAGE%}/g, course.image);
    output = output.replace(/{%FROM%}/g, course.from);
    output = output.replace(/{%INSTRUCTOR%}/g, course.instructor);
    output = output.replace(/{%CREDITS%}/g, course.credits);
    output = output.replace(/{%DESCRIPTION%}/g, course.description);
    output = output.replace(/{%ID%}/g, course.id);
    return output;
}*/

const dataObj = JSON.parse(tempCourse); //Convert JSON file Sting to Object

///////////////////////////////
//Create Server
const server = httpServer.createServer((req, res) => { //call back function

    /*const urlParameter = url.parse(req.url, true);
    console.log(JSON.stringify(urlParameter.query));
    console.log(JSON.stringify(urlParameter.pathname));*/

    const {query, pathname} = url.parse(req.url, true); //object destructor

    if(query.id) {
        //Courses page
        if (pathname === '/' || pathname.toLowerCase() === '/courses') {
            res.writeHead(200, {// everything ran successfully
                'Content-type': 'text/html'
            });
            const course = dataObj[Number(query.id)];
            const strCourseName = JSON.stringify(course);
            const courseHTML = replaceTemplate(templateHTMLCourse, course); //function that will replace the course values in the HTML
            //res.end(`We received our first request form the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id}
            //${JSON.stringify(course)} //convert object back to String
            //`)
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