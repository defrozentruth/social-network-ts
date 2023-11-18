import { Error } from "../types/error.js";
export default class NewsFeedController {
    newsRepo;
    userRepo;
    constructor(newsRepo, userRepo) {
        this.newsRepo = newsRepo;
        this.userRepo = userRepo;
    }
    getNewsFeed = async (id) => {
        const user = await this.userRepo.getById(id);
        console.log(user);
        const friends = user.friends;
        if (!friends) {
            throw new Error(404, `User with id ${id} friend not found`);
        }
        let result = [];
        for (const elem of friends) {
            result.push(...[...await this.newsRepo.getNewsByAuthorId(elem)]);
        }
        return result.sort((a, b) => {
            const dateA = a.date ? new Date(a.date) : null;
            const dateB = b.date ? new Date(b.date) : null;
            if (dateA && dateB) {
                return dateA.getTime() - dateB.getTime();
            }
            return 0;
        });
    };
}
//# sourceMappingURL=news-feed.js.map