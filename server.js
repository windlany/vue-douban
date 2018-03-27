var http = require('http');
var querystring = require('querystring');

http.createServer(function (req, res) {
    var body = '';
    
    req.on('data', function (chunk) {
        body += chunk;
    });
    
    req.on('end', function () {

        var reqVal = querystring.parse(body);
        console.log(reqVal);
    
        var option = {
            hostname: 'api.douban.com',
            path: reqVal.path + reqVal.content,
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
        var data = '';
        
        var new_Req = http.request(option, function (new_Res) {
            new_Res.setEncoding('utf8');
            new_Res.on('data', function (chunk) {
                data += chunk;
            }).on('end', function () {
                res.writeHead(200, {
                    'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, token, Accept'
                });
                res.write(data);
                res.end();
            });
        });
        new_Req.end();
    })
}).listen(3000, function () {
    console.log('listen 3000 port.');
})