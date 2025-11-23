// ---------- THEME TOGGLE (ALL PAGES) ----------
(function initTheme() {
    const themeToggle = document.getElementById('themeToggle');

    const saved =
        localStorage.getItem('theme') ||
        document.body.getAttribute('data-theme') ||
        'dark';

    document.body.setAttribute('data-theme', saved);

    if (!themeToggle) return;

    // Checked = dark mode
    themeToggle.checked = saved === 'dark';

    themeToggle.addEventListener('change', (e) => {
        const mode = e.target.checked ? 'dark' : 'light';
        document.body.setAttribute('data-theme', mode);
        localStorage.setItem('theme', mode);
    });
})();

// ---------- QUIZ LOGIC (index.html) ----------
const generateBtn = document.getElementById("generateBtn");

if (generateBtn) {
    generateBtn.addEventListener("click", runPython);
}

async function runPython() {
    if (typeof loadPyodide === "undefined") {
        alert("Pyodide is not available on this page.");
        return;
    }

    let pyodide = await loadPyodide();
    let numInput = document.getElementById("num_problems");
    if (!numInput) return;

    let num = numInput.value;
    if (!num || num < 1) {
        alert("Zero não, Zé do Prego. Coloca outro número aí.");
        return;
    } else if (num > 21) {
        alert("This is too much, Paulo. Please enter a valid number.");
        return;
    }

    let pythonCode = `
import random

def division_problems(num):
    problems = []
    count = 0
    while count < num:
        dividend = random.randint(10000, 99999)
        divisor = random.randint(11, 100)
        if dividend % divisor == 0:
            answer = dividend // divisor
            problems.append((f"How much is {dividend} ÷ {divisor}?", answer))
            count += 1
    return problems

division_problems(int(${num}))
    `;

    try {
        let result = await pyodide.runPythonAsync(pythonCode);

        let problemList = document.getElementById("problems");
        if (!problemList) return;

        problemList.innerHTML = "";

        for (let [question, answer] of result.toJs()) {
            const li = document.createElement("li");
            li.classList.add("problem-item");
            li.innerHTML = `
                <div class="problem-text">${question}</div>
                <div class="problem-actions">
                    <input type="number" class="answer-input" placeholder="Your answer">
                    <button class="check-btn">Check</button>
                    <span class="feedback"></span>
                </div>
            `;

            li.querySelector(".check-btn").addEventListener("click", () => {
                const userInput = li.querySelector(".answer-input").value;
                const feedback = li.querySelector(".feedback");

                if (parseInt(userInput, 10) === answer) {
                    feedback.textContent = "✅ Correct!";
                    feedback.classList.remove('feedback-wrong');
                    feedback.classList.add('feedback-right');
                } else {
                    feedback.textContent = "❌ Try again.";
                    feedback.classList.remove('feedback-right');
                    feedback.classList.add('feedback-wrong');
                }
            });

            problemList.appendChild(li);
        }
    } catch (error) {
        console.error("Python Error:", error);
        alert("An error occurred while generating problems.");
    }
}

// ---------- PRACTICE PAGE: CHECKLIST REWARD VIDEO ----------
const practiceTasks = document.querySelectorAll(".practice-task");
const PRACTICE_VIDEO_URL = "Dragon1.mp4";
let practiceRewardPlayed = false;

function checkPracticeCompletion() {
    if (!practiceTasks.length || practiceRewardPlayed) return;

    const allDone = Array.from(practiceTasks).every(task => task.checked);
    if (allDone) {
        practiceRewardPlayed = true;
        window.open(PRACTICE_VIDEO_URL, "_blank", "noopener");
    }
}

if (practiceTasks.length) {
    practiceTasks.forEach(task => {
        task.addEventListener("change", checkPracticeCompletion);
    });
}

// ---------- FEELINGS FLASHCARD (feelings.html) ----------

// Base feelings with translations in EN, PT, ES
const feelingsBase = [
    {
        id: "happy",
        emoji: "😊",
        translations: {
            en: {
                name: "Happy",
                definition: "Feeling good inside, full of joy.",
                story: "Paulo scored a goal at recess and his friends cheered. His face felt warm and he couldn’t stop smiling. That feeling is happy."
            },
            pt: {
                name: "Feliz",
                definition: "Sentir-se bem por dentro, cheio de alegria.",
                story: "Paulo marcou um gol no recreio e os amigos comemoraram. Seu rosto ficou iluminado e ele não parava de sorrir. Esse sentimento é estar feliz."
            },
            es: {
                name: "Feliz",
                definition: "Sentirse bien por dentro, lleno de alegría.",
                story: "Paulo metió un gol en el recreo y sus amigos lo aplaudieron. Su cara se calentó y no podía dejar de sonreír. Ese sentimiento es estar feliz."
            }
        }
    },
    {
        id: "sad",
        emoji: "😢",
        translations: {
            en: {
                name: "Sad",
                definition: "Feeling down, like you want to cry or be alone.",
                story: "Paulo’s favorite toy broke when it fell on the floor. His eyes got wet and he was quiet for a long time. That feeling is sad."
            },
            pt: {
                name: "Triste",
                definition: "Sentir-se para baixo, com vontade de chorar ou ficar sozinho.",
                story: "O brinquedo favorito de Paulo quebrou quando caiu no chão. Seus olhos encheram de água e ele ficou quieto por um bom tempo. Esse sentimento é estar triste."
            },
            es: {
                name: "Triste",
                definition: "Sentirse decaído, con ganas de llorar o estar solo.",
                story: "El juguete favorito de Paulo se rompió cuando cayó al suelo. Sus ojos se llenaron de lágrimas y se quedó callado mucho rato. Ese sentimiento es estar triste."
            }
        }
    },
    {
        id: "angry",
        emoji: "😡",
        translations: {
            en: {
                name: "Angry",
                definition: "Feeling mad when something seems unfair or wrong.",
                story: "A classmate cut in front of Paulo in the lunch line. His hands got tight and his chest felt hot. That feeling is angry."
            },
            pt: {
                name: "Bravo",
                definition: "Sentir raiva quando algo parece injusto ou errado.",
                story: "Um colega entrou na frente de Paulo na fila do lanche. As mãos dele ficaram apertadas e o peito, quente. Esse sentimento é ficar bravo."
            },
            es: {
                name: "Enojado",
                definition: "Sentir rabia cuando algo parece injusto o incorrecto.",
                story: "Un compañero se metió delante de Paulo en la fila del almuerzo. Sus manos se apretaron y su pecho se calentó. Ese sentimiento es estar enojado."
            }
        }
    },
    {
        id: "scared",
        emoji: "😨",
        translations: {
            en: {
                name: "Scared",
                definition: "Feeling afraid something bad might happen.",
                story: "During a thunderstorm, lightning flashed near Paulo’s window. His heart beat fast and he hid under his blanket. That feeling is scared."
            },
            pt: {
                name: "Assustado",
                definition: "Ter medo de que algo ruim possa acontecer.",
                story: "Durante uma tempestade, um raio brilhou perto da janela de Paulo. O coração dele bateu rápido e ele se escondeu debaixo do cobertor. Esse sentimento é ficar assustado."
            },
            es: {
                name: "Asustado",
                definition: "Tener miedo de que algo malo pueda pasar.",
                story: "Durante una tormenta, un relámpago brilló cerca de la ventana de Paulo. Su corazón latió muy rápido y se escondió bajo la manta. Ese sentimiento es estar asustado."
            }
        }
    },
    {
        id: "love",
        emoji: "❤️",
        translations: {
            en: {
                name: "Love",
                definition: "Caring a lot about someone or something.",
                story: "Paulo’s mom hugged him after school and he squeezed her back hard, not wanting to let go. That warm, safe feeling is love."
            },
            pt: {
                name: "Amor",
                definition: "Cuidar muito de alguém ou de algo.",
                story: "A mãe de Paulo o abraçou depois da escola e ele apertou o abraço forte, sem querer soltar. Esse sentimento quente e seguro é amor."
            },
            es: {
                name: "Amor",
                definition: "Querer mucho a alguien o algo.",
                story: "La mamá de Paulo lo abrazó después de la escuela y él la apretó fuerte, sin querer soltarse. Ese sentimiento cálido y seguro es amor."
            }
        }
    },
    {
        id: "proud",
        emoji: "😌",
        translations: {
            en: {
                name: "Proud",
                definition: "Feeling good about something you did well.",
                story: "Paulo practiced math every day and finally solved a hard problem alone. His chest felt big and tall. That feeling is proud."
            },
            pt: {
                name: "Orgulhoso",
                definition: "Sentir-se bem por algo que você fez bem.",
                story: "Paulo praticou matemática todos os dias e conseguiu resolver sozinho um problema difícil. O peito dele pareceu crescer. Esse sentimento é estar orgulhoso."
            },
            es: {
                name: "Orgulloso",
                definition: "Sentirse bien por algo que hiciste bien.",
                story: "Paulo practicó matemáticas todos los días y al final resolvió solo un problema difícil. Su pecho se sintió más grande. Ese sentimiento es estar orgulloso."
            }
        }
    },
    {
        id: "embarrassed",
        emoji: "😳",
        translations: {
            en: {
                name: "Embarrassed",
                definition: "Feeling weird or shy when others are watching you.",
                story: "Paulo tripped in front of the class and some kids laughed. His face turned red and he wanted to disappear. That feeling is embarrassed."
            },
            pt: {
                name: "Envergonhado",
                definition: "Sentir-se estranho ou tímido quando os outros estão olhando.",
                story: "Paulo tropeçou na frente da turma e alguns colegas riram. Seu rosto ficou vermelho e ele quis sumir. Esse sentimento é ficar envergonhado."
            },
            es: {
                name: "Avergonzado",
                definition: "Sentirse raro o tímido cuando los demás te miran.",
                story: "Paulo se tropezó delante de la clase y algunos niños se rieron. Su cara se puso roja y quiso desaparecer. Ese sentimiento es estar avergonzado."
            }
        }
    },
    {
        id: "confused",
        emoji: "😕",
        translations: {
            en: {
                name: "Confused",
                definition: "Not understanding what is happening or what to do.",
                story: "The teacher explained a new game with many rules. Paulo frowned and stared at the board. That feeling is confused."
            },
            pt: {
                name: "Confuso",
                definition: "Não entender o que está acontecendo ou o que fazer.",
                story: "A professora explicou um jogo novo com muitas regras. Paulo franziu a testa e ficou olhando para o quadro. Esse sentimento é ficar confuso."
            },
            es: {
                name: "Confundido",
                definition: "No entender qué está pasando o qué hacer.",
                story: "La maestra explicó un juego nuevo con muchas reglas. Paulo frunció el ceño y miró la pizarra fijamente. Ese sentimiento es estar confundido."
            }
        }
    },
    {
        id: "excited",
        emoji: "🤩",
        translations: {
            en: {
                name: "Excited",
                definition: "Feeling super happy and full of energy about something.",
                story: "Tomorrow is Paulo’s birthday. He keeps jumping around and talking fast. That buzzing feeling is excited."
            },
            pt: {
                name: "Animado",
                definition: "Sentir-se muito feliz e cheio de energia por algo.",
                story: "Amanhã é o aniversário de Paulo. Ele não para de pular e falar rápido. Esse sentimento elétrico é ficar animado."
            },
            es: {
                name: "Emocionado",
                definition: "Sentirse muy feliz y lleno de energía por algo.",
                story: "Mañana es el cumpleaños de Paulo. No deja de saltar y hablar rápido. Ese sentimiento eléctrico es estar emocionado."
            }
        }
    },
    {
        id: "bored",
        emoji: "🥱",
        translations: {
            en: {
                name: "Bored",
                definition: "Feeling like nothing is interesting right now.",
                story: "Paulo had finished his homework and had nothing to do. He lay on the sofa staring at the ceiling. That feeling is bored."
            },
            pt: {
                name: "Entediado",
                definition: "Sentir que nada está interessante naquele momento.",
                story: "Paulo terminou a lição e não tinha mais nada para fazer. Deitou no sofá olhando para o teto. Esse sentimento é estar entediado."
            },
            es: {
                name: "Aburrido",
                definition: "Sentir que nada es interesante en ese momento.",
                story: "Paulo terminó la tarea y no tenía nada más que hacer. Se tumbó en el sofá mirando al techo. Ese sentimiento es estar aburrido."
            }
        }
    },
    {
        id: "surprised",
        emoji: "😮",
        translations: {
            en: {
                name: "Surprised",
                definition: "Feeling shocked when something unexpected happens.",
                story: "Paulo opened his lunchbox and found a small note and a cookie inside. His eyebrows went up. That feeling is surprised."
            },
            pt: {
                name: "Surpreso",
                definition: "Ficar espantado quando algo inesperado acontece.",
                story: "Paulo abriu a lancheira e encontrou um bilhetinho e um biscoito lá dentro. As sobrancelhas dele subiram. Esse sentimento é ficar surpreso."
            },
            es: {
                name: "Sorprendido",
                definition: "Quedarse asombrado cuando pasa algo inesperado.",
                story: "Paulo abrió su lonchera y encontró una nota y una galleta adentro. Sus cejas se levantaron. Ese sentimiento es estar sorprendido."
            }
        }
    },
    {
        id: "nervous",
        emoji: "😬",
        translations: {
            en: {
                name: "Nervous",
                definition: "Feeling shaky or worried before something important.",
                story: "Before speaking in front of the class, Paulo’s hands were sweaty and his stomach felt strange. That feeling is nervous."
            },
            pt: {
                name: "Nervoso",
                definition: "Sentir-se tremendo ou preocupado antes de algo importante.",
                story: "Antes de falar na frente da turma, as mãos de Paulo ficaram suadas e a barriga estranha. Esse sentimento é ficar nervoso."
            },
            es: {
                name: "Nervioso",
                definition: "Sentirse tembloroso o preocupado antes de algo importante.",
                story: "Antes de hablar frente a la clase, las manos de Paulo sudaban y su barriga se sentía rara. Ese sentimiento es estar nervioso."
            }
        }
    },
    {
        id: "calm",
        emoji: "😌",
        translations: {
            en: {
                name: "Calm",
                definition: "Feeling peaceful and relaxed.",
                story: "After reading his favorite comic in bed, Paulo’s body felt soft and his breathing was slow. That feeling is calm."
            },
            pt: {
                name: "Calmo",
                definition: "Sentir-se em paz e relaxado.",
                story: "Depois de ler seu gibi favorito na cama, o corpo de Paulo ficou leve e a respiração, bem lenta. Esse sentimento é ficar calmo."
            },
            es: {
                name: "Calmado",
                definition: "Sentirse en paz y relajado.",
                story: "Después de leer su cómic favorito en la cama, el cuerpo de Paulo se sintió ligero y su respiración fue muy lenta. Ese sentimiento es estar calmado."
            }
        }
    },
    {
        id: "disappointed",
        emoji: "😞",
        translations: {
            en: {
                name: "Disappointed",
                definition: "Feeling sad because something didn’t happen the way you hoped.",
                story: "Paulo’s soccer game was cancelled because of rain. He looked out the window quietly. That feeling is disappointed."
            },
            pt: {
                name: "Decepcionado",
                definition: "Sentir-se triste porque algo não aconteceu como você queria.",
                story: "O jogo de futebol de Paulo foi cancelado por causa da chuva. Ele ficou olhando pela janela, em silêncio. Esse sentimento é ficar decepcionado."
            },
            es: {
                name: "Decepcionado",
                definition: "Sentirse triste porque algo no salió como querías.",
                story: "El partido de fútbol de Paulo se canceló por la lluvia. Él miró por la ventana en silencio. Ese sentimiento es estar decepcionado."
            }
        }
    },
    {
        id: "curious",
        emoji: "🤔",
        translations: {
            en: {
                name: "Curious",
                definition: "Wanting to know or learn more about something.",
                story: "Paulo saw a strange bug on the wall and leaned closer to watch how it moved. That feeling is curious."
            },
            pt: {
                name: "Curioso",
                definition: "Querer saber ou aprender mais sobre algo.",
                story: "Paulo viu um inseto diferente na parede e chegou mais perto para ver como ele se mexia. Esse sentimento é ficar curioso."
            },
            es: {
                name: "Curioso",
                definition: "Querer saber o aprender más sobre algo.",
                story: "Paulo vio un insecto raro en la pared y se acercó para ver cómo se movía. Ese sentimiento es estar curioso."
            }
        }
    },
    {
        id: "jealous",
        emoji: "😒",
        translations: {
            en: {
                name: "Jealous",
                definition: "Wanting what someone else has.",
                story: "Paulo’s friend got a new bike, and Paulo felt a tight twist in his stomach when he saw it. That feeling is jealous."
            },
            pt: {
                name: "Com ciúmes",
                definition: "Querer ter o que outra pessoa tem.",
                story: "O amigo de Paulo ganhou uma bicicleta nova e, ao ver, ele sentiu um aperto na barriga. Esse sentimento é ficar com ciúmes."
            },
            es: {
                name: "Celoso",
                definition: "Querer lo que otra persona tiene.",
                story: "El amigo de Paulo recibió una bicicleta nueva y, al verla, él sintió un nudo en el estómago. Ese sentimiento es estar celoso."
            }
        }
    },
    {
        id: "lonely",
        emoji: "😔",
        translations: {
            en: {
                name: "Lonely",
                definition: "Feeling alone and wishing for company.",
                story: "Everyone else was busy and Paulo played by himself in the backyard. The world felt extra quiet. That feeling is lonely."
            },
            pt: {
                name: "Sozinho",
                definition: "Sentir-se só e com vontade de ter companhia.",
                story: "Todo mundo estava ocupado e Paulo brincou sozinho no quintal. O mundo pareceu mais silencioso. Esse sentimento é ficar sozinho."
            },
            es: {
                name: "Solo",
                definition: "Sentirse solo y con ganas de tener compañía.",
                story: "Todos estaban ocupados y Paulo jugó solo en el patio. El mundo se sintió más silencioso. Ese sentimiento es estar solo."
            }
        }
    },
    {
        id: "grateful",
        emoji: "🙏",
        translations: {
            en: {
                name: "Grateful",
                definition: "Feeling thankful for something good.",
                story: "Paulo forgot his pencil, and a friend lent him one with a smile. His heart felt warm. That feeling is grateful."
            },
            pt: {
                name: "Grato",
                definition: "Sentir-se agradecido por algo bom.",
                story: "Paulo esqueceu o lápis, e um amigo emprestou um com um sorriso. O coração dele ficou quentinho. Esse sentimento é estar grato."
            },
            es: {
                name: "Agradecido",
                definition: "Sentirse agradecido por algo bueno.",
                story: "Paulo olvidó su lápiz y un amigo le prestó uno con una sonrisa. Su corazón se calentó. Ese sentimiento es estar agradecido."
            }
        }
    },
    {
        id: "guilty",
        emoji: "😟",
        translations: {
            en: {
                name: "Guilty",
                definition: "Feeling bad about something you did wrong.",
                story: "Paulo lied about finishing his homework. Later his stomach hurt and he couldn’t stop thinking about it. That feeling is guilty."
            },
            pt: {
                name: "Culpado",
                definition: "Sentir-se mal por algo errado que você fez.",
                story: "Paulo mentiu dizendo que tinha terminado a lição de casa. Depois, a barriga doeu e ele não parava de pensar nisso. Esse sentimento é ficar culpado."
            },
            es: {
                name: "Culpable",
                definition: "Sentirse mal por algo malo que hiciste.",
                story: "Paulo mintió diciendo que había terminado la tarea. Después le dolió el estómago y no dejaba de pensar en eso. Ese sentimiento es estar culpable."
            }
        }
    },
    {
        id: "tired",
        emoji: "😴",
        translations: {
            en: {
                name: "Tired",
                definition: "Feeling low on energy and needing rest.",
                story: "After running at recess and doing homework, Paulo’s eyes felt heavy and he could barely keep them open. That feeling is tired."
            },
            pt: {
                name: "Cansado",
                definition: "Sentir pouca energia e precisar descansar.",
                story: "Depois de correr no recreio e fazer a lição, os olhos de Paulo ficaram pesados e quase não ficavam abertos. Esse sentimento é ficar cansado."
            },
            es: {
                name: "Cansado",
                definition: "Tener poca energía y necesitar descansar.",
                story: "Después de correr en el recreo y hacer la tarea, los ojos de Paulo se pusieron pesados y casi no se quedaban abiertos. Ese sentimiento es estar cansado."
            }
        }
    }
];

const languageConfigs = {
    en: { code: "en", label: "English" },
    pt: { code: "pt", label: "Português" },
    es: { code: "es", label: "Español" }
};

// Expand base feelings into 60 cards (20 feelings × 3 languages)
const feelingsData = [];
feelingsBase.forEach(base => {
    Object.keys(base.translations).forEach(langCode => {
        const t = base.translations[langCode];
        const langInfo = languageConfigs[langCode];

        feelingsData.push({
            id: `${base.id}_${langCode}`,
            baseId: base.id,
            emoji: base.emoji,
            lang: langCode,
            langLabel: langInfo.label,
            name: t.name,
            definition: t.definition,
            story: t.story
        });
    });
});

const revealFeelingBtn = document.getElementById("revealFeelingBtn");
const feelingCardEl = document.getElementById("feelingCard");
const feelingEmojiEl = document.getElementById("feelingEmoji");
const feelingNameEl = document.getElementById("feelingName");
const feelingDefinitionEl = document.getElementById("feelingDefinition");
const feelingStoryEl = document.getElementById("feelingStory");
const feelingLanguageEl = document.getElementById("feelingLanguage");

let currentFeeling = null;

function pickRandomFeeling() {
    const index = Math.floor(Math.random() * feelingsData.length);
    return feelingsData[index];
}

function getSessionFeeling() {
    const storedId = sessionStorage.getItem("currentFeelingId");
    if (storedId) {
        const existing = feelingsData.find(f => f.id === storedId);
        if (existing) return existing;
    }

    const picked = pickRandomFeeling();
    sessionStorage.setItem("currentFeelingId", picked.id);
    return picked;
}

function renderFeelingCard(feeling) {
    if (!feelingCardEl) return;
    currentFeeling = feeling;
    feelingEmojiEl.textContent = feeling.emoji;
    feelingNameEl.textContent = feeling.name;
    feelingDefinitionEl.textContent = feeling.definition;
    feelingStoryEl.textContent = feeling.story;
    if (feelingLanguageEl) {
        feelingLanguageEl.textContent = feeling.langLabel;
    }
    feelingCardEl.classList.remove("hidden");
}

if (revealFeelingBtn && feelingCardEl) {
    revealFeelingBtn.addEventListener("click", () => {
        const feeling = getSessionFeeling();
        renderFeelingCard(feeling);
    });
}

// ---------- FEELINGS JOURNAL & HISTORY ----------

const FEELING_NOTE_KEY = "pauloFeelingNoteV1";
const FEELING_HISTORY_KEY = "pauloFeelingHistoryV1";

const feelingNoteTextarea = document.getElementById("feelingNote");
const saveFeelingNoteBtn = document.getElementById("saveFeelingNoteBtn");
const feelingNoteStatus = document.getElementById("feelingNoteStatus");

function loadFeelingNote() {
    if (!feelingNoteTextarea) return;
    const saved = localStorage.getItem(FEELING_NOTE_KEY);
    if (saved) {
        feelingNoteTextarea.value = saved;
    }
}

function appendFeelingHistoryEntry(noteText) {
    if (!noteText) return;

    let history = [];
    try {
        const raw = localStorage.getItem(FEELING_HISTORY_KEY);
        history = raw ? JSON.parse(raw) : [];
    } catch (e) {
        history = [];
    }

    const now = new Date();
    const entry = {
        id: Date.now(),
        timestamp: now.toISOString(),
        dateLabel: now.toLocaleDateString(),
        timeLabel: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        feelingId: currentFeeling ? currentFeeling.id : null,
        feelingName: currentFeeling ? currentFeeling.name : null,
        feelingLang: currentFeeling ? currentFeeling.langLabel : null,
        note: noteText
    };

    history.push(entry);
    localStorage.setItem(FEELING_HISTORY_KEY, JSON.stringify(history));
}

function saveFeelingNote() {
    if (!feelingNoteTextarea) return;

    const text = feelingNoteTextarea.value.trim();
    localStorage.setItem(FEELING_NOTE_KEY, text);

    appendFeelingHistoryEntry(text);

    if (feelingNoteStatus) {
        feelingNoteStatus.textContent = "Saved!";
        feelingNoteStatus.classList.add("visible");

        setTimeout(() => {
            feelingNoteStatus.classList.remove("visible");
        }, 1800);
    }
}

if (feelingNoteTextarea && saveFeelingNoteBtn) {
    loadFeelingNote();
    saveFeelingNoteBtn.addEventListener("click", saveFeelingNote);
}

// ---------- HISTORY PAGE RENDER ----------

const historyListEl = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

function renderHistory() {
    if (!historyListEl) return;

    let history = [];
    try {
        const raw = localStorage.getItem(FEELING_HISTORY_KEY);
        history = raw ? JSON.parse(raw) : [];
    } catch (e) {
        history = [];
    }

    if (!history.length) {
        historyListEl.innerHTML = '<p class="history-empty">No feelings saved yet. Go to the Feelings page and write your first one 💬</p>';
        return;
    }

    history.sort((a, b) => {
        const ta = new Date(a.timestamp).getTime();
        const tb = new Date(b.timestamp).getTime();
        return tb - ta;
    });

    const pieces = history.map(entry => {
        const feelingLabel = entry.feelingName
            ? `${entry.feelingName}${entry.feelingLang ? " · " + entry.feelingLang : ""}`
            : "Feeling not selected";
        const dateLabel = `${entry.dateLabel} · ${entry.timeLabel}`;

        return `
            <article class="history-item">
                <header class="history-header">
                    <span class="history-date">${dateLabel}</span>
                    <span class="history-feeling">${feelingLabel}</span>
                </header>
                <p class="history-note">${entry.note || ""}</p>
            </article>
        `;
    });

    historyListEl.innerHTML = pieces.join("");
}

if (historyListEl) {
    renderHistory();
}

if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", () => {
        const ok = confirm("Clear all saved feelings? This cannot be undone.");
        if (!ok) return;
        localStorage.removeItem(FEELING_HISTORY_KEY);
        renderHistory();
    });
}
