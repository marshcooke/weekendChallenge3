console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log('jq');
    // displayTasks();
    $('#addButton').on('click', addTask);
    $('#displayTasks, #completedTasks').on('click', '.deletedBtn', deleteTask);
    $('#displayTasks').on('click', '.completedBtn', completeTask);
    getTasks();
};

function getTasks() {
    console.log('in getTasks');
    $('#displayTasks').empty();
    $('#completedTasks').empty();
    $.ajax({
        type: 'GET',
        url: '/tasks',
        success: function (response) {
            console.log('getTasks success: ', response)
            for (var i = 0; i < response.length; i++) {
                var taskObj = response[i];
                if (taskObj.complete === false) {
                    appendToTasks(taskObj);
                } else {
                    appendToComplete(taskObj);
                }
            }
        }
    });
};

function appendToTasks(taskObj) {
    var $row = $('<tr>');
    $row.append('<td>' + taskObj.task);

    var $completeButton = $('<td><button class="completedBtn" data-id="' + taskObj.id + '">Complete</button></td>');
    $row.append($completeButton);

    var $deleteButton = $('<td><button class="deletedBtn" data-id="' + taskObj.id + '">Delete</button></td>');
    $row.append($deleteButton);

    $('#displayTasks').append($row);

};

function appendToComplete(taskObj) {
    var $row = $('<tr>');
    $row.append('<td>' + taskObj.task);

    var $reviseButton = $('<td><button class="revisedBtn" data-id="' + taskObj.id + '">Revise</button></td>');
    $row.append($reviseButton);

    var $deleteButton = $('<td><button class="deletedBtn" data-id="' + taskObj.id + '">Delete</button></td>');
    $row.append($deleteButton);

    $('#completedTasks').append($row);
};


function addTask() {
    console.log('in displayTasks');

    var task = {
        task: $('#todoInput').val()
    };

    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: task,
        success: function (response) {
            console.log('Post success: ', response);
            getTasks();
        }
    });
    $('#todoInput').val('');
};

function deleteTask() {
    if (window.confirm("You are about to delete this task! If you are sure, press okay to delete.") == true) {
        txt = "You pressed OK!";
        console.log('in deleteTask');

        var itemId = $(this).data('id');
        console.log('itemId', itemId);

        $.ajax({
            method: 'DELETE',
            url: '/tasks/' + itemId,
            success: function (response) {
                console.log('Delete response: ', response);
                getTasks();
            }
        });
    } else {
        txt = "You pressed Cancel!";
    };
};

function completeTask() {
    console.log('in completeTask');

    var itemId = $(this).data('id');
    console.log('itemId', itemId);

    $.ajax({
        type: 'PUT',
        url: '/tasks/' + itemId,
        success: function (response) {
            console.log('completeTask success: ', response);
            getTasks();
        }
    });
};