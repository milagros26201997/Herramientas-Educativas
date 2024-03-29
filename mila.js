const http=require('http');
const url=require('url');
const fs=require('fs');

const mime = {
'html' : 'text/html',
'css' : 'text/css',
'jpg' : 'image/jpg',
'png' : 'image/png',
'PNG' : 'image/png',
'ico' : 'image/x-icon',
'gif' : 'image/gif',
'mp3' : 'audio/mpeg3',
'mp4' : 'video/mp4',
'ttf' : 'font/truetype',
'js'  : 'application/javascript',
'htt' : 'text/webviewhtml',
'sst' : 'application/vnd.ms-pki.certstore',
'woff2' : 'font/woff2',
'woff' : 'font/woff'

};

const servidor=http.createServer((pedido, respuesta) => {
const objetourl = url.parse(pedido.url);
let camino='fin'+objetourl.pathname;
if (camino=='fin/')
camino='fin/Principal.html';
fs.stat(camino, error => {
if (!error) {
fs.readFile(camino, (error,contenido) => { 
if (error) {
respuesta.writeHead(500, {'Content-Type': 'text/plain'});
respuesta.write('Error interno');
respuesta.end(); 
} else {
const vec = camino.split('.');
const extension=vec[vec.length-1];
const mimearchivo=mime[extension];
//console.log(vec);
respuesta.writeHead(200, {'Content-Type': mimearchivo});
respuesta.write(contenido);
respuesta.end();
}
});
} else {
respuesta.writeHead(404, {'Content-Type': 'text/html'});
respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>'); 
respuesta.end();
}
});
});

servidor.listen(8888);

console.log('Servidor web iniciado');