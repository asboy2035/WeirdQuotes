import {quotes} from "./quotes.js";
import {Quote} from "interfaces"
const isHtml: boolean = true // Make false to run without DOM
let lastQuote: number

if (isHtml) {
  document.querySelector("#reloadButton").addEventListener("click", () => {
    loadQuote(quotes);
  });
}

export function loadQuote(quotesSet: Quote[]) {
  // Get quote
  const chosenQuoteIndex = getSafeRandomIndex(quotesSet.length, lastQuote)
  const chosenQuote = quotesSet[chosenQuoteIndex]
  lastQuote = chosenQuoteIndex
  console.table(chosenQuote)

  // Get data and load to DOM
  loadToDOM("quote", chosenQuote.quoteText)
  loadToDOM("author", chosenQuote.author)
  loadToDOM("year", chosenQuote.year)
}

function getSafeRandomIndex(
  max: number,
  avoid: number
): number {
  let index = Math.floor(Math.random() * max);
  // If the random index is the one to avoid, increment it (and wrap around if needed)
  if (index === avoid) {
    index = (index + 1) % max;
  }
  return index;
}

function loadToDOM(
  id: string,
  value: any
) {
  if (isHtml) {
    const element = document.getElementById(id)
    if (element) {
      element.innerText = value.toString()
    }
  }
}

loadQuote(quotes)