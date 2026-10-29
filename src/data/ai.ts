import type { Locale, Localized } from '../i18n';

interface Offer {
  title: string;
  text: string;
  outcome: string;
  proof: string;
}

/**
 * Sekcja „Agenci AI”: jak pracuję i co z tego mogę wdrożyć w zespole. Każda oferta mówi, co zostaje
 * w zespole po współpracy (`outcome`), i ma dowód z mojej codziennej pracy (`proof`).
 */
const aiWork: Localized<{ lead: string; offers: { repo: Offer; pilot: Offer; review: Offer } }> = {
  pl: {
    lead: 'Z agentami AI pracuję codziennie, głównie w Claude Code. Agent pisze kod, a ja wyznaczam kierunek, pilnuję jakości i przeglądam każdą zmianę. Ten sam sposób pracy mogę ustawić w Twoim zespole.',
    offers: {
      repo: {
        title: 'Claude Code w waszym repozytorium',
        text: 'Konfiguruję Claude Code pod konkretny projekt: instrukcje, gotowe procedury i automatyczne sprawdzenia, dzięki którym agent zna wasze konwencje i działa przewidywalnie. Dobieram model do zadania i pilnuję, co agent dostaje do przeczytania.',
        outcome: 'Konfiguracja zostaje w waszym repozytorium i działa u każdego w zespole.',
        proof: 'Takie instrukcje, procedury i sprawdzenia piszę na co dzień do własnych repozytoriów.',
      },
      pilot: {
        title: 'Pilot na realnym zadaniu',
        text: 'Bierzemy jedno zadanie z waszego backlogu i dowozimy je razem z agentami. Zespół widzi cały proces na własnym kodzie, od opisu zadania po przegląd zmian.',
        outcome: 'Zostaje dowiezione zadanie i proces, który zespół zobaczył na własnym kodzie i może powtórzyć.',
        proof: 'Na co dzień prowadzę kilka sesji agenta naraz, każdą na osobnej kopii repozytorium, a mój widżet pokazuje, która czeka na decyzję.',
      },
      review: {
        title: 'Proces z niezależnym przeglądem',
        text: 'Agent nie ocenia sam siebie. Większa zmiana dostaje najpierw spisane wymagania, pracę dzieli kilku agentów na modelach dobranych do zadania, a na końcu wynik sprawdza osobny agent, który go nie pisał.',
        outcome: 'Zostaje proces przeglądu ustawiony w waszym repozytorium, który uruchamiacie bez mnie.',
        proof: 'Tak działa Claudius, moja wtyczka do Claude Code.',
      },
    },
  },
  en: {
    lead: 'I work with AI agents every day, mostly in Claude Code. The agent writes the code, while I set the direction, keep an eye on quality and review every change. I can set up the same way of working in your team.',
    offers: {
      repo: {
        title: 'Claude Code in your repository',
        text: 'I configure Claude Code for a specific project: instructions, ready-made procedures and automatic checks, so the agent knows your conventions and behaves predictably. I pick the model for the task and watch what the agent is given to read.',
        outcome: 'The setup stays in your repository and works for everyone on the team.',
        proof: 'I write instructions, procedures and checks like these every day for my own repositories.',
      },
      pilot: {
        title: 'A pilot on a real task',
        text: 'We take one task from your backlog and deliver it together with the agents. The team sees the whole process on its own code, from the task description to the review.',
        outcome: 'You keep a delivered task and a process the team has seen on its own code and can repeat.',
        proof: 'Day to day I run several agent sessions at once, each on its own copy of the repository, and my widget shows which one is waiting for a decision.',
      },
      review: {
        title: 'A process with an independent review',
        text: 'The agent does not grade itself. A bigger change first gets written requirements, several agents on models picked for the job split the work, and at the end a separate agent that did not write it checks the result.',
        outcome: 'You keep a review process set up in your repository that you run without me.',
        proof: 'That is how Claudius, my Claude Code plugin, works.',
      },
    },
  },
};

export const getAiWork = (locale: Locale) => aiWork[locale];

/** Kroki, przez które przechodzi zmiana w Claudiusie. */
const flowSteps: Localized<{ name: string; text: string }[]> = {
  pl: [
    { name: 'Zadanie', text: 'opis tego, co ma się zmienić' },
    { name: 'Ocena ryzyka', text: 'drobna poprawka idzie od razu do kodu' },
    { name: 'Kontrakt', text: 'co ma powstać i jak to sprawdzić' },
    { name: 'Podagenci', text: 'implementacja i testy na modelach dobranych do pracy' },
    { name: 'Przegląd', text: 'niezależny, osobno pod kątem poprawności i zgodności' },
    { name: 'Raport', text: 'z historii gita, nie z pamięci agenta' },
  ],
  en: [
    { name: 'Task', text: 'a description of what should change' },
    { name: 'Risk check', text: 'a small fix goes straight to the code' },
    { name: 'Contract', text: 'what should be built and how to check it' },
    { name: 'Subagents', text: 'implementation and tests on models picked for the job' },
    { name: 'Review', text: 'independent, separately for correctness and for the spec' },
    { name: 'Report', text: 'from git history, not from the agent’s memory' },
  ],
};

export const getFlowSteps = (locale: Locale) => flowSteps[locale];
