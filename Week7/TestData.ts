import {Page} from 'playwright';

export class TestData {
    page: Page;
    userName: string;
    password: string;
    url: string;

    constructor(page: Page) {
        this.page = page;
    }
    
    async enterCredentials() {
        await this.page.fill("#username",this.userName)
        await this.page.fill("#password",this.password)
        await console.log(`Entered the credentials: ${this.userName}, ${this.password}`);
    }

    async navigateToLoginPage(url: string) {
        await this.page.goto(url);
        await console.log(`Navigated to ${url}`);
    }
}

export class LoginTestData extends TestData {

    constructor(page: Page) {
        super(page);
    }

    async enterUserName(username: string) {
        this.userName = username;
    }

    async enterPassword(pwd: string) {
        this.password = pwd;
    }
}