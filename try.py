from youtube_transcript_api import YouTubeTranscriptApi
transcript = YouTubeTranscriptApi.get_transcript("_XV0uP73VdQ")

# Combine all the transcript text into a single string
transcript_text = " ".join([entry['text'] for entry in transcript])