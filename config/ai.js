// const { OpenAIApi, Configuration } = require('openai');

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// async function generateAnswer(questionText) {
//   try {
//     const response = await openai.createCompletion({
//       model: 'gpt-3.5-turbo-1106',  // Ensure you are using the correct model
//       prompt: questionText,
//       max_tokens: 150,
//     });
//     return response.data.choices[0].text.trim();
//   } catch (e) {
//     console.error('Error generating answer:', e);
//     console.log(e.response)
//     throw new Error('Failed to generate answer');
//   }
// }

// module.exports = { generateAnswer, openai };

// const { OpenAI } = require('langchain');
// const axios = require('axios');

// const getAnswer = async (question) => {
//   try {
//     const openai = new OpenAI({
//       apiKey: process.env.LANGCHAIN_API_KEY,
//       temperature: 0.7
//     });

//     const response = await openai.Completion.create({
//       model: 'text-davinci-002',
//       prompt: question,
//       maxTokens: 100,
//       n: 1,
//       stop: null,
//       temperature: 0.5
//     });

//     const answer = response.choices[0].text.trim();
//     return answer;
//   } catch (error) {
//     console.error('Error fetching answer from OpenAI:', error);
//     throw new Error('Error fetching answer from AI service');
//   }
// };

// module.exports = {
//   getAnswer
// };



const axios = require('axios');

const getAnswer = async (question) => {
  // const ai_service_url = 'https://api.smith.langchain.com'
  const ai_service_url = 'https://api-inference.huggingface.co/models/gpt2'

  console.log("question :- ", question)

  try {
    const response = await axios.post(
      ai_service_url,
      { inputs: question },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const answer = response.data[0].generated_text.trim();

    return answer;
  } catch (e) {
    console.error('Error fetching answer from Hugging Face:', e.message);
    throw new Error('Error fetching answer from AI service');
  }
};

module.exports = { getAnswer };
