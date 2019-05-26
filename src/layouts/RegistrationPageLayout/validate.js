import React from "react";
import { Link } from "react-router-dom";

export const validate = element => {
    let error = [true, ""];

    if (element.validation.email) {
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
