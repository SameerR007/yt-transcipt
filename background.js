import { YoutubeTranscript } from 'https://cdn.jsdelivr.net/npm/youtube-transcript@latest';

console.log("background process started");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'generateSummary') {
    chrome.tabs.query({ active: true }, (tabs) => {
      console.log(tabs);
      const tabId = tabs[0].id;
      
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
      }, () => {
        console.log("Script injected.");

        chrome.storage.local.get('videoUrl', async (data) => {
          console.log(data.videoUrl);

          try {
            // Fetch the transcript asynchronously
            const transcript = await YoutubeTranscript.fetchTranscript(data.videoUrl);
            console.log(transcript);  // This will print the transcript

            // Send the transcript to the backend service for summarization
            const response = await fetch('https://sameerrawat07-yt-transcript.hf.space/summarize', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ transcript: transcript })
            });

            const result = await response.json();
            console.log('Background script response:', result);

            // Send the summary back as a response
            sendResponse({ summary: result.summary });
          } catch (error) {
            console.error("Error fetching transcript or sending summary request:", error);
            sendResponse({ error: 'Summary could not be generated.' });
          }
        });
      });
    });
    return true;  // Keeps the messaging channel open for async response
  }
});
