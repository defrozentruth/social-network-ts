import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';

import express from 'express';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import {__front_src_dir, __project_dir, __public_dir} from "./config";
import backend from "./loaders/backend";
import frontend from "./loaders/frontend";
import cors from 'cors'
import mongoose from 'mongoose'
import {initIo} from "./socket";

const server = express();

// pug
server.set('view engine', 'pug');
server.set('views', path.join(__front_src_dir, 'views'));

// process public files
server.use(express.static(__public_dir));

// compress all responses with gzip
server.use(compression());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cookieParser());


const options = {
    'credentials': true,
    'origin': true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTPMethod-Override,Content-Type,Cache-Control,Accept',
}

server.use(cors(options))

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

mongoose.connect(
    'mongodb://localhost:27017/SN_SATA').then(
    ()=> console.log(`Connected to database`)
)

initIo(httpServer)

httpServer.listen(8080, () => {
    console.log('Server started at http://localhost:8080/');
});
httpsServer.listen(8443, () => {
    console.log('Server started at https://localhost:8443/');
});

export default server;