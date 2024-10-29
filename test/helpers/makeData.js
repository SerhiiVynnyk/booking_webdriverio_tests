export class MakeData {
  static getEmail() {
    return `${Math.random().toString(36).slice(2, 8)}qa@ukr.net`;
  }

  static getValidPassword() {
    return `${Math.random().toString(36).slice(2, 10)}P1`;
  }
}