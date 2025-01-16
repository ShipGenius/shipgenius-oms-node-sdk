
const plugin = {
    meta: {
        name: "eslint-plugin-require-extensions",
    },
    configs: {},
    rules: {
        "require-extensions": {
            meta: {
                type: "problem",
                fixable: "code",
            },
            create(context) {
                return {
                    ImportDeclaration(node) {
                        const path = node.source.value;
                        if(path.startsWith(".") && !path.match(/\/[^\/\.]+\.\w+$/)) {
                            context.report({
                                node,
                                message: "Relative import is missing a file extension (Saw '{{ path }}')",
                                data: { path },
                                fix(fixer) {
                                    return fixer.replaceText(node.source, `"${ node.source.value }.js"`)
                                }
                            })
                        }
                    }
                }
            }
        }
    },
    processors: {},
}

plugin.configs.recommended = [
    {
        plugins: {
            "require-extensions": plugin,
        },
        rules: {
            "require-extensions/require-extensions": "error",
        }
    }
]

export default plugin;
