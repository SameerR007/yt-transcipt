from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
import google.generativeai as genai
app = Flask(__name__)

@app.route('/summarize', methods=['POST'])
def summarize():
    print("flask running")
    data = request.json
    video_url = data.get('url')
    import re
    print(video_url)
    def extract_youtube_video_id(url):
        """
        Extracts the YouTube video ID from a given URL.

        :param url: The YouTube video URL.
        :return: The video ID if found, otherwise None.
        """
        # Regular expression pattern to match YouTube video ID
        pattern = r'(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})'

        # Search for the pattern in the URL
        match = re.search(pattern, url)
        
        if match:
            return match.group(1)  # Return the video ID
        else:
            return None
        
    video_id = extract_youtube_video_id(video_url)
    print(video_id)
    if not video_url:
        return jsonify({'error': 'No URL provided'}), 400
    
    try:

        # Define the video ID
        API_KEY="AIzaSyBwCqWaGW5ndo_zX-n3sTXMMI9L1di_KbA"
        genai.configure(api_key=API_KEY)
        transcript = YouTubeTranscriptApi.get_transcript(video_id)

        # Combine all the transcript text into a single string
        transcript_text = " ".join([entry['text'] for entry in transcript])

        # Print or use the transcript text
        #print(transcript_text)
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(f"Summarize the youtube content given below(Just use plain text)\n{transcript_text}")
        print(response.text)
        return jsonify({'summary': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
