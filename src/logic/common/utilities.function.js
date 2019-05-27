import DateFnsUtils from "@date-io/date-fns";
import _ from "lodash";

export function toLowerCaseString(inputString) {
    return inputString.replace(/\S+/g, _.toLower);
}

export function capitalizeString(inputString) {
    return inputString.replace(/\S+/g, _.capitalize);
}

export function formatStringToDate(dateString) {
    const dateFns = new DateFnsUtils();
    return dateFns.parse(dateString, "dd/MM/yyyy");
}

export function formatDateToString(date) {
    return date.toLocaleDateString("en-AU");
}
