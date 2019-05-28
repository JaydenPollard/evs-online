export const validateRepeatPassword = (element, password) => {
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

    return error;
};

export const validate = element => {
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

    if (element.validation.date) {
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? "Must be a valid email" : ""}`;

        error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== "";
        const message = `${!valid ? "This field is required" : ""}`;

        error = !valid ? [valid, message] : error;
    }

    return error;
};
