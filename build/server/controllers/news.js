export default class NewsController {
    newsRepository;
    constructor(newsRepository) {
        this.newsRepository = newsRepository;
    }
    getAllNews = async (req, res) => {
        try {
            const news = await this.newsRepository.getAllNews();
            res.status(200).send(JSON.stringify(news));
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    };
    getNewsByAuthorId = async (req, res) => {
        try {
            const id = parseInt(req.params["id"]);
            const news = await this.newsRepository.getNewsByAuthorId(id);
            res.status(200).send(JSON.stringify(news));
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    };
}
//# sourceMappingURL=news.js.map