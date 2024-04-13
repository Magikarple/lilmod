#!/bin/bash
# git push --set-upstream origin origin/pregmod-master / git checkout -b pregmod-master --track origin/pregmod-master
mainBranch="pregmod-master"
previousBranch="Not found"

function displayHelp() {
cat <<HelpText
Usage: $0 [OPTION]...
Always pushes commit(s) / the current branch
Order of operation: new (if enabled) -> push (if not closed after creating a new branch) -> sync (if enabled) -> change branch (if enabled)
 -> delete previous branch (if enabled)

Options:
 -s, --sync      : Sync upstream/$mainBranch
 -d, --delete    : Delete previous branch
 -m, --move      : Change current branch to either;
  supplied / previous, the choice currently
  follows the flow as written i.e supplied -> previous
 -b, --branch X  : Set supplied branch to X
 -c, --create Y  : Create the new branch Y
 -h, --help      : Show this help text

 e.g.
 Before:
  git status
  On branch XYZ
  Your branch is ahead of 'origin/XYZ' by 5 commits.

  git branch --list
  * XYZ
  $mainBranch
  .....

 During:
  $0 -b $mainBranch -c -d
  Branches: Supplied ($mainBranch) / previous (XYZ)
  Sync Master? Y/N: N

 After:
  git branch --list
  * $mainBranch
  .....

  All five new commits for branch XYZ were pushed prior to the switch over and
   then afterwards the local copy of branch XYZ was deleted.
HelpText
}

if [[ $(git rev-parse --quiet --abbrev-ref @{-1} 2>/dev/null) && $? -eq 0 ]]; then
	previousBranch=$(git rev-parse --abbrev-ref @{-1})
fi

if [[ "$#" -eq 0 ]]; then echo "For more options see $0 -h."; fi
while [[ "$1" ]]; do
	case $1 in
	-s | --sync)
		sync="true"
		;;
	-d | --delete)
		delete="true"
		;;
	-m | --move)
		change="true"
		;;
	-b | --branch)
		tgtBranch=$2
		shift
		;;
	-c | --create)
		newBranch=$2
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

if [[ "$newBranch" ]]; then
	if [[ $(git stash show 2>/dev/null | echo $?) -gt 0 ]]; then git stash save *; fi
	git checkout -qb $newBranch
	if [[ $(git stash show 2>/dev/null | echo $?) -gt 0 ]];then
		git stash show
		read -p "Pop the latest stash? (y/n): " stash
		[ "$stash" == "y" ] && git stash pop;
	fi
	read -p "Exit? (y/n): " exit
	[ "$exit" == "y" ] && exit;
fi

git push -q 2>/dev/null || git push -qu "origin" HEAD 1>/dev/null
echo "Branches: Supplied ($tgtBranch) / previous ($previousBranch)"

if [[ "$sync" ]]; then
	if [[ $(git stash show 2>/dev/null | echo $?) -gt 0 ]]; then git stash save *; fi
	git checkout -q origin/$mainBranch && git reset --hard upstream/$mainBranch -q && git push -q && git checkout -q @{-1}
	if [[ $(git stash show 2>/dev/null | echo $?) -gt 0 ]]; then git stash pop; fi
fi
if [[ "$change" ]]; then
	if [[ "$tgtBranch" ]]; then git checkout -q origin/$tgtBranch; else git checkout -q @{-1}; fi
fi
if [[ "$delete" ]]; then git branch -qD @{-1}; fi
