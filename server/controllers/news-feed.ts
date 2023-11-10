import UserRepository from "../repository/user";
import {Error} from "../types/error";
import NewsRepository from "../repository/news";
import News from "../models/news";

export default class NewsFeedController {
    constructor(private newsRepo: NewsRepository, private userRepo: UserRepository) {}

    public getNewsFeed = async (id: number) => {

        const user = await this.userRepo.getById(id)
        console.log(user)
        const friends = user.friends;

        if (!friends) {
            throw new Error(404, `User with id ${id} friend not found`);
        }

        let result: News[] = [];


        for (const elem of friends) {
            result.push(...[...await this.newsRepo.getNewsByAuthorId(elem)])
        }

        return result.sort((a: News, b: News) => {
            const dateA = a.date ? new Date(a.date) : null;
            const dateB = b.date ? new Date(b.date) : null;

            if (dateA && dateB) {
                return dateA.getTime() - dateB.getTime();
            }

            return 0;
        });
    }
}