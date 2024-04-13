#!/bin/bash

# Checks dependencies and prompts the user to install them if missing.
# Returns exit code 69 :) if dependencies still don't exist at end of execution
# checks for git and node

# If you make a change to the functionality of this script you should also make sure to add the same functionality to 'dependencyCheck.bat'

aptInstall="sudo apt-get install git nodejs"
pacmanInstall="sudo pacman -S git nodejs"
dnfInstall="sudo dnf install git nodejs"
yumInstall="sudo yum install git nodejs"
brewInstall="brew install git nodejs"

function modulesCheck() {
    # if node_modules doesn't exist
    if [[ ! -d node_modules ]]; then
        # ask user if we can install modules
        echo ""
        echo "All optional dependencies for the advance compiler are installed, but the Node modules are not installed."
        echo ""
        echo "These packages should take up less than 500MB of disk space. (~150 MB at time of writing)."
        echo "They will be stored in the 'node_modules' directory inside of the project directory."
        echo ""
        read -n 1 -p "Would you like us to run 'npm install' to install them for you? [Y/N]?" choice
        case "$choice" in 
        y|Y )
            echo ""
            npm install
            # Check for missing node dependencies
            node ./devTools/scripts/dependencyCheck.js
            echo ""
            echo ""
            ;;
        * )
            echo ""
            echo ""
            exit 69
            ;;
        esac
    else
    # Check for missing node dependencies
	node ./devTools/scripts/dependencyCheck.js
    fi
}   

function ensureDependenciesAndExit() {
    # wait for user input
    read -n 1 -s -r -p "Press any key to continue..."
    echo ""

    # check for dependencies
    if command -v git &> /dev/null; then
        git="true"
    fi

    if command -v node &> /dev/null; then
        node="true"
    fi

    # If no missing dependencies, exit with code 0, else exit with code 69
    if [[ "$git" && "$node" ]]; then
        modulesCheck
        echo ""
        echo ""
        exit 0
    else
        echo ""
        echo ""
        exit 69
    fi
}

function manualInstall() {
    # prints out the info for manual installation
    # waits for user input
    # checks for dependencies
    # and then exits
    echo ""
    echo ""
    echo "To install these packages run the command below that applies to your system."
    echo ""

    echo "Ubuntu/Debian and derivatives:"
    echo "  $aptInstall"

    echo "Arch and derivatives:"
    echo "  $pacmanInstall"

    echo "Fedora/RHEL/CentOS and derivatives:"
    # dnf
    echo "  $dnfInstall"
    # yum
    echo "  or"
    echo "  $yumInstall"

    echo "Mac OS X:"
    echo "  $brewInstall"

    echo ""
    echo "You should install these packages now if you wish to do so."
    ensureDependenciesAndExit
}

function automaticInstall() {
    # Install using $packageManager
    echo ""
    echo ""
    if [[ "$packageManager" == "apt" ]]; then
        echo "Executing '$aptInstall'"
        $aptInstall
    elif [[ "$packageManager" == "pacman" ]]; then
        echo "Executing '$pacmanInstall'"
        $pacmanInstall
    elif [[ "$packageManager" == "dnf" ]]; then
        echo "Executing '$dnfInstall'"
        $dnfInstall
    elif [[ "$packageManager" == "yum" ]]; then
        echo "Executing '$yumInstall'"
        $yumInstall
    elif [[ "$packageManager" == "brew" ]]; then
        echo "Executing '$brewInstall'"
        $brewInstall
    fi
    ensureDependenciesAndExit
}

# Check for dependencies
if command -v git &> /dev/null; then
    git="true"
fi

if command -v node &> /dev/null; then
    node="true"
fi

# If no missing dependencies, exit
if [[ "$git" && "$node" ]]; then
    modulesCheck
    exit 0
fi

# Otherwise prompt the user
echo "This project has some optional dependencies that enable features that we believe will make the development process easier and more fruitful."
echo "You are seeing this because some or all of these dependencies are missing."
echo "If you wish to no longer see this, please use the simple compiler. 'simple-compiler.sh'"
echo ""
echo "Here is a list of the packages that are missing:"

if [[ ! "$git" ]]; then
    echo "  git, https://git-scm.com/, needed to interact with the .git folder in this project."
    echo "    Allows for things like:"
    echo "      Keeping multiple compiled versions of FC based of the commit they were compiled with."
    echo "      The sanity checks have this as a hard dependency."
fi

if [[ ! "$node" ]]; then
    echo "  Node.js, https://nodejs.org/, enables all of the new sanity checks and the advanced compiler."
    echo "    Allows for things like:"
    echo "      Source maps for easier debugging: https://dzone.com/articles/what-are-source-maps-and-how-to-properly-use-them"
    echo "      JavaScript linting to catch bugs early using ESLint: https://eslint.org/"
    echo "      JavaScript type checking to catch bugs early using the Typescript compiler: https://www.typescriptlang.org/"
    echo "      Custom sanity checks to catch common errors."
    echo "      Spell checking using the cSpell project: https://cspell.org/"
    echo "      Tweaking of compiler and sanity check settings using 'setup.sh'"
    echo "      Manage and run FCHost using 'FCHost.sh'"
    echo "      Copy FC to FCHost (if installed) after each successful compile"
    echo "      Automatic rebuilding and hot reloading of FC when file changes occur using 'watcher.sh'"
    # TODO: @franklygeorge: update as we add the rest of the features
fi

# checks for apt, brew, dnf, yum, and pacman in that order
# meaning that we need to check for them in reverse order
if command -v pacman &> /dev/null; then
    packageManager="pacman"
fi

if command -v yum &> /dev/null; then
    packageManager="yum"
fi

if command -v dnf &> /dev/null; then
    packageManager="dnf"
fi

if command -v brew &> /dev/null; then
    packageManager="brew"
fi

if command -v apt-get &> /dev/null; then
    packageManager="apt"
fi

# if no package manager
if [[ ! "$packageManager" ]]; then
    manualInstall
fi

echo ""
echo "Should the packages listed above be installed automatically using the ${packageManager} package manager?"
echo "You will likely be asked for your root/sudo password as it is often required to install new packages."
echo "If you do not want us to install these dependencies automatically, decline and the required commands will be printed out to do so manually."

# ask for confirmation
read -n 1 -p "Continue with the automatic installation? [Y/N]?" choice
case "$choice" in 
  y|Y ) automaticInstall;;
  n|N ) manualInstall;;
  * ) manualInstall;;
esac