const installButton = document.getElementById('buttonInstall');
const navBtn = document.querySelector('.nav-btn');
let deferredPrompt

const toggleNavBtn = () => {
  if (navBtn.style.display === 'none') {
    navBtn.style.display = 'block';
    console.log('show');
  } else {
    navBtn.style.display = 'none';
    console.log('hide');
  }
};

const handleBeforeInstallPrompt = (event) => {
  event.preventDefault();
  deferredPrompt = event;
};

const handleButtonInstallClick = async () => {
  if (!deferredPrompt) {
    return;
  }
  deferredPrompt.prompt();
  const choiceResult = await deferredPrompt.userChoice;
  console.log('User choice:', choiceResult);
  deferredPrompt = null; 
  toggleNavBtn();
};

const handleAppInstalled = (event) => {
  deferredPrompt = null;
  toggleNavBtn();
  console.log('App installed:', event);
};

window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
installButton.addEventListener('click', handleButtonInstallClick);
window.addEventListener('appinstalled', handleAppInstalled);