import { faker } from "@faker-js/faker";
import { APIRequestContext, expect } from "@playwright/test";

let baseURL:any;
const opportunityEndPoint = '/services/data/v63.0/sobjects/Opportunity';
let auth = 'Bearer ';
let accessToken:any;
const grant_type = "password";
const client_id = "";
const client_secret = "";
const username = "vanansaransecondary856@agentforce.com";
const password = "";
let token_type:any;

export async function generateToken(request:APIRequestContext){
    const oAuthRequest = await request.post(`https://login.salesforce.com/services/oauth2/token`, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
            "grant_type": grant_type,
            "client_id": client_id,
            "client_secret": client_secret,
            "username": username,
            "password": password
        }
    })
    const resBody = await oAuthRequest.json();
    // console.log(resBody)
    accessToken = await resBody.access_token;
    baseURL = await resBody.instance_url;
    token_type = await resBody.token_type;
    auth = auth + accessToken;
    console.log(`Base URL ${baseURL}`);
    console.log('Token generated successfully')

    return {
        accessToken,
        baseURL,
        token_type
    }
}

export async function createOpportunity(request:APIRequestContext){
        const createOpportunityRequest = await request.post(`${baseURL}${opportunityEndPoint}`, {
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            },
            data: {
                "name": faker.word.noun(), //random names
                "closedate": faker.date.recent(), //random names
                "StageName": "Prospecting"
            }
        })
        // await expect(createOpportunityRequest.status()).toBe(201);
        const resBody = await createOpportunityRequest.json();
        // console.log(resBody)
        let opportunityId = await resBody.id;
        return opportunityId;
}

export async function getOpportunityById(request:APIRequestContext, opportunityId){
    console.log(`GET API Endpoint: ${baseURL}${opportunityEndPoint}/${opportunityId}`);
    const getOpportunityRequest = await request.get(`${baseURL}${opportunityEndPoint}/${opportunityId}`, {
        headers: {
            "Authorization": auth,
            "Content-Type": "application/json"
        }
    })
    await expect(getOpportunityRequest.status()).toBe(200);
    const resBody = await getOpportunityRequest.json();
    // console.log(resBody)
    console.log(`Opportunity Name: ${resBody.Name}`)
    console.log('Get API completed successfully')
}

export async function updateOpportunity(request:APIRequestContext, opportunityId){
    //PATCH method
    console.log(`PATCH API Endpoint: ${baseURL}${opportunityEndPoint}/${opportunityId}`);
    const patchOpportunityRequest = await request.patch(`${baseURL}${opportunityEndPoint}/${opportunityId}`, {
        headers: {
            "Authorization": auth,
            "Content-Type": "application/json"
        },
        data: {
            "Amount": "10",
            "Type": "Existing Customer - Upgrade"
        }
    })
    await expect(patchOpportunityRequest.status()).toBe(204);
    // const resBody = await patchOpportunityRequest.json();
    // console.log(resBody)
    console.log('PATCH API completed successfully')
}

export async function deleteOpportunity(request:APIRequestContext, opportunityId){
    //DELETE method
    console.log(`DELETE API Endpoint: ${baseURL}${opportunityEndPoint}/${opportunityId}`);
    const deleteOpportunityRequest = await request.delete(`${baseURL}${opportunityEndPoint}/${opportunityId}`, {
        headers: {
            "Authorization": auth,
            "Content-Type": "application/json"
        }
    })
    await expect(deleteOpportunityRequest.status()).toBe(204);
    console.log('DELETE API completed successfully')
}