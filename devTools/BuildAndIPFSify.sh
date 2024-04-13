#!/bin/sh

# setup:
# add this to crontab:
# */15 * * * * cd ~/FC/fc-pregmod && git pull --ff-only origin pregmod-master > ~/FC/git_pull.log 2>&1
# and do "ln -s ~/FC/fc-pregmod/devTools/BuildAndIPFSify.sh .git/hooks/post-merge"
# NOTE: you may need to define XDG_RUNTIME_DIR in your crontab

# TODO: add logic to figure out if we should use ipfs-cluster instead of using the local instance directly.
#			if we use ipfs-cluster we probably don't need to warm ipfs.io's cache.

rm bin/*.html

# if this script is used as the post-merge hook then
# a) git pull has pulled something
# b) $PWD is fc-pregmod
if [ "$(basename "$0")" != "post-merge" ]; then
	# cd to fc-pregmod based on where this script is
	cd "$(readlink -f "$(dirname "$0")")/.." || exit 1
	git pull
	# if there are new html files then git probably pulled something and ran this script as a post-merge hook
	if ls bin/*.html; then
		exit 0
	fi
fi

# If we've done this before then unpin the previous hash so IPFS can GC it if it needs to
if [ -r ../IPFS_hash.txt ]; then
	ipfs pin rm --recursive=true "$(cut -d : -f 2 ../IPFS_hash.txt | tr -d ' ')"
fi

./compile || exit 1

# Keep the build time from changing the hash of the file
sed -Ei -e '/^  \* Built on .+$/d' bin/*.html

# add the date of the last commit to the file, but don't use colons because Windows (still?) doesn't like them
mv bin/*.html "bin/FC pregmod $(git log -1 --format='%cd' --date='format:%F %H-%M').html"

# include the unembedded vector art
ipfs_hash="$(ipfs add -w -Q -r bin/*.html resources)"
echo "IPFS Folder Hash: ${ipfs_hash}" > ../IPFS_hash.txt
ipfs name publish "$ipfs_hash"

# when it's done it will print something like "Published to $your_pubkey: /ipfs/$ipfs_hash"
# You can view the folder at http://127.0.0.1:8080/ipns/$your_pubkey

# make ipfs.io cache the files
# $XDG_RUNTIME_DIR SHOULD be defined, but there are cases where it wouldn't be
if [ -z "${XDG_RUNTIME_DIR+x}" ]; then
	echo "\$XDG_RUNTIME_DIR is unset, bailing"
	exit 2
fi

# throw it into a file so we can loop over lines, not "strings delimited by whitespace"
find resources bin -print | grep -ve '.gitignore' | sed -e 's|bin/||' | grep -Ee '.+\.svg' -e '.html' > "${XDG_RUNTIME_DIR}/files.list"

# ipfs PeerID, it's user specific
PeerID="$(ipfs config show | grep -e 'PeerID' | cut -d: -f 2 | tr -d ' "')"
while IFS= read -r item
do
	echo "https://ipfs.io/ipns/${PeerID}/${item}"
done < "${XDG_RUNTIME_DIR}/files.list" | xargs --max-procs=10 --max-args=1 --replace curl --silent --show-error --range 0-499 --output /dev/null '{}'

rm "${XDG_RUNTIME_DIR}/files.list"
