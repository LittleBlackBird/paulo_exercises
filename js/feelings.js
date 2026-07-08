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
      story: "On Saturday morning, Paulo and his dad built a kite out of paper, sticks and string. It took a long time, and twice the tail fell off, but they laughed and fixed it together. When they finally ran across the field and the kite lifted into the sky, Paulo felt something bright open up in his chest, like a window letting sunlight in. His legs wanted to jump, his face smiled without asking permission, and even his voice sounded lighter. He noticed the feeling, named it, and let himself enjoy every second of it. That bright, warm, jumping-inside feeling is happy.",
    },
    pt: {
      name: "Feliz",
      definition: "Sentir-se bem por dentro, cheio de alegria.",
      story: "No sábado de manhã, Paulo e o pai construíram uma pipa com papel, varetas e barbante. Demorou bastante, e duas vezes a rabiola caiu, mas eles riram e consertaram juntos. Quando finalmente correram pelo campo e a pipa subiu no céu, Paulo sentiu algo brilhante se abrir no peito, como uma janela deixando o sol entrar. As pernas queriam pular, o rosto sorriu sem pedir licença e até a voz ficou mais leve. Ele percebeu o sentimento, deu nome a ele e aproveitou cada segundo. Esse sentimento quente, brilhante, que pula por dentro, é feliz.",
    },
    es: {
      name: "Feliz",
      definition: "Sentirse bien por dentro, lleno de alegría.",
      story: "El sábado por la mañana, Paulo y su papá construyeron una cometa con papel, palitos y cuerda. Tardaron mucho, y dos veces se cayó la cola, pero se rieron y la arreglaron juntos. Cuando por fin corrieron por el campo y la cometa subió al cielo, Paulo sintió algo brillante abrirse en su pecho, como una ventana dejando entrar el sol. Sus piernas querían saltar, su cara sonrió sin pedir permiso y hasta su voz sonaba más ligera. Notó el sentimiento, le puso nombre y disfrutó cada segundo. Ese sentimiento cálido y brillante es feliz.",
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
      story: "Paulo's best friend told him that his family was moving to another city at the end of the month. On the walk home, everything looked gray, even though the sun was out. His backpack felt heavier than usual, his throat felt tight, and his eyes filled with water he didn't ask for. At home, he sat quietly on his bed and let the feeling be there instead of pretending it was nothing. Later, he told his mom what happened, and she hugged him for a long time. Talking didn't fix it, but it made the weight smaller. That heavy, quiet, gray feeling is sad.",
    },
    pt: {
      name: "Triste",
      definition: "Sentir-se para baixo, com vontade de chorar ou ficar sozinho.",
      story: "O melhor amigo do Paulo contou que a família dele ia se mudar para outra cidade no fim do mês. No caminho para casa, tudo parecia cinza, mesmo com o sol lá fora. A mochila pareceu mais pesada, a garganta apertou e os olhos se encheram de água sem pedir licença. Em casa, ele sentou quieto na cama e deixou o sentimento existir, em vez de fingir que não era nada. Depois, contou para a mãe o que aconteceu, e ela o abraçou por um bom tempo. Conversar não resolveu tudo, mas deixou o peso menor. Esse sentimento pesado, quieto e cinza é triste.",
    },
    es: {
      name: "Triste",
      definition: "Sentirse decaído, con ganas de llorar o estar solo.",
      story: "El mejor amigo de Paulo le contó que su familia se mudaría a otra ciudad a fin de mes. En el camino a casa, todo se veía gris, aunque había sol. Su mochila parecía más pesada, su garganta se apretó y sus ojos se llenaron de lágrimas sin pedir permiso. En casa, se sentó en silencio en su cama y dejó que el sentimiento existiera, en vez de fingir que no era nada. Después le contó a su mamá lo que pasó, y ella lo abrazó un buen rato. Hablar no lo arregló todo, pero hizo el peso más pequeño. Ese sentimiento pesado y gris es triste.",
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
      story: "During recess, Paulo spent twenty minutes building a tall tower with blocks, and another kid knocked it down on purpose and laughed. Heat rushed up to Paulo's face, his hands closed into fists, and his heart pounded like a drum. He wanted to yell, and maybe push, but he remembered that anger is a signal, not a boss. He stepped back, breathed in slowly through his nose, and counted to five. Then he said, with a firm voice, 'That was not okay. I worked hard on that.' A teacher helped them talk it out. The fire cooled down without burning anyone. That hot, fast, drum-beating feeling is angry.",
    },
    pt: {
      name: "Bravo",
      definition: "Sentir raiva quando algo parece injusto ou errado.",
      story: "No recreio, Paulo passou vinte minutos montando uma torre alta de bloquinhos, e outro menino derrubou tudo de propósito e riu. Um calor subiu pelo rosto do Paulo, as mãos fecharam em punho e o coração bateu como um tambor. Ele quis gritar, e talvez empurrar, mas lembrou que a raiva é um sinal, não um chefe. Deu um passo para trás, puxou o ar devagar pelo nariz e contou até cinco. Depois disse, com voz firme: 'Isso não foi legal. Eu trabalhei muito nessa torre.' Uma professora ajudou os dois a conversar. O fogo esfriou sem queimar ninguém. Esse sentimento quente e acelerado é bravo.",
    },
    es: {
      name: "Enojado",
      definition: "Sentir rabia cuando algo parece injusto o incorrecto.",
      story: "En el recreo, Paulo pasó veinte minutos construyendo una torre alta con bloques, y otro niño la tiró a propósito y se rió. El calor subió a la cara de Paulo, sus manos se cerraron en puños y su corazón golpeó como un tambor. Quiso gritar, y quizás empujar, pero recordó que el enojo es una señal, no un jefe. Dio un paso atrás, respiró lento por la nariz y contó hasta cinco. Luego dijo con voz firme: 'Eso no estuvo bien. Trabajé mucho en esa torre.' Una maestra los ayudó a hablar. El fuego se enfrió sin quemar a nadie. Ese sentimiento caliente y rápido es enojado.",
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
      story: "The lights went out during a storm, and Paulo's room became completely dark. His body froze, his skin got goosebumps, and his imagination started drawing monsters in every corner. His breath became short and quick, like a rabbit's. Instead of hiding under the blanket forever, he remembered a trick: name five things you know are true. 'This is my room. That shadow is my chair. Dad is right down the hall. Storms end. I am okay.' He called out, his dad came with a flashlight, and together the dark became just dark again. That frozen, jumpy, imagining feeling is scared.",
    },
    pt: {
      name: "Assustado",
      definition: "Ter medo de que algo ruim possa acontecer.",
      story: "A luz acabou durante uma tempestade, e o quarto do Paulo ficou totalmente escuro. O corpo congelou, a pele se arrepiou e a imaginação começou a desenhar monstros em cada canto. A respiração ficou curta e rápida, como a de um coelho. Em vez de se esconder embaixo da coberta para sempre, ele lembrou de um truque: dizer cinco coisas que sabe que são verdade. 'Este é o meu quarto. Aquela sombra é a minha cadeira. O papai está logo ali no corredor. Tempestades acabam. Eu estou bem.' Ele chamou, o pai veio com uma lanterna, e o escuro voltou a ser só escuro. Esse sentimento congelado e arrepiado é assustado.",
    },
    es: {
      name: "Asustado",
      definition: "Tener miedo de que algo malo pueda pasar.",
      story: "Se cortó la luz durante una tormenta, y el cuarto de Paulo quedó completamente oscuro. Su cuerpo se congeló, su piel se erizó y su imaginación empezó a dibujar monstruos en cada rincón. Su respiración se volvió corta y rápida, como la de un conejo. En vez de esconderse bajo la manta para siempre, recordó un truco: decir cinco cosas que sabe que son verdad. 'Este es mi cuarto. Esa sombra es mi silla. Papá está ahí no más, en el pasillo. Las tormentas terminan. Estoy bien.' Llamó, su papá vino con una linterna, y la oscuridad volvió a ser solo oscuridad. Ese sentimiento congelado es asustado.",
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
      story: "Paulo's grandmother came to visit for a whole week. Every evening they cooked together, and she taught him how to fold dumplings with his fingers, telling stories about when his dad was small. One night, Paulo noticed how carefully she listened to everything he said, as if his words were treasures. His chest felt warm and full, like a cup of hot chocolate on a cold day. He wanted her to be safe, and comfortable, and to stay close. He hugged her without any reason, just because. She laughed and hugged him back. That warm, full, taking-care feeling is love.",
    },
    pt: {
      name: "Amor",
      definition: "Cuidar muito de alguém ou de algo.",
      story: "A avó do Paulo veio visitar por uma semana inteira. Toda noite eles cozinhavam juntos, e ela ensinou a dobrar pastéis com os dedos, contando histórias de quando o pai dele era pequeno. Numa noite, Paulo percebeu como ela escutava com cuidado tudo o que ele dizia, como se as palavras dele fossem tesouros. O peito ficou quente e cheio, como uma xícara de chocolate num dia frio. Ele queria que ela estivesse segura, confortável e sempre por perto. Abraçou a avó sem motivo nenhum, só porque sim. Ela riu e abraçou de volta. Esse sentimento quente, cheio, de cuidar, é amor.",
    },
    es: {
      name: "Amor",
      definition: "Querer mucho a alguien o algo.",
      story: "La abuela de Paulo vino de visita por una semana entera. Cada noche cocinaban juntos, y ella le enseñó a doblar empanadas con los dedos, contando historias de cuando su papá era pequeño. Una noche, Paulo notó con cuánto cuidado ella escuchaba todo lo que él decía, como si sus palabras fueran tesoros. Su pecho se sintió cálido y lleno, como una taza de chocolate en un día frío. Quería que ella estuviera segura, cómoda y siempre cerca. La abrazó sin ningún motivo, solo porque sí. Ella se rió y lo abrazó también. Ese sentimiento cálido y lleno es amor.",
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
      story: "For two weeks, Paulo practiced riding his bike without training wheels. He fell many times, scraped his knee once, and wanted to quit twice. But every day he tried a little more, wobbling down the sidewalk while his mom jogged beside him. Then one afternoon, his mom let go without telling him, and he rode the whole street alone. When he realized it, he shouted with joy. His back straightened, his chin lifted, and inside he felt tall like a giant. He had earned this moment with his own effort, fall after fall. That standing-tall, I-did-it feeling is proud.",
    },
    pt: {
      name: "Orgulhoso",
      definition: "Sentir-se bem por algo que você fez bem.",
      story: "Durante duas semanas, Paulo treinou andar de bicicleta sem rodinhas. Caiu muitas vezes, ralou o joelho uma vez e quis desistir duas. Mas todo dia tentava um pouco mais, bambeando pela calçada enquanto a mãe corria do lado. Então, numa tarde, a mãe soltou sem avisar, e ele pedalou a rua inteira sozinho. Quando percebeu, gritou de alegria. As costas ficaram retas, o queixo levantou e, por dentro, ele se sentiu alto como um gigante. Ele conquistou aquele momento com o próprio esforço, queda após queda. Esse sentimento de ficar em pé, de 'eu consegui', é orgulho.",
    },
    es: {
      name: "Orgulloso",
      definition: "Sentirse bien por algo que hiciste bien.",
      story: "Durante dos semanas, Paulo practicó andar en bicicleta sin rueditas. Se cayó muchas veces, se raspó la rodilla una vez y quiso rendirse dos. Pero cada día intentaba un poco más, tambaleándose por la vereda mientras su mamá corría a su lado. Entonces, una tarde, su mamá lo soltó sin avisarle, y él pedaleó toda la calle solo. Cuando se dio cuenta, gritó de alegría. Su espalda se enderezó, su mentón se levantó y por dentro se sintió alto como un gigante. Se ganó ese momento con su propio esfuerzo, caída tras caída. Ese sentimiento de 'lo logré' es orgullo.",
    },
  },
},

{
  id: "embarrassed",
  emoji: "😳",
  translations: {
    en: {
      name: "Embarrassed",
      definition: "Feeling shy or awkward when others notice something you did.",
      story: "In the middle of a quiet math class, Paulo's stomach growled so loudly that the kids in the front row turned around. His cheeks turned red and hot, and he wished he could shrink into his chair and disappear like a turtle into its shell. For a moment, it felt like everyone would remember this forever. Then his teacher smiled and said, 'Someone's brain is working hard and needs fuel!' A few kids giggled kindly, and Paulo laughed too. He realized that small awkward moments pass quickly, and that everyone has them. By lunch, nobody remembered it. That red-cheeked, wanting-to-hide feeling is embarrassed.",
    },
    pt: {
      name: "Envergonhado",
      definition: "Sentir vergonha quando os outros percebem algo que você fez.",
      story: "No meio de uma aula silenciosa de matemática, a barriga do Paulo roncou tão alto que as crianças da frente se viraram. As bochechas ficaram vermelhas e quentes, e ele quis encolher na cadeira e sumir como uma tartaruga dentro do casco. Por um momento, parecia que todos iam lembrar daquilo para sempre. Então a professora sorriu e disse: 'Tem um cérebro trabalhando duro precisando de combustível!' Algumas crianças riram com carinho, e Paulo riu também. Ele percebeu que momentos sem graça passam rápido e que todo mundo tem os seus. Na hora do almoço, ninguém lembrava mais. Esse sentimento de bochecha vermelha é vergonha.",
    },
    es: {
      name: "Avergonzado",
      definition: "Sentir vergüenza cuando otros notan algo que hiciste.",
      story: "En medio de una clase silenciosa de matemáticas, el estómago de Paulo rugió tan fuerte que los niños de adelante se dieron vuelta. Sus mejillas se pusieron rojas y calientes, y quiso encogerse en su silla y desaparecer como una tortuga en su caparazón. Por un momento, sintió que todos lo recordarían para siempre. Entonces su maestra sonrió y dijo: '¡Un cerebro está trabajando duro y necesita combustible!' Algunos niños se rieron con cariño, y Paulo también. Se dio cuenta de que los momentos incómodos pasan rápido y que todos los tienen. A la hora del almuerzo, nadie lo recordaba. Ese sentimiento de mejillas rojas es vergüenza.",
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
      story: "Paulo opened his new board game, and the instructions had so many rules that the words seemed to dance on the page. He read them once, then twice, and still didn't know how to start. His forehead wrinkled, his head felt foggy, and a small voice inside said, 'Maybe you're not smart enough.' Paulo knew that voice was wrong. Confusion just means your brain is still building the map. He took a breath, read one rule at a time, and asked his friend to try the first round with him. Step by step, the fog cleared. That foggy, wrinkled-forehead feeling is confused — and it always comes before understanding.",
    },
    pt: {
      name: "Confuso",
      definition: "Não entender o que está acontecendo ou o que fazer.",
      story: "Paulo abriu o jogo de tabuleiro novo, e as instruções tinham tantas regras que as palavras pareciam dançar na página. Leu uma vez, depois outra, e ainda não sabia como começar. A testa enrugou, a cabeça ficou nebulosa, e uma vozinha por dentro disse: 'Talvez você não seja inteligente o bastante.' Paulo sabia que essa voz estava errada. Confusão só quer dizer que o cérebro ainda está montando o mapa. Ele respirou, leu uma regra de cada vez e chamou o amigo para testar a primeira rodada junto. Passo a passo, a névoa foi sumindo. Esse sentimento nebuloso é confusão — e ele sempre vem antes do entendimento.",
    },
    es: {
      name: "Confundido",
      definition: "No entender qué está pasando o qué hacer.",
      story: "Paulo abrió su juego de mesa nuevo, y las instrucciones tenían tantas reglas que las palabras parecían bailar en la página. Las leyó una vez, luego otra, y todavía no sabía cómo empezar. Su frente se arrugó, su cabeza se sintió con niebla, y una vocecita por dentro dijo: 'Quizás no eres lo bastante inteligente.' Paulo sabía que esa voz estaba equivocada. La confusión solo significa que el cerebro todavía está armando el mapa. Respiró, leyó una regla a la vez y le pidió a su amigo probar la primera ronda con él. Paso a paso, la niebla se despejó. Ese sentimiento nebuloso es confusión — y siempre llega antes de entender.",
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
      story: "Paulo's teacher announced that next Friday the whole class would visit the science museum — the one with the giant dinosaur skeleton and the room where your hair stands up with static electricity. Paulo's whole body lit up like a firework. His heart beat faster, his feet tapped under the desk, and a hundred questions exploded in his head at once. That night, he could barely sleep, imagining every room. His mom taught him a trick: excited energy is great fuel, so use it. He made a list of the top five things he wanted to see. That sparkling, can't-sit-still, firework feeling is excited.",
    },
    pt: {
      name: "Animado",
      definition: "Sentir-se muito feliz e cheio de energia por algo.",
      story: "A professora do Paulo anunciou que na sexta-feira a turma inteira ia visitar o museu de ciências — aquele com o esqueleto gigante de dinossauro e a sala onde o cabelo fica em pé com eletricidade estática. O corpo inteiro do Paulo acendeu como fogos de artifício. O coração bateu mais rápido, os pés batucaram embaixo da mesa e cem perguntas explodiram na cabeça ao mesmo tempo. À noite, mal conseguiu dormir, imaginando cada sala. A mãe ensinou um truque: energia animada é um ótimo combustível, então use. Ele fez uma lista das cinco coisas que mais queria ver. Esse sentimento que brilha e não para quieto é animação.",
    },
    es: {
      name: "Emocionado",
      definition: "Sentirse muy feliz y lleno de energía por algo.",
      story: "La maestra de Paulo anunció que el próximo viernes toda la clase visitaría el museo de ciencias — el del esqueleto gigante de dinosaurio y la sala donde el pelo se para con electricidad estática. Todo el cuerpo de Paulo se encendió como fuegos artificiales. Su corazón latió más rápido, sus pies golpeteaban bajo el escritorio y cien preguntas explotaron en su cabeza a la vez. Esa noche casi no pudo dormir, imaginando cada sala. Su mamá le enseñó un truco: la energía emocionada es buen combustible, así que úsala. Hizo una lista de las cinco cosas que más quería ver. Ese sentimiento chispeante es emoción.",
    },
  },
},

{
  id: "bored",
  emoji: "🥱",
  translations: {
    en: {
      name: "Bored",
      definition: "Feeling like nothing is fun or interesting right now.",
      story: "It rained all Sunday, the tablet had no battery, and Paulo lay upside down on the couch watching the ceiling. Time moved like a snail carrying a backpack full of rocks. He sighed loudly three times, hoping someone would invent fun for him. Nobody did. Then he remembered what his dad always says: 'Bored is the moment right before a good idea.' Paulo looked around, found an old shoebox, some tape and markers, and decided to build a garage for his toy cars. One hour later, the garage had two floors and a ramp. That slow, empty, snail-time feeling is bored — and it can turn into creativity.",
    },
    pt: {
      name: "Entediado",
      definition: "Sentir que nada está divertido ou interessante agora.",
      story: "Choveu o domingo inteiro, o tablet estava sem bateria, e Paulo ficou de cabeça para baixo no sofá olhando o teto. O tempo andava como um caracol carregando uma mochila cheia de pedras. Ele suspirou alto três vezes, esperando que alguém inventasse diversão para ele. Ninguém inventou. Então lembrou do que o pai sempre diz: 'O tédio é o momento logo antes de uma boa ideia.' Paulo olhou em volta, achou uma caixa de sapato velha, fita e canetinhas, e decidiu construir uma garagem para os carrinhos. Uma hora depois, a garagem tinha dois andares e uma rampa. Esse sentimento lento e vazio é tédio — e ele pode virar criatividade.",
    },
    es: {
      name: "Aburrido",
      definition: "Sentir que nada es divertido o interesante ahora.",
      story: "Llovió todo el domingo, la tablet estaba sin batería, y Paulo se quedó boca abajo en el sofá mirando el techo. El tiempo se movía como un caracol cargando una mochila llena de piedras. Suspiró fuerte tres veces, esperando que alguien inventara diversión para él. Nadie lo hizo. Entonces recordó lo que su papá siempre dice: 'El aburrimiento es el momento justo antes de una buena idea.' Paulo miró alrededor, encontró una caja de zapatos vieja, cinta y marcadores, y decidió construir un garaje para sus autitos. Una hora después, el garaje tenía dos pisos y una rampa. Ese sentimiento lento y vacío es aburrimiento — y puede volverse creatividad.",
    },
  },
},

{
  id: "surprised",
  emoji: "😮",
  translations: {
    en: {
      name: "Surprised",
      definition: "Feeling shocked by something you did not expect.",
      story: "Paulo walked into the kitchen on an ordinary Tuesday, and suddenly the lights flicked on and his whole family shouted 'SURPRISE!' — they had prepared a small party just because he had finished his first big book. His eyebrows shot up, his mouth opened into an O, and for two full seconds his brain froze like a video paused in the middle. His heart gave one big jump, and then all the surprise melted into laughter. He hadn't expected anything at all, and that's exactly what made the moment feel electric. That eyes-wide, brain-paused, heart-jumping feeling is surprised.",
    },
    pt: {
      name: "Surpreso",
      definition: "Sentir um choque por algo que você não esperava.",
      story: "Paulo entrou na cozinha numa terça-feira comum, e de repente as luzes acenderam e a família inteira gritou 'SURPRESA!' — eles tinham preparado uma festinha só porque ele terminou o primeiro livro grande da vida. As sobrancelhas subiram, a boca abriu num O, e por dois segundos inteiros o cérebro travou como um vídeo pausado no meio. O coração deu um pulo grande, e depois toda a surpresa derreteu em risada. Ele não esperava nada, e foi exatamente isso que deixou o momento elétrico. Esse sentimento de olhos arregalados e coração pulando é surpresa.",
    },
    es: {
      name: "Sorprendido",
      definition: "Sentir un impacto por algo que no esperabas.",
      story: "Paulo entró a la cocina un martes común, y de repente se encendieron las luces y toda su familia gritó '¡SORPRESA!' — habían preparado una pequeña fiesta solo porque él terminó su primer libro grande. Sus cejas se dispararon hacia arriba, su boca se abrió en una O, y por dos segundos enteros su cerebro se congeló como un video en pausa. Su corazón dio un gran salto, y luego toda la sorpresa se derritió en risas. No esperaba nada, y eso fue exactamente lo que hizo el momento eléctrico. Ese sentimiento de ojos muy abiertos es sorpresa.",
    },
  },
},

{
  id: "nervous",
  emoji: "😬",
  translations: {
    en: {
      name: "Nervous",
      definition: "Feeling worried before something important happens.",
      story: "Tomorrow Paulo would recite a poem in front of the whole school. That night, his stomach felt full of butterflies doing somersaults, his hands were a little sweaty, and his mind kept playing a movie of everything that could go wrong. He told his dad, who said something interesting: 'Nervous and excited live in the same house. Your body is getting energy ready — you decide how to use it.' They practiced the poem three times, and Paulo planned what to do if he forgot a line: breathe, smile, continue. The butterflies stayed, but now they flew in formation. That fluttery, sweaty-hands, before-something-big feeling is nervous.",
    },
    pt: {
      name: "Nervoso",
      definition: "Sentir preocupação antes de algo importante acontecer.",
      story: "Amanhã Paulo ia recitar um poema na frente da escola inteira. Naquela noite, a barriga parecia cheia de borboletas dando cambalhotas, as mãos suavam um pouco, e a mente ficava passando um filme de tudo que podia dar errado. Ele contou para o pai, que disse algo interessante: 'Nervoso e animado moram na mesma casa. Seu corpo está preparando energia — você decide como usar.' Eles ensaiaram o poema três vezes, e Paulo planejou o que fazer se esquecesse um verso: respirar, sorrir, continuar. As borboletas ficaram, mas agora voavam em formação. Esse sentimento de frio na barriga antes de algo grande é nervosismo.",
    },
    es: {
      name: "Nervioso",
      definition: "Sentir preocupación antes de algo importante.",
      story: "Mañana Paulo recitaría un poema frente a toda la escuela. Esa noche, su estómago estaba lleno de mariposas dando volteretas, sus manos sudaban un poco, y su mente repetía una película de todo lo que podía salir mal. Se lo contó a su papá, que dijo algo interesante: 'Nervioso y emocionado viven en la misma casa. Tu cuerpo está preparando energía — tú decides cómo usarla.' Practicaron el poema tres veces, y Paulo planeó qué hacer si olvidaba un verso: respirar, sonreír, continuar. Las mariposas se quedaron, pero ahora volaban en formación. Ese sentimiento de cosquilleo antes de algo grande es nerviosismo.",
    },
  },
},

{
  id: "calm",
  emoji: "😌",
  translations: {
    en: {
      name: "Calm",
      definition: "Feeling peaceful, with a quiet mind and relaxed body.",
      story: "On Sunday evening, after his bath, Paulo sat on the balcony with his mom watching the sky change colors — orange, then pink, then deep blue. Nobody talked much. He could hear crickets starting their night music and feel the cool breeze on his face. His shoulders dropped down from his ears, his breathing became slow and deep like ocean waves, and his thoughts stopped racing and just floated. There was nowhere to run to and nothing to fix. He noticed how good it felt to simply be there. That slow-breathing, soft-shoulders, quiet-mind feeling is calm — and you can find it again whenever you slow down.",
    },
    pt: {
      name: "Calmo",
      definition: "Sentir paz, com a mente quieta e o corpo relaxado.",
      story: "No domingo à noite, depois do banho, Paulo sentou na varanda com a mãe para ver o céu mudar de cor — laranja, depois rosa, depois azul escuro. Ninguém falou muito. Dava para ouvir os grilos começando a música da noite e sentir a brisa fresca no rosto. Os ombros desceram das orelhas, a respiração ficou lenta e profunda como ondas do mar, e os pensamentos pararam de correr e só flutuaram. Não havia para onde correr nem nada para consertar. Ele percebeu como era bom simplesmente estar ali. Esse sentimento de respiração lenta e mente quieta é calma — e você pode encontrá-la sempre que desacelerar.",
    },
    es: {
      name: "Tranquilo",
      definition: "Sentir paz, con la mente quieta y el cuerpo relajado.",
      story: "El domingo por la noche, después del baño, Paulo se sentó en el balcón con su mamá a mirar el cielo cambiar de color — naranja, luego rosa, luego azul profundo. Nadie habló mucho. Podía oír a los grillos empezando su música nocturna y sentir la brisa fresca en la cara. Sus hombros bajaron de sus orejas, su respiración se volvió lenta y profunda como olas del mar, y sus pensamientos dejaron de correr y solo flotaron. No había adónde correr ni nada que arreglar. Notó lo bien que se sentía simplemente estar ahí. Ese sentimiento de respiración lenta y mente quieta es tranquilidad.",
    },
  },
},

{
  id: "disappointed",
  emoji: "😞",
  translations: {
    en: {
      name: "Disappointed",
      definition: "Feeling sad because something didn't happen the way you wanted.",
      story: "Paulo had been waiting all month for the camping trip, but on Friday the forecast showed a huge storm, and his dad had to cancel it. His shoulders dropped, his smile slid off his face, and inside he felt like a balloon slowly losing its air. He had imagined the tent, the flashlight games, the marshmallows — and now none of it would happen. He allowed himself to feel sad about it for a while, because wanting things is not wrong. Then his dad said, 'Postponed is not canceled,' and they built a blanket tent in the living room instead. That deflating-balloon feeling when plans break is disappointed.",
    },
    pt: {
      name: "Decepcionado",
      definition: "Sentir tristeza porque algo não aconteceu como você queria.",
      story: "Paulo esperou o mês inteiro pelo acampamento, mas na sexta a previsão mostrou uma tempestade enorme, e o pai precisou cancelar. Os ombros caíram, o sorriso escorregou do rosto, e por dentro ele se sentiu como um balão perdendo o ar devagar. Ele tinha imaginado a barraca, as brincadeiras de lanterna, os marshmallows — e agora nada disso ia acontecer. Ele se permitiu ficar triste por um tempo, porque querer as coisas não é errado. Depois o pai disse: 'Adiado não é cancelado', e eles montaram uma cabana de cobertores na sala. Esse sentimento de balão murchando quando os planos quebram é decepção.",
    },
    es: {
      name: "Decepcionado",
      definition: "Sentir tristeza porque algo no salió como querías.",
      story: "Paulo esperó todo el mes el viaje de campamento, pero el viernes el pronóstico mostró una tormenta enorme, y su papá tuvo que cancelarlo. Sus hombros cayeron, su sonrisa se resbaló de su cara, y por dentro se sintió como un globo perdiendo el aire despacio. Había imaginado la carpa, los juegos con linterna, los malvaviscos — y ahora nada de eso pasaría. Se permitió estar triste un rato, porque querer cosas no está mal. Luego su papá dijo: 'Pospuesto no es cancelado', y armaron una carpa de mantas en la sala. Ese sentimiento de globo desinflándose es decepción.",
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
      story: "While digging in the garden, Paulo found a shiny beetle with green armor that seemed to change color in the sunlight. Instead of running away or squishing it, he crouched down and watched it for ten whole minutes. Questions started popping in his head like popcorn: Why does it shine? What does it eat? Does it have a family? He felt his mind leaning forward, hungry, like a detective on a mystery. He drew the beetle in his notebook and later searched with his dad to discover its name. Every answer opened two new questions, and he loved that. That popcorn-questions, leaning-forward feeling is curious.",
    },
    pt: {
      name: "Curioso",
      definition: "Querer saber ou aprender mais sobre algo.",
      story: "Cavando no jardim, Paulo encontrou um besouro brilhante com armadura verde que parecia mudar de cor no sol. Em vez de fugir ou esmagar, ele se abaixou e observou por dez minutos inteiros. Perguntas começaram a estourar na cabeça como pipoca: Por que ele brilha? O que ele come? Será que tem família? Ele sentiu a mente se inclinando para frente, faminta, como um detetive num mistério. Desenhou o besouro no caderno e depois pesquisou com o pai para descobrir o nome dele. Cada resposta abria duas perguntas novas, e ele adorou isso. Esse sentimento de perguntas pipocando é curiosidade.",
    },
    es: {
      name: "Curioso",
      definition: "Querer saber o aprender más sobre algo.",
      story: "Cavando en el jardín, Paulo encontró un escarabajo brillante con armadura verde que parecía cambiar de color bajo el sol. En vez de huir o aplastarlo, se agachó y lo observó durante diez minutos enteros. Las preguntas empezaron a saltar en su cabeza como palomitas: ¿Por qué brilla? ¿Qué come? ¿Tendrá familia? Sintió su mente inclinándose hacia adelante, hambrienta, como un detective en un misterio. Dibujó el escarabajo en su cuaderno y después buscó con su papá para descubrir su nombre. Cada respuesta abría dos preguntas nuevas, y eso le encantó. Ese sentimiento de preguntas saltando es curiosidad.",
    },
  },
},

{
  id: "jealous",
  emoji: "😒",
  translations: {
    en: {
      name: "Jealous",
      definition: "Wanting what someone else has, or fearing losing attention you love.",
      story: "Paulo's cousin got a brand-new skateboard with flames painted on it, and everyone at the park gathered around to see it. Paulo felt a sour twist in his stomach, like biting a lemon he didn't order. A grumpy voice inside whispered, 'Why him and not me?' He noticed he was about to say something mean, just to feel better. Instead, he took a breath and told his mom about the sour feeling. She said jealousy is a signal that shows you what you care about. Paulo asked his cousin for a turn, practiced, and started saving his allowance. That sour, twisting, 'why-not-me' feeling is jealous — and it loses power when you name it.",
    },
    pt: {
      name: "Com ciúmes",
      definition: "Querer o que outra pessoa tem, ou ter medo de perder uma atenção que você ama.",
      story: "O primo do Paulo ganhou um skate novinho com chamas pintadas, e todo mundo no parque se juntou para ver. Paulo sentiu uma torcida azeda na barriga, como morder um limão que não pediu. Uma voz rabugenta sussurrou por dentro: 'Por que ele e não eu?' Ele percebeu que estava quase dizendo algo maldoso, só para se sentir melhor. Em vez disso, respirou e contou para a mãe sobre o sentimento azedo. Ela disse que o ciúme é um sinal que mostra o que importa para você. Paulo pediu uma volta ao primo, treinou e começou a juntar a mesada. Esse sentimento azedo de 'por que não eu' é ciúme — e ele perde força quando você dá nome a ele.",
    },
    es: {
      name: "Celoso",
      definition: "Querer lo que otro tiene, o temer perder una atención que amas.",
      story: "El primo de Paulo recibió una patineta nueva con llamas pintadas, y todos en el parque se juntaron a verla. Paulo sintió un retorcijón agrio en el estómago, como morder un limón que no pidió. Una voz gruñona susurró por dentro: '¿Por qué él y no yo?' Notó que estaba a punto de decir algo malo, solo para sentirse mejor. En cambio, respiró y le contó a su mamá sobre el sentimiento agrio. Ella dijo que los celos son una señal que muestra lo que te importa. Paulo le pidió un turno a su primo, practicó y empezó a ahorrar. Ese sentimiento agrio de '¿por qué no yo?' son los celos — y pierden fuerza cuando los nombras.",
    },
  },
},

{
  id: "lonely",
  emoji: "😔",
  translations: {
    en: {
      name: "Lonely",
      definition: "Feeling alone, like nobody is with you or understands you.",
      story: "At the new after-school club, everyone already had their groups, and Paulo sat at the end of the table drawing by himself. The room was full of laughter, but none of it was for him, and that made the noise feel even louder. His chest felt hollow, like an empty room where sounds echo. He wanted to disappear, but he remembered that lonely is a feeling, not a fact. He gathered his courage, walked to a boy who was also drawing, and asked, 'What are you making?' Ten minutes later, they were designing a comic together. That hollow, echo-room feeling is lonely — and one brave sentence can start to fill it.",
    },
    pt: {
      name: "Sozinho",
      definition: "Sentir-se só, como se ninguém estivesse com você ou te entendesse.",
      story: "No clube novo depois da escola, todo mundo já tinha seus grupos, e Paulo sentou na ponta da mesa desenhando sozinho. A sala estava cheia de risadas, mas nenhuma era para ele, e isso deixava o barulho ainda mais alto. O peito parecia oco, como uma sala vazia onde o som faz eco. Ele quis desaparecer, mas lembrou que solidão é um sentimento, não um fato. Juntou coragem, foi até um menino que também desenhava e perguntou: 'O que você está fazendo?' Dez minutos depois, os dois criavam uma história em quadrinhos juntos. Esse sentimento oco, de sala vazia, é solidão — e uma frase corajosa pode começar a preenchê-lo.",
    },
    es: {
      name: "Solo",
      definition: "Sentirse solo, como si nadie estuviera contigo o te entendiera.",
      story: "En el nuevo club después de la escuela, todos ya tenían sus grupos, y Paulo se sentó en la punta de la mesa dibujando solo. La sala estaba llena de risas, pero ninguna era para él, y eso hacía que el ruido se sintiera aún más fuerte. Su pecho se sintió hueco, como un cuarto vacío donde los sonidos hacen eco. Quiso desaparecer, pero recordó que la soledad es un sentimiento, no un hecho. Juntó valor, caminó hacia un niño que también dibujaba y preguntó: '¿Qué estás haciendo?' Diez minutos después, diseñaban un cómic juntos. Ese sentimiento hueco es soledad — y una frase valiente puede empezar a llenarlo.",
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
      story: "Paulo forgot his lunch at home, and his stomach was already complaining by noon. Without making it a big deal, his friend Marina split her sandwich exactly in half and slid one part across the table with a smile. Paulo felt a soft warmth spread through his chest, like a small sun turning on inside. That night, before sleeping, he made a mental list of three good things from his day: the sandwich, the sunny recess, and his dog waiting at the door. He noticed that looking for good things made him find more of them. That warm, thankful, small-sun feeling is grateful.",
    },
    pt: {
      name: "Agradecido",
      definition: "Sentir gratidão por algo bom.",
      story: "Paulo esqueceu o lanche em casa, e a barriga já reclamava ao meio-dia. Sem fazer drama, a amiga Marina dividiu o sanduíche exatamente ao meio e empurrou uma parte pela mesa com um sorriso. Paulo sentiu um calor macio se espalhar pelo peito, como um pequeno sol acendendo por dentro. À noite, antes de dormir, ele fez uma lista mental de três coisas boas do dia: o sanduíche, o recreio ensolarado e o cachorro esperando na porta. Percebeu que procurar coisas boas fazia encontrar ainda mais. Esse sentimento quente, de pequeno sol, é gratidão.",
    },
    es: {
      name: "Agradecido",
      definition: "Sentirse agradecido por algo bueno.",
      story: "Paulo olvidó su almuerzo en casa, y su estómago ya se quejaba al mediodía. Sin hacer un drama, su amiga Marina partió su sándwich exactamente por la mitad y deslizó una parte por la mesa con una sonrisa. Paulo sintió un calor suave extenderse por su pecho, como un pequeño sol encendiéndose por dentro. Esa noche, antes de dormir, hizo una lista mental de tres cosas buenas de su día: el sándwich, el recreo soleado y su perro esperando en la puerta. Notó que buscar cosas buenas lo hacía encontrar más. Ese sentimiento cálido, de pequeño sol, es gratitud.",
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
      story: "Paulo borrowed his friend's favorite pen without asking, and it fell and broke. He hid it in a drawer and said nothing. But all afternoon, the secret sat on his chest like a heavy backpack he couldn't take off. His thoughts kept replaying the crack of the pen, and he couldn't enjoy his game. He learned something important: guilt is the heart's alarm, ringing until you make things right. So he took a deep breath, showed his friend the pen, said 'I'm sorry, I should have asked,' and offered his own savings to replace it. His friend was upset, then softened. The backpack came off. That heavy-secret feeling is guilty — and honesty is what unlocks it.",
    },
    pt: {
      name: "Culpado",
      definition: "Sentir-se mal por algo errado que você fez.",
      story: "Paulo pegou a caneta favorita do amigo sem pedir, e ela caiu e quebrou. Ele escondeu a caneta numa gaveta e não disse nada. Mas a tarde inteira o segredo ficou no peito como uma mochila pesada que não saía. Os pensamentos repetiam o barulho da caneta quebrando, e ele nem conseguiu curtir o jogo. Aprendeu algo importante: a culpa é o alarme do coração, tocando até você consertar as coisas. Então respirou fundo, mostrou a caneta para o amigo, disse 'Desculpa, eu devia ter pedido' e ofereceu as próprias economias para repor. O amigo ficou chateado, depois amoleceu. A mochila saiu. Esse sentimento de segredo pesado é culpa — e a honestidade é a chave que o destrava.",
    },
    es: {
      name: "Culpable",
      definition: "Sentirse mal por algo malo que hiciste.",
      story: "Paulo tomó prestada la lapicera favorita de su amigo sin pedirla, y se cayó y se rompió. La escondió en un cajón y no dijo nada. Pero toda la tarde el secreto se quedó en su pecho como una mochila pesada que no podía quitarse. Sus pensamientos repetían el crujido de la lapicera, y no pudo disfrutar su juego. Aprendió algo importante: la culpa es la alarma del corazón, que suena hasta que arreglas las cosas. Así que respiró hondo, le mostró la lapicera a su amigo, dijo 'Perdón, debí pedirla' y ofreció sus ahorros para reponerla. Su amigo se enojó, luego se ablandó. La mochila se cayó. Ese sentimiento de secreto pesado es culpa — y la honestidad es la llave.",
    },
  },
},

{
  id: "tired",
  emoji: "😴",
  translations: {
    en: {
      name: "Tired",
      definition: "Feeling low on energy, needing rest.",
      story: "After a full day of school, soccer practice, and helping carry groceries up the stairs, Paulo's body felt like a phone with 5% battery. His legs were heavy as sandbags, his eyes kept closing by themselves, and even his favorite cartoon couldn't keep his attention. He got grumpy over a tiny thing, and his mom gently pointed out, 'You're not angry, love — you're exhausted.' She was right. Instead of pushing through, Paulo took a warm shower, drank some water, and went to bed early. In the morning, his battery was full again, and the world looked friendly. That heavy, low-battery feeling is tired — and rest is how you recharge.",
    },
    pt: {
      name: "Cansado",
      definition: "Sentir pouca energia, precisando de descanso.",
      story: "Depois de um dia inteiro de escola, treino de futebol e ajudar a subir as compras pela escada, o corpo do Paulo parecia um celular com 5% de bateria. As pernas pesavam como sacos de areia, os olhos fechavam sozinhos, e nem o desenho favorito prendia a atenção. Ele ficou irritado com uma coisinha à toa, e a mãe apontou com carinho: 'Você não está bravo, amor — está exausto.' Ela tinha razão. Em vez de forçar, Paulo tomou um banho quente, bebeu água e foi dormir cedo. De manhã, a bateria estava cheia de novo, e o mundo parecia amigável. Esse sentimento pesado, de bateria fraca, é cansaço — e descansar é a forma de recarregar.",
    },
    es: {
      name: "Cansado",
      definition: "Sentir poca energía, necesitando descanso.",
      story: "Después de un día completo de escuela, práctica de fútbol y ayudar a subir las compras por la escalera, el cuerpo de Paulo se sentía como un teléfono con 5% de batería. Sus piernas pesaban como bolsas de arena, sus ojos se cerraban solos, y ni su dibujo animado favorito podía mantener su atención. Se puso gruñón por una cosita, y su mamá señaló con cariño: 'No estás enojado, amor — estás agotado.' Tenía razón. En vez de forzarse, Paulo tomó una ducha tibia, bebió agua y se acostó temprano. En la mañana, su batería estaba llena otra vez. Ese sentimiento pesado, de batería baja, es cansancio.",
    },
  },
},

{
  id: "hopeful",
  emoji: "🌈",
  translations: {
    en: {
      name: "Hopeful",
      definition: "Believing that good things can still happen.",
      story: "Paulo planted a bean seed in a cup of cotton for a school project. For four days, nothing happened, and some kids said his seed was probably dead. But every morning, Paulo added a little water, placed the cup near the window, and imagined the tiny plant getting ready under the surface. On the fifth day, a small green curve appeared, pushing up like a sleepy arm stretching. His chest filled with a light, floating feeling, like a balloon gently rising. He learned that hope is not just waiting — it's taking care of things while you wait. That light, rising, tomorrow-can-be-good feeling is hopeful.",
    },
    pt: {
      name: "Esperançoso",
      definition: "Acreditar que coisas boas ainda podem acontecer.",
      story: "Paulo plantou uma semente de feijão num copo com algodão para um trabalho da escola. Por quatro dias, nada aconteceu, e algumas crianças disseram que a semente devia estar morta. Mas toda manhã Paulo colocava um pouco de água, deixava o copo perto da janela e imaginava a plantinha se preparando ali embaixo. No quinto dia, uma curvinha verde apareceu, empurrando para cima como um braço sonolento se espreguiçando. O peito dele se encheu de um sentimento leve, flutuante, como um balão subindo devagar. Ele aprendeu que esperança não é só esperar — é cuidar das coisas enquanto se espera. Esse sentimento leve, que sobe, é esperança.",
    },
    es: {
      name: "Esperanzado",
      definition: "Creer que cosas buenas todavía pueden pasar.",
      story: "Paulo plantó una semilla de frijol en un vaso con algodón para un proyecto escolar. Durante cuatro días no pasó nada, y algunos niños dijeron que su semilla seguramente estaba muerta. Pero cada mañana, Paulo agregaba un poco de agua, ponía el vaso cerca de la ventana e imaginaba la plantita preparándose bajo la superficie. Al quinto día, apareció una pequeña curva verde, empujando hacia arriba como un brazo dormido estirándose. Su pecho se llenó de un sentimiento ligero y flotante, como un globo subiendo despacio. Aprendió que la esperanza no es solo esperar — es cuidar las cosas mientras esperas. Ese sentimiento ligero es esperanza.",
    },
  },
},

{
  id: "relieved",
  emoji: "😮‍💨",
  translations: {
    en: {
      name: "Relieved",
      definition: "Feeling better after a worry goes away.",
      story: "Paulo couldn't find his dog Biscoito anywhere in the house. He checked under the beds, behind the couch, in the yard — nothing. His heart squeezed tighter with every empty room, and terrible thoughts started knocking on his mind's door. Then he heard a soft snore coming from the laundry basket: Biscoito had made a nest inside the warm towels. All the worry left Paulo's body in one long breath, whoooosh, like air leaving a balloon. His shoulders came down, his heart slowed, and he laughed and hugged his silly dog. That whooshing, worry-melting, everything-is-okay feeling is relieved.",
    },
    pt: {
      name: "Aliviado",
      definition: "Sentir-se melhor depois que uma preocupação vai embora.",
      story: "Paulo não achava o cachorro Biscoito em lugar nenhum da casa. Procurou embaixo das camas, atrás do sofá, no quintal — nada. O coração apertava mais a cada cômodo vazio, e pensamentos horríveis começaram a bater na porta da mente. Então ele ouviu um ronco baixinho vindo do cesto de roupas: Biscoito tinha feito um ninho dentro das toalhas quentinhas. Toda a preocupação saiu do corpo do Paulo num sopro comprido, fiuuuu, como o ar saindo de um balão. Os ombros desceram, o coração desacelerou, e ele riu e abraçou o cachorro bobo. Esse sentimento de sopro, quando a preocupação derrete, é alívio.",
    },
    es: {
      name: "Aliviado",
      definition: "Sentirse mejor cuando una preocupación desaparece.",
      story: "Paulo no encontraba a su perro Biscoito en ninguna parte de la casa. Buscó bajo las camas, detrás del sofá, en el patio — nada. Su corazón se apretaba más con cada cuarto vacío, y pensamientos terribles empezaron a tocar la puerta de su mente. Entonces oyó un ronquido suave desde el canasto de la ropa: Biscoito había hecho un nido entre las toallas tibias. Toda la preocupación salió de su cuerpo en un largo suspiro, fiuuuu, como el aire saliendo de un globo. Sus hombros bajaron, su corazón se calmó, y se rió y abrazó a su perro tonto. Ese sentimiento de suspiro largo es alivio.",
    },
  },
},

{
  id: "frustrated",
  emoji: "😤",
  translations: {
    en: {
      name: "Frustrated",
      definition: "Feeling annoyed when something is hard and doesn't work.",
      story: "Paulo was building a LEGO spaceship, and the same wing fell off for the seventh time. Seven! He felt steam building inside like a pressure cooker, and he wanted to throw the whole ship against the wall. His jaw was tight and his hands squeezed the pieces too hard. But he remembered his plan for moments like this: stop, step away, drink water, come back. He walked around the room once, shook out his hands, and looked at the wing with fresh eyes. Then he saw it — one connector was in the wrong hole. Click. Fixed. That steamy, pressure-cooker feeling when things keep failing is frustrated — and a short pause is its best medicine.",
    },
    pt: {
      name: "Frustrado",
      definition: "Sentir-se irritado quando algo é difícil e não dá certo.",
      story: "Paulo estava montando uma nave de LEGO, e a mesma asa caiu pela sétima vez. Sétima! Ele sentiu um vapor crescendo por dentro como uma panela de pressão, e quis jogar a nave inteira na parede. O maxilar travou e as mãos apertaram as peças com força demais. Mas ele lembrou do plano para momentos assim: parar, se afastar, beber água, voltar. Deu uma volta pelo quarto, sacudiu as mãos e olhou a asa com olhos descansados. Então ele viu — um encaixe estava no buraco errado. Clique. Consertado. Esse sentimento de panela de pressão quando as coisas não dão certo é frustração — e uma pequena pausa é o melhor remédio.",
    },
    es: {
      name: "Frustrado",
      definition: "Sentirse molesto cuando algo es difícil y no funciona.",
      story: "Paulo estaba armando una nave de LEGO, y la misma ala se cayó por séptima vez. ¡Séptima! Sintió vapor creciendo por dentro como una olla a presión, y quiso lanzar toda la nave contra la pared. Su mandíbula estaba tensa y sus manos apretaban las piezas demasiado fuerte. Pero recordó su plan para momentos así: parar, alejarse, tomar agua, volver. Dio una vuelta por el cuarto, sacudió las manos y miró el ala con ojos frescos. Entonces lo vio — un conector estaba en el agujero equivocado. Clic. Arreglado. Ese sentimiento de olla a presión es frustración — y una pausa corta es su mejor medicina.",
    },
  },
},

{
  id: "safe",
  emoji: "🛡️",
  translations: {
    en: {
      name: "Safe",
      definition: "Feeling protected, with nothing to fear right now.",
      story: "A big storm rattled the windows that night, but Paulo was wrapped in his favorite blanket on the couch, snuggled right up against his mom, with hot cocoa steaming in his hands. Outside, the wind howled and the rain drummed hard, but inside, the lamp glowed yellow and warm. Paulo noticed something interesting: the storm was still scary, but his body wasn't scared. His muscles were soft, his breathing was easy, and his mind knew, without any doubt, that the person beside him would take care of him. The thunder became just a sound, like a giant clearing his throat far away. That protected, soft-muscles, nothing-can-hurt-me-here feeling is safe.",
    },
    pt: {
      name: "Seguro",
      definition: "Sentir-se protegido, sem nada a temer agora.",
      story: "Uma tempestade grande sacudia as janelas naquela noite, mas Paulo estava enrolado na coberta favorita no sofá, encostadinho na mãe, com um chocolate quente soltando fumaça nas mãos. Lá fora, o vento uivava e a chuva batucava forte, mas dentro, o abajur brilhava amarelo e quente. Paulo percebeu algo interessante: a tempestade continuava assustadora, mas o corpo dele não estava assustado. Os músculos estavam macios, a respiração leve, e a mente sabia, sem dúvida nenhuma, que a pessoa ao lado cuidaria dele. O trovão virou só um som, como um gigante limpando a garganta bem longe. Esse sentimento protegido, de músculos macios, é segurança.",
    },
    es: {
      name: "Seguro",
      definition: "Sentirse protegido, sin nada que temer ahora.",
      story: "Una gran tormenta sacudía las ventanas esa noche, pero Paulo estaba envuelto en su manta favorita en el sofá, muy pegadito a su mamá, con un chocolate caliente humeando en sus manos. Afuera, el viento aullaba y la lluvia tamborileaba fuerte, pero adentro, la lámpara brillaba amarilla y cálida. Paulo notó algo interesante: la tormenta seguía dando miedo, pero su cuerpo no tenía miedo. Sus músculos estaban blandos, su respiración era fácil, y su mente sabía, sin ninguna duda, que la persona a su lado lo cuidaría. El trueno se volvió solo un sonido lejano. Ese sentimiento protegido es seguridad.",
    },
  },
},

{
  id: "confident",
  emoji: "💪",
  translations: {
    en: {
      name: "Confident",
      definition: "Believing in yourself and in what you can do.",
      story: "The math test had a big scary problem at the end, the kind that used to make Paulo's mind go blank. But this time was different: he had practiced division every day for three weeks, eight exercises at a time. He read the problem slowly, and instead of panic, he felt his feet firmly on the floor and a steady voice inside saying, 'You have solved harder ones than this.' His pencil moved without shaking. He checked his answer, took a breath, and smiled a little. Confidence, he realized, isn't magic — it's built brick by brick with practice. That steady-feet, I-know-I-can feeling is confident.",
    },
    pt: {
      name: "Confiante",
      definition: "Acreditar em você mesmo e no que você pode fazer.",
      story: "A prova de matemática tinha um problema grande e assustador no final, do tipo que antes deixava a mente do Paulo em branco. Mas dessa vez foi diferente: ele tinha treinado divisão todos os dias por três semanas, oito exercícios de cada vez. Leu o problema devagar e, em vez de pânico, sentiu os pés firmes no chão e uma voz estável por dentro dizendo: 'Você já resolveu mais difíceis que esse.' O lápis se moveu sem tremer. Ele conferiu a resposta, respirou e sorriu de leve. Confiança, ele percebeu, não é mágica — é construída tijolo por tijolo com treino. Esse sentimento de pés firmes, de 'eu sei que consigo', é confiança.",
    },
    es: {
      name: "Confiado",
      definition: "Creer en ti mismo y en lo que puedes hacer.",
      story: "La prueba de matemáticas tenía un problema grande y aterrador al final, de esos que antes dejaban la mente de Paulo en blanco. Pero esta vez fue diferente: había practicado división todos los días durante tres semanas, ocho ejercicios a la vez. Leyó el problema despacio y, en vez de pánico, sintió sus pies firmes en el piso y una voz estable por dentro diciendo: 'Ya resolviste otros más difíciles que este.' Su lápiz se movió sin temblar. Revisó su respuesta, respiró y sonrió un poco. La confianza, se dio cuenta, no es magia — se construye ladrillo a ladrillo con práctica. Ese sentimiento de pies firmes es confianza.",
    },
  },
},

{
  id: "self_control",
  emoji: "🧘",
  translations: {
    en: {
      name: "Self-control",
      definition: "The power to pause and choose your action, instead of letting the impulse choose for you.",
      story: "Paulo's little cousin grabbed his controller in the middle of a game and made him lose the level he had almost beaten. A hot wave rose in Paulo's chest, and his first impulse shouted, 'Yank it back and yell!' But Paulo had been training an invisible muscle called self-control. He paused — just three seconds — breathed in through his nose, and imagined a traffic light turning yellow. In that tiny pause, a better choice appeared: he said, 'Hey, wait for your turn, I'll show you how to play after this level.' Nobody cried, nothing broke, and the game continued. Self-control is not never feeling the wave; it's surfing it. The pause between the impulse and the action — that is self-control.",
    },
    pt: {
      name: "Autocontrole",
      definition: "O poder de pausar e escolher sua ação, em vez de deixar o impulso escolher por você.",
      story: "O priminho do Paulo agarrou o controle no meio do jogo e fez ele perder a fase que estava quase vencendo. Uma onda quente subiu no peito do Paulo, e o primeiro impulso gritou: 'Puxa de volta e grita!' Mas Paulo vinha treinando um músculo invisível chamado autocontrole. Ele pausou — só três segundos —, puxou o ar pelo nariz e imaginou um semáforo ficando amarelo. Naquela pequena pausa, uma escolha melhor apareceu: ele disse: 'Ei, espera a sua vez, eu te ensino a jogar depois dessa fase.' Ninguém chorou, nada quebrou, e o jogo continuou. Autocontrole não é nunca sentir a onda; é surfar nela. A pausa entre o impulso e a ação — isso é autocontrole.",
    },
    es: {
      name: "Autocontrol",
      definition: "El poder de pausar y elegir tu acción, en vez de dejar que el impulso elija por ti.",
      story: "El primito de Paulo agarró su control en medio del juego y le hizo perder el nivel que casi había ganado. Una ola caliente subió al pecho de Paulo, y su primer impulso gritó: '¡Quítaselo y grita!' Pero Paulo venía entrenando un músculo invisible llamado autocontrol. Hizo una pausa — solo tres segundos —, respiró por la nariz e imaginó un semáforo poniéndose amarillo. En esa pequeña pausa apareció una mejor opción: dijo: 'Oye, espera tu turno, te enseño a jugar después de este nivel.' Nadie lloró, nada se rompió, y el juego siguió. El autocontrol no es nunca sentir la ola; es surfearla. La pausa entre el impulso y la acción — eso es autocontrol.",
    },
  },
},

{
  id: "discipline",
  emoji: "📅",
  translations: {
    en: {
      name: "Discipline",
      definition: "Doing what you planned even on days you don't feel like it.",
      story: "Paulo decided he wanted to get really good at math, so he made a simple plan: eight exercises every day, right after his snack. The first days were easy because he was excited. But on day six, it was sunny outside, his friends were playing, and his brain whispered, 'Skip today, one day won't matter.' Paulo learned that this whisper is exactly where discipline lives. He told himself, 'First the eight exercises, then I play,' and he did them — not perfectly, but completely. Weeks later, problems that used to look like monsters looked like puzzles. Motivation starts things, but discipline finishes them. Doing it anyway, especially on the whisper days — that is discipline.",
    },
    pt: {
      name: "Disciplina",
      definition: "Fazer o que você planejou mesmo nos dias em que não está com vontade.",
      story: "Paulo decidiu que queria ficar muito bom em matemática, então fez um plano simples: oito exercícios por dia, logo depois do lanche. Os primeiros dias foram fáceis porque ele estava animado. Mas no sexto dia, fazia sol lá fora, os amigos estavam brincando, e o cérebro sussurrou: 'Pula hoje, um dia não faz diferença.' Paulo aprendeu que é exatamente nesse sussurro que mora a disciplina. Ele disse para si mesmo: 'Primeiro os oito exercícios, depois eu brinco', e fez — não perfeitamente, mas completamente. Semanas depois, problemas que pareciam monstros viraram quebra-cabeças. A motivação começa as coisas, mas a disciplina termina. Fazer mesmo assim, principalmente nos dias do sussurro — isso é disciplina.",
    },
    es: {
      name: "Disciplina",
      definition: "Hacer lo que planeaste incluso los días en que no tienes ganas.",
      story: "Paulo decidió que quería ser muy bueno en matemáticas, así que hizo un plan simple: ocho ejercicios cada día, justo después de la merienda. Los primeros días fueron fáciles porque estaba emocionado. Pero el día seis, había sol afuera, sus amigos jugaban, y su cerebro susurró: 'Sáltate hoy, un día no importa.' Paulo aprendió que en ese susurro vive exactamente la disciplina. Se dijo: 'Primero los ocho ejercicios, después juego', y los hizo — no perfectamente, pero completamente. Semanas después, los problemas que parecían monstruos parecían rompecabezas. La motivación empieza las cosas, pero la disciplina las termina. Hacerlo de todos modos — eso es disciplina.",
    },
  },
},

{
  id: "abstract_thought",
  emoji: "💭",
  translations: {
    en: {
      name: "Abstract thought",
      definition: "Thinking about ideas you cannot see or touch, like numbers, time, or fairness.",
      story: "Paulo's teacher asked a strange question: 'Can you show me the number three?' Paulo held up three fingers, but the teacher smiled: 'Those are fingers. Where is the THREE itself?' Paulo's mind did a somersault. He realized that 'three' isn't a thing you can grab — it's an idea that lives in three apples, three stars, three claps, all at once. That night, he found more invisible ideas everywhere: 'tomorrow' can't be photographed, 'fairness' can't be put in a box, and half of a pizza is an idea before it's a slice. Thinking about invisible ideas like these — playing with them, comparing them, building with them — is abstract thought, one of the most powerful tools a mind can have.",
    },
    pt: {
      name: "Pensamento abstrato",
      definition: "Pensar sobre ideias que você não pode ver nem tocar, como números, tempo ou justiça.",
      story: "A professora do Paulo fez uma pergunta estranha: 'Você pode me mostrar o número três?' Paulo levantou três dedos, mas a professora sorriu: 'Isso são dedos. Onde está o TRÊS?' A mente do Paulo deu uma cambalhota. Ele percebeu que 'três' não é uma coisa que se pega — é uma ideia que mora em três maçãs, três estrelas, três palmas, tudo ao mesmo tempo. Naquela noite, encontrou mais ideias invisíveis em todo lugar: 'amanhã' não pode ser fotografado, 'justiça' não cabe numa caixa, e metade de uma pizza é uma ideia antes de ser uma fatia. Pensar sobre ideias invisíveis como essas — brincar com elas, compará-las, construir com elas — é o pensamento abstrato, uma das ferramentas mais poderosas de uma mente.",
    },
    es: {
      name: "Pensamiento abstracto",
      definition: "Pensar en ideas que no puedes ver ni tocar, como los números, el tiempo o la justicia.",
      story: "La maestra de Paulo hizo una pregunta extraña: '¿Puedes mostrarme el número tres?' Paulo levantó tres dedos, pero la maestra sonrió: 'Esos son dedos. ¿Dónde está el TRES?' La mente de Paulo dio una voltereta. Se dio cuenta de que 'tres' no es una cosa que se agarra — es una idea que vive en tres manzanas, tres estrellas, tres aplausos, todo a la vez. Esa noche, encontró más ideas invisibles en todas partes: 'mañana' no se puede fotografiar, 'la justicia' no cabe en una caja, y la mitad de una pizza es una idea antes de ser una porción. Pensar en ideas invisibles como estas — jugar con ellas, compararlas, construir con ellas — es el pensamiento abstracto, una de las herramientas más poderosas de una mente.",
    },
  },
},

{
  id: "focus",
  emoji: "🎯",
  translations: {
    en: {
      name: "Focus ability",
      definition: "Pointing all your attention at one thing, like a flashlight beam.",
      story: "Paulo sat down to solve his eight math exercises, but his attention kept escaping like a puppy without a leash: the TV in the other room, a bird outside, an itch, a memory of a video. His dad taught him to think of attention as a flashlight: 'You can't make the room smaller, but you can point the light.' Together they built a focus cave: phone in another room, table cleared, a timer set for fifteen minutes, and one single exercise in front of him at a time. Each time the puppy ran away, Paulo gently brought it back to the page — no scolding, just returning. By the fourth return, something clicked: the world went quiet and the problem opened up. Training that flashlight, return after return, is the ability to focus.",
    },
    pt: {
      name: "Capacidade de foco",
      definition: "Apontar toda a sua atenção para uma coisa só, como o facho de uma lanterna.",
      story: "Paulo sentou para resolver os oito exercícios de matemática, mas a atenção fugia como um filhote sem coleira: a TV na outra sala, um passarinho lá fora, uma coceira, a lembrança de um vídeo. O pai ensinou a pensar na atenção como uma lanterna: 'Você não pode diminuir o quarto, mas pode apontar a luz.' Juntos, montaram uma caverna do foco: celular em outro cômodo, mesa limpa, um cronômetro de quinze minutos e um único exercício na frente por vez. Cada vez que o filhote fugia, Paulo trazia ele de volta para a página com calma — sem bronca, só voltando. Na quarta volta, algo clicou: o mundo ficou silencioso e o problema se abriu. Treinar essa lanterna, volta após volta, é a capacidade de foco.",
    },
    es: {
      name: "Capacidad de enfoque",
      definition: "Apuntar toda tu atención a una sola cosa, como el haz de una linterna.",
      story: "Paulo se sentó a resolver sus ocho ejercicios de matemáticas, pero su atención se escapaba como un cachorro sin correa: la tele en el otro cuarto, un pájaro afuera, una picazón, el recuerdo de un video. Su papá le enseñó a pensar en la atención como una linterna: 'No puedes hacer el cuarto más pequeño, pero puedes apuntar la luz.' Juntos armaron una cueva del enfoque: teléfono en otro cuarto, mesa despejada, un cronómetro de quince minutos y un solo ejercicio enfrente a la vez. Cada vez que el cachorro se escapaba, Paulo lo traía de vuelta a la página con calma — sin regaños, solo regresando. En el cuarto regreso, algo hizo clic: el mundo se silenció y el problema se abrió. Entrenar esa linterna, regreso tras regreso, es la capacidad de enfoque.",
    },
  },
},

{
  id: "forward_vision",
  emoji: "🔭",
  translations: {
    en: {
      name: "Forward-looking vision",
      definition: "Imagining your future and making small choices today that help the Paulo of tomorrow.",
      story: "Paulo received his allowance and stood in front of the store window: a bag of candy today, or save for the telescope he dreamed about? He closed his eyes and did something powerful — he traveled in time with his imagination. He pictured Future Paulo, three months ahead, on the roof at night, pointing the telescope at the Moon's craters. Then he pictured the candy: delicious for ten minutes, gone by dinner. He chose to save, and wrote 'telescope fund' on a jar. Every week, the jar grew, and Future Paulo felt closer. Seeing tomorrow clearly enough to help it — planting seeds today for trees you'll climb later — that is forward-looking vision.",
    },
    pt: {
      name: "Visão de futuro",
      definition: "Imaginar o seu futuro e fazer pequenas escolhas hoje que ajudam o Paulo de amanhã.",
      story: "Paulo recebeu a mesada e parou na frente da vitrine: um pacote de doces hoje, ou economizar para o telescópio dos sonhos? Ele fechou os olhos e fez algo poderoso — viajou no tempo com a imaginação. Imaginou o Paulo do Futuro, três meses à frente, no telhado à noite, apontando o telescópio para as crateras da Lua. Depois imaginou os doces: deliciosos por dez minutos, acabados antes do jantar. Ele escolheu economizar e escreveu 'fundo do telescópio' num pote. A cada semana, o pote crescia, e o Paulo do Futuro parecia mais perto. Enxergar o amanhã com clareza suficiente para ajudá-lo — plantar sementes hoje para as árvores que você vai subir depois — isso é visão de futuro.",
    },
    es: {
      name: "Visión de futuro",
      definition: "Imaginar tu futuro y tomar pequeñas decisiones hoy que ayuden al Paulo de mañana.",
      story: "Paulo recibió su mesada y se paró frente a la vidriera: ¿una bolsa de dulces hoy, o ahorrar para el telescopio que soñaba? Cerró los ojos e hizo algo poderoso — viajó en el tiempo con su imaginación. Se imaginó al Paulo del Futuro, tres meses adelante, en el techo de noche, apuntando el telescopio a los cráteres de la Luna. Luego imaginó los dulces: deliciosos por diez minutos, terminados antes de la cena. Eligió ahorrar y escribió 'fondo del telescopio' en un frasco. Cada semana, el frasco crecía, y el Paulo del Futuro se sentía más cerca. Ver el mañana con suficiente claridad para ayudarlo — plantar semillas hoy para los árboles que treparás después — eso es visión de futuro.",
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
clearHistoryBtn.addEventListener("click", async () => {
  const ask = (typeof PauloUI !== "undefined")
    ? PauloUI.confirm("Clear all saved feelings? This cannot be undone.",
        { title: "Clear history", okText: "Clear", cancelText: "Keep" })
    : Promise.resolve(window.confirm("Clear all saved feelings? This cannot be undone."));
  const ok = await ask;
  if (!ok) return;
  localStorage.removeItem(FEELING_HISTORY_KEY);
  renderHistory();
  if (typeof PauloUI !== "undefined") PauloUI.toast("History cleared");
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
    if (typeof PauloUI !== "undefined") PauloUI.alert("Audio narration is not supported in this browser.");
    else window.alert("Audio narration is not supported in this browser.");
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