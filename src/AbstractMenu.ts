import {MenuItem} from "./MenuItem";
import {question} from "readline-sync";

export abstract class AbstractMenu {
    private readonly title: string;
    private readonly menuItems: MenuItem[];

    protected constructor(title: string) {
        this.title = title;
        this.menuItems = [];
        this.init();
    }

    protected abstract init(): void;

    protected updateMenuItems() {}

    public async display() {
        let repeat = true;
        while (repeat) {
            this.updateMenuItems();
            console.log();
            console.log(this.title);
            for (let i = 0; i < this.menuItems.length; i++) {
                if (this.menuItems[i].isVisible) {
                    console.log(`${i}. ${this.menuItems[i].description}`);
                }
            }

            let itemIndex: any = question("Select option: ");

            if (isNaN(Number(itemIndex))) {
                console.log("Invalid option, you need to enter a number.");
            } else {
                let menuItem = this.menuItems[itemIndex as number];
                if (menuItem == null) {
                    console.log(`Invalid option. Option ${itemIndex} doesn't exist.`);
                    repeat = true;
                }
                else if (menuItem.isVisible) repeat = menuItem.run();
                else {
                    console.log(`Invalid option. Option ${itemIndex} is hidden.`);
                    repeat = true;
                }
            }
        }
    }

    public addMenuItem(menuItem: MenuItem) {
        if (!this.menuItems.includes(menuItem)) this.menuItems.push(menuItem);
        else throw Error(`Menu item with id ${menuItem.id} already exists!`);
    }

    public addHiddenMenuItem(menuItem: MenuItem) {
        this.addMenuItem(menuItem.hide());
    }

    public showMenuItem(itemId: number) {
        let index = this.menuItems.findIndex((value) => {
            return value.id == itemId;
        });
        this.menuItems[index].show();
    }

    public hideMenuItem(itemId: number) {
        let index = this.menuItems.findIndex((value) => {
            return value.id == itemId;
        });
        this.menuItems[index].hide();
    }
}
