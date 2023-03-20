const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // store the event so it can be triggered later.
  window.deferredPrompt = event;

  // Show the install button
  butInstall.hidden = false;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }

  // Show the install prompt.
  promptEvent.prompt();

  // Wait for the user to respond to the prompt
  const result = await promptEvent.userChoice;

  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;

  // Hide the install button.
  butInstall.hidden = true;

  // Log the result
  console.log('👍', 'userChoice:', result);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // clear prompt from memory
  window.deferredPrompt = null;
  // hide the install button
  butInstall.hidden = true;
});
