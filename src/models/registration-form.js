export const initialFormState = {
    formdata: {
        formNextValid: true,
        formRegisterValid: true,
        email: {
            element: "input",
            value: "",
            config: {
                name: "email_input",
                label: "Enter your email address *",
                type: "email",
                placeholder: "",
                showlabel: true
            },
            validation: {
                required: true,
                email: true
            },
            valid: false,
            validationMessage: "This field is required",
            showlabel: true
        },
        password: {
            element: "input",
            value: "",
            config: {
                name: "password_input",
                type: "password",
                label: "Enter a password *",
                placeholder: ""
            },
            validation: {
                required: true,
                password: true
            },
            valid: false,
            validationMessage: "This field is required",
            showlabel: true
        },
        repeatpassword: {
            element: "input",
            value: "",
            config: {
                name: "repeatpassword_input",
                type: "password",
                label: "Re-enter password *",
                placeholder: ""
            },
            validation: {
                required: true,
                repeatpassword: true
            },
            valid: false,
            validationMessage: "This field is required",
            showlabel: true
        },
        firstname: {
            element: "input",
            value: "",
            config: {
                name: "firstname_input",
                label: "Enter your first name *",
                type: "text",
                placeholder: "",
                showlabel: true
            },
            validation: {
                required: true,
                text: true
            },
            valid: false,
            validationMessage: "This field is required",
            showlabel: true
        },
        lastname: {
            element: "input",
            value: "",
            config: {
                name: "lastname_input",
                label: "Enter your last name *",
                type: "text",
                placeholder: "",
                showlabel: true
            },
            validation: {
                required: true,
                text: true
            },
            valid: false,
            validationMessage: "This field is required",
            showlabel: true
        },
        dob: {
            element: "date",
            value: "",
            config: {
                name: "date_input",
                label:
                    "Enter your date of birth (used for movie age restrictions) *",
                type: "date",
                placeholder: "",
                showlabel: true
            },
            validation: {
                required: true,
                date: true
            },
            valid: false,
            validationMessage: "This field is required",
            showlabel: true
        },
        address: {
            element: "input",
            value: "",
            config: {
                name: "address_input",
                label: "Enter your address *",
                type: "text",
                placeholder: "",
                showlabel: true
            },
            validation: {
                required: true,
                address: true
            },
            valid: false,
            validationMessage: "This field is required",
            showlabel: true
        },
        phonenumber: {
            element: "input",
            value: "",
            config: {
                name: "phonenumber_input",
                label: "Enter your phone number (8-10 digits) *",
                type: "text",
                placeholder: "",
                showlabel: true
            },
            validation: {
                required: true,
                phonenumber: true
            },
            valid: false,
            validationMessage: "This field is required",
            showlabel: true
        }
    }
};
