# Colour palette generator

Welcome to my first ever Python project! This colour palette generator is a simple web application that generates colour themes and palettes using the OpenAI API (GPT-3.5-turbo).

**[https://colorsapp.link/](https://colorsapp.link/)** (AWS)

![Screenshot1](https://user-images.githubusercontent.com/119585058/275351562-045fa6db-0883-4023-bb92-49bdab6bbc81.png)

![Screenshot2](https://user-images.githubusercontent.com/119585058/275353055-5a62c715-b852-4f84-8911-d883eec58377.png)

![Screenshot3](https://user-images.githubusercontent.com/119585058/275353137-e6e7f6cd-57cc-4494-ba82-18201c0c4823.png)

![Screenshot4](https://user-images.githubusercontent.com/119585058/275353116-643007a6-1722-484e-8b6a-7af066aca2f9.png)

# Technical details

**Backend:** The application's backend is built using Flask, a micro web framework written in Python. It communicates with the OpenAI API to fetch the colour suggestions.

**OpenAI API:** The color generation comes from the GPT-3.5-turbo model by OpenAI.

**Deployment:** The app is hosted using AWS Elastic Beanstalk and Code Pipeline. It was originally hosted on Vercel but ~70% of the API requests timed out due to Vercel's 15s limit, which meant exploring alternative hosting for the app. 

**Other Libraries:** The app also uses libraries such as python-dotenv for environment variable management, and Tailwind CSS for styling and responsive design.

**Future Updates:** I'll adding more functionality and complexity to this app at a later date.
