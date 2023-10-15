from flask import Flask, render_template, request
import os
import pprint
import re
import openai
from dotenv import load_dotenv
from flask import jsonify


load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__,
            template_folder='templates',
            static_url_path='',
            static_folder='static'
            )


def generate_palette(msg):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a color palette generating assistant that helps users find the perfect color palette for their desired theme or design. Your answers should be grounded in the principles of color theory, ensuring harmonious and complementary color combinations that can evoke specific emotions or perceptions. Consider aspects such as complementary colors, triadic schemes, and analogous colors when providing suggestions. Suggest only one color scheme, palette, or theme per message. Please provide hexadecimal color codes for each color suggestion.",
            },
            {"role": "user", "content": msg},
        ],
    )

    message_content = completion.choices[0].message["content"]
    print("GPT's Response:", message_content)

    palette = re.findall(r"#[0-9A-Fa-f]{6}", message_content)

    return palette


@app.route("/palette", methods=["POST"])
def palette_prompt():
    app.logger.info("Post request received!")
    query = request.form.get("query")
    colors = generate_palette(query)

    return jsonify({"colors": colors})


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
