#!/bin/bash
branch='pregmod-master'
usr='pregmodfan'

echo "Use temp [0], dump file to current directory [1] or overwrite file in place [2]" && read opt
echo "Use upstream [1] or origin [0]" && read usrSelection
echo "Dry run? 1, 0" && read dryRun

if [[ $usrSelection == 0 ]];then
	usr=$(git remote show origin|grep -e /|head -n 1 | sed s'/Fetch URL: //' | sed s%/fc-pregmod.git%% | sed s%git@ssh.gitgud.io:%% || sed %https://gitgud.io/%%)
	echo "Use master [1] or current branch [0]." && read targetBranch
	if [[ $targetBranch == 0 ]];then branch=$(git rev-parse --abbrev-ref HEAD); fi
fi

if [[ $dryRun == 1 ]];then
 echo "https://gitgud.io/$usr/fc-pregmod/raw/$branch/"
else
	for ((i=1; i<=$#; i++)); do
		if [[ $opt == 0 ]]; then
			wget -q -P /tmp/ https://gitgud.io/$usr/fc-pregmod/raw/$branch/${!i}
		elif [[ $opt == 1 ]]; then
			wget -q https://gitgud.io/$usr/fc-pregmod/raw/$branch/${!i}
		else
			curl -s https://gitgud.io/$usr/fc-pregmod/raw/$branch/${!i} > ${!i}
		fi
	done
fi
