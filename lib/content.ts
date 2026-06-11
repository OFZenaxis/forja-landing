export type ScreenKey =
  | "checklist"
  | "streak"
  | "radar"
  | "loads"
  | "achievements";

export interface Feature {
  id: string;
  screen: ScreenKey;
  /** headline com {b:...} marcando a palavra-chave em bold */
  title: string;
  highlight: string;
  body: string;
  bullets: string[];
}

export const FEATURES: Feature[] = [
  {
    id: "tarefas",
    screen: "checklist",
    title: "Cada dia vira uma",
    highlight: "missão",
    body: "O treino do dia chega em formato de checklist gamificado. Marque cada tarefa, ganhe XP na hora e veja a barra encher até bater a meta diária.",
    bullets: [
      "Tarefas montadas pelo seu personal",
      "XP e recompensas a cada conclusão",
      "Meta do dia visível o tempo todo",
    ],
  },
  {
    id: "streak",
    screen: "streak",
    title: "Mantenha o",
    highlight: "streak",
    body: "Treinou? O fogo continua aceso. Acumule dias seguidos, suba de nível e desbloqueie ligas que renovam a cada temporada para não deixar a constância esfriar.",
    bullets: [
      "Streak de dias consecutivos",
      "Níveis e ligas por temporada",
      "Lembretes para não quebrar a sequência",
    ],
  },
  {
    id: "radar",
    screen: "radar",
    title: "Veja seu",
    highlight: "shape",
    body: "Um radar mostra a evolução em força, resistência, mobilidade, definição e constância. Compare meses e descubra exatamente onde focar a próxima fase.",
    bullets: [
      "Cinco eixos de evolução",
      "Comparativo mês a mês",
      "Leitura clara do que falta evoluir",
    ],
  },
  {
    id: "cargas",
    screen: "loads",
    title: "Registre suas",
    highlight: "cargas",
    body: "Anote séries, repetições e peso em dois toques. O app guarda seu histórico, calcula a progressão e avisa toda vez que você bate um novo recorde pessoal.",
    bullets: [
      "Histórico de cada exercício",
      "Progressão de carga automática",
      "Alerta de novo recorde pessoal",
    ],
  },
  {
    id: "conquistas",
    screen: "achievements",
    title: "Conquiste e compartilhe suas",
    highlight: "medalhas",
    body: "Cada marco vira uma medalha com arte própria. Gere um card bonito da conquista e compartilhe no story para puxar a galera junto na jornada.",
    bullets: [
      "Medalhas por metas e marcos",
      "Card pronto para compartilhar",
      "Ranking entre os alunos do personal",
    ],
  },
];

export interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 10000, suffix: "+", label: "treinos concluídos por semana" },
  { value: 38, suffix: " mil", label: "alunos treinando com constância" },
  { value: 2400, suffix: "+", label: "personais usando o Forja" },
  { value: 4.9, decimals: 1, label: "nota média nas lojas" },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Nunca tinha passado de duas semanas seguidas treinando. Hoje meu streak já tem 96 dias e eu nem penso em quebrar.",
    name: "Mariana Tavares",
    role: "Aluna",
    location: "São Paulo, Brasil",
    date: "Mar 2026",
  },
  {
    quote:
      "Acompanho 40 alunos pelo painel. Ver o radar de cada um evoluindo deixou minhas consultorias muito mais objetivas.",
    name: "Diego Fontana",
    role: "Personal trainer",
    location: "Porto Alegre, Brasil",
    date: "Fev 2026",
  },
  {
    quote:
      "A sensação de marcar a última tarefa do dia e a barra encher vicia no bom sentido. Virou parte da minha rotina.",
    name: "Camila Rezende",
    role: "Aluna",
    location: "Lisboa, Portugal",
    date: "Abr 2026",
  },
  {
    quote:
      "Parei de mandar treino por PDF. Monto tudo no Forja e o aluno chega na academia sabendo exatamente o que fazer.",
    name: "Rafael Nunes",
    role: "Personal trainer",
    location: "Belo Horizonte, Brasil",
    date: "Jan 2026",
  },
  {
    quote:
      "O registro de cargas me mostrou que eu estava estagnada no agachamento havia meses. Em seis semanas subi 14 quilos.",
    name: "Beatriz Salgado",
    role: "Aluna",
    location: "Curitiba, Brasil",
    date: "Mar 2026",
  },
  {
    quote:
      "Compartilhei a medalha de 50 treinos no story e três amigos baixaram o app no mesmo dia. A gente se cobra junto agora.",
    name: "Thiago Andrade",
    role: "Aluno",
    location: "Recife, Brasil",
    date: "Mai 2026",
  },
  {
    quote:
      "As ligas por temporada mudaram o jogo. Meus alunos competem de forma saudável e a evasão caiu bastante.",
    name: "Larissa Pimentel",
    role: "Personal trainer",
    location: "Florianópolis, Brasil",
    date: "Abr 2026",
  },
  {
    quote:
      "Treino cedo, antes do trabalho. O lembrete de streak me tira da cama melhor do que qualquer despertador.",
    name: "Henrique Vasquez",
    role: "Aluno",
    location: "Lisboa, Portugal",
    date: "Fev 2026",
  },
];

export interface Post {
  tag: string;
  title: string;
  excerpt: string;
  readtime: string;
  from: string;
  to: string;
}

export const POSTS: Post[] = [
  {
    tag: "Hábitos",
    title: "Por que streaks funcionam: a ciência da constância",
    excerpt:
      "O que a dopamina e a aversão à perda têm a ver com você não querer quebrar uma sequência de treinos.",
    readtime: "6 min de leitura",
    from: "#7C3AED",
    to: "#FF6B6B",
  },
  {
    tag: "Para personais",
    title: "5 formas de gamificar os treinos dos seus alunos",
    excerpt:
      "Metas, ligas e recompensas que aumentam a adesão sem transformar o acompanhamento numa bagunça.",
    readtime: "8 min de leitura",
    from: "#6D28D9",
    to: "#FFB020",
  },
  {
    tag: "Treino",
    title: "Progressão de carga sem planilha, de verdade",
    excerpt:
      "Como registrar séries e pesos no dia a dia e enxergar a evolução sem depender de uma planilha esquecida.",
    readtime: "5 min de leitura",
    from: "#8B5CF6",
    to: "#7C3AED",
  },
];
