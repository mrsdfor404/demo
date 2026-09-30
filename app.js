// ===== أسئلة العربي =====
const arabicQuestions = [
  {
    question: "حوّل الجملة إلى أسلوب تعجب: الوردُ جَميل.",
    answer: "ما أجمل الورد",
    hint: "استخدم (ما) + فعل التعجب + الاسم. الكلمة (جميل) → (أجمل)."
  },
  {
    question: "حوّل الجملة إلى أسلوب تعجب: اللبنُ بارد.",
    answer: "ما أبرد اللبن",
    hint: "الكلمة (بارد) → (أبرد). لا تنسَ (ما) في البداية."
  },
  {
    question: "حوّل الجملة إلى أسلوب تعجب: الكتابُ نافع.",
    answer: "ما أنفع الكتاب",
    hint: "الكلمة (نافع) → (أنفع)."
  },
  {
    question: "حوّل الجملة إلى أسلوب تعجب: المسجدُ كبير.",
    answer: "ما أكبر المسجد",
    hint: "الكلمة (كبير) → (أكبر)."
  },
  {
    question: "ما هو أسلوب التعجب؟",
    answer: "أسلوب نعبر فيه عن اندهاشنا وإعجابنا بشيء ما",
    hint: "لما تشوف شي حلو، شو بتقول؟"
  },
  {
    question: "ما هي علامة الترقيم الخاصة بأسلوب التعجب؟",
    answer: "علامة التعجب",
    hint: "موجودة في نهاية كل جملة تعجب."
  },
  {
    question: "ما هي الجملة التي تعبر عن التعجب؟ (اكتب أ، ب، أو ج)",
    answer: "ب",
    hint: "الجملة التعجبية تبدأ بـ (ما) وتنتهي بعلامة التعجب (!)."
  }
];

// ===== أسئلة الرياضيات =====
const mathQuestions = [
  {
    question: "كم يساوي ٧ × ٨ ؟",
    answer: "56",
    hint: "٧ × ٨ يعني ٧ + ٧ + ٧ ... (٨ مرات)."
  },
  {
    question: "كم يساوي ٤٥ + ٢٧ ؟",
    answer: "72",
    hint: "اجمع الآحاد أولاً: ٥ + ٧ = ١٢. بعدين العشرات: ٤٠ + ٢٠ = ٦٠."
  },
  {
    question: "كم يساوي ٩ × ٦ ؟",
    answer: "54",
    hint: "٩ × ٦ يعني ٩ + ٩ + ٩... (٦ مرات)."
  },
  {
    question: "كم يساوي ١٠٠ − ٣٧ ؟",
    answer: "63",
    hint: "اطرح ٧ من ١٠٠ = ٩٣، بعدين اطرح ٣٠ = ٦٣."
  },
  {
    question: "كم يساوي ٦ × ٧ ؟",
    answer: "42",
    hint: "٦ × ٧ يعني ٦ + ٦ + ٦... (٧ مرات)."
  },
  {
    question: "كم يساوي ٨٠ − ٢٥ ؟",
    answer: "55",
    hint: "اطرح ٥ من ٨٠ = ٧٥، بعدين اطرح ٢٠ = ٥٥."
  },
  {
    question: "كم يساوي ٣٦ + ٤٨ ؟",
    answer: "84",
    hint: "اجمع الآحاد: ٦ + ٨ = ١٤. بعدين العشرات: ٣٠ + ٤٠ = ٧٠."
  }
];

// ===== رسائل التشجيع =====
const encouragements = [
  "معلش يا بطل، هاي بداية النجاح، وكلنا بنغلط لا تزعل 💙",
  "عادي جداً يا بطل، هيك بنتعلم 💪",
  "ولا يهمك، الأبطال بيغلطوا كمان 🌟",
  "قربت! جرّب مرة ثانية يا بطل 🚀"
];

// ===== المتغيرات =====
let currentIndex = 0;
let currentSubject = "arabic";
let currentGrade = null;

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

function robotSpinAndCelebrate() {
  robot.classList.add("spin");
  setTimeout(() => {
    robot.classList.remove("spin");
    robot.classList.add("celebrate");
    setTimeout(() => robot.classList.remove("celebrate"), 600);
  }, 1000);
}

// ===== الأصوات =====
function playSuccessSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      const t = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.start(t);
      osc.stop(t + 0.3);
    });
  } catch (e) {}
}

function playGentleSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 330;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
}

function playVictorySound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const melody = [523, 523, 659, 784, 1047, 784, 1047];
    melody.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "triangle";
      const t = ctx.currentTime + i * 0.15;
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.start(t);
      osc.stop(t + 0.35);
    });
  } catch (e) {}
}

// ===== بداية اللعبة =====
function startGame() {
  // الروبوت يلف ويفرح
  robotSpinAndCelebrate();
  robotSay("يلا يا بطل! ورّيني شطارتك 💪", "happy");

  // بعد ثانيتين ونص → شاشة الصف
  setTimeout(() => {
    switchScreen("grade-screen");
    robotSay("يا بطل، حط رقم صفك 👇");
  }, 2500);
}

// ===== التحقق من الصف =====
function checkGrade() {
  const grade = document.getElementById("grade-input").value.trim();
  const feedback = document.getElementById("grade-feedback");

  if (grade === "4") {
    currentGrade = 4;
    feedback.textContent = "أهلاً يا بطل الرابع! 🎉";
    feedback.className = "feedback success";
    robotSay("أهلاً يا بطل الرابع! شو بتحب نلعب؟ 🎮", "happy");
    robotCelebrate();

    setTimeout(() => {
      switchScreen("subject-screen");
      document.getElementById("grade-feedback").textContent = "";
    }, 1500);

  } else if (grade === "5") {
    currentGrade = 5;
    feedback.textContent = "الموقع لسا مش كامل يا بطل، بس رح يجهز قريب 💙";
    feedback.className = "feedback error";
    robotSay("الموقع لسا مش كامل يا بطل، بس رح يجهز قريب 💙", "sad");
    robotShake();

    // بعد 3 ثواني → يرجع للترحيب
    setTimeout(() => {
      switchScreen("welcome-screen");
      document.getElementById("grade-input").value = "";
      document.getElementById("grade-feedback").textContent = "";
      robotSay("أهلاً يا بطل! جاهز نتحدى؟ 😊");
    }, 3500);

  } else {
    feedback.textContent = "يا بطل، اكتب 4 أو 5 بس 🙏";
    feedback.className = "feedback error";
    robotSay("يا بطل، اكتب 4 أو 5 بس 🙏", "sad");
  }
}

// ===== اختيار المادة =====
function chooseSubject(subject) {
  currentSubject = subject;
  currentIndex = 0;

  const subjectName = subject === "arabic" ? "العربي" : "الرياضيات";
  document.getElementById("subject-label").textContent = subjectName;

  robotSay("يلا نبدأ بـ" + subjectName + " 🚀", "happy");
  robotCelebrate();

  setTimeout(() => {
    document.getElementById("q-total").textContent = getQuestions().length;
    switchScreen("question-screen");
    showQuestion();
  }, 1500);
}

// ===== إرجاع الأسئلة حسب المادة =====
function getQuestions() {
  return currentSubject === "arabic" ? arabicQuestions : mathQuestions;
}

// ===== عرض السؤال =====
function showQuestion() {
  const q = getQuestions()[currentIndex];
  document.getElementById("q-number").textContent = currentIndex + 1;
  document.getElementById("question-text").textContent = q.question;
  document.getElementById("answer-input").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("help-box").classList.add("hidden");
  document.getElementById("hint-text").textContent = q.hint;

  const progress = (currentIndex / getQuestions().length) * 100;
  document.getElementById("progressFill").style.width = progress + "%";

  robotSay("فكر زين يا بطل، إنت قدها 🤔");
}

// ===== التحقق من الجواب =====
function checkAnswer() {
  const userAnswer = document.getElementById("answer-input").value.trim();
  const correct = getQuestions()[currentIndex].answer;
  const feedback = document.getElementById("feedback");

  if (userAnswer === correct) {
    feedback.textContent = "برافو عليك يا بطل! إنت اللي حليتها 🌟";
    feedback.className = "feedback success";
    robotSay("برافو عليك! إنت اللي حليتها 🎉", "happy");
    robotCelebrate();
    playSuccessSound();
    setTimeout(nextQuestion, 2200);
  } else {
    const randomMsg = encouragements[Math.floor(Math.random() * encouragements.length)];
    feedback.textContent = randomMsg;
    feedback.className = "feedback error";
    robotSay(randomMsg, "sad");
    robotShake();
    playGentleSound();
    document.getElementById("help-box").classList.remove("hidden");
  }
}

// ===== التلميح =====
function showHint() {
  document.getElementById("help-box").classList.remove("hidden");
  document.getElementById("feedback").textContent = "شوف التلميح يا بطل 👇";
  document.getElementById("feedback").className = "feedback";
  robotSay("تفضل التلميح يا بطل 💡", "happy");
}

// ===== الحل سوا =====
function solveTogether() {
  document.getElementById("feedback").textContent =
    "إنت شطور لأنك ما استسلمت، يلا نكمل 🤝";
  document.getElementById("feedback").className = "feedback success";

  robotSay("إنت شطور لأنك ما استسلمت! يلا نحلها سوا 🤝", "happy");

  setTimeout(() => {
    const answer = getQuestions()[currentIndex].answer;
    document.getElementById("feedback").textContent =
      "الجواب هو: " + answer + " — يلا نجرب سؤال جديد!";
    robotSay("الجواب هو " + answer + " — يلا نجرب سؤال جديد!", "happy");
    setTimeout(nextQuestion, 2500);
  }, 2500);
}

// ===== السؤال التالي =====
function nextQuestion() {
  currentIndex++;
  if (currentIndex < getQuestions().length) {
    robotSay("يلا سؤال جديد يا بطل 🚀", "happy");
    setTimeout(showQuestion, 1500);
  } else {
    document.getElementById("progressFill").style.width = "100%";
    switchScreen("win-screen");
    robotSay("خلصت كل الأسئلة! إنت بطل حقيقي 🏆", "happy");
    playVictorySound();
    setTimeout(playVictorySound, 1200);
  }
}

// ===== إعادة =====
function restart() {
  currentIndex = 0;
  switchScreen("subject-screen");
  robotSay("شو بتحب نلعب اليوم؟ 🎮", "happy");
}

// ===== تبديل الشاشة =====
function switchScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ابدأ من شاشة الترحيب
switchScreen("welcome-screen");
