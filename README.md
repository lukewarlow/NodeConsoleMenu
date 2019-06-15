
# Node Console Menu
![license](https://img.shields.io/hexpm/l/plug.svg)

This library provides a way to quickly create the menu for your node console app. Examples are written in TypeScript.

##  Overview

### Classes

#### AbstractMenu
This is the abstract class you need to extend in your menus.
Its constructor takes in a title which is displayed at the top of the menu. This should be called from your implementation's constructor. Like so:
```typescript
public constructor() { super("Menu Title"); }
```
##### Methods
- `init()` this needs overriding in your implementation and is where you add the items to the menu.
- `display()` this starts this menu. This only needs to be called on the root menu in your system, as all sub-menus are handled by this library.
- `addMenuItem(new MenuItem(id, description, action (or null), subMenu (leave blank for action)))` this adds an item to the menu. 
- `addHiddenMenuItem(new MenuItem(id, description, action (or null), subMenu (leave blank for action)))` this is a helper method that adds a menu item, which is then hidden.
- `updateMenuItems()` this can be overridden per menu to update items based on changes to your application, such as showing hidden menu items if they're now needed.
- `showMenuItem(id)` this can be used to show hidden menu items, most commonly in the method above. This uses the unique id given to the menu item.
- `hideMenuItem(id)` this can be used to hide menu items.

#### MenuItem
This is the class used to define items for the menus in your system. 
It has two constructors one for if the item is a sub menu and another for if it's an action. 
These should be called like this: `new MenuItem(id, description, action (or null), subMenu (leave blank for action))`
##### Methods
- `hide()` which is used on menu items, to hide them from the list.
- `show()` which is used on hidden menu items, to show them in the list.
- `setAsExitOption()` which is used to set menu items as the exit option for a menu, either going to the parent menu, or exiting the application.

## Example
#### Main Class
```typescript
let mainMenu = new MainMenu();
mainMenu.display();
```
#### Main Menu Class
```typescript
export class MainMenu extends AbstractMenu {
    public constructor() {
        super("Welcome to the main menu");
    }

    protected init() {
        this.addMenuItem(new MenuItem(100, "Exit menu").setAsExitOption());
        this.addMenuItem(new MenuItem(101, "Print Hello World", () => { console.log("Hello World!"); }));
    }
}
```

#### Output
```text
Welcome to the main menu
0. Exit menu
1. Print Hello World
Select option: 1
Hello World!

Welcome to the main menu
0. Exit menu
1. Print Hello World
Select option: 0

```

Look in demo for a full example implementation of the library.