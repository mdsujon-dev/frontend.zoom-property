export default async function inspectBlogSpacing(page) {
  await page.setViewportSize({ width: 640, height: 800 });
  await page.waitForTimeout(300);

  return await page.evaluate(() => {
    const section = [...document.querySelectorAll("section")].find((element) =>
      element.textContent?.includes("Read article"),
    );
    if (!section) return null;

    const bounds = (element) => {
      const rect = element.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom, height: rect.height };
    };

    return {
      section: bounds(section),
      styles: {
        paddingTop: getComputedStyle(section).paddingTop,
        paddingBottom: getComputedStyle(section).paddingBottom,
      },
      lastChild: bounds(section.lastElementChild),
      cards: [...section.querySelectorAll("article")].map(bounds),
      items: [...section.lastElementChild.children].map(bounds),
    };
  });
}
