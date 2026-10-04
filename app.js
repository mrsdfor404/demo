// ===== أسئلة العربي (١٣ سؤال) =====
const arabicQuestions = [
  {
    question: "ما هو أسلوب التعجب؟",
    options: [
      "أسلوب نعبّر فيه عن اندهاشنا وإعجابنا بشيء ما",
      "أسلوب نطرح فيه سؤالاً",
      "أسلوب ننفي فيه شيئاً",
      "أسلوب نأمر فيه بشيء"
    ],
    correctIndex: 0,
    hint: "لما تشوف شي حلو، شو بتقول؟",
    bookRef: { page: 6, question: 1 }
  },
  {
    question: "ما هي علامة الترقيم الخاصة بأسلوب التعجب؟",
    options: ["النقطة (.)", "الفاصلة (،)", "علامة التعجب (!)", "علامة الاستفهام (؟)"],
    correctIndex: 2,
    hint: "موجودة في نهاية كل جملة تعجب.",
    bookRef: { page: 6, question: 2 }
  },
  {
    question: "أي جملة من الجمل التالية تعبّر عن التعجب؟",
    options: [
      "الذهاب إلى المدرسة مهم.",
      "ما أهمَّ الذهابَ إلى المدرسة!",
      "أذهب إلى المدرسة.",
      "هل أذهب إلى المدرسة؟"
    ],
    correctIndex: 1,
    hint: "الجملة التعجبية تبدأ بـ (ما) وتنتهي بعلامة التعجب (!).",
    bookRef: { page: 7, question: 3 }
  },
  {
    question: "حوّل الجملة إلى أسلوب تعجب: الوردُ جَميل.",
    options: ["ما أجملَ الوردَ!", "الوردُ جميل.", "ما الوردُ جميلاً.", "أجمل الورد."],
    correctIndex: 0,
    hint: "استخدم (ما) + فعل التعجب + الاسم.",
    bookRef: { page: 8, question: 1 }
  },
  {
    question: "من هو النبي الذي لُقّب بـ (خليل الرحمن)؟",
    options: ["موسى عليه السلام", "إبراهيم عليه السلام", "يوسف عليه السلام", "نوح عليه السلام"],
    correctIndex: 1,
    hint: "هو أبو الأنبياء.",
    bookRef: { page: 9, question: 1 }
  },
  {
    question: "ماذا أمر الله سبحانه وتعالى النار أن تكون على إبراهيم عليه السلام؟",
    options: ["دفئاً وسلاماً", "برداً وسلاماً", "أمناً وسكينة", "نوراً وهدى"],
    correctIndex: 1,
    hint: "قال تعالى: (قلنا يا نار كوني برداً وسلاماً على إبراهيم).",
    bookRef: { page: 9, question: 2 }
  },
  {
    question: "ماذا قالت النملة عندما رأت جيش سليمان؟",
    options: [
      "اهربوا إلى الجبال",
      "ادخلوا مساكنكم لا يحطمنكم سليمان وجنوده",
      "اختبئوا في الأشجار",
      "لا تخافوا"
    ],
    correctIndex: 1,
    hint: "قالت ذلك خوفاً على قومها.",
    bookRef: { page: 16, question: 1 }
  },
  {
    question: "ما اسم السورة التي وردت فيها قصة النملة مع سليمان؟",
    options: ["سورة البقرة", "سورة النمل", "سورة الكهف", "سورة يوسف"],
    correctIndex: 1,
    hint: "السورة سُميت باسم النملة.",
    bookRef: { page: 16, question: 2 }
  },
  {
    question: "من هو النبي الذي بنى السفينة؟",
    options: ["إبراهيم عليه السلام", "موسى عليه السلام", "نوح عليه السلام", "يوسف عليه السلام"],
    correctIndex: 2,
    hint: "دعا قومه للإيمان، فلما لم يؤمنوا أغرقهم الله بالطوفان.",
    bookRef: { page: 12, question: 3 }
  },
  {
    question: "ما هو جمع كلمة (كتاب)؟",
    options: ["كاتب", "كتب", "كتابة", "مكتبة"],
    correctIndex: 1,
    hint: "الكلمة تبدأ بحرف الكاف.",
    bookRef: { page: 17, question: 1 }
  },
  {
    question: "ما هي هواية طارق في القصة؟",
    options: ["لعب كرة القدم", "الرسم", "القراءة", "السباحة"],
    correctIndex: 1,
    hint: "كان يحمل دفتراً وألواناً شمعية.",
    bookRef: { page: 42, question: 1 }
  },
  {
    question: "بماذا فاز طارق في يوم النشاط المدرسي؟",
    options: ["بمسابقة كرة القدم", "بمسابقة الرسم", "بمسابقة القراءة", "بمسابقة الجري"],
    correctIndex: 1,
    hint: "لوحاته كانت معروضة على الجدران.",
    bookRef: { page: 43, question: 2 }
  },
  {
    question: "ما هي ألوان العلم الأردني؟",
    options: ["أحمر، أبيض، أخضر", "أسود، أبيض، أخضر، أحمر", "أزرق، أبيض، أحمر", "أصفر، أخضر، أحمر"],
    correctIndex: 1,
    hint: "يتكون من أربعة ألوان.",
    bookRef: { page: 62, question: 1 }
  }
];

// ===== أسئلة الرياضيات (١٣ سؤال) =====
const mathQuestions = [
  {
    question: "كم يساوي ٧ × ٨ ؟",
    options: ["48", "54", "56", "64"],
    correctIndex: 2,
    hint: "٧ × ٨ يعني ٧ + ٧ + ٧ ... (٨ مرات).",
    bookRef: { page: 15, question: 1 }
  },
  {
    question: "كم يساوي ٤٥ + ٢٧ ؟",
    options: ["62", "72", "82", "70"],
    correctIndex: 1,
    hint: "اجمع الآحاد أولاً: ٥ + ٧ = ١٢.",
    bookRef: { page: 22, question: 2 }
  },
  {
    question: "كم يساوي ٩ × ٦ ؟",
    options: ["45", "54", "56", "63"],
    correctIndex: 1,
    hint: "٩ × ٦ يعني ٩ + ٩ + ٩... (٦ مرات).",
    bookRef: { page: 30, question: 1 }
  },
  {
    question: "كم يساوي ١٠٠ − ٣٧ ؟",
    options: ["53", "63", "73", "67"],
    correctIndex: 1,
    hint: "اطرح ٧ من ١٠٠ = ٩٣، بعدين اطرح ٣٠ = ٦٣.",
    bookRef: { page: 38, question: 3 }
  },
  {
    question: "كم يساوي ٦ × ٧ ؟",
    options: ["36", "42", "48", "49"],
    correctIndex: 1,
    hint: "٦ × ٧ يعني ٦ + ٦ + ٦... (٧ مرات).",
    bookRef: { page: 15, question: 4 }
  },
  {
    question: "كم يساوي ٨٠ − ٢٥ ؟",
    options: ["45", "55", "65", "60"],
    correctIndex: 1,
    hint: "اطرح ٥ من ٨٠ = ٧٥، بعدين اطرح ٢٠ = ٥٥.",
    bookRef: { page: 46, question: 2 }
  },
  {
    question: "كم يساوي ٣٦ + ٤٨ ؟",
    options: ["74", "84", "94", "80"],
    correctIndex: 1,
    hint: "اجمع: ٣٦ + ٤٨ = ٨٤.",
    bookRef: { page: 54, question: 1 }
  },
  {
    question: "كم يساوي ٥ × ٩ ؟",
    options: ["40", "45", "50", "54"],
    correctIndex: 1,
    hint: "٥ × ٩ يعني ٥ + ٥ + ٥... (٩ مرات).",
    bookRef: { page: 60, question: 3 }
  },
  {
    question: "كم يساوي ١٢٠ − ٤٥ ؟",
    options: ["65", "75", "85", "70"],
    correctIndex: 1,
    hint: "اطرح ٤٠ من ١٢٠ = ٨٠، بعدين اطرح ٥ = ٧٥.",
    bookRef: { page: 68, question: 2 }
  },
  {
    question: "كم يساوي ٨ × ٨ ؟",
    options: ["56", "64", "72", "80"],
    correctIndex: 1,
    hint: "٨ × ٨ يعني ٨ + ٨ + ٨... (٨ مرات).",
    bookRef: { page: 75, question: 1 }
  },
  {
    question: "كم يساوي ٧ × ٩ ؟",
    options: ["56", "63", "72", "81"],
    correctIndex: 1,
    hint: "٧ × ٩ يعني ٧ + ٧ + ٧... (٩ مرات).",
    bookRef: { page: 82, question: 4 }
  },
  {
    question: "كم يساوي ١٤٤ ÷ ١٢ ؟",
    options: ["10", "12", "14", "16"],
    correctIndex: 1,
    hint: "فكر: ١٢ × ١٢ = ١٤٤.",
    bookRef: { page: 90, question: 2 }
  },
  {
    question: "كم يساوي ٩ × ٩ ؟",
    options: ["72", "81", "90", "99"],
    correctIndex: 1,
    hint: "٩ × ٩ يعني ٩ + ٩ + ٩... (٩ مرات).",
    bookRef: { page: 95, question: 3 }
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
let currentQuestions = [];
let answered = false;

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

// ===== خلط عشوائي =====
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ===== بداية اللعبة =====
function startGame() {
  robotJumpAndSpin();
  robotSay("يلا يا بطل! ورّيني شطارتك 💪", "happy");

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

  const allQuestions = subject === "arabic" ? arabicQuestions : mathQuestions;
  currentQuestions = shuffleArray(allQuestions);

  document.getElementById("q-total").textContent = currentQuestions.length;

  robotSay("يلا نبدأ بـ" + subjectName + " 🚀", "happy");
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
  document.getElementById("hint-text").textContent = q.hint;

  // إشارة الكتاب
  const refBox = document.getElementById("book-reference");
  if (q.bookRef) {
    refBox.classList.remove("hidden");
    document.getElementById("ref-page").textContent = q.bookRef.page;
    document.getElementById("ref-question").textContent = q.bookRef.question;
  } else {
    refBox.classList.add("hidden");
  }

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

  robotSay("فكر زين يا بطل، إنت قدها 🤔");
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
    btn.classList.add("correct");
    feedback.textContent = "برافو عليك يا بطل! إنت اللي حليتها 🌟";
    feedback.className = "feedback success";
    robotSay("برافو عليك! إنت اللي حليتها 🎉", "happy");
    robotCelebrate();
    playSuccessSound();
    setTimeout(nextQuestion, 2200);
  } else {
    btn.classList.add("wrong");
    allButtons[q.correctIndex].classList.add("correct");

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
    const answer = currentQuestions[currentIndex].options[currentQuestions[currentIndex].correctIndex];
    document.getElementById("feedback").textContent =
      "الجواب هو: " + answer + " — يلا نجرب سؤال جديد!";
    robotSay("الجواب هو " + answer + " — يلا نجرب سؤال جديد!", "happy");
    setTimeout(nextQuestion, 2500);
  }, 2500);
}

// ===== السؤال التالي =====
function nextQuestion() {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
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
