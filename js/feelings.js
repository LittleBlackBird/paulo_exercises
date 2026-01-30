// =========================================================
// FEELINGS MODULE (Feelings + Journal + History + Narration)
// =========================================================
(function () {
    // Exit safely on pages that don't have feelings/history UI
    const isFeelingsPage =
      document.getElementById("revealFeelingBtn") ||
      document.getElementById("historyList") ||
      document.getElementById("feelingNote");
    if (!isFeelingsPage) return;
  
    // =========================================================
    // FEELINGS FLASHCARD (feelings.html)
    // =========================================================
    
    // Base feelings with translations in EN, PT, ES
    const feelingsBase = 
[
  {
    id: "happy",
    emoji: "😊",
    translations: {
      en: {
        name: "Happy",
        definition: "Feeling good inside, full of joy.",
        story: "Paulo finished a drawing after spending time focused and patient. When a friend looked at it and said it looked great, Paulo felt a small tight knot inside slowly loosen. His breathing became calmer, and he felt lighter. He shared the moment with someone he trusts and chose to keep going with confidence. That warm and good feeling inside is happy.",
      },
      pt: {
        name: "Feliz",
        definition: "Sentir-se bem por dentro, cheio de alegria.",
        story: "Paulo terminou um desenho depois de se concentrar bastante. Quando um amigo disse que tinha ficado lindo, ele sentiu um aperto se transformar em um calor gostoso no peito. A respiração ficou mais tranquila. Ele reconheceu o sentimento, compartilhou com alguém de confiança e seguiu em frente com mais ânimo. Esse sentimento bom por dentro é feliz.",
      },
      es: {
        name: "Feliz",
        definition: "Sentirse bien por dentro, lleno de alegría.",
        story: "Paulo terminó un dibujo después de concentrarse con cuidado. Cuando un amigo dijo que había quedado genial, sintió que un nudo se aflojaba poco a poco. Su respiración se volvió más tranquila. Compartió el momento con alguien de confianza y siguió adelante con alegría. Ese sentimiento agradable es feliz.",
      },
    },
  },

  {
    id: "sad",
    emoji: "😢",
    translations: {
      en: {
        name: "Sad",
        definition: "Feeling down, like you want to cry or be alone.",
        story: "Paulo lost his favorite pencil and became very quiet in class. His body felt heavy, and his thoughts started moving fast. He took a slow breath and noticed the feeling instead of pushing it away. After asking for help, he tried again. That heavy and quiet feeling is sad.",
      },
      pt: {
        name: "Triste",
        definition: "Sentir-se para baixo, com vontade de chorar ou ficar sozinho.",
        story: "Paulo perdeu o lápis favorito e ficou bem quieto na aula. O corpo ficou pesado e os pensamentos confusos. Ele parou por um instante, percebeu o sentimento e deu nome a ele. Depois, pediu ajuda e tentou continuar. Esse sentimento mais pesado é triste.",
      },
      es: {
        name: "Triste",
        definition: "Sentirse decaído, con ganas de llorar o estar solo.",
        story: "Paulo perdió su lápiz favorito y se quedó callado en clase. Su cuerpo se sintió pesado y la mente acelerada. Respiró despacio y reconoció lo que sentía. Luego pidió ayuda e intentó otra vez. Ese sentimiento es triste.",
      },
    },
  },

  {
    id: "angry",
    emoji: "😡",
    translations: {
      en: {
        name: "Angry",
        definition: "Feeling mad when something seems unfair or wrong.",
        story: "Paulo saw someone cut in line, and it felt unfair. His body reacted right away, and his face became tense. He stopped for a moment to notice what was happening inside. After naming the feeling, he chose a calm and kind next step. That strong feeling is angry.",
      },
      pt: {
        name: "Bravo",
        definition: "Sentir raiva quando algo parece injusto ou errado.",
        story: "Paulo viu alguém furar a fila e achou injusto. O corpo reagiu rápido, com um aperto e tensão. Ele parou, respirou com mais calma e percebeu o que estava sentindo. Ao reconhecer o sentimento, escolheu um próximo passo mais gentil. Esse sentimento é bravo.",
      },
      es: {
        name: "Enojado",
        definition: "Sentir rabia cuando algo parece injusto o incorrecto.",
        story: "Paulo vio a alguien colarse en la fila y le pareció injusto. Su cuerpo se tensó y su cara cambió. Se detuvo un momento para notar la emoción. Después de ponerle nombre, eligió un paso más amable. Ese sentimiento es enojado.",
      },
    },
  },

  {
    id: "scared",
    emoji: "😨",
    translations: {
      en: {
        name: "Scared",
        definition: "Feeling afraid something bad might happen.",
        story: "Paulo heard loud thunder at night and pulled his blanket closer. His body felt tight, and his heart beat faster. After a slow breath, he noticed the fear was still there but smaller. He asked for comfort and stayed with the feeling. That feeling is scared.",
      },
      pt: {
        name: "Assustado",
        definition: "Ter medo de que algo ruim possa acontecer.",
        story: "Paulo ouviu trovões à noite e apertou o cobertor. O corpo ficou tenso e o coração acelerado. Ele respirou devagar e percebeu o medo com mais clareza. Ao buscar apoio, conseguiu seguir em frente. Esse sentimento é assustado.",
      },
      es: {
        name: "Asustado",
        definition: "Tener miedo de que algo malo pueda pasar.",
        story: "Paulo oyó truenos de noche y apretó su manta. El cuerpo se tensó y los pensamientos corrieron rápido. Respiró con calma y notó el miedo con más claridad. Pidió ayuda y se tranquilizó poco a poco. Ese sentimiento es asustado.",
      },
    },
  },

  {
    id: "love",
    emoji: "❤️",
    translations: {
      en: {
        name: "Love",
        definition: "Caring a lot about someone or something.",
        story: "Paulo helped his family with care and attention. Inside, he felt warm, safe, and connected. His breathing slowed as he noticed the comfort of the moment. He shared the feeling and stayed close. That caring and gentle feeling is love.",
      },
      pt: {
        name: "Amor",
        definition: "Cuidar muito de alguém ou de algo.",
        story: "Paulo ajudou a família com atenção e carinho. Por dentro, sentiu um calor seguro e acolhedor. A respiração ficou mais tranquila enquanto ele percebia a conexão. Ele compartilhou o momento e permaneceu presente. Esse sentimento é amor.",
      },
      es: {
        name: "Amor",
        definition: "Querer mucho a alguien o algo.",
        story: "Paulo ayudó a su familia con cuidado y atención. Por dentro, sintió un calor seguro y tranquilo. Su respiración se volvió lenta mientras notaba la conexión. Compartió ese momento especial. Ese sentimiento es amor.",
      },
    },
  },

  {
    id: "proud",
    emoji: "😌",
    translations: {
      en: {
        name: "Proud",
        definition: "Feeling good about something you did well.",
        story: "Paulo practiced reading and finished a full page by himself. At first, his body felt tight, then relaxed. He noticed the effort he had made and felt satisfied. Sharing the moment made him want to keep learning. That feeling is proud.",
      },
      pt: {
        name: "Orgulhoso",
        definition: "Sentir-se bem por algo que você fez bem.",
        story: "Paulo praticou leitura e conseguiu terminar uma página sozinho. O corpo relaxou depois do esforço. Ele percebeu o quanto tinha se dedicado e se sentiu satisfeito. Ao compartilhar, ganhou vontade de continuar. Esse sentimento é orgulho.",
      },
      es: {
        name: "Orgulloso",
        definition: "Sentirse bien por algo que hiciste bien.",
        story: "Paulo practicó lectura y terminó una página solo. El cuerpo se relajó después del esfuerzo. Reconoció su dedicación y se sintió satisfecho. Al compartirlo, quiso seguir aprendiendo. Ese sentimiento es orgullo.",
      },
    },
  },

  {
    id: "embarrassed",
    emoji: "😳",
    translations: {
      en: {
        name: "Embarrassed",
        definition: "Feeling weird or shy when others are watching you.",
        story: "Paulo spilled water at lunch, and people looked for a moment. His face felt warm, and his body tensed up. He paused and noticed the feeling instead of hiding. After getting help, the moment passed. That feeling is embarrassed.",
      },
      pt: {
        name: "Envergonhado",
        definition: "Sentir-se estranho ou tímido quando os outros estão olhando.",
        story: "Paulo derrubou água no lanche e algumas pessoas olharam. O rosto esquentou e o corpo ficou tenso. Ele parou, percebeu o sentimento e respirou. Com ajuda, tudo se acalmou. Esse sentimento é envergonhado.",
      },
      es: {
        name: "Avergonzado",
        definition: "Sentirse raro o tímido cuando los demás te miran.",
        story: "Paulo derramó agua en el almuerzo y todos miraron un momento. Su cara se calentó y el cuerpo se tensó. Se detuvo y reconoció lo que sentía. Con ayuda, la situación pasó. Ese sentimiento es avergonzado.",
      },
    },
  },

  {
    id: "confused",
    emoji: "😕",
    translations: {
      en: {
        name: "Confused",
        definition: "Not understanding what is happening or what to do.",
        story: "Paulo heard new rules for a game and didn’t know what to do first. His thoughts felt messy, and his body paused. He took a breath and noticed the confusion. After asking questions, things became clearer. That feeling is confused.",
      },
      pt: {
        name: "Confuso",
        definition: "Não entender o que está acontecendo ou o que fazer.",
        story: "Paulo ouviu regras novas de um jogo e ficou sem saber o que fazer. Os pensamentos ficaram bagunçados. Ele respirou, percebeu a confusão e pediu ajuda. Aos poucos, tudo fez mais sentido. Esse sentimento é confuso.",
      },
      es: {
        name: "Confundido",
        definition: "No entender qué está pasando o qué hacer.",
        story: "Paulo escuchó reglas nuevas de un juego y no supo qué hacer. La mente se sintió desordenada. Respiró y reconoció la confusión. Al hacer preguntas, entendió mejor. Ese sentimiento es confundido.",
      },
    },
  },

  {
    id: "excited",
    emoji: "🤩",
    translations: {
      en: {
        name: "Excited",
        definition: "Feeling super happy and full of energy about something.",
        story: "Paulo packed his bag for a trip and couldn’t stop talking. His body felt buzzy and full of energy. He paused to take a breath and noticed how strong the feeling was. Smiling, he stayed with it. That feeling is excited.",
      },
      pt: {
        name: "Animado",
        definition: "Sentir-se muito feliz e cheio de energia por algo.",
        story: "Paulo arrumou a mochila para uma viagem e não parava de falar. O corpo estava cheio de energia e movimento. Ele respirou e percebeu a intensidade do sentimento. Com um sorriso, seguiu animado. Esse sentimento é animação.",
      },
      es: {
        name: "Emocionado",
        definition: "Sentirse muy feliz y lleno de energía por algo.",
        story: "Paulo preparó su mochila para un viaje y hablaba sin parar. El cuerpo estaba lleno de energía. Respiró y notó lo fuerte que era el sentimiento. Sonriendo, lo disfrutó. Ese sentimiento es emoción.",
      },
    },
  },

  {
    id: "bored",
    emoji: "🥱",
    translations: {
      en: {
        name: "Bored",
        definition: "Feeling like nothing is interesting right now.",
        story: "Paulo waited while adults talked, and time felt very slow. His body felt heavy, and his mind wandered. He noticed the lack of interest and sighed. After checking in with someone, he found a way to pass the time. That feeling is bored.",
      },
      pt: {
        name: "Entediado",
        definition: "Sentir que nada está interessante naquele momento.",
        story: "Paulo esperou enquanto os adultos conversavam e o tempo parecia não passar. O corpo ficou pesado e a atenção distante. Ele percebeu o tédio e suspirou. Com ajuda, encontrou algo para fazer. Esse sentimento é entediado.",
      },
      es: {
        name: "Aburrido",
        definition: "Sentir que nada es interesante en ese momento.",
        story: "Paulo esperó mientras los adultos hablaban y el tiempo iba lento. El cuerpo se sentía pesado y la mente distraída. Reconoció el aburrimiento. Luego encontró algo para entretenerse. Ese sentimiento es aburrido.",
      },
    },
  },

  {
    id: "surprised",
    emoji: "😮",
    translations: {
      en: {
        name: "Surprised",
        definition: "Feeling shocked when something unexpected happens.",
        story: "Paulo opened his lunchbox and found a small note inside. His eyes widened, and his body reacted quickly. He paused to understand what he saw. Smiling, he enjoyed the unexpected moment. That feeling is surprised.",
      },
      pt: {
        name: "Surpreso",
        definition: "Ficar espantado quando algo inesperado acontece.",
        story: "Paulo abriu a lancheira e encontrou um bilhetinho. O corpo reagiu na hora, com olhos arregalados. Ele parou para entender o que estava vendo. Com um sorriso, aproveitou a surpresa. Esse sentimento é surpresa.",
      },
      es: {
        name: "Sorprendido",
        definition: "Quedarse asombrado cuando pasa algo inesperado.",
        story: "Paulo abrió su lonchera y encontró una notita. El cuerpo reaccionó de inmediato. Se detuvo para comprender lo inesperado. Luego sonrió y disfrutó el momento. Ese sentimiento es sorpresa.",
      },
    },
  },

  {
    id: "nervous",
    emoji: "😬",
    translations: {
      en: {
        name: "Nervous",
        definition: "Feeling shaky or worried before something important.",
        story: "Paulo had to present in class and felt butterflies in his stomach. His heart beat faster, and his hands felt shaky. He paused and took a deep breath. After naming the feeling, he spoke anyway. That feeling is nervous.",
      },
      pt: {
        name: "Nervoso",
        definition: "Sentir-se tremendo ou preocupado antes de algo importante.",
        story: "Paulo precisava apresentar na aula e sentiu frio na barriga. O coração acelerou e as mãos tremeram. Ele respirou fundo e percebeu o nervosismo. Mesmo assim, seguiu em frente. Esse sentimento é nervoso.",
      },
      es: {
        name: "Nervioso",
        definition: "Sentirse tembloroso o preocupado antes de algo importante.",
        story: "Paulo tuvo que presentar en clase y sintió mariposas en el estómago. El corazón latía rápido. Respiró hondo y reconoció el nerviosismo. Luego habló. Ese sentimiento es nervioso.",
      },
    },
  },

  {
    id: "calm",
    emoji: "😌",
    translations: {
      en: {
        name: "Calm",
        definition: "Feeling peaceful and relaxed.",
        story: "Paulo sat quietly after reading and noticed his breathing slow down. His body felt soft and relaxed. Thoughts moved gently instead of rushing. He stayed in that peaceful moment. That feeling is calm.",
      },
      pt: {
        name: "Calmo",
        definition: "Sentir-se em paz e relaxado.",
        story: "Paulo ficou quietinho depois de ler e percebeu a respiração mais lenta. O corpo estava solto e tranquilo. Os pensamentos vinham devagar. Ele permaneceu nesse estado de paz. Esse sentimento é calmo.",
      },
      es: {
        name: "Calmado",
        definition: "Sentirse en paz y relajado.",
        story: "Paulo se quedó tranquilo después de leer y notó la respiración lenta. El cuerpo se sentía relajado. Los pensamientos pasaban despacio. Disfrutó ese momento de paz. Ese sentimiento es calma.",
      },
    },
  },

  {
    id: "disappointed",
    emoji: "😞",
    translations: {
      en: {
        name: "Disappointed",
        definition: "Feeling sad because something didn’t happen the way you hoped.",
        story: "Paulo planned to play outside, but rain started right away. His shoulders dropped, and his mood changed. He noticed the sadness and took a breath. After adjusting his plans, he moved on. That feeling is disappointed.",
      },
      pt: {
        name: "Decepcionado",
        definition: "Sentir-se triste porque algo não aconteceu como você queria.",
        story: "Paulo planejou brincar lá fora, mas começou a chover. O corpo desanimou e o humor mudou. Ele percebeu a decepção e respirou. Ao mudar os planos, seguiu em frente. Esse sentimento é decepção.",
      },
      es: {
        name: "Decepcionado",
        definition: "Sentirse triste porque algo no salió como querías.",
        story: "Paulo planeó jugar afuera, pero empezó a llover. El ánimo bajó de inmediato. Reconoció la decepción y respiró. Luego ajustó sus planes. Ese sentimiento es decepción.",
      },
    },
  },

  {
    id: "curious",
    emoji: "🤔",
    translations: {
      en: {
        name: "Curious",
        definition: "Wanting to know or learn more about something.",
        story: "Paulo saw a tiny bug and leaned closer to watch it move. His eyes followed every detail. He felt interested and alert. Taking his time, he observed carefully. That feeling is curious.",
      },
      pt: {
        name: "Curioso",
        definition: "Querer saber ou aprender mais sobre algo.",
        story: "Paulo viu um insetinho e se aproximou para observar. Os olhos acompanhavam cada movimento. Ele se sentiu atento e interessado. Com calma, continuou olhando. Esse sentimento é curiosidade.",
      },
      es: {
        name: "Curioso",
        definition: "Querer saber o aprender más sobre algo.",
        story: "Paulo vio un bichito y se acercó para observarlo. Miraba cada movimiento con atenção. Se sentía interesado y despierto. Se tomó su tiempo. Ese sentimiento es curiosidad.",
      },
    },
  },

  {
    id: "jealous",
    emoji: "😒",
    translations: {
      en: {
        name: "Jealous",
        definition: "Wanting what someone else has.",
        story: "Paulo saw a friend’s new toy and wished he had one too. His chest felt tight, and his thoughts compared. He paused and noticed the feeling without judging it. Then he chose to move on. That feeling is jealous.",
      },
      pt: {
        name: "Com ciúmes",
        definition: "Querer ter o que outra pessoa tem.",
        story: "Paulo viu o brinquedo novo do amigo e quis ter um igual. Sentiu um aperto no peito e pensamentos de comparação. Ele parou, percebeu o sentimento e respirou. Depois, seguiu em frente. Esse sentimento é ciúme.",
      },
      es: {
        name: "Celoso",
        definition: "Querer lo que otra persona tiene.",
        story: "Paulo vio el juguete nuevo de un amigo y quiso uno igual. Sintió tensión en el pecho. Reconoció el sentimiento sin juzgarlo. Luego siguió adelante. Ese sentimiento es celos.",
      },
    },
  },

  {
    id: "lonely",
    emoji: "😔",
    translations: {
      en: {
        name: "Lonely",
        definition: "Feeling alone and wishing for company.",
        story: "Paulo looked for someone to play with, but the yard felt quiet. His body felt small and still. He noticed the emptiness and took a breath. After reaching out, he felt less alone. That feeling is lonely.",
      },
      pt: {
        name: "Sozinho",
        definition: "Sentir-se só e com vontade de ter companhia.",
        story: "Paulo procurou alguém para brincar e o quintal estava silencioso. O corpo ficou quieto e pesado. Ele percebeu a solidão e respirou. Ao procurar companhia, sentiu alívio. Esse sentimento é solidão.",
      },
      es: {
        name: "Solo",
        definition: "Sentirse solo y con ganas de tener compañía.",
        story: "Paulo buscó con quién jugar y el patio estaba silencioso. El cuerpo se sentía vacío. Reconoció la soledad y respiró. Luego buscó compañía. Ese sentimiento es soledad.",
      },
    },
  },

  {
    id: "grateful",
    emoji: "🙏",
    translations: {
      en: {
        name: "Grateful",
        definition: "Feeling thankful for something good.",
        story: "A classmate shared snacks with Paulo and smiled. Paulo felt warmth spread inside his chest. He noticed appreciation and comfort. Taking a moment, he enjoyed the kindness. That feeling is grateful.",
      },
      pt: {
        name: "Grato",
        definition: "Sentir-se agradecido por algo bom.",
        story: "Um colega dividiu o lanche com Paulo e sorriu. Um calor gostoso se espalhou no peito. Ele percebeu a gratidão e o conforto. Aproveitou o gesto com calma. Esse sentimento é gratidão.",
      },
      es: {
        name: "Agradecido",
        definition: "Sentirse agradecido por algo bueno.",
        story: "Un compañero compartió su merienda con Paulo y sonrió. Sintió un calor agradable en el pecho. Reconoció la gratitud. Se tomó un momento para apreciarlo. Ese sentimiento es gratitud.",
      },
    },
  },

  {
    id: "guilty",
    emoji: "😟",
    translations: {
      en: {
        name: "Guilty",
        definition: "Feeling bad about something you did wrong.",
        story: "Paulo broke a small rule and kept thinking about it. His body felt uneasy, and his thoughts replayed the moment. He paused and named the feeling. Choosing responsibility, he made things right. That feeling is guilty.",
      },
      pt: {
        name: "Culpado",
        definition: "Sentir-se mal por algo errado que você fez.",
        story: "Paulo quebrou uma regrinha e ficou pensando nisso. O corpo ficou inquieto e a mente repetia a situação. Ele parou e reconheceu a culpa. Ao corrigir o erro, sentiu alívio. Esse sentimento é culpa.",
      },
      es: {
        name: "Culpable",
        definition: "Sentirse mal por algo malo que hiciste.",
        story: "Paulo rompió una regla pequeña y no dejaba de pensar en eso. El cuerpo estaba inquieto. Reconoció la culpa y respiró. Luego intentó corregirlo. Ese sentimiento es culpa.",
      },
    },
  },

  {
    id: "tired",
    emoji: "😴",
    translations: {
      en: {
        name: "Tired",
        definition: "Feeling low on energy and needing rest.",
        story: "Paulo played hard at recess, and later his eyes felt heavy. His body slowed down, and movements felt harder. He noticed the need for rest. After pausing, he took it easier. That feeling is tired.",
      },
      pt: {
        name: "Cansado",
        definition: "Sentir pouca energia e precisar descansar.",
        story: "Paulo brincou muito no recreio e depois os olhos ficaram pesados. O corpo desacelerou e pediu descanso. Ele percebeu o cansaço e parou um pouco. Esse sentimento é cansaço.",
      },
      es: {
        name: "Cansado",
        definition: "Tener poca energía y necesitar descansar.",
        story: "Paulo jugó mucho en el recreo y luego los ojos pesaban. El cuerpo pedía descanso. Reconoció el cansancio y se detuvo. Ese sentimiento es cansancio.",
      },
    },
  },

  {
    id: "hopeful",
    emoji: "🌈",
    translations: {
      en: {
        name: "Hopeful",
        definition: "Believing something good will happen.",
        story: "Paulo had a rough moment, but believed tomorrow could be better. His chest felt warm as he imagined new chances. He noticed the light feeling inside. Holding onto that thought, he kept going. That feeling is hopeful.",
      },
      pt: {
        name: "Esperançoso",
        definition: "Acreditar que algo bom vai acontecer.",
        story: "Paulo teve um momento difícil, mas acreditou que amanhã pode ser melhor. Sentiu um calor no peito ao pensar nisso. Ele percebeu a esperança crescer. Com esse pensamento, seguiu em frente. Esse sentimento é esperança.",
      },
      es: {
        name: "Esperanzado",
        definition: "Creer que algo bueno va a pasar.",
        story: "Paulo tuvo un momento difícil, pero pensó que mañana podría mejorar. Sintió un calor interno. Reconoció la esperanza y siguió adelante. Ese sentimiento es esperanza.",
      },
    },
  },

  {
    id: "relieved",
    emoji: "😮‍💨",
    translations: {
      en: {
        name: "Relieved",
        definition: "Feeling better after worry is gone.",
        story: "Paulo thought he had lost something important, then found it in his backpack. The tight feeling faded, and his breath slowed. He noticed the release in his body. Smiling, he moved on. That feeling is relieved.",
      },
      pt: {
        name: "Aliviado",
        definition: "Sentir-se melhor depois que a preocupação passa.",
        story: "Paulo achou que tinha perdido algo, mas encontrou na mochila. O aperto passou e a respiração acalmou. Ele percebeu o alívio no corpo. Com um sorriso, seguiu em frente. Esse sentimento é alívio.",
      },
      es: {
        name: "Aliviado",
        definition: "Sentirse mejor después de que pasa la preocupación.",
        story: "Paulo pensó que había perdido algo y luego lo encontró. El cuerpo se relajó y la respiración se calmó. Reconoció el alivio. Ese sentimiento es alivio.",
      },
    },
  },

  {
    id: "frustrated",
    emoji: "😤",
    translations: {
      en: {
        name: "Frustrated",
        definition: "Feeling upset when things don’t work the way you want.",
        story: "Paulo tried tying his shoelaces, but the knot kept slipping. His body felt tense, and his patience ran low. He paused, took a breath, and noticed the frustration. After asking for help, he tried again. That feeling is frustrated.",
      },
      pt: {
        name: "Frustrado",
        definition: "Sentir-se chateado quando as coisas não dão certo.",
        story: "Paulo tentou amarrar o tênis, mas o laço soltava. O corpo ficou tenso e a paciência diminuiu. Ele respirou e percebeu a frustração. Com ajuda, tentou novamente. Esse sentimento é frustração.",
      },
      es: {
        name: "Frustrado",
        definition: "Sentirse molesto cuando las cosas no salen como quieres.",
        story: "Paulo intentó atarse los cordones, pero no funcionaba. El cuerpo se tensó y la paciencia bajó. Reconoció la frustración y respiró. Luego lo intentó otra vez. Ese sentimiento es frustración.",
      },
    },
  },

  {
    id: "safe",
    emoji: "🛡️",
    translations: {
      en: {
        name: "Safe",
        definition: "Feeling protected and secure.",
        story: "Paulo walked beside a trusted adult and felt protected. His body relaxed, and his steps felt steady. He noticed the calm that came from not being alone. Staying close, he felt secure. That feeling is safe.",
      },
      pt: {
        name: "Seguro",
        definition: "Sentir-se protegido e tranquilo.",
        story: "Paulo caminhou com um adulto de confiança e se sentiu protegido. O corpo relaxou e os passos ficaram firmes. Ele percebeu a tranquilidade de estar acompanhado. Esse sentimento é segurança.",
      },
      es: {
        name: "Seguro",
        definition: "Sentirse protegido y tranquilo.",
        story: "Paulo caminó con un adulto de confianza y se sintió protegido. El cuerpo se relajó y se sintió tranquilo. Notó la seguridad de no estar solo. Ese sentimiento es seguridad.",
      },
    },
  },

  {
    id: "confident",
    emoji: "💪",
    translations: {
      en: {
        name: "Confident",
        definition: "Believing in yourself and what you can do.",
        story: "Paulo answered a question in class and spoke clearly. His body felt strong and steady. He noticed trust in his own ability. Standing tall, he stayed with that feeling. That feeling is confident.",
      },
      pt: {
        name: "Confiante",
        definition: "Acreditar em si mesmo e no que você consegue fazer.",
        story: "Paulo respondeu uma pergunta na aula com clareza. O corpo se sentiu firme e seguro. Ele percebeu a confiança em si mesmo. Mantendo a postura, seguiu confiante. Esse sentimento é confiança.",
      },
      es: {
        name: "Confiado",
        definition: "Creer en ti mismo y en lo que puedes hacer.",
        story: "Paulo respondió una pregunta en clase con claridad. El cuerpo se sintió fuerte y estable. Reconoció la confianza en sí mismo. Se mantuvo firme. Ese sentimiento es confianza.",
      },
    },
  },
];

    
    const languageConfigs = {
      en: { code: "en", label: "English" },
      pt: { code: "pt", label: "Português" },
      es: { code: "es", label: "Español" },
    };
    
    // Expand base feelings into 60 cards (20 feelings × 3 languages)
    const feelingsData = [];
    feelingsBase.forEach((base) => {
      Object.keys(base.translations).forEach((langCode) => {
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
          story: t.story,
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


// =========================================================
// SAVE BUTTON + HISTORY STORAGE
// =========================================================

const FEELING_NOTE_KEY = "pauloFeelingNoteV1";
const FEELING_HISTORY_KEY = "pauloFeelingHistoryV1";

const feelingNoteTextarea = document.getElementById("feelingNote");
const saveFeelingNoteBtn = document.getElementById("saveFeelingNoteBtn");
const feelingNoteStatus = document.getElementById("feelingNoteStatus");

function loadFeelingNote() {
  if (!feelingNoteTextarea) return;
  const saved = localStorage.getItem(FEELING_NOTE_KEY);
  if (saved) feelingNoteTextarea.value = saved;
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

  history.push({
    id: Date.now(),
    timestamp: now.toISOString(),
    dateLabel: now.toLocaleDateString(),
    timeLabel: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    feelingId: currentFeeling ? currentFeeling.id : null,
    feelingName: currentFeeling ? currentFeeling.name : null,
    feelingLang: currentFeeling ? (currentFeeling.langLabel || currentFeeling.lang) : null,
    note: noteText
  });

  localStorage.setItem(FEELING_HISTORY_KEY, JSON.stringify(history));
}

function saveFeelingNote() {
  if (!feelingNoteTextarea) return;

  const text = feelingNoteTextarea.value.trim();

  // Save latest note
  localStorage.setItem(FEELING_NOTE_KEY, text);

  // ALSO append to history (this is what the History page needs)
  appendFeelingHistoryEntry(text);

  if (feelingNoteStatus) {
    feelingNoteStatus.textContent = "Saved!";
    feelingNoteStatus.classList.add("visible");
    setTimeout(() => feelingNoteStatus.classList.remove("visible"), 1800);
  }
}

if (saveFeelingNoteBtn) {
  loadFeelingNote();
  saveFeelingNoteBtn.addEventListener("click", saveFeelingNote);
}

// =========================================================
// HISTORY PAGE RENDER
// =========================================================

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
    historyListEl.innerHTML =
      '<p class="history-empty">No feelings saved yet. Go to the Feelings page and write your first one 💬</p>';
    return;
  }

  history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  historyListEl.innerHTML = history.map(entry => {
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
  }).join("");
}

if (historyListEl) renderHistory();

if (clearHistoryBtn) {
  clearHistoryBtn.addEventListener("click", () => {
    const ok = confirm("Clear all saved feelings? This cannot be undone.");
    if (!ok) return;
    localStorage.removeItem(FEELING_HISTORY_KEY);
    renderHistory();
  });
}



  // =========================================================
  // AUDIO NARRATION (Web Speech API)
  // =========================================================
  const NARRATION_CFG = {
    enabled: true,
    rate: 0.95,   // slightly slower for kids
    pitch: 1.0,
    volume: 1.0,
    langMap: { en: "en-US", pt: "pt-BR", es: "es-ES" },
  };
  
  function stopSpeaking() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
  }
  
  function pickVoiceForLang(langTag) {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices?.() || [];
    if (!voices.length) return null;
  
    const exact = voices.find(
      (v) => (v.lang || "").toLowerCase() === langTag.toLowerCase()
    );
    if (exact) return exact;
  
    const prefix = langTag.split("-")[0].toLowerCase();
    return (
      voices.find((v) => (v.lang || "").toLowerCase().startsWith(prefix)) ||
      null
    );
  }
  
  function speakFeeling(feeling) {
    if (!NARRATION_CFG.enabled) return;
  
    if (
      !("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)
    ) {
      alert("Audio narration is not supported in this browser.");
      return;
    }
  
    stopSpeaking();
  
    const langTag = NARRATION_CFG.langMap[feeling.lang] || "en-US";
    const text = `${feeling.name}. ${feeling.definition} ${feeling.story}`;
  
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = langTag;
    utter.rate = NARRATION_CFG.rate;
    utter.pitch = NARRATION_CFG.pitch;
    utter.volume = NARRATION_CFG.volume;
  
    const applyVoiceAndSpeak = () => {
      const voice = pickVoiceForLang(langTag);
      if (voice) utter.voice = voice;
      window.speechSynthesis.speak(utter);
    };
  
    // Some browsers load voices asynchronously
    const voices = window.speechSynthesis.getVoices?.() || [];
    if (voices.length) {
      applyVoiceAndSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        applyVoiceAndSpeak();
      };
      applyVoiceAndSpeak();
    }
  }
  
  function ensureNarrationControls() {
    if (!feelingCardEl) return;
  
    // Prevent duplicates
    if (feelingCardEl.querySelector(".narration-controls")) return;
  
    const controls = document.createElement("div");
    controls.className = "narration-controls";
    controls.style.display = "flex";
    controls.style.gap = "10px";
    controls.style.marginTop = "12px";
    controls.style.alignItems = "center";
  
    const speakBtn = document.createElement("button");
    speakBtn.type = "button";
    speakBtn.className = "narration-btn narration-speak";
    speakBtn.textContent = "🔊 Listen";
  
    const stopBtn = document.createElement("button");
    stopBtn.type = "button";
    stopBtn.className = "narration-btn narration-stop";
    stopBtn.textContent = "⏹ Stop";
  
    controls.appendChild(speakBtn);
    controls.appendChild(stopBtn);
    feelingCardEl.appendChild(controls);
  
    speakBtn.addEventListener("click", () => {
      if (!currentFeeling) return;
      speakFeeling(currentFeeling);
    });
  
    stopBtn.addEventListener("click", stopSpeaking);
  }
  
    
    function pickRandomFeeling() {
      const index = Math.floor(Math.random() * feelingsData.length);
      return feelingsData[index];
    }
    
    function getSessionFeeling() {
      const storedId = sessionStorage.getItem("currentFeelingId");
      if (storedId) {
        const existing = feelingsData.find((f) => f.id === storedId);
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
      }    ensureNarrationControls();
  
      feelingCardEl.classList.remove("hidden");
    }
    
    if (revealFeelingBtn && feelingCardEl) {
      revealFeelingBtn.addEventListener("click", () => {
        const feeling = getSessionFeeling();
        renderFeelingCard(feeling);
      });
    }
  })();
