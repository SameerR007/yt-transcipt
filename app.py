from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
load_dotenv() 
app = Flask(__name__)

@app.route('/summarize', methods=['POST'])
def summarize():
    print("flask running")
    data = request.json
    video_transcript = data.get('transcript')
    print(video_transcript)
    
    try:
        import google.generativeai as genai
        # Define the video ID
        API_KEY=os.getenv("API_KEY")
        genai.configure(api_key=API_KEY)

        # Combine all the transcript text into a single string
        transcript_text = " ".join([entry['text'] for entry in video_transcript])
        print(transcript_text)
        model = genai.GenerativeModel("gemini-1.5-flash")
        print("*************")
        response = model.generate_content(f"Summarize the youtube content given below(Just use plain text)\n{transcript_text}")
        print(response.text)
        return jsonify({'summary': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
