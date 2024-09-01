class Version {
  injectVersion() {
    document.addEventListener('DOMContentLoaded', function() {
      // Step 1: Parse the URL to get the value of the `v` query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const version = urlParams.get('v');

      if (version) {
        const versionSpan = document.querySelector('#version');
        versionSpan.textContent = `{version: ${version}}`;
      }
    });
  }
}
