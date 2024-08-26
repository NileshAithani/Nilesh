import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from a .env file

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable for API key
});

const audioFunction = async () => {
  console.log("Starting audio transcription...", process.env.OPENAI_API_KEY);
  try {
    // Create a readable stream from the audio file
    const audioStream = fs.createReadStream("demoaudio.mp3");

    // Make the API call to transcribe the audio
    const transcription = await openai.audio.transcriptions.create({
      file: audioStream,
      model: "whisper-1", // Correcting the model name to lowercase
    });

    console.log(transcription);
  } catch (error) {
    console.error("Error during transcription:", error.message);
  }
};

export { audioFunction };
