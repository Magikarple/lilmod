#!/bin/bash
email=xyz1256@corp.com
password=12345678
local=fc/
remote=FC/
gen=0;
runstep=0

function displayHelp() {
cat <<HelpText
Packages required: git, megacmd

Usage: $0 [OPTION]...
Options:
 -s, --step  X    : Step # to manually execute e.g. 1 to run "Applying WebGL decensor patch."
 -e, --email X    : Set MEGA email to X. Default: $email
 -p, --password X : Set MEGA password to X. Default: $password
 -l, --local X    : Set local (File System) folder/directory to X. Default: $local
 -r, --remote X   : Set remote (MEGA) folder/directory to X. Default: $remote
 -h, --help       : Show this help text
HelpText
}

if [[ "$#" -eq 0 ]]; then echo -e "For more options see $0 -h.\n"; fi
while [[ "$1" ]]; do
	case $1 in
	-s | --step)
		runstep=$2
		shift
		;;
	-e | --email)
		email=$2
		shift
		;;
	-p | --password)
		password=$2
		shift
		;;
	-l | --local)
		local=$2
		shift
		;;
	-r | --remote)
		remote=$2
		shift
		;;
	-h | --help)
		displayHelp
		exit 0
		;;
	*)
		echo "Unknown argument $1."
		displayHelp
		exit 1
		;;
	esac
	shift
done

find $local > /dev/null
if [[ `echo $?` > 0 ]]; then git clone -q https://gitgud.io/pregmodfan/fc-pregmod.git --depth 1 $local && gen=1; fi
cd $local

find js/000-browserSupport.js > /dev/null
if [[ `echo $?` > 0 ]]; then
	echo "creating file to work with browsers that do not support globalThis."
	echo "const globalThis = eval.call(undefined, 'this');" > js/000-browserSupport.js
fi

if [[ $runstep == 0 && $(./devTools/updateTool.sh -r origin) && `echo $?` > 0 ]]; then
	git reset --hard HEAD -q && git pull -q && gen=1;
fi # stackoverflow.com/a/17192101

if [[ $gen > 0 || $runstep == 1 ]]; then
	echo "Applying WebGL decensor patch."
	sed -i '1,/p.applyPanty = true/ s/p.applyPanty = true/p.applyPanty = false/' src/art/webgl/art.js
	sed -i 's/p.underage = slave.age < 18 || slave.visualAge < 18/p.underage = false/' src/art/webgl/art.js
	sed -i 's#p.height = Math.max(slave.height, 140); // clamp underage#p.height = slave.height;#' src/art/webgl/art.js
	sed -i 's#morphs.push(["physicalAgeYoung", -(Math.max(slave.visualAge, 18)-20)/10]) // clamp underage#morphs.push(["physicalAgeYoung", -(slave.visualAge-20)/10])#' src/art/webgl/art.js
fi

if [[ $gen > 0 || $runstep == 2 ]]; then
	rm bin/*.html > /dev/null 2>&1 ; ./compile.sh -q -m -f preCompiled-FC-`git log -1 --format=%cd --date=format:%Y-%m-%d-%H-%M`-$(git rev-parse --short HEAD)
fi

mega-login $email $password > /dev/null 2>&1
if [[ $gen > 0 || $runstep == 3 ]]; then mega-put -c bin/*.html $remote; fi
if [[ $gen > 0 || $runstep == 4 ]]; then
		if [[ `mega-ls $remote|grep .html|grep -v revert-RA|wc -l` > 2 ]]; then
			mega-rm $remote`mega-ls $remote|grep .html|grep -v revert-RA|head -n 1`
		fi
fi
