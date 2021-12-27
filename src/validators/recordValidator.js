const moment = require('moment');

module.exports = (reqBody) => {
    let errors = [];

    const isValidStartDate = moment(reqBody.startDate, 'YYYY-MM-DD', true).isValid();
    const isValidEndDate = moment(reqBody.endDate, 'YYYY-MM-DD', true).isValid();

    if (!isValidStartDate)
        errors.push("Start Date Format should be 'YYYY-MM-DD'");

    if (!isValidEndDate)
        errors.push("End Date Format should be 'YYYY-MM-DD'");

    if (!moment(reqBody.endDate).isSameOrAfter(reqBody.startDate))
        errors.push('End Date Must Be Greater Than Start Date');

    if (!(Number.isInteger(reqBody.minCount)))
        errors.push('Invalid Minimum count - should be number');

    if (!(Number.isInteger(reqBody.maxCount)))
        errors.push('Invalid Maximum count - should be number');

    if ((reqBody.minCount < 0) || (reqBody.maxCount < 0))
        errors.push('Minimum/Maximum count should be greater than 0');

    if (reqBody.maxCount < reqBody.minCount)
        errors.push('Maximum Count Must Be Greater Than Minmum Count');

    //errors
    const isValid = errors.length === 0;
    return { isValid, errors };
};
