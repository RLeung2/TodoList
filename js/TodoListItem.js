'use strict'
/**
 * TodoListItem.js
 * 
 * This class represents an item for our list.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
class TodoListItem {
    /**
     * The constructor creates a default, empty item.
     */
    constructor() {
        this.description = "Unknown";
        this.assignedTo = "Unknown";
        this.dueDate = "Unknown";
        this.completed = false;
    }

    // GETTER/SETTER METHODS

    getDescription() {
        return this.description;
    }

    setDescription(initDescription) {
        this.description = initDescription;
    }

    getAssignedTo() {
        return this.assignedTo;
    }

    setAssignedTo(initAssignedTo) {
        this.assignedTo = initAssignedTo;
    }

    getDueDate() {
        return this.dueDate;
    }

    setDueDate(initDueDate) {
        this.dueDate = initDueDate;
    }

    isCompleted() {
        return this.completed;
    }

    setCompleted(initCompleted) {
        this.completed = initCompleted;
    }
}