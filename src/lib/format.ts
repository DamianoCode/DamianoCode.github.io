const dateFormat = new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });

/** Data w formacie „17 września 2026”. */
export const formatDate = (date: Date) => dateFormat.format(date);
