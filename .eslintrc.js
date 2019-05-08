module.exports = {
    root: true, 
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    rules: {
        "indent": ["error", 4],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "no-console": "error",
        "arrow-parens": 0
    }
}