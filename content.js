let videoUrl = window.location.href;

// Update the video URL whenever the page content changes
const observer = new MutationObserver(() => {
    videoUrl = window.location.href;
    console.log('Video URL updated:', videoUrl);
});

// Start observing changes in the body of the page
observer.observe(document.body, { subtree: true, childList: true });

// Ensure we set the video URL on initial load as well
console.log('Video URL set:', videoUrl);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getVideoUrl') {
        sendResponse({ videoUrl: videoUrl });
    }
});
