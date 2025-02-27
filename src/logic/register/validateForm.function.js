/**
 * Validates a repeat password element against current password value
 * @param element An object containing the element the was updated ("repeatpassword")
 * @param password A string of the current password, as fetched through the state
 * @returns tuple [boolean, string] whether the validation was successful and
 * includes an error message if there was an error
 */
export const validateRepeatPasswordElement = (element, password) => {
    let error = [true, ""];

    if (element.validation.repeatpassword) {
        var matching;
        if (password == element.value) {
            matching = true;
        } else {
            matching = false;
        }
        const message = `${!matching ? "Passwords must match" : ""}`;

        error = !matching ? [matching, message] : error;
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== "";
        const message = `${!valid ? "This field is required" : ""}`;

        error = !valid ? [valid, message] : error;
    }

    return error;
};

/**
 * Validates an element against Regular Expression logic
 * @param element An object containing the element the was updated
 * @returns tuple [boolean, string] whether the validation was successful and
 * includes an error message if there was an error
 */
export const validateElement = element => {
    let error = [true, ""];

    if (element.validation.email) {
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? "Must be a valid email" : ""}`;

        error = !valid ? [valid, message] : error;
    }

    if (element.validation.password) {
        var valid;
        const lower = /(?=.*[a-z])/.test(element.value);
        const upper = /(?=.*[A-Z])/.test(element.value);
        const integer = /(?=.*\d)/.test(element.value);
        const symbol = /(?=.*[-+_!@#$%^&*.,?])/.test(element.value);
        if (lower && upper && (integer || symbol)) {
            valid = true;
        } else {
            valid = false;
        }
        const message = `${
            !valid
                ? "Password must contain at least one lower case letter, one upper case letter, and either a number or symbol [-+_!@#$%^&*.,?]"
                : ""
        }`;

        error = !valid ? [valid, message] : error;
    }

    if (element.validation.text) {
        const valid = /^[A-Za-z]+$/.test(element.value);
        const message = `${
            !valid ? "Must only contain capital or lower case letters" : ""
        }`;

        error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== "";
        const message = `${!valid ? "This field is required" : ""}`;

        error = !valid ? [valid, message] : error;
    }

    return error;
};
