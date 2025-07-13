import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const model = "gemini-2.5-flash";

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: "Transcreva o audio para português do Brasil. Seja preciso e natural na transcricao. Mantenha a pontuação e a gramática correta e divida o texto em paragrafos quando for necessário. Se o audio for muito longo, divida em paragrafos.",
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  });

  if (!response.text) {
    throw new Error("Não foi possível transcrever o audio");
  }

  return response.text;
}

export async function generateEmbedding(text: string) {
  const response = await gemini.models.embedContent({
    model: "text-embedding-004",
    contents: [{ text }],
    config: {
      taskType: "RETRIEVAL_DOCUMENT",
    },
  });

  if (!response.embeddings?.[0].values) {
    throw new Error("Não foi possível gerar o embedding");
  }

  return response.embeddings[0].values;
}

export async function generateAnswer(
  question: string,
  transcription: string[]
) {
  const context = transcription.join("\n");

  const prompt = `
  Com base no texto fornecido abaixo como contexto, responda de forma clara e precisa em português do Brasil.
  Contexto: ${context}
  Pergunta: ${question}
  Instruções:
  - Use apenas informacoes contidas no contexto para responder a pergunta.
  - Se a resposta nao for encontrada no contexto, responda que não há informações suficientes.
  - Seja objetivo e direto na resposta.
  - Cite trechos relevantes no contexto se apropriado.
  - Se for citar o contexto, utilize o termo "conteudo da aula".
  - Seja educado e respeitoso na resposta.
  `.trim();

  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        text: prompt,
      },
    ],
  });

  if (!response.text) {
    throw new Error("Não foi possível gerar a resposta");
  }

  return response.text;
}
