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

// ===== متغيرات =====
let db = null;
let auth = null;
let firebaseReady = false;

// ===== تهيئة Firebase =====
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

// ===== تسجيل الدخول =====
async function loginUser(email, password) {
  if (!firebaseReady) {
    return { success: false, error: "Firebase غير جاهز" };
  }

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    const userDoc = await db.collection('users').doc(user.uid).get();

    if (!userDoc.exists) {
      await auth.signOut();
      return { success: false, error: "حسابك غير مسجل في النظام" };
    }

    const userData = userDoc.data();
    const role = userData.role;

    if (role !== 'teacher' && role !== 'admin' && role !== 'developer') {
      await auth.signOut();
      return { success: false, error: "ما عندك صلاحية الدخول" };
    }

    return { 
      success: true, 
      user: {
        uid: user.uid,
        email: user.email,
        name: userData.name || email.split('@')[0],
        role: role
      }
    };

  } catch (error) {
    console.error('خطأ:', error);
    let errorMsg = "حدث خطأ";
    if (error.code === 'auth/user-not-found') errorMsg = "الإيميل غير مسجل";
    if (error.code === 'auth/wrong-password') errorMsg = "كلمة السر غلط";
    if (error.code === 'auth/invalid-email') errorMsg = "الإيميل غير صحيح";
    return { success: false, error: errorMsg };
  }
}

// ===== تسجيل الخروج =====
async function logoutUser() {
  if (firebaseReady) {
    await auth.signOut();
  }
}

// ===== حفظ بيانات الطالب =====
async function saveStudentData(studentData) {
  if (!firebaseReady) return { success: false, error: "Firebase غير جاهز" };
  
  try {
    const studentId = `${studentData.grade}-${studentData.section}-${Date.now()}`;
    await db.collection('students').doc(studentId).set({
      ...studentData,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: studentId };
  } catch (error) {
    console.error('خطأ في حفظ بيانات الطالب:', error);
    return { success: false, error: error.message };
  }
}

// ===== حفظ نتيجة الطالب =====
async function saveStudentResult(resultData) {
  if (!firebaseReady) return { success: false, error: "Firebase غير جاهز" };
  
  try {
    const resultId = `${resultData.studentId}-${resultData.subject}-${Date.now()}`;
    await db.collection('results').doc(resultId).set({
      ...resultData,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: resultId };
  } catch (error) {
    console.error('خطأ في حفظ النتيجة:', error);
    return { success: false, error: error.message };
  }
}

// ===== جلب النتائج (للمعلم والمدير) =====
async function getResults(filters = {}) {
  if (!firebaseReady) return { success: false, error: "Firebase غير جاهز" };
  
  try {
    let query = db.collection('results').orderBy('createdAt', 'desc').limit(100);
    
    if (filters.grade) {
      query = query.where('grade', '==', filters.grade);
    }
    if (filters.section) {
      query = query.where('section', '==', filters.section);
    }
    if (filters.subject) {
      query = query.where('subject', '==', filters.subject);
    }

    const snapshot = await query.get();
    const results = [];
    snapshot.forEach(doc => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: results };
  } catch (error) {
    console.error('خطأ في جلب النتائج:', error);
    return { success: false, error: error.message };
  }
}

// ===== مراقبة حالة تسجيل الدخول =====
function watchAuthState(callback) {
  if (!firebaseReady) return;
  
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          callback({ 
            uid: user.uid, 
            email: user.email, 
            ...userDoc.data() 
          });
        }
      } catch (e) {
        console.error('خطأ:', e);
      }
    } else {
      callback(null);
    }
  });
}