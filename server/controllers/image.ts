import ImageRepository from "../repository/image";
import e from "express";
import Image from "../models/image";
import {getIo} from "../socket";
import {DEFAULT_URL} from "../adapters/mongo/repo/image";
import * as Sentry from "@sentry/node";

export default class ImageController{
    constructor(
       private imageRepository: ImageRepository,
    ) {}

    public getImageById = async (req: e.Request, res: e.Response) =>{
        try{
            const id = parseInt(req.params['id'])
            const image = await this.imageRepository.getImageByUserId(id)
            res.status(200).send(JSON.stringify(image))
        }catch (error: any) {
            Sentry.captureException(error);
            res.status(200).send(JSON.stringify({ image_url: DEFAULT_URL}));
        }
    }

    public deleteImage = async (req: e.Request, res: e.Response) => {
        try{
            const id = parseInt(req.params['id'])
            const result = await this.imageRepository.deleteUserImage(id)
            getIo().emit('image')
            res.json({ result });
        }catch (error: any) {
            Sentry.captureException(error);
            res.status(400).json({ error: error.message });
        }
    }

    public updateImage = async (req: e.Request, res: e.Response)=> {
        try {
            const file = req.file;
            const newImage = new Image(parseInt(req.params['id']), `http://localhost:8080/img/${file!.filename}`)
            const image = await this.imageRepository.updateUserImage(parseInt(req.params['id']), newImage)
            getIo().emit('image')
            res.status(200).send(JSON.stringify(image))
        }catch (error: any){
            Sentry.captureException(error);
            res.status(400).json({ error: error.message });
        }
    }
}