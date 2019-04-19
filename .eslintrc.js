module.exports = {
    parser: "babel-eslint",
    extends: ["airbnb", "prettier", "react-app"],
    plugins: ["react", "jsx-a11y", "import"],
    rules: {
        "import/prefer-default-export": "off"
    }
};