import OpenAI from "openai";

// This file is me learning how to use OpenAPI
//TODO: Need Figure out how to get user input in TS and then ask GPT the user input 
//TODO: Need to figure out how to use this inside reccomender.tsx

const openai = new OpenAI();

const questions = ["What is color?", "What is a Dog?", "What is a cat?"]

async function main() {

    const stream = await openai.chat.completions.create({
        messages: [{ role: "user", content: `${questions[1]}` }],
        model: "gpt-3.5-turbo",
        stream: true,
    })


    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

main();