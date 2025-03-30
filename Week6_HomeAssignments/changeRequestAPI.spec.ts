import { faker } from '@faker-js/faker'
import { test, chromium, request, expect } from "@playwright/test"

const baseURL = 'https://dev216320.service-now.com';
const changeRequestEndPoint = '/api/now/table/change_request';
const auth = 'Basic YWRtaW46VVkybU9VZV43cEBm';
let sys_Id = "";

test.describe.serial('API automation synchronously', async () => {
    test("API automation - POST API", async ({request}) => {
        //POST method
        console.log(`POST API Endpoint: ${baseURL}${changeRequestEndPoint}`);
        const createIncidentRequest = await request.post(`${baseURL}${changeRequestEndPoint}`, {
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            },
            data: {
                "short_description": "Learning api"
            }
        })
        await expect(createIncidentRequest.status()).toBe(201);
        const resBody = await createIncidentRequest.json();
        // console.log(resBody)
        sys_Id = await resBody.result.sys_id;
        console.log(sys_Id)
        console.log('POST API completed successfully')
    })

    test("API automation with GET API fixture", async ({ request }) => {
        //GET method
        console.log(`GET API Endpoint: ${baseURL}${changeRequestEndPoint}/${sys_Id}`);
        const getIncidentRequest = await request.get(`${baseURL}${changeRequestEndPoint}/${sys_Id}`, {
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            }
        })
        await expect(getIncidentRequest.status()).toBe(200);
        const resBody = await getIncidentRequest.json();
        // console.log(resBody)
        console.log('Get API completed successfully')
    })

    test("API automation - Patch method", async ({ request }) => {
        //PATCH method
        console.log(`PATCH API Endpoint: ${baseURL}${changeRequestEndPoint}/${sys_Id}`);
        const patchIncidentRequest = await request.patch(`${baseURL}${changeRequestEndPoint}/${sys_Id}`, {
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            },
            data: {
                "description": "Learning api - patch",
                "short_description": faker.lorem.words(4)
            }
        })
        await expect(patchIncidentRequest.status()).toBe(200);
        const resBody = await patchIncidentRequest.json();
        // console.log(resBody)
        console.log('PATCH API completed successfully')
    })

    test("API automation - DELETE method", async ({ request }) => {
        //DELETE method
        console.log(`DELETE API Endpoint: ${baseURL}${changeRequestEndPoint}/${sys_Id}`);
        const deleteIncidentRequest = await request.delete(`${baseURL}${changeRequestEndPoint}/${sys_Id}`, {
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            }
        })
        await expect(deleteIncidentRequest.status()).toBe(204);
        console.log('DELETE API completed successfully')
    })
})