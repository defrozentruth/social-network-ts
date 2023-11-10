import supertest from "supertest";
import server from "../server";

const request = supertest(server)

describe('Endpoints tests', () => {
    test('POST /api/auth/register should return created user', async () => {
        const response = await request.post('/api/auth/register').send({
            email: "qweqwe@123",
            password: "123",
            name: "example"
        });

        expect(response.status).toBe(200);
        expect(JSON.parse(response.text)).toEqual({
            id: 13,
            name: "example",
            email: "qweqwe@123",
            status: "unverified",
            role: "user",
            friends: []
        })
    });

    test('POST /api/auth/login should return user and token', async () => {
        const response = await request.post('/api/auth/login').send({
            email: "Daniil.Bezzubov@yandex.ru",
            password: "123"
        });

        expect(response.status).toBe(200);
        console.log(response)
        expect(JSON.parse(response.text).user).toEqual({
            id: 11,
            name:"Даниил Беззубов",
            email:"Daniil.Bezzubov@yandex.ru",
            date:"2003-11-11T00:00:00.000Z",
            status:"active",
            role:"admin",
            friends:[8,3,2,4,1]
        })
        expect(JSON.parse(response.text).token).toBeTruthy()
    });
})