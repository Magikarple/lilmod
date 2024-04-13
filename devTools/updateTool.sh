#!/bin/bash
repo=upstream
branch=pregmod-master
function displayHelp() {
cat <<HelpText
Package required: git

Usage: $0 [OPTION]...
Options:
 -r, --repo  X    : Repo to check. Default: $repo
 -b, --branch X   : Branch to check. Default: $branch
 -v, --verbose X  : Be verbose. Default: $verbose
 -h, --help       : Show this help text
HelpText
}
while [[ "$1" ]]; do
	case $1 in
	-r | --repo)
		repo=$2
		shift
		;;
	-b | --branch)
		branch=$2
		shift
		;;
	-v | --verbose)
		verbose=true
		;;
	-h | --help)
		displayHelp
		exit 0
		;;
	*)
		echo "Unknown argument $1."
		displayHelp
		exit -1
		;;
	esac
	shift
done

git fetch $repo -q
if [[ $(git rev-list HEAD...$repo/$branch) ]]; then # https://adamj.eu/tech/2020/01/18/a-git-check-for-missing-commits-from-a-remote/
	if [[ $(git rev-parse --abbrev-ref HEAD) = "$branch" ]]; then
		git reset --hard $repo/$branch -q
	elif [[ $(git rev-parse --abbrev-ref HEAD) != "$branch" ]]; then
		git merge $repo/$branch -q
	fi
	exit=1
fi
if [ $verbose ]; then
	echo "Updated: $(if [ $exit ]; then echo "Yes"; else echo "No"; fi)" # stackoverflow.com/a/73539272
fi
