'use strict'
/**
 * TodoListController.js
 * 
 * This file provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
class TodoListController {
    /**
     * The constructor sets up all event handlers for all user interface
     * controls known at load time, meaning the controls that are declared 
     * inside index.html.
     */
    constructor() {
        // SETUP ALL THE EVENT HANDLERS FOR EXISTING CONTROLS,
        // MEANING THE ONES THAT ARE DECLARED IN index.html

        // FIRST THE NEW LIST BUTTON ON THE HOME SCREEN
        this.registerEventHandler(TodoGUIId.HOME_NEW_LIST_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CREATE_NEW_LIST]);

        // THEN THE CONTROLS ON THE LIST SCREEN
        this.registerEventHandler(TodoGUIId.LIST_HEADING, TodoHTML.CLICK, this[TodoCallback.PROCESS_GO_HOME]);
        this.registerEventHandler(TodoGUIId.LIST_NAME_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_NAME]);
        this.registerEventHandler(TodoGUIId.LIST_OWNER_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_OWNER]);
        this.registerEventHandler(TodoGUIId.LIST_TRASH, TodoHTML.CLICK, this[TodoCallback.PROCESS_DELETE_LIST]);
        this.registerEventHandler(TodoGUIId.LIST_NEW_ITEM_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CREATE_NEW_ITEM]);
        
        this.registerEventHandler(TodoGUIId.MODAL_NO, TodoHTML.CLICK, this[TodoCallback.PROCESS_CANCEL_DELETE_LIST]);
        this.registerEventHandler(TodoGUIId.MODAL_YES, TodoHTML.CLICK, this[TodoCallback.PROCESS_CONFIRM_DELETE_LIST]);

        this.registerEventHandler(TodoGUIId.LIST_EDIT_SUBMIT_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_SUBMIT_ITEM_CHANGES]);
        this.registerEventHandler(TodoGUIId.LIST_EDIT_CANCEL_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CANCEL_ITEM_CHANGES]);

        document.getElementById(TodoGUIId.ITEM_DESCRIPTION_TEXTFIELD).value = "Unknown";
        document.getElementById(TodoGUIId.ITEM_ASSIGNED_TO_TEXTFIELD).value = "Unknown";
        document.getElementById(TodoGUIId.ITEM_DUE_DATE_PICKER).value = "Unknown";
        document.getElementById(TodoGUIId.ITEM_COMPLETED_CHECKBOX).checked = false;
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {TodoGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {TodoHTML} eventName The type of control for which to respond.
     * @param {TodoCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        control.addEventListener(eventName, callback);
    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    processChangeOwner() {
        let ownerTextField = document.getElementById(TodoGUIId.LIST_OWNER_TEXTFIELD);
        let newOwner = ownerTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListOwner(listBeingEdited, newOwner);
    }

    /**
     * This function is called when the user requests to create
     * a new list.
     */
    processCreateNewList() {
        // MAKE A BRAND NEW LIST
        window.todo.model.loadNewList();

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    /**
     * This function responds to when the user clicks on a link
     * for a list on the home screen.
     * 
     * @param {String} listName The name of the list to load into
     * the controls on the list screen.
     */
    processEditList(listName) {
        // LOAD THE SELECTED LIST
        window.todo.model.loadList(listName);

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome() {
        window.todo.model.goHome();
    }

    /**
     * This function is called in response to when the user clicks
     * on the Task header in the items table.
     */
    processSortItemsByTask() {
        // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Status header in the items table.
     */
    processSortItemsByStatus() {
        // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCRASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
        }
    }

    processSortItemsByDueDate() {
        // IF WE ARE CURRENTLY INCREASING BY DUE DATE SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCRASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
        }
    }

    processDeleteList() {
        window.todo.model.showModal();
    }

    processCancelDeleteList() {
        window.todo.model.closeModal();
    }

    processConfirmDeleteList() {
        let listToDelete = window.todo.model.shiftList();
        window.todo.model.removeList(listToDelete);
        window.todo.model.closeModal();
        setTimeout(function(){window.todo.model.goHome();}, 450);
    }

    processDeleteItem(itemIndex) {
        let currentList = window.todo.model.getListToEdit();
        let currentItem = currentList.getItemAtIndex(itemIndex);
        currentList.removeItem(currentItem);

        let currentListName = currentList.getName();
        window.todo.model.loadList(currentListName);

        event.stopPropagation();
    }

    processMoveItemUp(itemIndex) {
        let currentList = window.todo.model.getListToEdit();
        currentList.swapItems(itemIndex - 1, itemIndex);

        let currentListName = currentList.getName();
        window.todo.model.loadList(currentListName);

        event.stopPropagation();
    }

    processMoveItemDown(itemIndex) {
        let currentList = window.todo.model.getListToEdit();
        currentList.swapItems(itemIndex, Number(itemIndex) + 1);

        let currentListName = currentList.getName();
        window.todo.model.loadList(currentListName);

        event.stopPropagation();
    }

    processCreateNewItem() {
        window.todo.model.goEdit();
    }

    processSubmitItemChanges() {
        let currentList = window.todo.model.getListToEdit();
        let currentItem = window.todo.model.getItemToEdit();

        currentItem.setDescription(document.getElementById(TodoGUIId.ITEM_DESCRIPTION_TEXTFIELD).value);
        currentItem.setAssignedTo(document.getElementById(TodoGUIId.ITEM_ASSIGNED_TO_TEXTFIELD).value);
        currentItem.setDueDate(document.getElementById(TodoGUIId.ITEM_DUE_DATE_PICKER).value);
        currentItem.setCompleted(document.getElementById(TodoGUIId.ITEM_COMPLETED_CHECKBOX).checked);

        let listName = currentList.getName();
        window.todo.model.loadList(listName);

        document.getElementById(TodoGUIId.ITEM_DESCRIPTION_TEXTFIELD).value = "Unknown";
        document.getElementById(TodoGUIId.ITEM_ASSIGNED_TO_TEXTFIELD).value = "Unknown";
        document.getElementById(TodoGUIId.ITEM_DUE_DATE_PICKER).value = "Unknown";
        document.getElementById(TodoGUIId.ITEM_COMPLETED_CHECKBOX).checked = false;

        window.todo.model.goList();
    }

    processCancelItemChanges(itemIndex) {
        let currentList = window.todo.model.getListToEdit();

        if (window.todo.model.isNewItem()){
            let currentItem = currentList.removeItem(currentList.getLength() - 1);
        }

        document.getElementById(TodoGUIId.ITEM_DESCRIPTION_TEXTFIELD).value = "Unknown";
        document.getElementById(TodoGUIId.ITEM_ASSIGNED_TO_TEXTFIELD).value = "Unknown";
        document.getElementById(TodoGUIId.ITEM_DUE_DATE_PICKER).value = "Unknown";
        document.getElementById(TodoGUIId.ITEM_COMPLETED_CHECKBOX).checked = false;

        window.todo.model.goList();
    }

    processEditItem(itemIndex) {
        window.todo.model.goEdit(itemIndex);
    }
}