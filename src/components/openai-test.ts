import OpenAI from "openai";

// This file is me learning how to use OpenAPI
//TODO: Need Figure out how to get user input in TS and then ask GPT the user input
//TODO: Need to figure out how to use this inside reccomender.tsx

const openai = new OpenAI();

async function main() {

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "Tell me a joke please?" }],
        model: "gpt-3.5-turbo",
    })

    console.log(completion.choices[0])
}

main();