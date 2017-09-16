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
    $.ajax({
        type: 'GET',
        url: '/tasks',
        success: function (response) {
            console.log('getTasks success: ', response)
            for (var i = 0; i < response.length; i++) {
                var $row = $('<tr></tr>');
                $row.append('<td>', response[i].task, '</td>');

                var $completeButton = $('<td><button class="completedBtn" data-id="', response[i].id, '">Complete</button></td>');
                $row.append($completeButton);

                var $deleteButton = $('<td><button class="deletedBtn" data-id="', response[i].id, '">Delete</button></td>');
                $row.append($deleteButton);
            }
        }
    });
};

function displayTasks() {
    console.log('in displayTasks');

    var tasks = [
        {
            task: 'Take Fiona to the Vet',
            complete: true,
        }
    ];

    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: tasks,
        success: function (response) {
            console.log('Post success: ', response);
            getTasks();
        }
    });
};