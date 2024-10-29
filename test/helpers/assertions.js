export class Assertions {
  static async expectElementToHaveText(element, text) {
    await element.waitForDisplayed();
    await expect(element).toHaveText(text);
  };

  static async expectElementAttributeToEqual(element, attr, text) {
    await element.waitForDisplayed();
    await expect(await element.getAttribute(attr)).toEqual(text);
  };
}