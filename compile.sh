#!/bin/bash

# Free Cities Compiler - Unix

# run dependencyCheck.sh
./devTools/scripts/dependencyCheck.sh
exitCode=$?
# exit code is now stored in $exitCode

# if exit code is 69, then we don't have all the dependencies we need
# fall back to the simple compiler
if [[ $exitCode -eq 69 ]]; then
    echo "Dependencies not met, falling back to the simple compiler."
    echo ""
    # run simple-compiler.sh, passing all arguments to it
   ./simple-compiler.sh "$@"
   exit 0
# if exit code is not 0, print error message and then attempt to fall back to the simple compiler
elif [[ $exitCode -ne 0 ]]; then
    echo "Dependency check failed unexpectedly, falling back to the simple compiler."
    echo ""
    # run simple-compiler.sh, passing all arguments to it
   ./simple-compiler.sh "$@"
    exit 0
# if exit code is 0, run new compiler passing all arguments to it
else
    node devTools/scripts/advancedCompiler.js
fi
