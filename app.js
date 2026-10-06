// ===== متغيرات عامة =====
let currentIndex = 0;
let currentSubject = "arabic";
let currentGrade = null;
let currentSource = "book"; // book or worksheets
let currentQuestions = [];
let answered = false;
let studentScore = 0;
let currentStudent = null;

// ===== الروبوت =====
const robot = document.getElementById("robot");
const bubble = document.getElementById("speechBubble");
const mouth = document.getElementById("robotMouth");

function robotSay(text, mood = "normal") {
  bubble.textContent = text;
  bubble.style.animation = "none";
  setTimeout(() => bubble.style.animation = "pop 0.4s ease", 10);

  mouth.className = "mouth";
  if (mood === "happy") mouth.classList.add("happy");
  if (mood === "sad") mouth.classList.add("sad");
}

function robotCelebrate() {
  robot.classList.add("celebrate");
  setTimeout(() => robot.classList.remove("celebrate"), 600);
}

function robotShake() {
  robot.classList.add("shake");
  setTimeout(() => robot.classList.remove("shake"), 500);
}

function robotJumpAndSpin() {
  robot.classList.add("jump-spin");
  setTimeout(() => robot.classList.remove("jump-spin"), 1200);
}

// ===== خلط عشوائي =====
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ===== تبديل الشاشة =====
function switchScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ===== بداية اللعبة =====
function startGame() {
  // إذا الطالب رجع، نكمل من مكان ما وقف
  const saved = localStorage.getItem("savedProgress");
  if (saved) {
    const data = JSON.parse(saved);
    if (data.currentQuestions && data.currentIndex < data.currentQuestions.length) {
      const resume = confirm("عندك تقدم محفوظ. بدك تكمل من وين وقفت؟");
      if (resume) {
        currentQuestions = data.currentQuestions;
        currentIndex = data.currentIndex;
        currentSubject = data.currentSubject;
        currentGrade = data.currentGrade;
        currentSource = data.currentSource;
        studentScore = data.studentScore || 0;
        currentStudent = data.currentStudent;
        switchScreen("question-screen");
        showQuestion();
        return;
      } else {
        localStorage.removeItem("savedProgress");
      }
    }
  }

  robotJumpAndSpin();
  robotSay("يلا يا بطل! وريني شطارتك", "happy");

  setTimeout(() => {
    switchScreen("grade-screen");
    robotSay("يا بطل، اكتب رقم صفك");
  }, 2500);
}

// ===== التحقق من الصف =====
function checkGrade() {
  const grade = document.getElementById("grade-input").value.trim();
  const feedback = document.getElementById("grade-feedback");

  if (grade === "4" || grade === "5") {
    currentGrade = parseInt(grade);
    feedback.textContent = "أهلا يا بطل الصف " + grade;
    feedback.className = "feedback success";
    robotSay("أهلا يا بطل! عرفنا عنك", "happy");
    robotCelebrate();

    setTimeout(() => {
      switchScreen("student-info-screen");
      document.getElementById("grade-feedback").textContent = "";
    }, 1500);
  } else {
    feedback.textContent = "يا بطل، اكتب 4 أو 5 فقط";
    feedback.className = "feedback error";
    robotSay("يا بطل، اكتب 4 أو 5 فقط", "sad");
  }
}

// ===== حفظ بيانات الطالب =====
function saveStudentInfo() {
  const name = document.getElementById("student-name").value.trim();
  const father = document.getElementById("student-father").value.trim();
  const family = document.getElementById("student-family").value.trim();
  const section = document.getElementById("student-section").value.trim();
  const feedback = document.getElementById("student-feedback");

  if (!name || !father || !section) {
    feedback.textContent = "يا بطل، اكتب اسمك واسم أبوك وشعبتك";
    feedback.className = "feedback error";
    return;
  }

  currentStudent = {
    name: name,
    fatherName: father,
    familyName: family || "",
    grade: currentGrade,
    section: section
  };

  feedback.textContent = "يلا نبدأ يا بطل!";
  feedback.className = "feedback success";
  robotSay("يلا نبدأ يا " + name + "!", "happy");
  robotCelebrate();

  setTimeout(() => {
    switchScreen("subject-screen");
  }, 1500);
}

// ===== اختيار المادة =====
function chooseSubject(subject) {
  currentSubject = subject;
  currentIndex = 0;
  studentScore = 0;

  // إظهار شاشة اختيار المصدر
  const sourceButtons = document.getElementById("source-buttons");
  sourceButtons.innerHTML = "";

  const bookBtn = document.createElement("button");
  bookBtn.className = "primary-btn";
  bookBtn.textContent = "أسئلة من الكتاب";
  bookBtn.onclick = () => chooseSource("book");
  sourceButtons.appendChild(bookBtn);

  // التحقق من وجود أوراق عمل
  const hasWorksheets = checkWorksheetsAvailable(currentGrade, subject);
  if (hasWorksheets) {
    const wsBtn = document.createElement("button");
    wsBtn.className = "primary-btn";
    wsBtn.textContent = "أسئلة من أوراق العمل الداعمة";
    wsBtn.onclick = () => chooseSource("worksheets");
    sourceButtons.appendChild(wsBtn);
  }

  switchScreen("source-screen");
}

// ===== التحقق من وجود أوراق عمل =====
function checkWorksheetsAvailable(grade, subject) {
  if (grade === 4 && subject === "arabic") return wsArabic4.length > 0;
  if (grade === 4 && subject === "math") return wsMath4.length > 0;
  if (grade === 5 && subject === "arabic") return wsArabic5.length > 0;
  if (grade === 5 && subject === "math") return wsMath5.length > 0;
  return false;
}

// ===== اختيار المصدر =====
function chooseSource(source) {
  currentSource = source;
  currentIndex = 0;

  let allQuestions = [];

  if (source === "book") {
    if (currentGrade === 4 && currentSubject === "arabic") allQuestions = bookArabic4;
    if (currentGrade === 4 && currentSubject === "math") allQuestions = bookMath4;
    if (currentGrade === 5 && currentSubject === "arabic") allQuestions = bookArabic5;
    if (currentGrade === 5 && currentSubject === "math") allQuestions = bookMath5;
  } else {
    if (currentGrade === 4 && currentSubject === "arabic") allQuestions = wsArabic4;
    if (currentGrade === 4 && currentSubject === "math") allQuestions = wsMath4;
    if (currentGrade === 5 && currentSubject === "arabic") allQuestions = wsArabic5;
    if (currentGrade === 5 && currentSubject === "math") allQuestions = wsMath5;
  }

  // خلط عشوائي
  currentQuestions = shuffleArray(allQuestions);

  const subjectName = currentSubject === "arabic" ? "العربي" : "الرياضيات";
  const sourceName = source === "book" ? "الكتاب" : "أوراق العمل";

  document.getElementById("subject-label").textContent = subjectName + " - " + sourceName;
  document.getElementById("q-total").textContent = currentQuestions.length;

  robotSay("يلا نبدأ بـ" + subjectName + " من " + sourceName, "happy");
  robotCelebrate();

  setTimeout(() => {
    switchScreen("question-screen");
    showQuestion();
  }, 1500);
}

// ===== عرض السؤال =====
function showQuestion() {
  answered = false;
  const q = currentQuestions[currentIndex];
  document.getElementById("q-number").textContent = currentIndex + 1;
  document.getElementById("question-text").textContent = q.question;
  document.getElementById("feedback").textContent = "";
  document.getElementById("help-box").classList.add("hidden");
  document.getElementById("hint-text").textContent = q.hint || "";

  // إشارة الكتاب
  const refBox = document.getElementById("book-reference");
  if (q.bookRef && currentSource === "book") {
    refBox.classList.remove("hidden");
    document.getElementById("ref-page").textContent = q.bookRef.page;
    document.getElementById("ref-question").textContent = q.bookRef.question;
  } else {
    refBox.classList.add("hidden");
  }

  // توليد الأزرار
  const container = document.getElementById("options-container");
  container.innerHTML = "";

  const letters = ["أ", "ب", "ج", "د"];
  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `<span class="option-number">${letters[index]}</span> ${option}`;
    btn.onclick = () => selectOption(index, btn);
    container.appendChild(btn);
  });

  const progress = (currentIndex / currentQuestions.length) * 100;
  document.getElementById("progressFill").style.width = progress + "%";

  robotSay("فكر زين يا بطل، إنت قدها");
}

// ===== اختيار إجابة =====
function selectOption(index, btn) {
  if (answered) return;
  answered = true;

  const q = currentQuestions[currentIndex];
  const feedback = document.getElementById("feedback");
  const allButtons = document.querySelectorAll(".option-btn");

  allButtons.forEach(b => b.disabled = true);

  if (index === q.correctIndex) {
    studentScore++;
    btn.classList.add("correct");
    feedback.textContent = "برافو عليك يا بطل! إنت اللي حليتها";
    feedback.className = "feedback success";
    robotSay("برافو عليك! إنت اللي حليتها", "happy");
    robotCelebrate();
    setTimeout(nextQuestion, 2200);
  } else {
    btn.classList.add("wrong");
    allButtons[q.correctIndex].classList.add("correct");

    const msgs = [
      "معلش يا بطل، هاي بداية النجاح",
      "عادي جدا يا بطل، هيك بنتعلم",
      "ولا يهمك، الأبطال بيغلطوا كمان",
      "قربت! جرب مرة ثانية يا بطل"
    ];
    const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
    feedback.textContent = randomMsg;
    feedback.className = "feedback error";
    robotSay(randomMsg, "sad");
    robotShake();
    document.getElementById("help-box").classList.remove("hidden");
  }
}

// ===== التلميح =====
function showHint() {
  document.getElementById("help-box").classList.remove("hidden");
  document.getElementById("feedback").textContent = "شوف التلميح يا بطل";
  document.getElementById("feedback").className = "feedback";
  robotSay("تفضل التلميح يا بطل", "happy");
}

// ===== الحل سوا =====
function solveTogether() {
  document.getElementById("feedback").textContent = "إنت شطور لأنك ما استسلمت، يلا نكمل";
  document.getElementById("feedback").className = "feedback success";
  robotSay("إنت شطور لأنك ما استسلمت! يلا نحلها سوا", "happy");

  setTimeout(() => {
    const answer = currentQuestions[currentIndex].options[currentQuestions[currentIndex].correctIndex];
    document.getElementById("feedback").textContent = "الجواب هو: " + answer + " - يلا نجرب سؤال جديد!";
    robotSay("الجواب هو " + answer + " - يلا نجرب سؤال جديد!", "happy");
    setTimeout(nextQuestion, 2500);
  }, 2500);
}

// ===== حفظ والخروج =====
function saveAndExit() {
  const progress = {
    currentQuestions: currentQuestions,
    currentIndex: currentIndex,
    currentSubject: currentSubject,
    currentGrade: currentGrade,
    currentSource: currentSource,
    studentScore: studentScore,
    currentStudent: currentStudent
  };
  localStorage.setItem("savedProgress", JSON.stringify(progress));
  robotSay("تمام يا بطل، بنكمل بعدين", "happy");
  setTimeout(() => {
    switchScreen("welcome-screen");
    robotSay("أهلا يا بطل! جاهز نتحدى؟");
  }, 1500);
}

// ===== السؤال التالي =====
function nextQuestion() {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    robotSay("يلا سؤال جديد يا بطل", "happy");
    setTimeout(showQuestion, 1500);
  } else {
    // انتهت الأسئلة
    localStorage.removeItem("savedProgress");
    document.getElementById("progressFill").style.width = "100%";
    document.getElementById("final-score").textContent = `نتيجتك: ${studentScore} من ${currentQuestions.length}`;
    switchScreen("win-screen");
    robotSay("خلصت كل الأسئلة! إنت بطل حقيقي", "happy");
  }
}

// ===== إعادة =====
function restart() {
  currentIndex = 0;
  studentScore = 0;
  switchScreen("subject-screen");
  robotSay("شو بتحب نلعب اليوم؟", "happy");
}

// ===== شاشات المعلومات =====
function showScreen(id) {
  switchScreen(id);
}

function showAbout() {
  switchScreen("about-screen");
}

function showCompetitions() {
  switchScreen("competitions-screen");
}

function showDeveloper() {
  switchScreen("developer-screen");
}

function showLicense() {
  switchScreen("license-screen");
}

// ===== دخول المطور =====
function openDeveloperLogin() {
  switchScreen("developer-login-screen");
}

function developerLogin() {
  const email = document.getElementById("dev-email").value.trim();
  const password = document.getElementById("dev-password").value.trim();
  const feedback = document.getElementById("dev-feedback");

  // التحقق من الإيميل وكلمة السر
  if (email === "user1.9.2v0@gmail.com" && password === "Test@123456") {
    feedback.textContent = "مرحبا يا مطور!";
    feedback.className = "feedback success";
    setTimeout(() => {
      switchScreen("developer-dashboard");
    }, 1000);
  } else {
    feedback.textContent = "إيميل أو كلمة سر غلط";
    feedback.className = "feedback error";
  }
}

function developerLogout() {
  document.getElementById("dev-email").value = "";
  document.getElementById("dev-password").value = "";
  document.getElementById("questions-view").innerHTML = "";
  switchScreen("welcome-screen");
}

function viewQuestions() {
  const view = document.getElementById("questions-view");
  view.innerHTML = "<h3>الأسئلة المتاحة:</h3>";
  view.innerHTML += "<p>عربي - رابع - كتاب: " + bookArabic4.length + " سؤال</p>";
  view.innerHTML += "<p>رياضيات - رابع - كتاب: " + bookMath4.length + " سؤال</p>";
  view.innerHTML += "<p>عربي - خامس - كتاب: " + bookArabic5.length + " سؤال</p>";
  view.innerHTML += "<p>رياضيات - خامس - كتاب: " + bookMath5.length + " سؤال</p>";
  view.innerHTML += "<p>عربي - رابع - أوراق عمل: " + wsArabic4.length + " سؤال</p>";
  view.innerHTML += "<p>رياضيات - رابع - أوراق عمل: " + wsMath4.length + " سؤال</p>";
  view.innerHTML += "<p>عربي - خامس - أوراق عمل: " + wsArabic5.length + " سؤال</p>";
  view.innerHTML += "<p>رياضيات - خامس - أوراق عمل: " + wsMath5.length + " سؤال</p>";
}

// ===== ابدأ =====
switchScreen("welcome-screen");