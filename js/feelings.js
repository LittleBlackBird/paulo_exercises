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
            story: "Paulo finished a drawing and a friend said it looked great. He noticed a tight knot, then a slower breath. He talked to someone he trusts and kept going. That feeling is happy.",
          },
          pt: {
            name: "Feliz",
            definition: "Sentir-se bem por dentro, cheio de alegria.",
            story: "Paulo terminou um desenho e um amigo disse que ficou lindo. Sentiu o peito esquentar e os pensamentos acelerarem. Ele parou, deu nome ao sentimento e escolheu um próximo passo gentil. Esse sentimento é feliz.",
          },
          es: {
            name: "Feliz",
            definition: "Sentirse bien por dentro, lleno de alegría.",
            story: "Paulo terminó un dibujo y un amigo dijo que quedó genial. Notó un nudo y luego una respiración más lenta. Se lo contó a alguien de confianza y siguió adelante. Ese sentimiento es feliz.",
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
            story: "Paulo lost his favorite pencil and got very quiet in class. He felt his chest get warm and his thoughts speed up. He took a breath, asked for help, and tried again. That feeling is sad.",
          },
          pt: {
            name: "Triste",
            definition: "Sentir-se para baixo, com vontade de chorar ou ficar sozinho.",
            story: "Paulo perdeu o lápis favorito e ficou bem quieto na aula. O rosto mudou e o corpo reagiu. Ele parou, deu nome ao sentimento e escolheu um próximo passo gentil. Esse sentimento é triste.",
          },
          es: {
            name: "Triste",
            definition: "Sentirse decaído, con ganas de llorar o estar solo.",
            story: "Paulo perdió su lápiz favorito y se quedó muy callado en clase. Notó un nudo y luego una respiración más lenta. Respiró, pidió ayuda y lo intentó otra vez. Ese sentimiento es triste.",
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
            story: "Paulo saw someone cut in line and it felt unfair. His face changed and his body reacted. He paused, named the feeling, and chose a kind next step. That feeling is angry.",
          },
          pt: {
            name: "Bravo",
            definition: "Sentir raiva quando algo parece injusto ou errado.",
            story: "Paulo viu alguém furar a fila e pareceu injusto. Percebeu um aperto e depois uma respiração mais calma. Ele falou com alguém de confiança e seguiu em frente. Esse sentimento é bravo.",
          },
          es: {
            name: "Enojado",
            definition: "Sentir rabia cuando algo parece injusto o incorrecto.",
            story: "Paulo vio a alguien colarse en la fila y le pareció injusto. Notó un nudo y luego una respiración más lenta. Se detuvo, le puso nombre al sentimiento y eligió un siguiente paso amable. Ese sentimiento es enojado.",
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
            story: "Paulo heard thunder at night and held his blanket tighter. He noticed a tight knot, then a slower breath. He took a breath, asked for help, and tried again. That feeling is scared.",
          },
          pt: {
            name: "Assustado",
            definition: "Ter medo de que algo ruim possa acontecer.",
            story: "Paulo ouviu trovões à noite e apertou o cobertor. O rosto mudou e o corpo reagiu. Ele falou com alguém de confiança e seguiu em frente. Esse sentimento é assustado.",
          },
          es: {
            name: "Asustado",
            definition: "Tener miedo de que algo malo pueda pasar.",
            story: "Paulo oyó truenos de noche y apretó su manta. Sintió el pecho calentarse y los pensamientos acelerarse. Respiró, pidió ayuda y lo intentó otra vez. Ese sentimiento es asustado.",
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
            story: "Paulo helped his family and felt warm and safe inside. He noticed a tight knot, then a slower breath. He talked to someone he trusts and kept going. That feeling is love.",
          },
          pt: {
            name: "Amor",
            definition: "Cuidar muito de alguém ou de algo.",
            story: "Paulo ajudou a família e sentiu um quentinho seguro por dentro. Sentiu o peito esquentar e os pensamentos acelerarem. Ele falou com alguém de confiança e seguiu em frente. Esse sentimento é amor.",
          },
          es: {
            name: "Amor",
            definition: "Querer mucho a alguien o algo.",
            story: "Paulo ayudó a su familia y sintió un calorcito seguro por dentro. Sintió el pecho calentarse y los pensamientos acelerarse. Respiró, pidió ayuda y lo intentó otra vez. Ese sentimiento es amor.",
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
            story: "Paulo practiced reading and finished a whole page by himself. He noticed a tight knot, then a slower breath. He talked to someone he trusts and kept going. That feeling is proud.",
          },
          pt: {
            name: "Orgulhoso",
            definition: "Sentir-se bem por algo que você fez bem.",
            story: "Paulo praticou leitura e terminou uma página sozinho. Percebeu um aperto e depois uma respiração mais calma. Ele respirou, pediu ajuda e tentou de novo. Esse sentimento é orgulhoso.",
          },
          es: {
            name: "Orgulloso",
            definition: "Sentirse bien por algo que hiciste bien.",
            story: "Paulo practicó lectura y terminó una página él solo. Notó un nudo y luego una respiración más lenta. Respiró, pidió ayuda y lo intentó otra vez. Ese sentimiento es orgulloso.",
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
            story: "Paulo spilled water at lunch and everyone looked for a second. His face changed and his body reacted. He took a breath, asked for help, and tried again. That feeling is embarrassed.",
          },
          pt: {
            name: "Envergonhado",
            definition: "Sentir-se estranho ou tímido quando os outros estão olhando.",
            story: "Paulo derrubou água no lanche e todo mundo olhou por um segundo. O rosto mudou e o corpo reagiu. Ele falou com alguém de confiança e seguiu em frente. Esse sentimento é envergonhado.",
          },
          es: {
            name: "Avergonzado",
            definition: "Sentirse raro o tímido cuando los demás te miran.",
            story: "Paulo derramó agua en el almuerzo y todos miraron un segundo. Notó un nudo y luego una respiración más lenta. Se detuvo, le puso nombre al sentimiento y eligió un siguiente paso amable. Ese sentimiento es avergonzado.",
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
            story: "Paulo heard new rules for a game and didn’t know what to do first. He noticed a tight knot, then a slower breath. He talked to someone he trusts and kept going. That feeling is confused.",
          },
          pt: {
            name: "Confuso",
            definition: "Não entender o que está acontecendo ou o que fazer.",
            story: "Paulo ouviu regras novas de um jogo e não soube o que fazer primeiro. Sentiu o peito esquentar e os pensamentos acelerarem. Ele falou com alguém de confiança e seguiu em frente. Esse sentimento é confuso.",
          },
          es: {
            name: "Confundido",
            definition: "No entender qué está pasando o qué hacer.",
            story: "Paulo escuchó reglas nuevas de un juego y no supo qué hacer primero. Su cara cambió y su cuerpo reaccionó. Se detuvo, le puso nombre al sentimiento y eligió un siguiente paso amable. Ese sentimiento es confundido.",
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
            story: "Paulo packed his bag for a trip and couldn’t stop talking. He noticed a tight knot, then a slower breath. He paused, named the feeling, and chose a kind next step. That feeling is excited.",
          },
          pt: {
            name: "Animado",
            definition: "Sentir-se muito feliz e cheio de energia por algo.",
            story: "Paulo arrumou a mochila para uma viagem e não parava de falar. O rosto mudou e o corpo reagiu. Ele respirou, pediu ajuda e tentou de novo. Esse sentimento é animado.",
          },
          es: {
            name: "Emocionado",
            definition: "Sentirse muy feliz y lleno de energía por algo.",
            story: "Paulo preparó su mochila para un viaje y no paraba de hablar. Notó un nudo y luego una respiración más lenta. Respiró, pidió ayuda y lo intentó otra vez. Ese sentimiento es emocionado.",
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
            story: "Paulo waited while adults talked and time felt super slow. He felt his chest get warm and his thoughts speed up. He talked to someone he trusts and kept going. That feeling is bored.",
          },
          pt: {
            name: "Entediado",
            definition: "Sentir que nada está interessante naquele momento.",
            story: "Paulo esperou enquanto adultos conversavam e o tempo demorava demais. Percebeu um aperto e depois uma respiração mais calma. Ele respirou, pediu ajuda e tentou de novo. Esse sentimento é entediado.",
          },
          es: {
            name: "Aburrido",
            definition: "Sentir que nada es interesante en ese momento.",
            story: "Paulo esperó mientras los adultos hablaban y el tiempo iba lentísimo. Notó un nudo y luego una respiración más lenta. Respiró, pidió ayuda y lo intentó otra vez. Ese sentimiento es aburrido.",
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
            story: "Paulo opened his lunchbox and found a little note inside. His face changed and his body reacted. He paused, named the feeling, and chose a kind next step. That feeling is surprised.",
          },
          pt: {
            name: "Surpreso",
            definition: "Ficar espantado quando algo inesperado acontece.",
            story: "Paulo abriu a lancheira e encontrou um bilhetinho. Percebeu um aperto e depois uma respiração mais calma. Ele falou com alguém de confiança e seguiu em frente. Esse sentimento é surpreso.",
          },
          es: {
            name: "Sorprendido",
            definition: "Quedarse asombrado cuando pasa algo inesperado.",
            story: "Paulo abrió su lonchera y encontró una notita. Su cara cambió y su cuerpo reaccionó. Se detuvo, le puso nombre al sentimiento y eligió un siguiente paso amable. Ese sentimiento es sorprendido.",
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
            story: "Paulo had to present in class and felt butterflies in his stomach. He felt his chest get warm and his thoughts speed up. He paused, named the feeling, and chose a kind next step. That feeling is nervous.",
          },
          pt: {
            name: "Nervoso",
            definition: "Sentir-se tremendo ou preocupado antes de algo importante.",
            story: "Paulo precisou apresentar na aula e sentiu frio na barriga. Percebeu um aperto e depois uma respiração mais calma. Ele respirou, pediu ajuda e tentou de novo. Esse sentimento é nervoso.",
          },
          es: {
            name: "Nervioso",
            definition: "Sentirse tembloroso o preocupado antes de algo importante.",
            story: "Paulo tuvo que presentar en clase y sintió mariposas en el estómago. Notó un nudo y luego una respiración más lenta. Se detuvo, le puso nombre al sentimiento y eligió un siguiente paso amable. Ese sentimiento es nervioso.",
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
            story: "Paulo sat quietly after reading and noticed his breathing slow down. He felt his chest get warm and his thoughts speed up. He talked to someone he trusts and kept going. That feeling is calm.",
          },
          pt: {
            name: "Calmo",
            definition: "Sentir-se em paz e relaxado.",
            story: "Paulo ficou quietinho depois de ler e percebeu a respiração desacelerar. Sentiu o peito esquentar e os pensamentos acelerarem. Ele falou com alguém de confiança e seguiu em frente. Esse sentimento é calmo.",
          },
          es: {
            name: "Calmado",
            definition: "Sentirse en paz y relajado.",
            story: "Paulo se quedó tranquilo después de leer y notó la respiración lenta. Sintió el pecho calentarse y los pensamientos acelerarse. Se detuvo, le puso nombre al sentimiento y eligió un siguiente paso amable. Ese sentimiento es calmado.",
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
            story: "Paulo planned to play outside, but rain started right away. He noticed a tight knot, then a slower breath. He took a breath, asked for help, and tried again. That feeling is disappointed.",
          },
          pt: {
            name: "Decepcionado",
            definition:
              "Sentir-se triste porque algo não aconteceu como você queria.",
            story: "Paulo planejou brincar lá fora, mas começou a chover. Percebeu um aperto e depois uma respiração mais calma. Ele parou, deu nome ao sentimento e escolheu um próximo passo gentil. Esse sentimento é decepcionado.",
          },
          es: {
            name: "Decepcionado",
            definition: "Sentirse triste porque algo no salió como querías.",
            story: "Paulo planeó jugar afuera, pero empezó a llover. Notó un nudo y luego una respiración más lenta. Respiró, pidió ayuda y lo intentó otra vez. Ese sentimiento es decepcionado.",
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
            story: "Paulo saw a tiny bug and leaned closer to watch it move. His face changed and his body reacted. He paused, named the feeling, and chose a kind next step. That feeling is curious.",
          },
          pt: {
            name: "Curioso",
            definition: "Querer saber ou aprender mais sobre algo.",
            story: "Paulo viu um insetinho e chegou mais perto para ver como ele se mexia. Percebeu um aperto e depois uma respiração mais calma. Ele respirou, pediu ajuda e tentou de novo. Esse sentimento é curioso.",
          },
          es: {
            name: "Curioso",
            definition: "Querer saber o aprender más sobre algo.",
            story: "Paulo vio un bichito y se acercó para ver cómo se movía. Notó un nudo y luego una respiración más lenta. Respiró, pidió ayuda y lo intentó otra vez. Ese sentimiento es curioso.",
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
            story: "Paulo saw a friend’s new toy and wished he had one too. He felt his chest get warm and his thoughts speed up. He paused, named the feeling, and chose a kind next step. That feeling is jealous.",
          },
          pt: {
            name: "Com ciúmes",
            definition: "Querer ter o que outra pessoa tem.",
            story: "Paulo viu o brinquedo novo do amigo e quis ter um igual. Sentiu o peito esquentar e os pensamentos acelerarem. Ele falou com alguém de confiança e seguiu em frente. Esse sentimento é com ciúmes.",
          },
          es: {
            name: "Celoso",
            definition: "Querer lo que otra persona tiene.",
            story: "Paulo vio el juguete nuevo de un amigo y quiso uno igual. Sintió el pecho calentarse y los pensamientos acelerarse. Se lo contó a alguien de confianza y siguió adelante. Ese sentimiento es celoso.",
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
            story: "Paulo looked for someone to play with and the yard felt too quiet. He felt his chest get warm and his thoughts speed up. He talked to someone he trusts and kept going. That feeling is lonely.",
          },
          pt: {
            name: "Sozinho",
            definition: "Sentir-se só e com vontade de ter companhia.",
            story: "Paulo procurou alguém para brincar e o quintal ficou silencioso demais. Percebeu um aperto e depois uma respiração mais calma. Ele falou com alguém de confiança e seguiu em frente. Esse sentimento é sozinho.",
          },
          es: {
            name: "Solo",
            definition: "Sentirse solo y con ganas de tener compañía.",
            story: "Paulo buscó con quién jugar y el patio se sintió demasiado silencioso. Notó un nudo y luego una respiración más lenta. Se lo contó a alguien de confianza y siguió adelante. Ese sentimiento es solo.",
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
            story: "Paulo a classmate shared snacks with him and smiled. His face changed and his body reacted. He talked to someone he trusts and kept going. That feeling is grateful.",
          },
          pt: {
            name: "Grato",
            definition: "Sentir-se agradecido por algo bom.",
            story: "Paulo um colega dividiu o lanche com ele e sorriu. Sentiu o peito esquentar e os pensamentos acelerarem. Ele falou com alguém de confiança e seguiu em frente. Esse sentimento é grato.",
          },
          es: {
            name: "Agradecido",
            definition: "Sentirse agradecido por algo bueno.",
            story: "Paulo un compañero compartió su merienda con él y sonrió. Notó un nudo y luego una respiración más lenta. Respiró, pidió ayuda y lo intentó otra vez. Ese sentimiento es agradecido.",
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
            story: "Paulo broke a small rule and kept thinking about it afterward. He felt his chest get warm and his thoughts speed up. He paused, named the feeling, and chose a kind next step. That feeling is guilty.",
          },
          pt: {
            name: "Culpado",
            definition: "Sentir-se mal por algo errado que você fez.",
            story: "Paulo quebrou uma regrinha e ficou pensando nisso depois. Percebeu um aperto e depois uma respiração mais calma. Ele parou, deu nome ao sentimento e escolheu um próximo passo gentil. Esse sentimento é culpado.",
          },
          es: {
            name: "Culpable",
            definition: "Sentirse mal por algo malo que hiciste.",
            story: "Paulo rompió una regla pequeña y se quedó pensándolo después. Notó un nudo y luego una respiración más lenta. Respiró, pidió ayuda y lo intentó otra vez. Ese sentimiento es culpable.",
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
            story: "Paulo played hard at recess and later his eyes felt heavy. He felt his chest get warm and his thoughts speed up. He talked to someone he trusts and kept going. That feeling is tired.",
          },
          pt: {
            name: "Cansado",
            definition: "Sentir pouca energia e precisar descansar.",
            story: "Paulo brincou muito no recreio e depois ficou com os olhos pesados. Sentiu o peito esquentar e os pensamentos acelerarem. Ele parou, deu nome ao sentimento e escolheu um próximo passo gentil. Esse sentimento é cansado.",
          },
          es: {
            name: "Cansado",
            definition: "Tener poca energía y necesitar descansar.",
            story: "Paulo jugó mucho en el recreo y luego sintió los ojos pesados. Sintió el pecho calentarse y los pensamientos acelerarse. Se lo contó a alguien de confianza y siguió adelante. Ese sentimiento es cansado.",
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
                  story: "Paulo had a rough moment, but believed tomorrow could be better. He felt his chest get warm and his thoughts speed up. He talked to someone he trusts and kept going. That feeling is hopeful."
              },
              pt: {
                  name: "Esperançoso",
                  definition: "Acreditar que algo bom vai acontecer.",
                  story: "Paulo teve um momento difícil, mas acreditou que amanhã pode ser melhor. Sentiu o peito esquentar e os pensamentos acelerarem. Ele parou, deu nome ao sentimento e escolheu um próximo passo gentil. Esse sentimento é esperançoso."
              },
              es: {
                  name: "Esperanzado",
                  definition: "Creer que algo bueno va a pasar.",
                  story: "Paulo tuvo un momento difícil, pero creyó que mañana puede mejorar. Su cara cambió y su cuerpo reaccionó. Se lo contó a alguien de confianza y siguió adelante. Ese sentimiento es esperanzado."
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
                  story: "Paulo worried he lost something, then found it in his backpack. He noticed a tight knot, then a slower breath. He talked to someone he trusts and kept going. That feeling is relieved."
              },
              pt: {
                  name: "Aliviado",
                  definition: "Sentir-se melhor depois que a preocupação passa.",
                  story: "Paulo achou que tinha perdido algo e depois encontrou na mochila. O rosto mudou e o corpo reagiu. Ele falou com alguém de confiança e seguiu em frente. Esse sentimento é aliviado."
              },
              es: {
                  name: "Aliviado",
                  definition: "Sentirse mejor después de que pasa la preocupación.",
                  story: "Paulo se preocupó por perder algo y luego lo encontró en su mochila. Su cara cambió y su cuerpo reaccionó. Respiró, pidió ayuda y lo intentó otra vez. Ese sentimiento es aliviado."
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
                  story: "Paulo tried to tie his shoelaces, but the knot kept slipping. He noticed a tight knot, then a slower breath. He took a breath, asked for help, and tried again. That feeling is frustrated."
              },
              pt: {
                  name: "Frustrado",
                  definition: "Sentir-se chateado quando as coisas não dão certo.",
                  story: "Paulo tentou amarrar o tênis, mas o laço soltava. Percebeu um aperto e depois uma respiração mais calma. Ele respirou, pediu ajuda e tentou de novo. Esse sentimento é frustrado."
              },
              es: {
                  name: "Frustrado",
                  definition: "Sentirse molesto cuando las cosas no salen como quieres.",
                  story: "Paulo intentó atarse los cordones, pero el nudo se soltaba. Su cara cambió y su cuerpo reaccionó. Se detuvo, le puso nombre al sentimiento y eligió un siguiente paso amable. Ese sentimiento es frustrado."
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
                  story: "Paulo walked with a trusted adult and felt protected. His face changed and his body reacted. He took a breath, asked for help, and tried again. That feeling is safe."
              },
              pt: {
                  name: "Seguro",
                  definition: "Sentir-se protegido e tranquilo.",
                  story: "Paulo caminhou com um adulto de confiança e se sentiu protegido. O rosto mudou e o corpo reagiu. Ele respirou, pediu ajuda e tentou de novo. Esse sentimento é seguro."
              },
              es: {
                  name: "Seguro",
                  definition: "Sentirse protegido y tranquilo.",
                  story: "Paulo caminó con un adulto de confianza y se sintió protegido. Sintió el pecho calentarse y los pensamientos acelerarse. Se lo contó a alguien de confianza y siguió adelante. Ese sentimiento es seguro."
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
                  story: "Paulo answered a question in class and spoke clearly. His face changed and his body reacted. He paused, named the feeling, and chose a kind next step. That feeling is confident."
              },
              pt: {
                  name: "Confiante",
                  definition: "Acreditar em si mesmo e no que você consegue fazer.",
                  story: "Paulo respondeu uma pergunta na aula e falou com clareza. O rosto mudou e o corpo reagiu. Ele respirou, pediu ajuda e tentou de novo. Esse sentimento é confiante."
              },
              es: {
                  name: "Confiado",
                  definition: "Creer en ti mismo y en lo que puedes hacer.",
                  story: "Paulo respondió una pregunta en clase y habló con claridad. Notó un nudo y luego una respiración más lenta. Se detuvo, le puso nombre al sentimiento y eligió un siguiente paso amable. Ese sentimiento es confiado."
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
