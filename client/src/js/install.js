const installButton = document.getElementById('buttonInstall');
let deferredPrompt;

const handleBeforeInstallPrompt = event => {
  // Prevent Chrome from automatically showing the prompt
  event.preventDefault();
  // Store the event object
  deferredPrompt = event;
  // Show the install button
  installButton.hidden = false;
};

const handleButtonInstallClick = async () => {
  if (!deferredPrompt) {
    return;
  }
  // Show the installation prompt
  deferredPrompt.prompt();
  // Wait for user's choice
  const choiceResult = await deferredPrompt.userChoice;
  console.log('User choice:', choiceResult);
  // Reset the deferredPrompt and hide the install button
  deferredPrompt = null; 
  installButton.hidden = true;
};

const handleAppInstalled = event => {
  // Reset the deferredPrompt and hide the install button
  deferredPrompt = null;
  installButton.hidden = true;
  console.log('App installed:', event);
};

// Add event listeners
window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
installButton.addEventListener('click', handleButtonInstallClick);
window.addEventListener('appinstalled', handleAppInstalled);