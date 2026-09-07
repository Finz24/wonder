import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const base=path.dirname(fileURLToPath(import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png'};
http.createServer((req,res)=>{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const target=path.resolve(base,'.'+(pathname==='/'?'/index.html':pathname));if(!target.startsWith(base+path.sep)){res.writeHead(403);return res.end()}fs.readFile(target,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':types[path.extname(target)]||'text/plain'});res.end(err?'Not found':data)})}).listen(4174,'127.0.0.1',()=>console.log('Wonder prototype: http://127.0.0.1:4174'));
