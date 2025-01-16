import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import requireExtensions from "./eslint-plugins/require-extensions/index.js";


/** @type {import('eslint').Linter.Config[]} */
export default [
    // General configuration
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    },
    {
        ignores: ["**/*.test.*"],
    },
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ["*.js", "*.mjs", "*.cjs", "*.cts"]
                },
                tsconfigRootDir: import.meta.dirname,
                
            }
        }
    },

    // Plugins
    pluginJs.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...requireExtensions.configs.recommended,

    // Rules
    {
        rules: {
            "no-await-in-loop": "warn",
            "no-duplicate-imports": "error",
            "no-promise-executor-return": "warn",
            "no-unreachable-loop": "warn",
            "require-atomic-updates": "warn",
            "curly": "warn",
            "default-case": "warn",
            "dot-notation": "warn",
            "max-depth": "warn",
            "max-lines": [
                "warn",
                {
                    max: 1000
                }
            ],
            "max-statements": [
                "warn",
                {
                    max: 50
                }
            ],
            "no-alert": "error",
            "no-implicit-coercion": "warn",
            "no-implicit-globals": "error",
            "no-invalid-this": "warn",
            "no-var": "error",
            "complexity": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/adjacent-overload-signatures": "warn",
            "@typescript-eslint/no-confusing-non-null-assertion": "warn",
            "@typescript-eslint/prefer-find": "error",
            "@typescript-eslint/prefer-for-of": "warn",
            "@typescript-eslint/prefer-includes": "warn",
            "@typescript-eslint/require-array-sort-compare": "error",
            "@typescript-eslint/explicit-member-accessibility": [
                "warn",
                {
                    accessibility: "explicit",
                    overrides: {
                        constructors: "no-public"
                    }
                }
            ],
            "@typescript-eslint/no-empty-object-type": [
                "error",
                {
                    allowInterfaces: "with-single-extends",
                }
            ],
            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    selector: "default",
                    format: ["snake_case"],
                    leadingUnderscore: 'allowSingleOrDouble',
                    trailingUnderscore: 'allowSingleOrDouble',
                },
                {
                    selector: "objectLiteralProperty",
                    format: ["snake_case", "camelCase", "PascalCase", "UPPER_CASE"],
                    leadingUnderscore: 'allowSingleOrDouble',
                    trailingUnderscore: 'allowSingleOrDouble',
                },
                {
                    selector: 'variable',
                    format: ['snake_case', 'UPPER_CASE'],
                    leadingUnderscore: 'allowSingleOrDouble',
                    trailingUnderscore: 'allowSingleOrDouble',
                },
                {
                    selector: "enumMember",
                    format: ["UPPER_CASE"]
                },
                {
                    selector: [
                        "variable",
                        "variableLike",
                        "classProperty",
                        "objectLiteralProperty",
                        "classicAccessor",
                    ],
                    types: ["function"],
                    format: ["strictCamelCase", "StrictPascalCase"],
                    leadingUnderscore: 'allowSingleOrDouble',
                    trailingUnderscore: 'allowSingleOrDouble',
                },
                {
                    selector: ['function', 'method'],
                    format: ['strictCamelCase', "StrictPascalCase"],
                    leadingUnderscore: 'allowSingleOrDouble',
                    trailingUnderscore: 'allowSingleOrDouble',
                },
                {
                    selector: 'typeLike',
                    format: ['StrictPascalCase'],
                    leadingUnderscore: 'allowSingleOrDouble',
                    trailingUnderscore: 'allowSingleOrDouble',
                },
                {
                    selector: "import",
                    format: ["snake_case", "strictCamelCase", "StrictPascalCase", "UPPER_CASE"]
                },
                {
                    selector: [
                      "classProperty",
                      "objectLiteralProperty",
                      "typeProperty",
                      "classMethod",
                      "objectLiteralMethod",
                      "typeMethod",
                      "accessor",
                      "enumMember",
                    ],
                    format: null,
                    modifiers: ["requiresQuotes"],
                  },

            ],
        }
    }
];
