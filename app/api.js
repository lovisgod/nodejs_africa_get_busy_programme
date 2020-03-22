class API {
    constructor() {}
    static exec(res, req) {
        let routes = API.routes;
        switch (routes) {
            case 'api':
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end('<h1>Ayooluwa Olosunde</h1>', 'utf-8');
                break;
            case 'api/v1':
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end('welcome to api system', 'utf-8');
                break;
            case 'api/message' :
                console.log(req);
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end('sample form', 'utf-8');
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('The route you requested for is not found', 'utf-8');
                break;
        }
        if (routes == 'api'){
            
        }                   
    }

    static catchAPIrequest(v) {
        v[0] == '/' ? v = v.substring(1, v.length) : null;
        if (v.constructor === String)
        // set the value of API.parts if the first element of the req url is api
            if(v.split('/')[0] == 'api'){
                console.log(v);
                API.routes = v;
                return true;
            }
            return false
    }
}

API.routes = null;

module.exports = API;
