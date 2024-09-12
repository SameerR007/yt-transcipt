# YouTube Summary Generator

Easily generate summaries for YouTube videos with a single click. This Chrome extension extracts the video's transcript and uses AI to provide a concise summary directly in your browser. It helps users quickly understand the content of YouTube videos without watching them in full.

![Extension Icon](icon_128x128.png)

![Extension Icon](screenshots/image-1280x800%20(3).jpg)

## Features

- **AI-Powered Summaries**: Automatically summarizes YouTube video transcripts using AI.
- **One-Click Summary**: Click the "Generate Summary" button to get a quick overview of the video.
- **Fast and Convenient**: No need to watch entire videos—just read the summary to grasp the content.

## How It Works

1. Navigate to a YouTube video (ensure the URL is in the format `https://www.youtube.com/watch?v=*`).
2. Click the extension icon in your Chrome toolbar.
3. Press the **Generate Summary** button.
4. A concise summary of the video's transcript will be displayed in the extension popup.

## Installation

1. Download the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/youtube-summary-generator/ldjclojdhjajmgjffbmjadpfhkdpenll).
2. Alternatively, clone this repository and load it as an unpacked extension in Chrome:
   - Clone the repository: 
     ```bash
     git clone https://github.com/SameerR007/yt-transcipt.git
     ```
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** (top-right corner).
   - Click **Load unpacked** and select the extension directory.

## Permissions

This extension requires the following permissions:

- **activeTab**: To access the current YouTube video page and extract the video URL.
- **scripting**: To run scripts that interact with the YouTube page.
- **host permissions**: To send the video transcript data to an AI backend for summarization.

## Privacy Policy

The extension does not store or retain any personal data. The video URL is used only temporarily during the session to generate the summary and is not logged or saved. For more information, please see the [Privacy Policy](https://huggingface.co/spaces/sameerrawat07/yt-transcript/blob/main/Privacy_Policy.md).
