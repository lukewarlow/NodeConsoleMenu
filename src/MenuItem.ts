import {AbstractMenu} from "./AbstractMenu";


export class MenuItem
{
    public id: number;
    public description: string;
    public isVisible: boolean;
    private isExitOption: boolean;

    private readonly menu: AbstractMenu | null;
    private readonly action: Function | null;

    public constructor(id: number, description: string = "", action: Function | null = null, menu: AbstractMenu | null = null) {
        this.id = id;
        this.description = description;
        this.action = action;
        this.menu = menu;
        this.isExitOption = false;
        this.isVisible = true;
    }

    public hide(): MenuItem {
        this.isVisible = false;
        return this;
    }

    public show(): MenuItem {
        this.isVisible = true;
        return this;
    }

    public setAsExitOption(): MenuItem {
        this.isExitOption = true;
        return this;
    }

    public run(): boolean {
        if (this.menu != null) this.menu.display();
        else if (this.action != null) this.action();

        return !this.isExitOption;
    }
}