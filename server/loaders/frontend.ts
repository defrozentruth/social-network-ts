import express, {Express, Request, Response} from 'express';
import repositoryPool from "../repository/repository-pool.js";


export default (server: Express) => {
    server.get('/', (req: Request, res: Response) => {
        res.render('startPage');
    });

    server.get('/user', async (req: Request, res: Response) => {
        try {
            const response = await fetch('http://localhost:8080/api/user', { method: 'GET' });

            if (response.ok) {
                const userData = await response.json();
                res.render('usersPage', { users: userData });
            } else {
                console.error('Произошла ошибка при получении данных:', response.status);
                res.status(500).send('Произошла ошибка при получении данных');
            }
        } catch (error: any) {
            console.error('Произошла ошибка:', error.message);
            res.status(500).send('Произошла ошибка');
        }
    });

    server.get('/friends/:id(\\d+)', async (req: Request, res: Response) => {
        const currentUserId = parseInt(req.params["id"]);
        try {
            let renderData: any = {};
            let response = await fetch(`http://localhost:8080/api/user/${currentUserId}`, { method: 'GET' });

            if (response.ok) {
                renderData.currentUser = await response.json();
            } else {
                console.error('Произошла ошибка при получении данных:', response.status);
                res.status(500).send('Произошла ошибка при получении данных');
                return;
            }

            response = await fetch(`http://localhost:8080/api/friend/${currentUserId}`, { method: 'GET' });

            if (response.ok) {
                renderData.users = await response.json();
            } else {
                console.error('Произошла ошибка при получении данных:', response.status);
                res.status(500).send('Произошла ошибка при получении данных');
                return;
            }

            res.render('usersFriends', { users: renderData.users, user: renderData.currentUser });
        } catch (error: any) {
            console.error('Произошла ошибка:', error.message);
            res.status(500).send('Произошла ошибка');
        }
    });

    server.get('/message/:id(\\d+)', async (req: Request, res: Response) => {
        const currentUserId = parseInt(req.params["id"]);
        try {
            let responseData: any = {}
            const response = await fetch(`http://localhost:8080/api/user/${currentUserId}`, {method: "GET"})
            if(response.ok){
                responseData.currentUser = await response.json()
            }
            res.render('usersChats', {usersChats: await repositoryPool.messageRepo.getUserChats(currentUserId), user: responseData.currentUser});
        } catch (error: any) {
            console.error('Произошла ошибка:', error.message);
            res.status(500).send('Произошла ошибка');
        }
    });

    server.get('/news/:id(\\d+)', async (req: Request, res: Response) => {
        const currentUserId = parseInt(req.params["id"]);
        try {
            let responseData: any = {}
            const response = await fetch(`http://localhost:8080/api/user/${currentUserId}`, {method: "GET"})
            if(response.ok){
                responseData.currentUser = await response.json()
            }
            res.render('usersNews', {usersNews: await repositoryPool.newsRepo.getNews(responseData.currentUser["friends"]), user: responseData.currentUser});
        }catch (error: any) {
            console.error('Произошла ошибка:', error.message);
            res.status(500).send('Произошла ошибка');
        }
    });

    server.get('/user/edit/:id(\\d+)', async (req: Request, res: Response) => {
        const user_id = parseInt(req.params['id'])
        try {
            let responseData: any = {}
            const response = await fetch(`http://localhost:8080/api/user/${user_id}`, {method: "GET"})
            if(response.ok){
                responseData.currentUser = await response.json()
            }
            res.render('editUser', {user: responseData.currentUser});
        }catch (error: any) {
            console.error('Произошла ошибка:', error.message);
            res.status(500).send('Произошла ошибка');
        }
    })
}