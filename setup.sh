#!/bin/bash

# Free Cities Settings Menu - Unix

# run dependencyCheck.sh
./devTools/scripts/dependencyCheck.sh
exitCode=$?
# exit code is now stored in $exitCode

# if exit code is 69, then we don't have all the dependencies we need
if [[ $exitCode -eq 69 ]]; then
    echo "Dependencies not met."
    echo "If the only thing you need is to simply compile FC, then you can use 'simple-compiler.bat' instead."
    echo ""
   exit 0
# if exit code is not 0, print error message
elif [[ $exitCode -ne 0 ]]; then
	echo "dependencyCheck.sh exited with code: $exitCode"
    echo "Dependency check failed unexpectedly."
    echo "If the only thing you need is to simply compile FC, then you can use 'simple-compiler.bat' instead."
    echo ""
    exit 0
# if exit code is 0, run setup.js
else
    node devTools/scripts/setup.js
fi
