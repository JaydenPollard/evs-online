export const validateNextForm = (newElement, formdata) => {
    switch (newElement.id) {
        case "email":
            if (validateElement(newElement)) {
                if (formdata.password.valid && formdata.repeatpassword.valid) {
                    return true;
                }
            }
            return false;
        case "password":
            if (validateElement(newElement)) {
                if (formdata.email.valid && formdata.repeatpassword.valid) {
                    return true;
                }
            }
            return false;
        case "repeatpassword":
            if (
                validateRepeatPasswordElement(
                    newElement,
                    formdata.password.value
                )
            ) {
                if (formdata.email.valid && formdata.password.valid) {
                    return true;
                }
            }
            return false;
        default:
            return false;
    }
};

export const validateRegisterForm = (newElement, formdata) => {
    switch (newElement.id) {
        case "firstname":
            if (validateElement(newElement)) {
                if (
                    formdata.lastname.valid &&
                    formdata.dob.valid &&
                    formdata.address.valid &&
                    formdata.phonenumber.valid
                ) {
                    return true;
                }
            }
            return false;
        case "lastname":
            if (validateElement(newElement)) {
                if (
                    formdata.firstname.valid &&
                    formdata.dob.valid &&
                    formdata.address.valid &&
                    formdata.phonenumber.valid
                ) {
                    return true;
                }
            }
            return false;
        case "dob":
            if (
                validateRepeatPasswordElement(
                    newElement,
                    formdata.password.value
                )
            ) {
                if (
                    formdata.firstname.valid &&
                    formdata.lastname.valid &&
                    formdata.address.valid &&
                    formdata.phonenumber.valid
                ) {
                    return true;
                }
            }
            return false;
        case "address":
            if (
                validateRepeatPasswordElement(
                    newElement,
                    formdata.password.value
                )
            ) {
                if (
                    formdata.firstname.valid &&
                    formdata.lastname.valid &&
                    formdata.dob.valid &&
                    formdata.phonenumber.valid
                ) {
                    return true;
                }
            }
            return false;
        case "phonenumber":
            if (
                validateRepeatPasswordElement(
                    newElement,
                    formdata.password.value
                )
            ) {
                if (
                    formdata.firstname.valid &&
                    formdata.lastname.valid &&
                    formdata.dob.valid &&
                    formdata.address.valid
                ) {
                    return true;
                }
            }
            return false;
        default:
            return false;
    }
};

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
