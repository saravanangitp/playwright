import { BrowserContext, chromium, Page } from 'playwright';

export class Browser{
    page: Page;
    
    constructor(page: Page){
        this.page = page;
    }

    async openURL(url: string): Promise<void> {
        console.log(`Opening URL: ${url}`);
        await this.page.goto(url);
    }

    async closeBrowser(): Promise<void> {
        console.log('Closing browser...');
        await this.page.close();
    }

    async navigateBack(): Promise<void> {
        console.log('Navigating back...');
        await this.page.goBack();
    }
}

export class Chrome extends Browser {
    constructor(page: Page) {
        super(page);
    }

    async openIncognito(): Promise<void> {
        console.log('Opening incognito window...');
    }

    async clearCache(): Promise<void> {
        console.log('Clearing cache...');
    }
}

export class Edge extends Browser {
    constructor(page: Page) {
        super(page);
    }

    async takeSnap(): Promise<void> {
        console.log('Taking a snapshot...');
    }

    async clearCookies(): Promise<void> {
        console.log('Clearing cookies...');
    }
}

export class Firefox extends Browser {
    constructor(page: Page) {
        super(page);
    }

    async readerMode(): Promise<void> {
        console.log('Enabling reader mode...');
    }

    async fullScreenMode(): Promise<void> {
        console.log('Enabling full screen mode...');
    }
}