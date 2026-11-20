/* =====================================================================
   DÉBUT COMMUNITY — CONTENT & ASSET CONFIG
   ---------------------------------------------------------------------
   Everything editable lives here: links, QR code, photos, copy.
   Paths are relative to index.html. After editing, just reload the page.
   Copy is in Russian except the "Who's in the room?" speaking task and
   DÉBUT format names (Speaking Clubs, English Rooms, Speaking Trainer…).
   ===================================================================== */

window.DEBUT = {

  /* ---------- JOIN ---------------------------------------------------
     How people join: the manager's Telegram. Used by the button in
     section 10 (membership) and on the final screen. Opens in a new tab.
     (The payment bot is paused, so no QR code is shown for now.)       */
  join: {
    url: 'https://t.me/debut_community',
    handle: '@debut_community',
    label: 'Присоединиться к DÉBUT',
  },

  price: { amount: '1 590', currency: '₽', period: 'месяц' },

  /* ---------- LOGO --------------------------------------------------- */
  logo: {
    video: 'assets/logo/debut-fluffy.webm?v=3',   // transparent, Chrome/Edge/Firefox
    still: 'assets/logo/debut-fluffy.webp?v=3',   // transparent still (Safari & fallback)
    small: 'assets/logo/debut-fluffy-sm.webp?v=3',
    club:  'assets/club/club_logo.webp',      // "Closed Community Club" lockup
    mascot: 'assets/root/debutik-main.webp',
  },

  /* ---------- SECTIONS (navigation order; numbers are generated) ----- */
  sections: [
    { id: 'hero',     label: 'Добро пожаловать' },
    { id: 'room',     label: "Who's in the room?" },
    { id: 'founders', label: 'Основательницы' },
    { id: 'team',     label: 'Команда' },
    { id: 'created',  label: 'Что мы уже сделали' },
    { id: 'clubs',    label: 'Как устроены Speaking Clubs' },
    { id: 'reviews',  label: 'Отзывы участников' },
    { id: 'inside',   label: 'Внутри Closed Club' },
    { id: 'weeks',    label: 'Первые две недели' },
    { id: 'for',      label: 'Кому подойдёт' },
    { id: 'join',     label: 'Участие' },
    { id: 'next',     label: 'Что дальше' },
    { id: 'qa',       label: 'Вопросы' },
  ],

  /* ---------- UI LABELS ---------------------------------------------- */
  ui: {
    openSite: 'Открыть сайт',
    openImage: 'Открыть',
    host: 'Ведущая',
    planned: 'В планах',
  },

  /* ---------- 00 HERO ------------------------------------------------ */
  hero: {
    title: 'Добро пожаловать в DÉBUT.',
    welcome: 'Добро пожаловать в',
    lead: 'Немного больше, чем просто английский.',
    small: 'Английский здесь не цель, а способ открывать мир.',
    scroll: 'Листайте вниз',
  },

  /* ---------- 01 WHO'S IN THE ROOM (stays in English: speaking task) - */
  room: {
    title: "Who's in the room?",
    intro: 'Say hello in English — just a few words is perfect.',
    prompts: [
      "What's your name?",
      'Where are you from?',
      'What do you do?',
      'Why are you learning English?',
      'What would you love to do with English?',
    ],
    note: 'No pressure, no grades. Mistakes are welcome here.',
    mascot: 'Hi! I’m Debutik.',
  },

  /* ---------- 02 FOUNDERS -------------------------------------------- */
  founders: {
    title: 'Кто стоит за DÉBUT.',
    names: 'Милена и Тина',
    role: 'Основательницы',
    photos: [
      'assets/team/founders_1.webp',
      'assets/team/founders_2.webp',
      'assets/team/founders_3.webp',
    ],
    photoAlt: 'Милена и Тина, фото',
    text: [
      'Милена и Тина в 2025 году окончили программу «Продюсирование» в РАНХиГС.',
      'Пока учились, они вместе сделали несколько творческих проектов. Один из самых любимых — документальный фильм, который они сняли внутри университетского сообщества.',
      'Теперь они создают DÉBUT Community — место, где сошлись их любовь к языкам, любопытство и тяга к творческим проектам.',
    ],
  },

  /* ---------- 03 TEAM ------------------------------------------------ */
  team: {
    title: 'Знакомьтесь, наша команда.',
    lead: 'Это сообщество живых людей, а не список сотрудников.',
    groups: [
      {
        name: 'Главные ведущие',
        people: [
          { name: 'Сальма', role: 'Ведущая', photo: 'assets/team/salma.webp', facts: [
            'Окончила МГЛУ',
            'Преподаёт английский больше 5 лет',
            'Говорит на четырёх языках',
            'Работала в международной школе и переводчиком на международных выставках',
          ]},
          { name: 'Кристина', alias: 'Крис', role: 'Ведущая', photo: 'assets/team/kris.webp', facts: [
            'Окончила University of London в 2025 году',
            'Учится на международных отношениях в РАНХиГС',
            'Изучает английский больше 16 лет',
            'Есть опыт работы в международной среде',
          ]},
        ],
      },
      {
        name: 'Развитие проекта',
        people: [
          { name: 'Стелла', role: 'Развитие проекта', photo: 'assets/team/stella.webp', facts: [
            'Окончила НИУ ВШЭ по направлению «Межкультурная корпоративная коммуникация»',
            'Говорит на пяти языках',
            'Преподаёт английский больше 5 лет',
          ], teaser: 'Готовит собственную тематическую рубрику для DÉBUT Closed Club — скоро расскажем больше.' },
        ],
      },
      {
        name: 'Комьюнити-менеджеры',
        duo: true,
        duoRole: 'Комьюнити-менеджеры',
        people: [
          { name: 'Сюзанна', role: 'Комьюнити-менеджер', photo: 'assets/team/susanna.webp' },
          { name: 'Жасмин', role: 'Комьюнити-менеджер', photo: 'assets/team/jasmin.webp' },
        ],
        duoText: 'Помогают участникам освоиться в клубе, разобраться, что где находится, и оставаться на связи с сообществом.',
      },
      {
        name: 'Дополнительные форматы',
        people: [
          { name: 'Дана', role: 'Ведущая Speaking Club', photo: 'assets/team/dana.webp', facts: [
            'Лингвистика и межкультурная коммуникация',
            '7 лет преподавания',
            'Ведёт индивидуальные и групповые занятия, тематические встречи на английском',
          ]},
          { name: 'Карина', role: 'Ведущая дебатов', photo: 'assets/team/karina.webp', facts: [
            'Английский и испанский языки',
            'IELTS Academic 7.5',
            'Ведёт дебаты и интеллектуальные дискуссии на английском',
          ]},
        ],
      },
    ],
  },

  /* ---------- 04 WHAT WE'VE CREATED ---------------------------------- */
  created: {
    title: 'Не просто разговоры на английском.',
    lead: 'Вот что уже было в DÉBUT: настоящие встречи, живые люди и интересные разговоры.',
    posters: [
      { src: 'assets/posters/desperate_housewives.webp', alt: 'Анонс Speaking Club: Desperate Housewives' },
      { src: 'assets/posters/ratatouille.webp',          alt: 'Анонс Speaking Club: Ratatouille' },
      { src: 'assets/posters/art_of_being_bored.webp',   alt: 'Анонс Speaking Club: The Art of Being Bored' },
      { src: 'assets/posters/michael.webp',              alt: 'Анонс English Conversation Club: Michael' },
      { src: 'assets/posters/pack_up_and_leave.webp',    alt: 'Анонс Speaking Club: What if I just pack up and leave?' },
    ],
    photosTitle: 'С наших встреч',
    photos: [
      { src: 'assets/vibes/v6.webp', alt: 'Офлайн-встреча сообщества DÉBUT в кафе' },
      { src: 'assets/vibes/v4.webp', alt: 'Онлайн-встреча Speaking Club на экране ноутбука' },
      { src: 'assets/vibes/v1.webp', alt: 'Созвон Speaking Club с участниками' },
      { src: 'assets/vibes/v5.webp', alt: 'Ноутбук с онлайн-встречей в тёмной комнате' },
      { src: 'assets/vibes/v2.webp', alt: 'Созвон Speaking Club с интерактивным сайтом' },
      { src: 'assets/vibes/v3.webp', alt: 'Speaking Club за рабочим столом' },
    ],
  },

  /* ---------- 05 HOW OUR CLUBS WORK ---------------------------------- */
  clubs: {
    title: 'Каждая встреча — маленький новый мир.',
    lead: 'Наши Speaking Clubs строятся вокруг тем, историй, культуры, фильмов и интересных вопросов.',
    ingredients: [
      'Тематическое вступление', 'Полезная лексика', 'Интерактивные задания',
      'Квизы', 'Вопросы для обсуждения', 'Отдельный интерактивный сайт',
    ],
    vocab: [
      { src: 'assets/club/vocab_meeting.webp',  alt: 'Лексика к встрече Ratatouille' },
      { src: 'assets/club/vocab_meetings.webp', alt: 'Полезные выражения для обсуждений' },
    ],
    explain: 'Для каждой встречи мы делаем отдельное интерактивное пространство. Это не просто презентация: на сайте можно разбирать лексику, проходить квизы, работать с материалами и пользоваться им прямо во время обсуждения.',
    sites: [
      {
        title: 'Desperate Housewives',
        url: 'https://tavrizmilena-ship-it.github.io/debut-apps/desperate-housewives-speaking-club.html',
        shots: ['assets/sites/dh_1.webp', 'assets/sites/dh_2.webp', 'assets/sites/dh_3.webp'],
        quiz: 'assets/sites/dh_quiz.webp',
        tag: 'С квизом',
      },
      {
        title: 'Ratatouille',
        url: 'https://claude.ai/artifact/4Em7xwFFQJkqYNJ2v3m9ey',
        shots: ['assets/sites/rat_3.webp', 'assets/sites/rat_1.webp', 'assets/sites/rat_2.webp'],
      },
      {
        title: 'The Art of Being Bored',
        url: 'https://tavrizmilena-ship-it.github.io/debut-apps/art-of-being-bored-2.html',
        shots: ['assets/sites/bored_1.webp', 'assets/sites/bored_2.webp'],
      },
    ],
  },

  /* ---------- 06 REVIEWS (right after the interactive sites) --------- */
  reviews: {
    title: 'Что говорят участники.',
    lead: 'Немного впечатлений от тех, кто уже побывал на наших встречах.',
    alt: 'Скриншот отзыва участника',
    items: [
      'assets/reviews/r_8894.webp', 'assets/reviews/r_9453.webp', 'assets/reviews/r_8895.webp',
      'assets/reviews/r_0477.webp', 'assets/reviews/r_8932.webp', 'assets/reviews/r_8930.webp',
      'assets/reviews/r_9465a.webp', 'assets/reviews/r_8898.webp', 'assets/reviews/r_0478.webp',
      'assets/reviews/r_8896.webp', 'assets/reviews/r_8904.webp', 'assets/reviews/r_9465b.webp',
    ],
  },

  /* ---------- 07 INSIDE THE CLOSED CLUB ------------------------------ */
  inside: {
    eyebrow: 'DÉBUT Closed Club',
    title: 'Пространство для открытий, практики и общения.',
    tabsLabel: 'Что внутри клуба',
    items: [
      {
        key: 'clubs', n: '01', title: 'Speaking Clubs',
        text: 'Четыре гарантированные встречи в месяц, распределённые по разным уровням языка.',
        shots: [{ src: 'assets/vibes/v1.webp', alt: 'Созвон Speaking Club' }],
      },
      {
        key: 'rooms', n: '02', title: 'English Rooms',
        text: 'Общее пространство, разделённое по уровням, где участники общаются на английском. В течение недели команда предлагает небольшие активности: голосовые сообщения, короткие письменные размышления, темы для обсуждения и другие простые задания.',
        note: 'Это практика на каждый день, а не уроки.',
        shots: [
          { src: 'assets/club/chat_levels.webp', alt: 'Чат Début Club с комнатами по уровням' },
          { src: 'assets/club/interactive_examples.webp', alt: 'Активность «Would you rather» в чате клуба' },
        ],
      },
      {
        key: 'test', n: '03', title: 'Language Level Test',
        text: 'Тест, основанный на официальных тестовых материалах.',
        steps: [
          'Вы получаете индивидуальный код доступа',
          'Открываете раздел тестирования на сайте',
          'Проходите тест — это около 20–25 минут',
          'Результат автоматически приходит команде DÉBUT',
          'По желанию можно прислать нам и скриншот результата',
        ],
        note: 'Это тест для определения уровня, а не официальный сертификат и не аккредитованный экзамен.',
        shots: [{ src: 'assets/club/level_test.webp', alt: 'Стартовый экран теста на уровень DÉBUT' }],
      },
      {
        key: 'trainer', n: '04', title: 'Speaking Trainer',
        text: 'Интерактивный тренажёр для самостоятельной разговорной практики.',
        shots: [{ src: 'assets/club/speaking_trainer.webp', alt: 'DÉBUT Speaking Studio: выбор уровня английского' }],
      },
      {
        key: 'materials', n: '05', title: 'Exclusive Materials',
        text: 'Сразу после вступления — приветственная информация. А в течение недели мы публикуем статьи, подкасты и подборки материалов.',
        shots: [
          { src: 'assets/club/podcast_example.webp', alt: 'Пост с выпуском DÉBUT Audio Podcast' },
          { src: 'assets/club/article_example.webp', alt: 'Пост со статьёй для чтения на английском' },
        ],
      },
    ],
  },

  /* ---------- 08 FIRST TWO WEEKS ------------------------------------- */
  weeks: {
    title: 'Первые две недели в DÉBUT.',
    image: 'assets/club/calendar.webp',
    imageAlt: 'Календарь Speaking Clubs на первые две недели',
    levels: 'Speaking Clubs для уровней A2 — C1',
    schedule: [
      { week: 'Неделя 1', items: [
        { day: 'Пт', title: 'What’s Cooking in America?', sub: 'Еда, культура и идентичность', host: 'Сальма' },
        { day: 'Вс', title: 'The Pressure to Have It All Figured Out by 25', sub: 'Личностный рост и ожидания', host: 'Крис' },
      ]},
      { week: 'Неделя 2', items: [
        { day: 'Пт', title: 'Carpe Diem: The Art of Living in the Moment', sub: 'По мотивам «Общества мёртвых поэтов»', host: 'Сальма' },
        { day: 'Вс', title: 'Film Discussion: Fight Club', sub: 'Обсуждаем «Бойцовский клуб»', host: 'Крис' },
      ]},
    ],
    text: 'Встречи и активности на первые две недели уже готовы. Дальше расписание будет регулярно обновляться — и, выбирая новые темы, мы хотим учитывать интересы и пожелания участников.',
    access: 'Доступ открывается сразу после оплаты.',
  },

  /* ---------- 09 WHO IS IT FOR --------------------------------------- */
  forWhom: {
    title: 'Это место для вас?',
    items: [
      'Вы понимаете английский, но вам почти негде говорить на нём вживую.',
      'Вам не хватает языковой среды — и людей, с которыми можно общаться.',
      'Вам интересно обсуждать кино, культуру, психологию, путешествия и многое другое.',
      'Вы хотите открывать новые идеи через английский.',
      'Вы ищете единомышленников и дружелюбное сообщество.',
    ],
    level: 'Минимальный уровень — A2',
    levelNote: 'DÉBUT — не курс для начинающих и не языковая школа. Это место, где можно пользоваться тем английским, который у вас уже есть.',
  },

  /* ---------- 10 MEMBERSHIP ------------------------------------------ */
  join_section: {
    title: 'Ваше место в DÉBUT.',
    cardKind: 'Closed Club · подписка',
    included: [
      'Доступ к DÉBUT Closed Club сразу после оплаты',
      'Четыре Speaking Clubs в месяц',
      'English Rooms по уровням',
      'Language Level Test',
      'Speaking Trainer',
      'Exclusive Materials: статьи и подкасты',
      'Сообщество и тематические активности',
    ],
    howTitle: 'Как присоединиться',
    steps: [
      'Напишите нашему менеджеру в Telegram',
      'Менеджер расскажет о дальнейших шагах',
      'И поможет оформить участие',
      'Получите доступ к закрытому клубу',
    ],
  },

  /* ---------- 11 WHAT'S NEXT ----------------------------------------- */
  next: {
    title: 'Дальше — больше.',
    lead: 'Идеи, над которыми мы работаем. Пока они не входят в подписку, и сроков мы не обещаем.',
    items: [
      { t: 'Новые тематические форматы', d: 'Новые поводы встретиться и поговорить.' },
      { t: 'Подкасты и разговоры с гостями', d: 'Интересные люди — на английском.' },
      { t: 'Офлайн-встречи', d: 'Чтобы увидеться вживую.' },
      { t: 'Новые активности в сообществе', d: 'Такие, каких захотят сами участники.' },
    ],
    footnote: 'Планы на будущее · не входят в текущую подписку',
  },

  /* ---------- 12 Q&A ------------------------------------------------- */
  qa: {
    title: 'Хочешь стать частью DÉBUT?',
    lead: 'Будем рады видеть тебя в нашем Закрытом клубе!',
    text: 'Чтобы присоединиться, напиши нашему менеджеру в Telegram. Он расскажет о дальнейших шагах и поможет оформить участие.',
  },
};
