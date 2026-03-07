const keys = [
    process.env.GEMINI_KEY_1,
    process.env.GEMINI_KEY_2,
    process.env.GEMINI_KEY_3,
    process.env.GEMINI_KEY_4,
    process.env.GEMINI_KEY_5,
    process.env.GEMINI_KEY_6,
    process.env.GEMINI_KEY_7,
    process.env.GEMINI_KEY_8,
    process.env.GEMINI_KEY_9,
    process.env.GEMINI_KEY_10
];

let index = 0;
function getNextGeminiKey(){
    const key = keys[index];
    index = (index+1)%keys.length;
    return key;
}

module.exports = { getNextGeminiKey };
