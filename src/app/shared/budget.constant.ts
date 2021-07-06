export interface BudgetItem {
  long: string;
  short: string;
  amount: number;
}

export const BUDGET: BudgetItem[] = [
  {
    long: "Sociale Zekerheid",
    short: "Sociale Zekerheid",
    amount: 97.8,
  },
  {
    long: "Zorg",
    short: "Zorg",
    amount: 86.7,
  },
  {
    long: "Onderwijs, Cultuur en Wetenschap",
    short: "Onderwijs & Cultuur",
    amount: 40.0,
  },
  {
    long: "Gemeentefonds, Provinciefonds en BTW-compensatiefonds",
    short: "Gemeente & Provinciefonds",
    amount: 35.7,
  },
  {
    long: "Buitenlandse Zaken / Internationale Samenwerking",
    short: "Buitenlandse zaken",
    amount: 14.0,
  },
  {
    long: "Justitie en Veiligheid",
    short: "Justitie & Veiligheid",
    amount: 12.6,
  },
  {
    long: "Defensie",
    short: "Defensie",
    amount: 11.2,
  },
  {
    long: "Infrastructuur en Waterstaat",
    short: "Infrastructuur",
    amount: 9.3,
  },
  {
    long: "Rentelasten",
    short: "Rentelasten",
    amount: 3.7,
  },
  {
    long: "Binnenlandse Zaken en Koninkrijksrelaties",
    short: "Binnenlandse zaken",
    amount: 6.1,
  },
  {
    long: "Economische Zaken en Klimaat",
    short: "Economische zaken",
    amount: 6.5,
  },
  {
    long: "Overig",
    short: "Overig",
    amount: 8.1,
  },
  {
    long: "Financiën",
    short: "Financiën",
    amount: 3.1,
  },
  {
    long: "Landbouw, Natuur en Voedselkwaliteit",
    short: "Landbouw & natuur",
    amount: 1.8,
  },
];
