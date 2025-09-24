const morphologicalAnalysis = async (str: string) => {
  const response = await fetch("https://jlp.yahooapis.jp/MAService/V2/parse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": `Yahoo AppID: ${process.env.YAHOO_CLIENT_ID}`,
    },
    body: JSON.stringify({
      id: "id",
      jsonrpc: "2.0",
      method: "jlp.maservice.parse",
      params: { q: str }
    })
  })
  if (!response.ok) {
    return {
      error: { message: response.statusText }
    }
  }
  return response.json() as Promise<{
    result: {
      tokens: string[][];
    }
  } | {
    error: {
      message: string;
    }
  }>
}

const preprocessTokens = (tokens: string[][]) => {
  return tokens.filter(token => token[0] !== " ")
}

export const gomamayoCheck = async (str: string): Promise<string> => {
  const response = await morphologicalAnalysis(str);
  console.log("parse response", JSON.stringify(response, null, 2));
  if ("error" in response) {
    return response.error.message || "API error!!";
  }

  const tokens = preprocessTokens(response.result.tokens);

  for (let i = 0; i < tokens.length - 1; i++) {
    const first = tokens[i];
    const second = tokens[i + 1];
    if ([1, 2, 3].some(dim => first[1].slice(-dim) === second[1].slice(0, dim))) {
      return "";
    }
  }
  
  return "投稿内容にはゴママヨを含める必要があります。";
}
