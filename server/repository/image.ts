import Image from "~server-src/models/image";

export default interface ImageRepository{
    getImageByUserId(id: number): Promise<Image>
    updateUserImage(id: number, image: Image): Promise<Image>
    deleteUserImage(id: number): Promise<boolean>
}