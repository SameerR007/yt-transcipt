
const observer = new MutationObserver(() => {
    const videoUrl = window.location.href;
    chrome.storage.local.set({ videoUrl: videoUrl }, () => {
      console.log('Video URL updated:', videoUrl);
    });
  });
  
  // Start observing changes in the body of the page
  observer.observe(document.body, { subtree: true, childList: true });
  
  // Ensure we set the video URL on initial load as well
  const videoUrl = window.location.href;
  chrome.storage.local.set({ videoUrl: videoUrl }, () => {
    console.log('Video URL set:', videoUrl);
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getVideoUrl') {
      sendResponse({ videoUrl: videoUrl });
    }
  });