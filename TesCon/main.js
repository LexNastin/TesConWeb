const crypto = require('crypto');
const axios = require('axios');
const http = require('http');
const url = require('url');
const fs = require('fs');

const path = `${process.env.appdata}/TesCon/`;

const baseapiurl = `https://owner-api.teslamotors.com/`;

function post(where, auth, params, then){
	axios.post(baseapiurl.concat(where), params, {
		headers: { Authorization: "Bearer ".concat(auth) }
	})
	.then(function (response){
		then(response);
	})
	.catch((error) => {
		console.log(error);
	});
}

function get(where, auth, then){
	axios.get(baseapiurl.concat(where), {
		headers: { Authorization: "Bearer ".concat(auth) }
	})
	.then(function (response){
		then(response);
	})
	.catch((error) => {
		console.log(error);
	});
}

function sha256(input){
	return crypto.createHash('sha256')
	.update(input)
	.digest('hex');
}

var servertest = http.createServer(function(request, response){
	console.dir(request.param)

	if (request.method == 'POST') {
	console.log('POST')
	var body = ''
	request.on('data', function(data) {
		body += data
		console.log('Partial body: ' + body)
    })
    request.on('end', function() {
      console.log('Body: ' + body)
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.end('post received')
    })
  } else {
    console.log('GET')
    var html = `
            <html>
                <body>
                    <form method="post" action="http://localhost:80">Name: 
                        <input type="text" name="name" />
                        <input type="submit" value="Submit" />
                    </form>
                </body>
            </html>`
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(html)
  }
})

var server = http.createServer(function(request, response){

})

async function main(){
	servertest.listen(80);
}

main();