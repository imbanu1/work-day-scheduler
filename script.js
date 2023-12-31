// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage? 
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('saveBtn')) {
            var parent = event.target.closest('.time-block');
            var timeBlockId = parent.id;
            var userInput = parent.querySelector('.description').value;
            localStorage.setItem(timeBlockId, userInput);
            
            var message = document.createElement('p');
            message.textContent = 'Appointment added to local storage';
        }
});
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    document.addEventListener('DOMContentLoaded', function() {
        var currentTime = dayjs();
        var timeBlocks = document.querySelectorAll('.time-block');

        timeBlocks.forEach(function(block){
        var blockHour = parseInt(block.id.split('-')[1]);
        var blockTime = dayjs().hour(blockHour);

        if (blockTime.isBefore(currentTime, 'hour')) {
            
            block.classList.add('past');
            console.log('Past');

        }else if (blockTime.isSame(currentTime, 'hour')) {
            block.classList.add('present');
            console.log('Present');

        }else {
            block.classList.add('future');
            console.log('Future');
        }
        });
    });
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
    document.addEventListener('DOMContentLoaded', function() {
    var timeBlocks = document.querySelectorAll('.time-block');

        timeBlocks.forEach(function(block) {
            var blockId = block.id;
            var savedInput= localStorage.getItem(blockId);

            if (savedInput !== null) {
                block.querySelector('.description').value = savedInput;
            }
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
        var currentDate = dayjs().format('dddd, MMMM D, YYYY h:mm A');
        var currentDateElement = document.getElementById('currentDay');
        currentDateElement.textContent = currentDate
    });
