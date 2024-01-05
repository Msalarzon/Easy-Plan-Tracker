$(document).ready(function () {
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

    // Apply past, present, or future styling based on the current hour
    function createTimeBlocks() {
        // Get the current hour
        const currentHour = dayjs().hour();

        for (let hour = 9; hour <= 17; hour++) {
            const timeBlock = $('<div class="row time-block">');
            const hourCol = $(`<div class="col-md-1 hour">${dayjs().hour(hour).format("hA")}</div>`);
            const textArea = $('<textarea class="col-md-10 description">');
            const saveBtn = $('<button class="col-md-1 saveBtn"><i class="fas fa-save"></i></button>');

            // Apply past, present, or future styling based on the current hour
            if (hour < currentHour) {
                timeBlock.addClass('past');
            } else if (hour === currentHour) {
                timeBlock.addClass('present');
            } else {
                timeBlock.addClass('future');
            }
    
            // Save Button Click Event Listener
            saveBtn.on('click', function () {
                const userInput = textArea.val().trim();
                // Save user input to local storage using the hour as the key
                localStorage.setItem(`event_${hour}`, userInput);
            });

        // Retrieve saved event from local storage
        const savedEvent = localStorage.getItem(`event_${hour}`);
        // Set the text are value to the saved event
        textArea.val(savedEvent);
        // Add the time block to the schedule container
        $('#scheduleContainer').append(timeBlock.append(hourCol, textArea, saveBtn));
        }
    }

    // Call the function to create time blocks
    createTimeBlocks();
});
