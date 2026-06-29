
const quoteBtn = document.getElementById("quoteBtn");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const meaningEl = document.getElementById("meaning");

quoteBtn.addEventListener("click", getQuoteAndMeaning);

async function getQuoteAndMeaning() {
    try {
        quoteEl.textContent = "Loading quote...";
        authorEl.textContent = "";
        meaningEl.textContent = "Analyzing meaning...";

        const quoteResponse = await fetch(
            "https://api.api-ninjas.com/v1/quotes",
            {
                headers: {
                    "X-Api-Key": "xsKy9wjhki5V5gnH06hAX5z8Q1IG5jDoFOLGLnUS"
                }
            }
        );

        const quoteData = await quoteResponse.json();

        const quote = quoteData[0].quote;
        const author = quoteData[0].author;

        quoteEl.textContent = `"${quote}"`;
        authorEl.textContent = `— ${author}`;

   
        const prompt = `
        Explain the meaning of this quote in simple English:

        "${quote}"

        Keep the explanation under 100 words.
        `;

        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AQ.Ab8RN6K5Mnq8p6kFG0KDU3uA_WfrDjmPxD_sN_wasY__zsrv0w`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const geminiData = await geminiResponse.json();

        const explanation =
            geminiData.candidates[0].content.parts[0].text;

        meaningEl.textContent = explanation;

    } catch (error) {
        console.error(error);
        meaningEl.textContent =
            "Something went wrong. Check your API keys.";
    }
}

