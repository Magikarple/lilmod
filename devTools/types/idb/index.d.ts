import * as allIDB from './entry.js'

// IDB v7.1.1 https://github.com/jakearchibald/idb

declare global {
    const idb: typeof allIDB;
}
