document.getElementById('generate').addEventListener('click', () => {
  document.getElementById('status').innerText = 'Generating...';
  document.getElementById('summary').innerText = '';
  chrome.runtime.sendMessage({ action: 'generateSummary' }, response => {
    if (response.summary) {
      console.log("here final")
      document.getElementById('status').innerText = 'Summary:';
      document.getElementById('summary').innerText = response.summary;

    } else {
      console.log("Error fetching summary")
      if(response.error=="Failed to fetch"){
        document.getElementById('status').innerText = 'Error:';
        document.getElementById('summary').innerHTML = `
              Summary could not be generated. 
              Can you please re-run the space at 
              <a href="https://huggingface.co/spaces/sameerrawat07/yt-transcript" target="_blank">
                  https://huggingface.co/spaces/sameerrawat07/yt-transcript
              </a> 
              and try again. Thanks!
          `;
          
      }
      else{
        document.getElementById('status').innerText = 'Error transcripting this video. Please try another one.';
      }
      

    }
  });
});
