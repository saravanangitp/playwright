import { APIRequestContext, expect } from "@playwright/test";

let baseURL:any;
const caseEndPoint = '/services/data/v63.0/sobjects/Case';
const contactEndPoint = '/services/data/v63.0/sobjects/Contact';
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

export async function createCase(request:APIRequestContext){
        const createCaseRequest = await request.post(`${baseURL}${caseEndPoint}`, {
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            },
            data: {
                "status": "Escalated", //random names
                "Origin": "Email"
            }
        })
        // await expect(createCaseRequest.status()).toBe(201);
        const resBody = await createCaseRequest.json();
        // console.log(resBody)
        let caseId = await resBody.id;
        console.log(`Case ID: ${caseId}`)
        return caseId;
}

export async function getCaseById(request:APIRequestContext, caseId){
    console.log(`GET API Endpoint: ${baseURL}${caseEndPoint}/${caseEndPoint}`);
    const getCaseRequest = await request.get(`${baseURL}${caseEndPoint}/${caseId}`, {
        headers: {
            "Authorization": auth,
            "Content-Type": "application/json"
        }
    })
    await expect(getCaseRequest.status()).toBe(200);
    const resBody = await getCaseRequest.json();
    // console.log(resBody)
    console.log(`Case Number: ${resBody.CaseNumber}`)
    console.log('Get API completed successfully')
    return resBody.CaseNumber;
}

export async function deleteCase(request:APIRequestContext, caseId){
    //DELETE method
    console.log(`DELETE API Endpoint: ${baseURL}${caseEndPoint}/${caseId}`);
    const deleteCaseRequest = await request.delete(`${baseURL}${caseEndPoint}/${caseId}`, {
        headers: {
            "Authorization": auth,
            "Content-Type": "application/json"
        }
    })
    await expect(deleteCaseRequest.status()).toBe(204);
    console.log('DELETE API completed successfully')
}

export async function getContact(request:APIRequestContext, dashboardName){
    console.log(`GET API Endpoint: ${baseURL}${contactEndPoint}`);
    const getContactRequest = await request.get(`${baseURL}${contactEndPoint}`, {
        headers: {
            "Authorization": auth,
            "Content-Type": "application/json"
        }
    })
    await expect(getContactRequest.status()).toBe(200);
    const resBody = await getContactRequest.json();
    // console.log(resBody)
    const recentItemsArr = await resBody.recentItems;
    let contactId = null;
    await recentItemsArr.forEach(element => {
        if(element.Name === dashboardName)
        {
            contactId = element.Id;
        }
    });
    console.log(`Contact ID: ${contactId}`)
    console.log('Get API completed successfully')
    return contactId;
}

export async function updateContact(request:APIRequestContext, contactId){
    const updateContactRequest = await request.patch(`${baseURL}${contactEndPoint}/${contactId}`,{
        headers:{
            "Authorization": auth,
            "Content-Type": "application/json"
        },
        data: {
            "Email": "test@testleaf.com",
            "Title": "test",
            "Phone": "1234567890",
            "Department": "Sales"
        }
    })
    await expect(updateContactRequest.status()).toBe(204);
    await console.log('Update the contact record using API successfully')
}

export async function deleteContact(request:APIRequestContext, contactId){
    //DELETE method
    console.log(`DELETE API Endpoint: ${baseURL}${contactEndPoint}/${contactId}`);
    const deleteContactRequest = await request.delete(`${baseURL}${contactEndPoint}/${contactId}`, {
        headers: {
            "Authorization": auth,
            "Content-Type": "application/json"
        }
    })
    await expect(deleteContactRequest.status()).toBe(204);
    console.log('DELETE API - Contact completed successfully')
}