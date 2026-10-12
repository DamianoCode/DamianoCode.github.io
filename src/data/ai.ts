/**
 * Sekcja „Agenci AI”: jak pracuję i co z tego mogę wdrożyć w zespole. Każda oferta mówi, co zostaje
 * w zespole po współpracy (`outcome`), i ma dowód z mojej codziennej pracy (`proof`).
 */
export const aiWork = {
  lead:
    'Z agentami AI pracuję codziennie, głównie w Claude Code. Agent pisze kod, a ja wyznaczam kierunek, pilnuję jakości i przeglądam każdą zmianę. Ten sam sposób pracy mogę ustawić w Twoim zespole.',
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
