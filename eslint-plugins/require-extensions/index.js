/** @type {import('eslint').Rule.RuleModule} */
const REQUIRE_EXTENSIONS = {
    meta: {
        type: "problem",
        fixable: "code",
    },
    create(context) {
        return {
            ImportDeclaration(node) {
                const path = node.source.value;
                // Eslint is getting really tripped up by this for some reason
                // eslint-disable-next-line no-useless-escape
                if (typeof path === "string" && path.startsWith(".") && !path.match(/\/[^\/\.]+\.\w+$/)) {
                    context.report({
                        node,
                        message: "Relative import is missing a file extension (Saw '{{ path }}')",
                        data: { path },
                        fix(fixer) {
                            return fixer.replaceText(node.source, `"${node.source.value}.js"`);
                        },
                    });
                }
            },
        };
    },
};

/** @type {import('eslint').ESLint.Plugin} */
const plugin = {
    meta: {
        name: "eslint-plugin-require-extensions",
    },
    configs: {
        recommended: [],
    },
    rules: {
        "require-extensions": REQUIRE_EXTENSIONS,
    },
    processors: {},
};

plugin.configs.recommended = [
    {
        plugins: {
            "require-extensions": plugin,
        },
        rules: {
            "require-extensions/require-extensions": "error",
        },
    },
];

export default plugin;
