document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    const shortenButton = document.getElementById('shortenButton');
    const resultContainer = document.getElementById('resultContainer');
    const shortenedUrl = document.getElementById('shortenedUrl');
  
    shortenButton.addEventListener('click', function() {
      const longUrl = urlInput.value;
  
      if (longUrl) {
        shortenUrl(longUrl);
      }
    });
  
    function shortenUrl(longUrl) {
      const accessToken = 'e7e0d02b69dc688dbb7381e95c5af5e3d0a48609';
      const apiUrl = `https://api-ssl.bitly.com/v4/shorten`;
  
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          long_url: longUrl
        })
      })
      .then(response => response.json())
      .then(data => {
        const shortUrl = data.id;
        displayShortenedUrl(shortUrl);
        copyToClipboard(shortUrl);
      })
      .catch(error => console.error('Error shortening URL:', error));
    }
  
    function displayShortenedUrl(shortUrl) {
      shortenedUrl.innerText = shortUrl;
      resultContainer.style.display = 'block';
    }
  
    function copyToClipboard(text) {
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);

      alert('URL copied to clipboard!');
    }
  });
  