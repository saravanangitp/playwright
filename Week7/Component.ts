import { Page, chromium} from '@playwright/test';

export class WebComponent {    
    page: Page;
    constructor() {
        const { selectors, chromium } = require('@playwright/test');
        this.page = chromium.launch({ headless: false });
        // this.page.goto('https://example.com');
    }

    async click() {
        // await this.page.click(selector);
        await console.log(`Clicked on`);
    }

    async focus() {
        // await this.page.focus(selector);
        await console.log(`Focused on`);
    }
}

export class Button extends WebComponent {
    constructor() {
        super();
    }
    async click() {
        await console.log('button click');
    }
}

export class TextInput extends WebComponent {
    public value: string = "";

    constructor() {
        super();
    }

    async enterText(text: string) {
        this.value = text;
        await console.log('Entered text: ' + this.value);
    }
}


async function testComponents() {
    const button = new Button();
    await button.click(); // Simulate button click
    await button.focus(); // Simulate button focus

    const textInput = new TextInput();
    await textInput.focus(); // Simulate text input focus
    await textInput.click();
    await textInput.enterText('Hello, World!'); // Simulate entering text
    
}

testComponents().catch(err => console.error(err));
// Export the classes for use in other files