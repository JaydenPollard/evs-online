import DateFnsUtils from "@date-io/date-fns";
import _ from "lodash";

/**
 * Returns string in lower case
 * @param inputString string input
 * @returns string in lower case
 */
export function toLowerCaseString(inputString) {
    return inputString.replace(/\S+/g, _.toLower);
}

/**
 * Return string with capitalization for every word
 * @param inputString string input
 * @returns string that is capitalized for every word
 */
export function capitalizeString(inputString) {
    return inputString.replace(/\S+/g, _.capitalize);
}

/**
 * Convert string to Date object
 * @param dateString the date in string
 * @returns {Date} The converted date
 */
export function formatStringToDate(dateString) {
    const dateFns = new DateFnsUtils();
    return dateFns.parse(dateString, "dd/MM/yyyy");
}

/**
 * Return a string converted from a date object
 * @param date Date object
 * @returns {string} the converted date as string
 */
export function formatDateToDateString(date) {
    return date.toLocaleDateString("en-AU");
}
