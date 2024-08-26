import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from a .env file

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable for API key
});

const test = async () => {
  try {
    console.log("hereeeeeeeeeeeeeee", apiKey);
    // Create transcription request
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream("demoaudio.mp3"), // Make sure the path to your audio file is correct
      model: "whisper-1", // Ensure the model name is correct and you have access to it
    });

    // Output the transcription text
    console.log(transcription.text);
  } catch (error) {
    // Error handling
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error("Error Response Data:", error.response.data);
      console.error("Error Response Status:", error.response.status);
      console.error("Error Response Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error Request Data:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error Message:", error.message);
    }
    console.error("Error Config:", error.config);
  }
};

export { test };
