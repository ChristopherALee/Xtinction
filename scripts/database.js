const firebase = require("firebase");

const config = {
  apiKey: "AIzaSyC8omcRZ5BIOsUPmpCLUhe1MHFNg5rZVB4",
  authDomain: "xtinction-fcea9.firebaseapp.com",
  databaseURL: "https://xtinction-fcea9.firebaseio.com",
  projectId: "xtinction-fcea9",
  storageBucket: "xtinction-fcea9.appspot.com",
  messagingSenderId: "332010166190"
};

const firebaseDB = firebase.initializeApp(config);

const Database = firebaseDB.database();

module.exports = Database;
