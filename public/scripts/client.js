console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log('jq');
    displayTasks();
    $('#addButton').on('click', displayTasks);
    getTasks();    
};

function getTasks() {
    console.log('in getTasks');
    $.ajax({
        type: 'GET',
        url: '/tasks',
        success: function(response) {
            console.log('getTasks success: ', response)
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
        success: function(response) {
            console.log('Post success: ', response);
            getTasks();
        }
    });
};