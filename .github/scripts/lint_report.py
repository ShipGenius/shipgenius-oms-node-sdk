""" Generate a github comment from a lint report """

import json

def _getGrade(grade_score: float) -> str:

    if grade_score >= 9.7:
        return "⭐️ A+"
    elif grade_score >= 9.3:
        return "⭐️ A"
    elif grade_score >= 9.0:
        return "⭐️ A-"

    elif grade_score >= 8.7:
        return "😃 B+"
    elif grade_score >= 8.3:
        return "😃 B"
    elif grade_score >= 8.0:
        return "😃 B-"

    elif grade_score >= 7.7:
        return "😐 C+"
    elif grade_score >= 7.3:
        return "😐 C"
    elif grade_score >= 7.0:
        return "😐 C-"

    elif grade_score >= 6.7:
        return "😭 D+"
    elif grade_score >= 6.3:
        return "😭 D"
    elif grade_score >= 6.0:
        return "😭 D-"

    return "💩 F"

print("message<<EOF")

print("# Lint report")

print("NOTE: Linting messages don't appear in workflow output. Run `npm run lint` to view them.")

with open("lint-report.json", "r", encoding="utf-8") as f:
    report = json.load(f)


number_of_files = 0
number_of_lines = 0
number_of_fatal_errors = 0
number_of_errors = 0
number_of_warnings = 0

number_of_fixable_errors = 0
number_of_fixable_warnings = 0

for file in report:

    number_of_files += 1
    number_of_fatal_errors += file["fatalErrorCount"]
    number_of_errors += file["errorCount"]
    number_of_warnings += file["warningCount"]
    number_of_fixable_errors += file["fixableErrorCount"]
    number_of_fixable_warnings += file["fixableWarningCount"]

    with open(file["filePath"], "r", encoding="utf-8") as f:
        data = f.read().split("\n")
        number_of_lines += len(data)


# basically the same scoring scheme that pylint uses
score = max(
    0,
    0 if number_of_fatal_errors else
    10.0 - (
        (
            float(10 * number_of_errors + number_of_warnings ) / (number_of_lines / 5)
        ) * 10
    )
)

print("## Score")

print(f"- {_getGrade(score)} ({round(score, 2)}/10)")


print("## Stats")

print("Files linted:", number_of_files)

if number_of_fatal_errors:
    print("- 💀 Fatal Erros:", number_of_fatal_errors)
if number_of_errors:
    print("- ⛔️ Errors:", number_of_errors)
if number_of_warnings:
    print("- ⚠️ Warnings:", number_of_warnings)
if number_of_fixable_errors:
    print("- 🔨 Errors fixable with `npx eslint --fix src/`:", number_of_fixable_errors)
if number_of_fixable_warnings:
    print("- 🔧 Warnings fixable with `npx eslint --fix src/`", number_of_fixable_warnings)



print("EOF")
