console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log('jq');
    // displayTasks();
    $('#addButton').on('click', addTask);
    $('#toDisplay').on('click', '.deletedBtn', deleteTask);
    getTasks();
};

function getTasks() {
    console.log('in getTasks');
    $('#displayTasks').empty();
    $.ajax({
        type: 'GET',
        url: '/tasks',
        success: function (response) {
            console.log('getTasks success: ', response)
            for (var i = 0; i < response.length; i++) {
                var $row = $('<tr>');
                $row.append('<td>' + response[i].task);

                var $completeButton = $('<td><button class="completedBtn" data-id="' + response[i].id + '">Complete</button></td>');
                $row.append($completeButton);

                var $deleteButton = $('<td><button class="deletedBtn" data-id="' + response[i].id + '">Delete</button></td>');
                $row.append($deleteButton);

                $('#displayTasks').append($row);
            }
        }
    });
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

function deleteTask(){
    if (window.confirm("You are about to delete this task! If you are sure, press okay to delete.") == true) {
        txt = "You pressed OK!";
        console.log('in deleteTask');
        
        var itemId = $(this).data('id');
        console.log('itemId', itemId);
        
        $.ajax({
            method: 'DELETE',
            url: '/tasks/' + itemId,
            success: function(response) {
            console.log('Delete response: ', response);              
            getTasks();
            }
        });
    } else {
        txt = "You pressed Cancel!";
    };
};