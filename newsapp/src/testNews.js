// testNews.js

const url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=09a9efc2a56d4a35a636e21863aa0f58";

const test = async () => {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
};

test();
