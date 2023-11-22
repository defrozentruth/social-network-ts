import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { __front_src_dir, __project_dir, __public_dir } from "./config.js";
import backend from "./loaders/backend.js";
import frontend from "./loaders/frontend.js";
const server = express();
server.set('view engine', 'pug');
server.set('views', path.join(__front_src_dir, 'views'));
server.use(express.static(__public_dir));
server.use(compression());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
backend(server);
frontend(server);
const privateKey = fs.readFileSync(path.join(__project_dir, 'ssl_keys/example.key'), 'utf-8');
const certificate = fs.readFileSync(path.join(__project_dir, 'ssl_keys/example.crt'), 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate,
};
const httpServer = http.createServer(server);
const httpsServer = https.createServer(credentials, server);
httpServer.listen(8080, () => {
    console.log('Server started at http://localhost:8080/');
});
httpsServer.listen(8443, () => {
    console.log('Server started at https://localhost:8443/');
});
//# sourceMappingURL=index.js.map