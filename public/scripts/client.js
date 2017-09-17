console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log('jq');
    // displayTasks();
    $('#addButton').on('click', displayTasks);
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

function displayTasks() {
    console.log('in displayTasks');

    var tasks = [{
            task: $('#todoInput').val(),
            complete: true,
        }];

    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: tasks,
        success: function (response) {
            console.log('Post success: ', response);
            getTasks();
        }
    });
    $('#inputBox').val('');
};