/** Sekcja „Agenci AI”: doświadczenie z Claude Code i modelami językowymi. */
export const aiWork = {
  lead:
    'Z agentami AI pracuję codziennie, głównie w Claude Code. Agent pisze kod, a ja wyznaczam kierunek, pilnuję jakości i przeglądam każdą zmianę.',
  points: [
    {
      title: 'Kilka sesji naraz',
      text: 'Prowadzę równolegle kilka sesji Claude Code, każdą na osobnym worktree. Żeby żadna nie czekała na mnie niezauważona, napisałem widżet, który pokazuje stan każdej sesji, limity konta i zajętość kontekstu.',
    },
    {
      title: 'Własny proces dla agentów',
      text: 'Claudius to mój sposób pracy zapisany jako wtyczka: orkestrator ocenia ryzyko zmiany, rozdziela pracę między podagentów na tańszych i droższych modelach i zleca niezależny przegląd, zanim cokolwiek uzna za skończone.',
    },
    {
      title: 'Modele językowe w praktyce',
      text: 'Dobieram model do zadania, dbam o to, co trafia do kontekstu, i piszę skille, hooki oraz instrukcje, dzięki którym agent działa przewidywalnie w konkretnym repozytorium.',
    },
  ],
};

/** Kroki, przez które przechodzi zmiana w Claudiusie. */
export const flowSteps = [
  { name: 'Zadanie', text: 'opis tego, co ma się zmienić' },
  { name: 'Ocena ryzyka', text: 'drobna poprawka idzie od razu do kodu' },
  { name: 'Kontrakt', text: 'co ma powstać i jak to sprawdzić' },
  { name: 'Podagenci', text: 'implementacja i testy na modelach dobranych do pracy' },
  { name: 'Przegląd', text: 'niezależny, osobno pod kątem poprawności i zgodności' },
  { name: 'Raport', text: 'z historii gita, nie z pamięci agenta' },
];
