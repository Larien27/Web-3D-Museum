const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('./firebase_key.json');

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'web-3d-museum.firebasestorage.app'
});

const bucket = getStorage().bucket();

module.exports = { bucket };