import BaseController from "./BaseController";
import UploadService from "../services/UploadService";
import { Request, Response } from "express";
import { IUpload } from "../models/Upload";

declare type TEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex" | undefined;

export default class UploadController extends BaseController {
    constructor(service:UploadService = new UploadService()) {
        super(service, {
            create: {
                requireAdmin: true
            },
            update: {
                disabled: true
            },
            deleteOne: {
                requireAdmin: true
            },
            getAll: {
                disabled: true
            }
        });
    }

    private getTypeFromData(data:string):null | {type:string, encoding:TEncoding} {
        let pieces = data.match(/data:([^;]+);(.*)/);

        if(pieces == null || pieces.length < 3) {
            return null;
        }

        return {
            type: pieces[1],
            encoding: pieces[2] as TEncoding
        };
    }

    public async getOne(req:Request, res:Response) {
        return await this.execute(req, res, this.config.getOne, async (req, res) => {
            let item:IUpload = await this.service.getById(req.params.id) as IUpload;
            if(!item) {
                return res.status(404).send();
            }

            let pieces = item.data.split(",");
            if(pieces.length < 2) {
                return res.status(400).send();
            }

            let typeAndEncoding = this.getTypeFromData(pieces[0]);
            
            if(typeAndEncoding === null) {
                return res.status(400).send();
            }

            let img = new Buffer(pieces[1], typeAndEncoding.encoding);
            return res.type(typeAndEncoding.type).send(img);
        });
    }
}
