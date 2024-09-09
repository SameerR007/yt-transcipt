console.log("background process started")
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'generateSummary') {
    chrome.tabs.query({ active: true }, (tabs) => {
      console.log(tabs)
      const tabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
      }, () => {console.log("here1")
        chrome.storage.local.get('videoUrl', (data) => {
          fetch('http://127.0.0.1:5000/summarize', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: data.videoUrl })
          })
          .then(response => response.json())
          .then(data => {
            console.log('Background script response:', data)
            sendResponse({ summary: data.summary });
          })
          .catch(error => {
            console.log("error",error)
            sendResponse({ error: 'Summary could not be generated.' });
          });
        });
      });
    });
    return true
  }
});
