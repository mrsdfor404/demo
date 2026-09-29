// ===== بنك الأسئلة (٧ أسئلة) =====
const questions = [
  {
    question: "كم يساوي ٧ × ٨ ؟",
    answer: "56",
    hint: "٧ × ٨ يعني ٧ + ٧ + ٧ ... (٨ مرات). جرّب تجمع ٧ + ٧ = ١٤، وبعدين كم بتطلع؟"
  },
  {
    question: "ما هو جمع كلمة (كتاب) ؟",
    answer: "كتب",
    hint: "الكلمة تبدأ بحرف الكاف، وهي جمع قِلّة."
  },
  {
    question: "كم يساوي ٤٥ + ٢٧ ؟",
    answer: "72",
    hint: "اجمع الآحاد أولاً: ٥ + ٧ = ١٢. بعدين العشرات: ٤٠ + ٢٠ = ٦٠. اجمعهم سوا."
  },
  {
    question: "أكمل: ذهبَ الطالبُ ___ المدرسة.",
    answer: "إلى",
    hint: "حرف جر يدل على الاتجاه."
  },
  {
    question: "كم يساوي ٩ × ٦ ؟",
    answer: "54",
    hint: "٩ × ٦ يعني ٩ + ٩ + ٩... (٦ مرات)."
  },
  {
    question: "ما هو مفرد كلمة (أقلام) ؟",
    answer: "قلم",
    hint: "الكلمة تبدأ بحرف القاف، وهي أداة نكتب بها."
  },
  {
    question: "كم يساوي ١٠٠ − ٣٧ ؟",
    answer: "63",
    hint: "اطرح ٧ من ١٠٠ = ٩٣، بعدين اطرح ٣٠ = ٦٣. أو اجمع: ٣٧ + ٦٣ = ١٠٠."
  }
];

// ===== رسائل التشجيع =====
const encouragements = [
  "معلش يا بطل، هاي بداية النجاح، وكلنا بنغلط لا تزعل 💙",
  "عادي جداً يا بطل، هيك بنتعلم 💪",
  "ولا يهمك، الأبطال بيغلطوا كمان 🌟",
  "قربت! جرّب مرة ثانية يا بطل 🚀"
];

let currentIndex = 0;

// ===== الروبوت =====
const robot = document.getElementById("robot");
const bubble = document.getElementById("speechBubble");
const mouth = document.getElementById("robotMouth");

// الروبوت يتكلم كتابة فقط (بدون صوت)
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

// ===== الأصوات (نغمات فقط، بدون كلام) =====

// نغمة فرح
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

// نغمة هادئة
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

// لحن الفوز
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

// ===== اللعبة =====
function startGame() {
  currentIndex = 0;
  document.getElementById("q-total").textContent = questions.length;
  switchScreen("question-screen");
  setTimeout(showQuestion, 400);
}

function showQuestion() {
  const q = questions[currentIndex];
  document.getElementById("q-number").textContent = currentIndex + 1;
  document.getElementById("question-text").textContent = q.question;
  document.getElementById("answer-input").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("help-box").classList.add("hidden");
  document.getElementById("hint-text").textContent = q.hint;

  // شريط التقدم
  const progress = ((currentIndex) / questions.length) * 100;
  document.getElementById("progressFill").style.width = progress + "%";

  robotSay("فكر زين يا بطل، إنت قدها 🤔");
}

function checkAnswer() {
  const userAnswer = document.getElementById("answer-input").value.trim();
  const correct = questions[currentIndex].answer;
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

function showHint() {
  document.getElementById("help-box").classList.remove("hidden");
  document.getElementById("feedback").textContent = "شوف التلميح يا بطل 👇";
  document.getElementById("feedback").className = "feedback";
  robotSay("تفضل التلميح يا بطل 💡", "happy");
}

function solveTogether() {
  document.getElementById("feedback").textContent =
    "إنت شطور لأنك ما استسلمت، يلا نكمل 🤝";
  document.getElementById("feedback").className = "feedback success";

  robotSay("إنت شطور لأنك ما استسلمت! يلا نحلها سوا 🤝", "happy");

  setTimeout(() => {
    const answer = questions[currentIndex].answer;
    document.getElementById("feedback").textContent =
      "الجواب هو: " + answer + " — يلا نجرب سؤال جديد!";
    robotSay("الجواب هو " + answer + " — يلا نجرب سؤال جديد!", "happy");
    setTimeout(nextQuestion, 2500);
  }, 2500);
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    robotSay("يلا سؤال جديد يا بطل 🚀", "happy");
    setTimeout(showQuestion, 1200);
  } else {
    document.getElementById("progressFill").style.width = "100%";
    switchScreen("win-screen");
    robotSay("خلصت كل الأسئلة! إنت بطل حقيقي 🏆", "happy");
    playVictorySound();
    setTimeout(playVictorySound, 1200);
  }
}

function restart() {
  startGame();
}

function switchScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ابدأ من شاشة الترحيب
switchScreen("welcome-screen");