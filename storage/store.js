var admin = require('firebase-admin');

class Store {
    constructor(serviceAccount, databaseURL, databaseName) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: databaseURL
        });

        this.database = admin.database();
        this.databaseName = databaseName;
        this.databaseURL = databaseURL; // `${ databaseURL }/`;
    }

    async get(key) {
        var ref = this.database.ref(this.databaseName);
        const record = ref.child(`${ key }`).once('value');
        return record.val();
    }

    async set(key, value) {
        var ref = this.database.ref(this.databaseName);
        ref.child(key).set(value);
    }
}

exports.Store = Store;
