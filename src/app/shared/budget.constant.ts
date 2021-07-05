export interface BudgetLine {
  long: string;
  short: string;
  amount: number;
}

export const BUDGET: BudgetLine[] = [
  { long: "Sociale Zekerheid", short: "Sociale Zekerheid", amount: 81.8 },
  { long: "Zorg", short: "Zorg", amount: 79.7 },
  {
    long: "Onderwijs, Cultuur en Wetenschap",
    short: "Onderwijs & Cultuur",
    amount: 38.5,
  },
  {
    long: "Gemeentefonds, Provinciefonds en Btw-compensatiefonds",
    short: "Gemeente & Provinciefonds",
    amount: 32.5,
  },
  {
    long: "Buitenlandse Zaken / Internationale Samenwerking",
    short: "Buitenlandse zaken",
    amount: 13.2,
  },
  {
    long: "Justitie en Veiligheid",
    short: "Justitie & Veiligheid",
    amount: 11.1,
  },
  { long: "Defensie", short: "Defensie", amount: 10.0 },
  {
    long: "Infrastructuur en Waterstaat",
    short: "Infrastructuur",
    amount: 9.5,
  },
  { long: "Rentelasten", short: "Rentelasten", amount: 5.5 },
  {
    long: "Buitenlandse Zaken en Koninkrijksrelaties",
    short: "Buitenlandse zaken",
    amount: 4.9,
  },
  {
    long: "Economische Zaken en Klimaat",
    short: "Economische zaken",
    amount: 4.0,
  },
  { long: "Overig", short: "Overig", amount: 1.8 },
  { long: "Financiën", short: "Financiën", amount: 1.7 },
  {
    long: "Landbouw, Natuur en Voedselkwaliteit",
    short: "Landbouw & natuur",
    amount: 0.8,
  },
];
