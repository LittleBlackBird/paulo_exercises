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
    const feelingsBase = [
  {
        id: "happy",
        emoji: "😊",
        translations: {
          en: {
            name: "Happy",
            definition: "Feeling good inside, full of joy.",
            story: "A kid finished a drawing and a friend said it looked great. Their face changed and their body reacted. They asked for help, tried again, and stayed kind. That is happy. Soon it passed a little.",
          },
          pt: {
            name: "Feliz",
            definition: "Sentir-se bem por dentro, cheio de alegria.",
            story: "Uma criança terminou um desenho e um amigo disse que ficou lindo. Percebeu o coração e os pensamentos acelerarem. Respirou, falou com alguém e seguiu em frente. Isso é feliz.",
          },
          es: {
            name: "Feliz",
            definition: "Sentirse bien por dentro, lleno de alegría.",
            story: "Un niño o una niña terminó un dibujo y un amigo dijo que quedó genial. Su cara cambió y su cuerpo reaccionó. Pidió ayuda, lo intentó otra vez y fue amable. Ese sentimiento es feliz.",
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
            story: "A kid lost a favorite pencil and felt quiet during class. They noticed their heart and thoughts speeding up. They paused, named the feeling, and decided what to do next. That feeling is sad.",
          },
          pt: {
            name: "Triste",
            definition: "Sentir-se para baixo, com vontade de chorar ou ficar sozinho.",
            story: "Uma criança perdeu um lápis favorito e ficou quieto na aula. Sentiu um aperto por dentro e depois uma respiração mais leve. Respirou, falou com alguém e seguiu em frente. Esse sentimento é triste.",
          },
          es: {
            name: "Triste",
            definition: "Sentirse decaído, con ganas de llorar o estar solo.",
            story: "Un niño o una niña perdió un lápiz favorito y se quedó callado en clase. Su cara cambió y su cuerpo reaccionó. Pidió ayuda, lo intentó otra vez y fue amable. Ese sentimiento es triste.",
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
            story: "A kid someone cut in line and it felt unfair. They felt a small knot inside, then a softer breath. They took a breath, talked to someone, and kept going. That feeling is angry.",
          },
          pt: {
            name: "Bravo",
            definition: "Sentir raiva quando algo parece injusto ou errado.",
            story: "Uma criança alguém furou a fila e pareceu injusto. O rosto mudou e o corpo reagiu. Parou, deu nome ao sentimento e pensou no próximo passo. Esse sentimento é bravo. Logo passou um pouco.",
          },
          es: {
            name: "Enojado",
            definition: "Sentir rabia cuando algo parece injusto o incorrecto.",
            story: "Un niño o una niña alguien se coló en la fila y pareció injusto. Su cara cambió y su cuerpo reaccionó. Se detuvo, le puso nombre al sentimiento y pensó qué hacer. Eso es enojado.",
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
            story: "A kid heard thunder at night and held the blanket tighter. Their face changed and their body reacted. They asked for help, tried again, and stayed kind. That is scared. Soon it passed a little.",
          },
          pt: {
            name: "Assustado",
            definition: "Ter medo de que algo ruim possa acontecer.",
            story: "Uma criança ouviu trovões à noite e apertou o cobertor. Percebeu o coração e os pensamentos acelerarem. Parou, deu nome ao sentimento e pensou no próximo passo. Isso é assustado.",
          },
          es: {
            name: "Asustado",
            definition: "Tener miedo de que algo malo pueda pasar.",
            story: "Un niño o una niña oyó truenos de noche y apretó la manta. Sintió un nudo por dentro y luego una respiración más suave. Respiró, se lo contó a alguien y siguió adelante. Ese sentimiento es asustado.",
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
            story: "A kid helped a sibling and felt warm inside. They felt a small knot inside, then a softer breath. They took a breath, talked to someone, and kept going. That is love. It can happen to anyone.",
          },
          pt: {
            name: "Amor",
            definition: "Cuidar muito de alguém ou de algo.",
            story: "Uma criança ajudou um irmão e sentiu um quentinho por dentro. O rosto mudou e o corpo reagiu. Pediu ajuda, tentou de novo e manteve a gentileza. Esse sentimento é amor. Logo passou um pouco.",
          },
          es: {
            name: "Amor",
            definition: "Querer mucho a alguien o algo.",
            story: "Un niño o una niña ayudó a un hermano y sintió calorcito por dentro. Sintió un nudo por dentro y luego una respiración más suave. Respiró, se lo contó a alguien y siguió adelante. Eso es amor.",
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
            story: "A kid practiced reading and finally finished a whole page alone. They noticed their heart and thoughts speeding up. They asked for help, tried again, and stayed kind. That is proud.",
          },
          pt: {
            name: "Orgulhoso",
            definition: "Sentir-se bem por algo que você fez bem.",
            story: "Uma criança praticou leitura e conseguiu terminar uma página sozinho. O rosto mudou e o corpo reagiu. Respirou, falou com alguém e seguiu em frente. Esse sentimento é orgulhoso.",
          },
          es: {
            name: "Orgulloso",
            definition: "Sentirse bien por algo que hiciste bien.",
            story: "Un niño o una niña practicó lectura y por fin terminó una página solo. Notó el corazón y los pensamientos acelerarse. Pidió ayuda, lo intentó otra vez y fue amable. Ese sentimiento es orgulloso.",
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
            story: "A kid spilled water at lunch and everyone looked for a moment. They felt a small knot inside, then a softer breath. They paused, named the feeling, and decided what to do next. That is embarrassed.",
          },
          pt: {
            name: "Envergonhado",
            definition: "Sentir-se estranho ou tímido quando os outros estão olhando.",
            story: "Uma criança derrubou água no lanche e todo mundo olhou por um instante. Sentiu um aperto por dentro e depois uma respiração mais leve. Respirou, falou com alguém e seguiu em frente. Esse sentimento é envergonhado.",
          },
          es: {
            name: "Avergonzado",
            definition: "Sentirse raro o tímido cuando los demás te miran.",
            story: "Un niño o una niña derramó agua en el almuerzo y todos miraron un momento. Notó el corazón y los pensamientos acelerarse. Respiró, se lo contó a alguien y siguió adelante. Eso es avergonzado.",
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
            story: "A kid heard new rules for a game and didn’t know what to do first. They noticed their heart and thoughts speeding up. They paused, named the feeling, and decided what to do next. That is confused.",
          },
          pt: {
            name: "Confuso",
            definition: "Não entender o que está acontecendo ou o que fazer.",
            story: "Uma criança ouviu regras novas de um jogo e não soube por onde começar. Percebeu o coração e os pensamentos acelerarem. Parou, deu nome ao sentimento e pensou no próximo passo. Esse sentimento é confuso.",
          },
          es: {
            name: "Confundido",
            definition: "No entender qué está pasando o qué hacer.",
            story: "Un niño o una niña escuchó reglas nuevas de un juego y no supo por dónde empezar. Notó el corazón y los pensamientos acelerarse. Se detuvo, le puso nombre al sentimiento y pensó qué hacer. Eso es confundido.",
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
            story: "A kid packed a bag for a trip and couldn’t stop talking. They felt a small knot inside, then a softer breath. They took a breath, talked to someone, and kept going. That feeling is excited.",
          },
          pt: {
            name: "Animado",
            definition: "Sentir-se muito feliz e cheio de energia por algo.",
            story: "Uma criança arrumou a mochila para uma viagem e não parava de falar. O rosto mudou e o corpo reagiu. Pediu ajuda, tentou de novo e manteve a gentileza. Esse sentimento é animado.",
          },
          es: {
            name: "Emocionado",
            definition: "Sentirse muy feliz y lleno de energía por algo.",
            story: "Un niño o una niña preparó la mochila para un viaje y no paraba de hablar. Su cara cambió y su cuerpo reaccionó. Se detuvo, le puso nombre al sentimiento y pensó qué hacer. Ese sentimiento es emocionado.",
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
            story: "A kid waited while adults talked and time felt slow. They noticed their heart and thoughts speeding up. They asked for help, tried again, and stayed kind. That is bored. It can happen to anyone.",
          },
          pt: {
            name: "Entediado",
            definition: "Sentir que nada está interessante naquele momento.",
            story: "Uma criança esperou enquanto adultos conversavam e o tempo demorava. O rosto mudou e o corpo reagiu. Respirou, falou com alguém e seguiu em frente. Isso é entediado. Isso acontece com todo mundo.",
          },
          es: {
            name: "Aburrido",
            definition: "Sentir que nada es interesante en ese momento.",
            story: "Un niño o una niña esperó mientras los adultos hablaban y el tiempo iba lento. Sintió un nudo por dentro y luego una respiración más suave. Respiró, se lo contó a alguien y siguió adelante. Eso es aburrido.",
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
            story: "A kid opened a lunchbox and found a small note inside. They noticed their heart and thoughts speeding up. They paused, named the feeling, and decided what to do next. That feeling is surprised.",
          },
          pt: {
            name: "Surpreso",
            definition: "Ficar espantado quando algo inesperado acontece.",
            story: "Uma criança abriu a lancheira e encontrou um bilhetinho. Percebeu o coração e os pensamentos acelerarem. Pediu ajuda, tentou de novo e manteve a gentileza. Esse sentimento é surpreso.",
          },
          es: {
            name: "Sorprendido",
            definition: "Quedarse asombrado cuando pasa algo inesperado.",
            story: "Un niño o una niña abrió la lonchera y encontró una notita. Notó el corazón y los pensamientos acelerarse. Respiró, se lo contó a alguien y siguió adelante. Ese sentimiento es sorprendido.",
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
            story: "A kid had to present a project and felt butterflies in the stomach. They noticed their heart and thoughts speeding up. They paused, named the feeling, and decided what to do next. That is nervous.",
          },
          pt: {
            name: "Nervoso",
            definition: "Sentir-se tremendo ou preocupado antes de algo importante.",
            story: "Uma criança precisou apresentar um trabalho e sentiu frio na barriga. Percebeu o coração e os pensamentos acelerarem. Parou, deu nome ao sentimento e pensou no próximo passo. Esse sentimento é nervoso.",
          },
          es: {
            name: "Nervioso",
            definition: "Sentirse tembloroso o preocupado antes de algo importante.",
            story: "Un niño o una niña tuvo que presentar un trabajo y sintió mariposas en el estómago. Su cara cambió y su cuerpo reaccionó. Pidió ayuda, lo intentó otra vez y fue amable. Eso es nervioso.",
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
            story: "A kid sat quietly after reading and noticed slow breathing. They noticed their heart and thoughts speeding up. They paused, named the feeling, and decided what to do next. That feeling is calm.",
          },
          pt: {
            name: "Calmo",
            definition: "Sentir-se em paz e relaxado.",
            story: "Uma criança ficou quietinho depois de ler e percebeu a respiração calma. O rosto mudou e o corpo reagiu. Parou, deu nome ao sentimento e pensou no próximo passo. Isso é calmo.",
          },
          es: {
            name: "Calmado",
            definition: "Sentirse en paz y relajado.",
            story: "Un niño o una niña se quedó tranquilo después de leer y notó la respiración lenta. Su cara cambió y su cuerpo reaccionó. Pidió ayuda, lo intentó otra vez y fue amable. Eso es calmado.",
          },
        },
      },
  
  {
        id: "disappointed",
        emoji: "😞",
        translations: {
          en: {
            name: "Disappointed",
            definition:
              "Feeling sad because something didn’t happen the way you hoped.",
            story: "A kid planned to play outside but it started raining. They noticed their heart and thoughts speeding up. They paused, named the feeling, and decided what to do next. That feeling is disappointed.",
          },
          pt: {
            name: "Decepcionado",
            definition:
              "Sentir-se triste porque algo não aconteceu como você queria.",
            story: "Uma criança planejou brincar lá fora, mas começou a chover. O rosto mudou e o corpo reagiu. Pediu ajuda, tentou de novo e manteve a gentileza. Esse sentimento é decepcionado.",
          },
          es: {
            name: "Decepcionado",
            definition: "Sentirse triste porque algo no salió como querías.",
            story: "Un niño o una niña planeó jugar afuera, pero empezó a llover. Sintió un nudo por dentro y luego una respiración más suave. Respiró, se lo contó a alguien y siguió adelante. Eso es decepcionado.",
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
            story: "A kid saw a tiny insect and leaned closer to watch. Their face changed and their body reacted. They asked for help, tried again, and stayed kind. That feeling is curious.",
          },
          pt: {
            name: "Curioso",
            definition: "Querer saber ou aprender mais sobre algo.",
            story: "Uma criança viu um insetinho e chegou mais perto para observar. Percebeu o coração e os pensamentos acelerarem. Respirou, falou com alguém e seguiu em frente. Isso é curioso.",
          },
          es: {
            name: "Curioso",
            definition: "Querer saber o aprender más sobre algo.",
            story: "Un niño o una niña vio un bichito y se acercó para mirar. Su cara cambió y su cuerpo reaccionó. Respiró, se lo contó a alguien y siguió adelante. Ese sentimiento es curioso.",
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
            story: "A kid saw a friend’s new toy and wished it was theirs. They felt a small knot inside, then a softer breath. They took a breath, talked to someone, and kept going. That feeling is jealous.",
          },
          pt: {
            name: "Com ciúmes",
            definition: "Querer ter o que outra pessoa tem.",
            story: "Uma criança viu o brinquedo novo do amigo e quis ter um igual. Percebeu o coração e os pensamentos acelerarem. Respirou, falou com alguém e seguiu em frente. Esse sentimento é com ciúmes.",
          },
          es: {
            name: "Celoso",
            definition: "Querer lo que otra persona tiene.",
            story: "Un niño o una niña vio el juguete nuevo de un amigo y quiso uno igual. Su cara cambió y su cuerpo reaccionó. Respiró, se lo contó a alguien y siguió adelante. Eso es celoso.",
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
            story: "A kid looked for someone to play with and the yard felt quiet. They felt a small knot inside, then a softer breath. They paused, named the feeling, and decided what to do next. That is lonely.",
          },
          pt: {
            name: "Sozinho",
            definition: "Sentir-se só e com vontade de ter companhia.",
            story: "Uma criança procurou alguém para brincar e o quintal ficou silencioso. Percebeu o coração e os pensamentos acelerarem. Pediu ajuda, tentou de novo e manteve a gentileza. Isso é sozinho.",
          },
          es: {
            name: "Solo",
            definition: "Sentirse solo y con ganas de tener compañía.",
            story: "Un niño o una niña buscó con quién jugar y el patio se sintió silencioso. Notó el corazón y los pensamientos acelerarse. Se detuvo, le puso nombre al sentimiento y pensó qué hacer. Ese sentimiento es solo.",
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
            story: "A kid a classmate shared snacks and smiled. Their face changed and their body reacted. They paused, named the feeling, and decided what to do next. That is grateful. It can happen to anyone.",
          },
          pt: {
            name: "Grato",
            definition: "Sentir-se agradecido por algo bom.",
            story: "Uma criança um colega dividiu o lanche e sorriu. Sentiu um aperto por dentro e depois uma respiração mais leve. Pediu ajuda, tentou de novo e manteve a gentileza. Esse sentimento é grato.",
          },
          es: {
            name: "Agradecido",
            definition: "Sentirse agradecido por algo bueno.",
            story: "Un niño o una niña un compañero compartió su merienda y sonrió. Notó el corazón y los pensamientos acelerarse. Se detuvo, le puso nombre al sentimiento y pensó qué hacer. Ese sentimiento es agradecido.",
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
            story: "A kid broke a rule and kept thinking about it. They felt a small knot inside, then a softer breath. They took a breath, talked to someone, and kept going. That is guilty.",
          },
          pt: {
            name: "Culpado",
            definition: "Sentir-se mal por algo errado que você fez.",
            story: "Uma criança quebrou uma regra e ficou pensando nisso. Percebeu o coração e os pensamentos acelerarem. Respirou, falou com alguém e seguiu em frente. Isso é culpado. Logo passou um pouco.",
          },
          es: {
            name: "Culpable",
            definition: "Sentirse mal por algo malo que hiciste.",
            story: "Un niño o una niña rompió una regla y no dejaba de pensarlo. Notó el corazón y los pensamientos acelerarse. Respiró, se lo contó a alguien y siguió adelante. Eso es culpable.",
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
            story: "A kid played hard at recess and felt heavy eyes later. They noticed their heart and thoughts speeding up. They asked for help, tried again, and stayed kind. That is tired.",
          },
          pt: {
            name: "Cansado",
            definition: "Sentir pouca energia e precisar descansar.",
            story: "Uma criança brincou muito no recreio e depois ficou com os olhos pesados. Percebeu o coração e os pensamentos acelerarem. Pediu ajuda, tentou de novo e manteve a gentileza. Isso é cansado.",
          },
          es: {
            name: "Cansado",
            definition: "Tener poca energía y necesitar descansar.",
            story: "Un niño o una niña jugó mucho en el recreo y luego sintió los ojos pesados. Notó el corazón y los pensamientos acelerarse. Se detuvo, le puso nombre al sentimiento y pensó qué hacer. Ese sentimiento es cansado.",
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
                  story: "A kid had a rough moment but believed tomorrow could be better. Their face changed and their body reacted. They asked for help, tried again, and stayed kind. That feeling is hopeful."
              },
              pt: {
                  name: "Esperançoso",
                  definition: "Acreditar que algo bom vai acontecer.",
                  story: "Uma criança teve um momento difícil, mas acreditou que amanhã pode melhorar. Percebeu o coração e os pensamentos acelerarem. Respirou, falou com alguém e seguiu em frente. Esse sentimento é esperançoso."
              },
              es: {
                  name: "Esperanzado",
                  definition: "Creer que algo bueno va a pasar.",
                  story: "Un niño o una niña tuvo un momento difícil, pero creyó que mañana puede mejorar. Su cara cambió y su cuerpo reaccionó. Pidió ayuda, lo intentó otra vez y fue amable. Eso es esperanzado."
              }
          }
      },
  
  {
          id: "relieved",
          emoji: "😮‍💨",
          translations: {
              en: {
                  name: "Relieved",
                  definition: "Feeling better after worry is gone.",
                  story: "A kid worried about losing something, then found it. They felt a small knot inside, then a softer breath. They took a breath, talked to someone, and kept going. That is relieved."
              },
              pt: {
                  name: "Aliviado",
                  definition: "Sentir-se melhor depois que a preocupação passa.",
                  story: "Uma criança ficou preocupado por ter perdido algo e depois encontrou. Percebeu o coração e os pensamentos acelerarem. Parou, deu nome ao sentimento e pensou no próximo passo. Esse sentimento é aliviado."
              },
              es: {
                  name: "Aliviado",
                  definition: "Sentirse mejor después de que pasa la preocupación.",
                  story: "Un niño o una niña se preocupó por perder algo y luego lo encontró. Sintió un nudo por dentro y luego una respiración más suave. Se detuvo, le puso nombre al sentimiento y pensó qué hacer. Eso es aliviado."
              }
          }
      },
  
  {
          id: "frustrated",
          emoji: "😤",
          translations: {
              en: {
                  name: "Frustrated",
                  definition: "Feeling upset when things don’t work the way you want.",
                  story: "A kid tried to tie shoelaces and it kept slipping. They noticed their heart and thoughts speeding up. They took a breath, talked to someone, and kept going. That is frustrated."
              },
              pt: {
                  name: "Frustrado",
                  definition: "Sentir-se chateado quando as coisas não dão certo.",
                  story: "Uma criança tentou amarrar o tênis e o laço soltava. Sentiu um aperto por dentro e depois uma respiração mais leve. Respirou, falou com alguém e seguiu em frente. Esse sentimento é frustrado."
              },
              es: {
                  name: "Frustrado",
                  definition: "Sentirse molesto cuando las cosas no salen como quieres.",
                  story: "Un niño o una niña intentó atar los cordones y se le soltaba. Notó el corazón y los pensamientos acelerarse. Respiró, se lo contó a alguien y siguió adelante. Ese sentimiento es frustrado."
              }
          }
      },
  
  {
          id: "safe",
          emoji: "🛡️",
          translations: {
              en: {
                  name: "Safe",
                  definition: "Feeling protected and secure.",
                  story: "A kid walked with a trusted adult and felt protected. They felt a small knot inside, then a softer breath. They paused, named the feeling, and decided what to do next. That is safe."
              },
              pt: {
                  name: "Seguro",
                  definition: "Sentir-se protegido e tranquilo.",
                  story: "Uma criança caminhou com um adulto de confiança e se sentiu protegido. Sentiu um aperto por dentro e depois uma respiração mais leve. Respirou, falou com alguém e seguiu em frente. Isso é seguro."
              },
              es: {
                  name: "Seguro",
                  definition: "Sentirse protegido y tranquilo.",
                  story: "Un niño o una niña caminó con un adulto de confianza y se sintió protegido. Sintió un nudo por dentro y luego una respiración más suave. Se detuvo, le puso nombre al sentimiento y pensó qué hacer. Ese sentimiento es seguro."
              }
          }
      },
  
  {
          id: "confident",
          emoji: "💪",
          translations: {
              en: {
                  name: "Confident",
                  definition: "Believing in yourself and what you can do.",
                  story: "A kid answered a question in class and spoke clearly. They felt a small knot inside, then a softer breath. They took a breath, talked to someone, and kept going. That is confident."
              },
              pt: {
                  name: "Confiante",
                  definition: "Acreditar em si mesmo e no que você consegue fazer.",
                  story: "Uma criança respondeu uma pergunta na aula e falou com clareza. O rosto mudou e o corpo reagiu. Parou, deu nome ao sentimento e pensou no próximo passo. Esse sentimento é confiante."
              },
              es: {
                  name: "Confiado",
                  definition: "Creer en ti mismo y en lo que puedes hacer.",
                  story: "Un niño o una niña respondió una pregunta en clase y habló con claridad. Su cara cambió y su cuerpo reaccionó. Respiró, se lo contó a alguien y siguió adelante. Ese sentimiento es confiado."
              }
          }
      }
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