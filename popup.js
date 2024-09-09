document.getElementById('generate').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'generateSummary' }, response => {
      if (response.summary) {
        console.log("here final")
        document.getElementById('status').innerText = 'Summary:';
        document.getElementById('summary').innerText = response.summary;
 
      } else {
        console.log("Error fetching summary")
        document.getElementById('status').innerText = 'Error: ' + response.error;

      }
    });
  });
  