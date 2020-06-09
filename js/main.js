// Dates variables in order
// "new Date" method to operate string with
var monday_morning      = new Date('2016-05-16T16:00:00.000'),
    wednesday           = new Date('2016-05-11T12:22:11.824'),
    thursday            = new Date('2016-05-12T12:22:11.824'),
    thursday_afternoon  = new Date('2016-05-12T14:00:00.000'),
    friday_morning      = new Date('2016-05-13T08:00:00.000'),
    saturday            = new Date('2016-05-14T09:15:00.000'),
    sunday              = new Date('2016-05-15T09:15:00.000'),
    dateNow             = new Date()
;

// Open schedules for the shop
// Two dimensions. First dimension for number of schedules and second for range schedule.
var schedules = {
    mon : [['08:00', '16:00']],
    tue : [['08:00', '16: 00'], ['14:00', '18:00']],
    wed : [['08:00', '16:00']],
    thu : [['08:00', '12:00'], ['14:00', '18:00']],
    fri : [['08:00', '16:00']],
    sat : [],
    sun : [],
};

var nextOpeningDate = function(date) {
    // Array
    let objDay = 
    [monday_morning, wednesday, thursday, thursday_afternoon, friday_morning, saturday, sunday],
    objDayName = ['monday_morning', 'wednesday', 'thursday', 'thursday_afternoon', 'friday_morning', 'saturday', 'sunday'];

    // Get index of date
    let indexOfDateInArray = objDay.findIndex(x => x === date);

    console.log('indexOfDateInArray : ', indexOfDateInArray);

    console.log('indexOfDateInArray : ', indexOfDateInArray);


    // Scan other date in order
    for (let i = indexOfDateInArray + 1; objDay[i]; i++)
    {
        console.log('i : ', i);

        // Is the date on?
        if (isOpenOn(objDay[i]))
        {
            return objDayName[i];
        }

        else {
            console.log('Not good. next one')
        }

        if (i == 6)
        {
            i = -1
        }
    }
}

var processRangeTestingShop = function(daySchedules, date) {
    console.log('daySchedules : ', daySchedules);
    console.log('date : ', date);

    console.log('----------------- PROCESS -----------------')
    let flag = false;

    // Test if there are schedule stored in the day
    console.log('daySchedules : ', daySchedules)
    if (daySchedules) {

        // Get right schedule day
        let schedule = daySchedules;


        // Get all schedules for this day by loop. Ended when there aren't schedule in this day anymore
        for (let i = 0; schedule[i]; i++)
        {
            // Building object to perform operations 
            let objSchedule = {
                actualSchedule : {begin : schedule[i][0].split(':'), end : schedule[i][1].split(':')},
                actualDate : {hours : date.getHours(), minutes : date.getMinutes()}
            };

            console.log('objSchedule : ', objSchedule);


            // Are we in the range of actual schedule with hours?
            if (objSchedule.actualSchedule.begin[0] <= objSchedule.actualDate.hours && objSchedule.actualSchedule.end[0] >= objSchedule.actualDate.hours)
            {
                flag = true;
                console.log('GOOD')

                // Hours == schedule. Ok but what about minutes. if it's closed at 16:00, it's not open at 16:15.
                if (objSchedule.actualSchedule.end[0] == objSchedule.actualDate.hours && objSchedule.actualSchedule.end[1] < objSchedule.actualDate.minutes)
                {
                    // Not good.
                    flag = false;
                    console.log('Not Good finally because of minutes. Good time hour but late with minutes.')
                }
            }

            console.log('objSchedule : ', objSchedule);
        }
    }

    else {
        console.log('Not schedules stored for this day.');
    }

    console.log('----------------- END -----------------')

    return flag;
}

// Function to return true if "date" matches with current timedate.
var isOpenOn = function(date) {

    console.log('date.getDay()', date.getDay());
    // Are we in the right day?
    switch (date.getDay()) {
        // 0 to 6 == Sunday to Friday
        case 0 :
            return processRangeTestingShop(schedules.sun, date);;
        break;
        case 1 :
            return processRangeTestingShop(schedules.mon, date);;
        break;
        case 2 :
            return processRangeTestingShop(schedules.tue, date);;
        break;
        case 3 :
            return processRangeTestingShop(schedules.wed, date);;
        break;
        case 4 :
            return processRangeTestingShop(schedules.thu, date);;
        break;
        case 5 :
            return processRangeTestingShop(schedules.fri, date);;
        break;
        case 6 :
            return processRangeTestingShop(schedules.saturday, date);;
        break;
        default:
            throw new Error('Problem with this script. Date.getDay() does not work');

    }
};



// TESTS 
/* console.log('isOpenDate FUNCTION (wednesday) TRUE : ', isOpenOn(wednesday));
console.log('isOpenDate FUNCTION (thursday) FALSE  : ', isOpenOn(thursday));
console.log('isOpenDate FUNCTION (sunday) : FALSE ', isOpenOn(sunday)); */

// console.log('------ NEXT OPENING DATE :', nextOpeningDate(thursday_afternoon))
// console.log('------ NEXT OPENING DATE :', nextOpeningDate(saturday))
// console.log('------ NEXT OPENING DATE :', nextOpeningDate(thursday))

console.log('------ NEXT OPENING DATE (friday_morning) :', nextOpeningDate(thursday_afternoon))
console.log('------ NEXT OPENING DATE (monday_morning) :', nextOpeningDate(saturday))
console.log('------ NEXT OPENING DATE (thursday_afternoon) :', nextOpeningDate(thursday))


