## Inspiration
We've all been there. Skipped a few lectures. What's the harm, right? BAMMMM, suddenly you're 4 weeks behind schedule and the world feels like it's going to collapse on you. If only there was a way to condense all this information and learn the key concepts in time!

## What it does
NUSNotes uses a Character Splitter to recursively split pdfs into readable chunks for ChatGPT3.5-Turbo to process bit by bit. Through well-structured prompts, GPT creates a summary of each chunk, as well as questions that students can use in their revision. The summaries are then combined into one comprehensive set of notes, while the questions are combined into a set of comprehensive questions. Users can retrieve these summaries and questions at any time, and can continue to create more and more entries for their revision!

## How we built it
We used the MERN Stack and GPT3.5 API. MongoDB held all the summaries and questions for each module and topic while React hosted the frontend server. Express and Node was used in the backend. 

## Challenges we ran into
We struggled with the storage of the summary text as they tend to get extremely long. ChatGPT's limitations lies in its maximum number of tokens that can be output and input. Careful prompt structuring and management of pdfs helped us overcome these challenges.

## Accomplishments that we're proud of
We are extremely happy to have completed a fully functioning webapp in the short period of time, while also working with GPT3.5, something that is becoming widespread in the world.

## What we learned
This was some of our first experience in full stack development, and all of our first time using the OpenAI API. Surprisingly, OpenAI API was really easy to use!

## What's next for NUSNotes
As the cost of GPT models decreases and maximum input token size and model speed increase, NUSNotes will only get better, faster, smarter and cheaper! We look forward to the day where we can process a pdf with hundreds of pages with ease!

## Getting started
1. go to ./frontend and run `npm install`
2. run `npm run frontend`
3. go to ./backend and run `npm install`
4. Add your OpenAI API key as API_KEY and mongo uri as MONGO_URI in .env file
5. run `npm run backend`

