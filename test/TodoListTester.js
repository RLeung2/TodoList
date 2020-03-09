'use strict'
class TodoListTester {
    constructor() {}

    runTests() {
        this.loadTestJsonFile('./test/TestTodoLists.json', function(jsonText) {
            // FIRST LOAD ALL THE LIST FROM THE JSON FILE
            var jsonData = JSON.parse(jsonText);
            for (let i = 0; i < jsonData.lists.length; i++) {
                let listData = jsonData.lists[i];
                let newList = new TodoList();
                let listName = listData.name;
                let listOwner = listData.owner;
                newList.setName(listName);
                newList.setOwner(listOwner);
                for (let j = 0; j < listData.items.length; j++) {
                    var itemData = listData.items[j];
                    let newItem = new TodoListItem();
                    newItem.setDescription(itemData.description);
                    newItem.setAssignedTo(itemData.assigned_to);
                    newItem.setDueDate(itemData.due_date);
                    newItem.setCompleted(itemData.completed);
                    newList.addItem(newItem);
                }
                window.todo.model.appendList(newList);
            }
        });
    }

    loadTestJsonFile(testFilePath, callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', testFilePath, true);
        xobj.onreadystatechange = function () {
            if ((xobj.readyState == 4) 
                    && (xobj.status == "200")) {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }
}