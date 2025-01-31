const isAtRule = (selector) => selector.indexOf("@") === 0

export const splitSelectors = (selectors) => {
  if (isAtRule(selectors)) return [selectors]

  let result = []
  let parentheses = 0
  let brackets = 0
  let selector = ""

  for (let i = 0, len = selectors.length; i < len; i++) {
    const char = selectors[i]
    if (char === "(") {
      parentheses += 1
    } else if (char === ")") {
      parentheses -= 1
    } else if (char === "[") {
      brackets += 1
    } else if (char === "]") {
      brackets -= 1
    } else if (char === ",") {
      if (!parentheses && !brackets) {
        result.push(selector.trim())
        selector = ""
        continue
      }
    }
    selector += char
  }

  result.push(selector.trim())
  return result
}
