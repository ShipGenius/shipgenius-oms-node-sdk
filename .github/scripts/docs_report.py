""" Generate a github comment from a docs report """

with open("doc-warnings.txt", "r") as f:
    problems = f.readlines()
    
if problems:
    print("message<<EOF")

    print("# Documentation report")
    
    errors = []
    warnings = []
    
    for problem in problems:
        if problem.startswith("[warning] "):
            warnings.append(problem.removeprefix("[warning] "))
        if problem.startswith("[error] "):
            errors.append(problem.removeprefix("[error] "))
            
    if errors:
        print("## Errors")
        for error in errors:
            print("-", error)
            
    if warnings:
        print("## Warnings")
        for warning in warnings:
            print("-", warning)

    print("EOF")