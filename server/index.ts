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
import * as Sentry from "@sentry/node";

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

Sentry.init({
    dsn: 'https://1ef2fe9affc4e612142273d028b71962@o4506246486753280.ingest.sentry.io/4506246513098752',
})

const options = {
    'credentials': true,
    'origin': true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTPMethod-Override,Content-Type,Cache-Control,Accept',
}

server.use(cors(options))

server.use(Sentry.Handlers.requestHandler());
backend(server);
frontend(server);
server.use(Sentry.Handlers.errorHandler());

const privateKey = fs.readFileSync(path.join(__project_dir, 'ssl_keys/example.key'), 'utf-8');
const certificate = fs.readFileSync(path.join(__project_dir, 'ssl_keys/example.crt'), 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
};

const httpServer = http.createServer(server);
const httpsServer = https.createServer(credentials, server);

mongoose.connect(
    'mongodb://127.0.0.1:27017/lab3').then(
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