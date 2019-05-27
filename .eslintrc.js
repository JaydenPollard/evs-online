module.exports = {
    parser: "babel-eslint",
    extends: ["airbnb", "prettier", "react-app"],
    plugins: ["react", "jsx-a11y", "import"],
    rules: {
        "import/prefer-default-export": "off",
        "react/jsx-one-expression-per-line": "off",
        "no-underscore-dangle": "off",
        "react/forbid-prop-types": "off",
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/require-default-props": "off",
        "react/jsx-wrap-multilines": ["error", {"declaration": false, "assignment": false}],
        "func-names": "off",
        "no-else-return": "off",
        "no-param-reassign": "off"
    }
};