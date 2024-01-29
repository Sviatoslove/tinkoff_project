const localStorageService = {
  USER: 'user',
  OPER: 'oper',
  COUNT: 'count',
  DATES: 'dates',
  CATEGORIES: 'categories',
  COLORS: 'colors',

  setUser(user: any): void {
    localStorage.setItem(this.USER,  JSON.stringify(user));
  },
  setCount(count: any): void {
    localStorage.setItem(this.COUNT, JSON.stringify(count));
  },
  setOper(oper: any): void {
    localStorage.setItem(this.OPER, JSON.stringify(oper));
  },
  setDates(dates: any): void {
    localStorage.setItem(this.DATES, JSON.stringify(dates));
  },
  setCategories(categories: any): void {
    localStorage.setItem(this.CATEGORIES, JSON.stringify(categories));
  },
  setColors(colors: any): void {
    localStorage.setItem(this.COLORS, JSON.stringify(colors));
  },

  getUser(): any {
    return JSON.parse(localStorage.getItem(this.USER) || 'null')!;
  },
  getCount(): any {
    return JSON.parse(localStorage.getItem(this.COUNT) || 'null')!;
  },
  getOper(): any {
    return JSON.parse(localStorage.getItem(this.OPER) || 'null')!;
  },
  getDates(): any {
    return JSON.parse(localStorage.getItem(this.DATES) || '[]')!;
  },
  getCategories(): any {
    return JSON.parse(localStorage.getItem(this.CATEGORIES) || 'null')!;
  },
  getColors(): any {
    return JSON.parse(localStorage.getItem(this.COLORS) || 'null')!;
  },
};

export default localStorageService;
