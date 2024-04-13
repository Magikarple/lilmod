#!/bin/bash

# Free Cities FCHost Launcher - Unix

# run dependencyCheck.sh
./devTools/scripts/dependencyCheck.sh
exitCode=$?
# exit code is now stored in $exitCode

# if exit code is 69, then we don't have all the dependencies we need
if [[ $exitCode -eq 69 ]]; then
    echo "Dependencies not met."
    echo ""
   exit 0
# if exit code is not 0, print error message
elif [[ $exitCode -ne 0 ]]; then
	echo "dependencyCheck.sh exited with code: $exitCode"
    echo "Dependency check failed unexpectedly."
    echo ""
    exit 0
# if exit code is 0, run FCHostInstallAndRun.js
else
    node devTools/scripts/FCHostInstallAndRun.js
fi
