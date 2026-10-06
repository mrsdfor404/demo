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
      console.warn('Firebase SDK غير محمل');
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
    console.error('خطأ Firebase:', error);
    return false;
  }
}

// ===== تسجيل طالب جديد =====
async function registerUser(email, password) {
  if (!firebaseReady) return { success: false, error: "Firebase غير جاهز" };
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    let msg = "حدث خطأ";
    if (error.code === 'auth/email-already-in-use') msg = "البريد مستخدم مسبقا";
    if (error.code === 'auth/invalid-email') msg = "البريد غير صحيح";
    if (error.code === 'auth/weak-password') msg = "كلمة السر ضعيفة (6 أحرف على الأقل)";
    return { success: false, error: msg };
  }
}

// ===== تسجيل دخول =====
async function loginUser(email, password) {
  if (!firebaseReady) return { success: false, error: "Firebase غير جاهز" };
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    let msg = "حدث خطأ";
    if (error.code === 'auth/user-not-found') msg = "البريد غير مسجل";
    if (error.code === 'auth/wrong-password') msg = "كلمة السر غلط";
    if (error.code === 'auth/invalid-email') msg = "البريد غير صحيح";
    return { success: false, error: msg };
  }
}

// ===== تسجيل خروج =====
async function logoutUser() {
  if (firebaseReady) await auth.signOut();
}

// ===== حفظ التقدم على السحابة =====
async function saveProgressToCloud(progress) {
  if (!firebaseReady || !auth.currentUser) return { success: false, error: "غير مسجل" };
  try {
    await db.collection('progress').doc(auth.currentUser.uid).set({
      ...progress,
      email: auth.currentUser.email,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ===== جلب التقدم من السحابة =====
async function getProgressFromCloud() {
  if (!firebaseReady || !auth.currentUser) return { success: false, error: "غير مسجل" };
  try {
    const doc = await db.collection('progress').doc(auth.currentUser.uid).get();
    if (doc.exists) return { success: true, data: doc.data() };
    return { success: false, error: "ما في تقدم محفوظ" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ===== مراقبة حالة تسجيل الدخول =====
function watchAuthState(callback) {
  if (!firebaseReady) return;
  auth.onAuthStateChanged((user) => {
    callback(user);
  });
}

window.addEventListener('load', () => {
  firebaseReady = initFirebase();
  if (firebaseReady) {
    watchAuthState((user) => {
      if (user) {
        console.log('طالب مسجل:', user.email);
      }
    });
  }
});
