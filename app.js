const http = require('http');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET') {
    if (url === '/') {
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello, world!');
    } else if (url === '/users') {
      res.setHeader('Content-Type', 'application/json');
      const users = [
        { name: 'User 1', age: 18 },
        { name: 'User 2', age: 20 },
        { name: 'User 3', age: 25 }
      ];
      res.end(JSON.stringify(users));
    }
  }
  
  if (method === 'POST') {
    if (url === '/users') {
      let body = '';
      
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        const user = parse(body);
        res.statusCode = 201;
        res.end('User created successfully');
      });
    }
  }
  
  if (method === 'PUT') {
    if (url === '/users') {
      let body = '';
      
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        const user = parse(body);
        res.statusCode = 200; 
        res.end('User updated successfully');
      });
    } 
  }
  
  if (method === 'DELETE') {
    if (url === '/users') {
      res.statusCode = 200; 
      res.end('User deleted successfully');
    } 
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
