'use strict'
/**
 * TodoList.js
 * 
 * This class represents a list with all the items in our todo list.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
class TodoList {
    /**
     * The constructor creates a default, empty list.
     */
    constructor() {
        this.name = "Unnknown";
        this.owner = "Unknown";
        this.items = new Array();
    }   
    
    // GETTER/SETTER METHODS

    setName(initName) {
        this.name = initName;
    }

    getName() {
        return this.name;
    }

    setOwner(initOwner) {
        this.owner = initOwner;
    }

    getOwner() {
        return this.owner;
    }

    /**
     * Adds an item to the end of the list.
     * 
     * @param {TodoListItem} itemToAdd Item to add to the list.
     */
    addItem(itemToAdd) {
        this.items.push(itemToAdd);
    }

    /**
     * Finds and then removes the argument from the list.
     * 
     * @param {TodoListItem} itemToRemove Item to remove from the list.
     */
    removeItem(itemToRemove) {
        let indexOfItem = this.items.indexOf(itemToRemove);
        this.items.splice(indexOfItem, 1);
    }

    /**
     * Finds the index of the argument in the list.
     * 
     * @param {TodoListItem} item Item to search for in the list.
     */
    getIndexOfItem(item) {
        for (let i = 0; i < this.items.length; i++) {
            let testItem = this.items[i];
            if (testItem === item) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Gets and returns the item at the index location.
     * 
     * @param {Number} index Location in the list of item to return.
     */
    getItemAtIndex(index) {
        return this.items[index];
    }

    swapItems(index1, index2) {
        if (index1 < 0 || index1 >= this.items.length || index2 < 0 || index2 >= this.items.length) {
            console.log("Can't swap");
        }
        else {
            let temp = this.getItemAtIndex(index1);
            this.items[index1] = this.getItemAtIndex(index2);
            this.items[index2] = temp;
        }
    }

    getLength() {
        return this.items.length;
    }
}