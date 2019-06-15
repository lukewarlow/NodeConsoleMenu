import {AbstractMenu} from "../src/AbstractMenu";
import {MenuItem} from "../src/MenuItem";

export class TestMenu extends AbstractMenu {
    private showHiddenMenu: boolean;

    public constructor() {
        super("Welcome to the test menu");
        this.showHiddenMenu = false;
    }

    protected init() {
        this.addMenuItem(new MenuItem(0, "Exit Menu").setAsExitOption());
        this.addMenuItem(new MenuItem(1, "Test sub menu", null, new TestSubMenu()));

        this.addMenuItem(new MenuItem(2, "Show hidden menu item", () => {
            console.log("Showing hidden menu item");
            this.showHiddenMenu = true;
        }));

        this.addHiddenMenuItem(new MenuItem(3, "Hidden menu item", () => console.log("I was a hidden menu item")))
    }

    protected updateMenuItems() {
        if (this.showHiddenMenu) this.showMenuItem(3);
    }
}

export class TestSubMenu extends AbstractMenu {
    constructor() {
        super("Welcome to the test sub menu.");
    }

    protected init() {
        this.addMenuItem(new MenuItem(0, "Exit current menu").setAsExitOption());
        this.addMenuItem(new MenuItem(1, "Test submenu item", () => console.log("Test sub menu item selected")))
    }
}