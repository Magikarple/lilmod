// Use release as save version
// We need to do this in a file after fc-version.js because the commit hash gets appended to it during compiling
Config.saves.version = `${App.Version.release}${App.Version.commitHash ? (`#${App.Version.commitHash}`) : ''}`;
