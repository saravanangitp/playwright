import { faker } from "@faker-js/faker";
import { APIRequestContext, expect } from "@playwright/test";
import { access } from "fs";

const grant_type = "password";
const client_id = "";
const client_secret = "";
const uname = "";
const pwd = "";
let access_token: any;
let inst_URL: any;
let token_type:any;
const leadEndPoint= '/services/data/v63.0/sobjects/Lead';
const dashboardEndPoint= '/services/data/v63.0/sobjects/Dashboard';

export async function generateSFToken(request:APIRequestContext){
    const oAuthRequest = await request.post(`https://login.salesforce.com/services/oauth2/token`, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
            "grant_type": grant_type,
            "client_id": client_id,
            "client_secret": client_secret,
            "username": uname,
            "password": pwd
        }
    })
    expect(oAuthRequest.status()).toBe(200);
    const resp = await oAuthRequest.json();
    token_type = await resp.token_type;
    access_token = token_type + " " + await resp.access_token;
    inst_URL = await resp.instance_url;
    console.log('Salesforce Token generated successfully');
}

export async function createLead(request:APIRequestContext){
    const createLeadReq = await request.post(`${inst_URL}${leadEndPoint}`, {
        headers: {
            "Authorization": access_token,
            "Content-Type": "application/json"
        },
        data: {
            "Company": "testLeaf",
            "LastName": "Marathon2",
            "Salutation": "Mr."
        }
    })
    await expect(createLeadReq.status()).toBe(201);
    await console.log(`Lead created succesfully`);
    const resp = await createLeadReq.json();
    let leadId = await resp.id;
    return leadId;
}

export async function getLead(request:APIRequestContext, leadId, propertyName, propertyValue){
    const getLeadRequest = await request.get(`${inst_URL}${leadEndPoint}/${leadId}`, {
        headers: {
            "Authorization": access_token,
            "Content-Type": "application/json"
        }
    })

    await expect(getLeadRequest.status()).toBe(200);
    const resp = await getLeadRequest.json();
    // console.log(resp);
    // const companyName = await resp.company;
    await expect(resp).toHaveProperty(propertyName, propertyValue);
    await console.log(`${propertyName} property having the expected value ${propertyValue} and it is verified using GETLead API successfully`);
}

export async function updateLead(request:APIRequestContext, leadId){
    const updateLeadRequest = await request.patch(`${inst_URL}${leadEndPoint}/${leadId}`,{
        headers:{
            "Authorization": access_token,
            "Content-Type": "application/json"
        },
        data: {
            "FirstName": "Marathon2.0",
            "Title": "testtitle"
        }
    })
    await expect(updateLeadRequest.status()).toBe(204);
    await console.log('Update the lead record using API successfully')
}

export async function getDashboard(request:APIRequestContext, dashboardName){
    const getLeadRequest = await request.get(`${inst_URL}${dashboardEndPoint}`, {
        headers: {
            "Authorization": access_token,
            "Content-Type": "application/json"
        }
    })
    // await expect(getLeadRequest.status()).toBe(200);
    const resp = await getLeadRequest.json();
    let dashboardId=null;
    const recentItemsArr = await resp.recentItems;

    await recentItemsArr.forEach(element => {
        if(element.Title === dashboardName)
        {
            dashboardId = element.Id;
        }
    });
    // dashboardId = await recentItemsArr.find(element => element.Title === dashboardName)?.Id;
    return dashboardId;
}

export async function deleteDashboard(request:APIRequestContext, dashboardId){
    if(dashboardId != null)
    {
        const deleteDashboardRequest = await request.delete(`${inst_URL}${dashboardEndPoint}/${dashboardId}`, {
            headers: {
                "Authorization": access_token,
                "Content-Type": "application/json"
            }
        })
        // await console.log(deleteDashboardRequest)
        await expect(deleteDashboardRequest.status()).toBe(204);
        await console.log(`Dashboard record is deleted successfully`);
    }
    else
    {
        console.log('Dashboard ID is null')
    }
}