// ===== Firebase Configuration =====
const firebaseConfig = {
  apiKey: "AIzaSyC63n1xQqQf3SluIV1I3hwVVdFkbSwq1bM",
  authDomain: "fir-38d33.firebaseapp.com",
  projectId: "fir-38d33",
  storageBucket: "fir-38d33.firebasestorage.app",
  messagingSenderId: "485439088037",
  appId: "1:485439088037:web:985a2a704da2e4cc73744c",
  measurementId: "G-KZYSYMP7MJ"
};

let db = null;
let auth = null;
let firebaseReady = false;

function initFirebase() {
  try {
    if (typeof firebase === 'undefined') {
      console.warn('Firebase SDK لم يتم تحميله');
      return false;
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
    auth = firebase.auth();
    console.log('Firebase جاهز');
    return true;
  } catch (error) {
    console.error('خطأ في Firebase:', error);
    return false;
  }
}

window.addEventListener('load', () => {
  firebaseReady = initFirebase();
});
