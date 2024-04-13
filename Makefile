MAKEFLAGS += -r
export TWEEGO_PATH=devTools/tweeGo/storyFormats
HASH := $(shell git rev-list -n 1 --abbrev-commit HEAD)
COMMIT := $(shell git rev-parse --short HEAD)
TWEEGO := $(shell command -v tweego 2>/dev/null)
ifndef TWEEGO
	uname := $(shell uname -s)
	arch := $(shell uname -m)
	arch := $(shell if test $(arch) = x86_64 -o $(arch) = amd64; then echo 64; else echo 32; fi)
	ifeq ($(uname),Linux)
		ifeq ($(arch),64)
			TWEEGO := devTools/tweeGo/tweego_nix64
		else
			TWEEGO := devTools/tweeGo/tweego_nix86
		endif
	else ifeq ($(uname),Darwin)
		ifeq ($(arch),64)
			TWEEGO := devTools/tweeGo/tweego_osx64
		else
			TWEEGO := devTools/tweeGo/tweego_osx86
		endif
	endif
endif

all: bin/FC_pregmod.html bin/resources

git: bin/FC_pregmod_$(HASH).html bin/resources

bin/resources: resources
	test -L "$@" || ln -s "../$<" bin/

bin/%.html: bin/tmp
	rm src/002-config/fc-version.js.commitHash.js
	mv $< $@

# concatenated module files
bin/fc.%: bin/
	devTools/concatFiles.sh $*/ '*.$*' $@

bin/tmp: bin/fc.js bin/fc.css injectGitCommitHash
	$(TWEEGO) --module=bin/fc.js --module=bin/fc.css --head resources/raster/favicon/arcologyVector.html src/ > $@
	rm -f bin/fc.js
	rm -f bin/fc.css

injectGitCommitHash:
	printf "App.Version.commitHash = '%s';\n" $(COMMIT) > src/002-config/fc-version.js.commitHash.js

bin/:
	mkdir -p $@

sanity:
	./sanityCheck.sh

sugarcube:
	(cd submodules/sugarcube-2/ && node build.js -n -b 2)
	mv submodules/sugarcube-2/build/twine2/sugarcube-2/format.js devTools/tweeGo/storyFormats/sugarcube-2/format.js
	(cd submodules/sugarcube-2/ && git diff master fc > sugarcube-fc-changes.patch)
	mv submodules/sugarcube-2/sugarcube-fc-changes.patch devNotes/"sugarcube stuff"/sugarcube-fc-changes.patch

.PHONY: all sanity git injectGitCommitHash sugarcube
