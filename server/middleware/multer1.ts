import multer from "multer";
import path from "path";
import {__public_dir} from "../config";

export default multer({
    dest: path.join(__public_dir, 'img')
})