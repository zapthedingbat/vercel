function setElementText(element, text) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  element.appendChild(element.ownerDocument.createTextNode(text));
}

const fadeTime = 500;

export function Ui(doc) {
  const getStartButton = () => {
    return doc.getElementById("start");
  };

  const getCancelButton = () => {
    return doc.getElementById("cancel");
  };

  const getSubmitButton = () => {
    return doc.getElementById("submit");
  };

  const setView = name => {
    doc.querySelectorAll(".view").forEach(element => {
      element.classList.toggle("active", false);
    });
    doc
      .querySelector(`.view[data-name='${name}']`)
      .classList.toggle("active", true);
  };

  const showWelcome = () => {
    setView("welcome");
  };

  const showRegister = () => {
    setView("register");
  };

  const showComplete = () => {
    setView("complete");
  };

  const addStartListener = listener => {
    getStartButton().addEventListener("click", listener);
  };

  const addCancelListener = listener => {
    getCancelButton().addEventListener("click", listener, false);
  };

  const addSubmitListener = listener => {
    getSubmitButton().addEventListener("click", listener);
  };

  const addSubmitHoverListener = listener => {
    getSubmitButton().addEventListener("mouseover", listener);
  };

  const addOverlayCloseListener = listener => {
    doc.addEventListener(
      "click",
      event => {
        if (event.target.matches("[data-overlay-close]")) {
          listener(event);
        }
      },
      true
    );
  };

  const addInputListener = listener => {
    doc
      .querySelector('.view[data-name="register"]')
      .addEventListener("input", listener, true);
  };

  const addPasteListener = listener => {
    doc.addEventListener("paste", listener, true);
  };

  const setTimer = time => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = time - seconds * 1000;
    setElementText(doc.querySelector(".timer #seconds"), seconds);
    setElementText(
      doc.querySelector(".timer #milliseconds"),
      `.${milliseconds}`
    );
  };

  const setResult = time => {
    setElementText(doc.querySelector("#result"), time / 1000);
  };

  const setErrorMessage = message => {
    const errorElement = doc.getElementById("error");
    errorElement.classList.toggle("hidden", message === "" || !message);
    setElementText(errorElement, message);
  };

  const resetForm = () => {
    doc.getElementById("username").value = "";
    doc.getElementById("password").value = "";
    doc.getElementById("confirmPassword").value = "";
    doc.getElementById("tandc").checked = false;
    doc.getElementById("privacy").checked = false;
    doc.getElementById("spam").checked = false;
    const accept = doc.querySelector(".accept");
    const items = Array.from(accept.childNodes);
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    items.forEach(item => accept.appendChild(item));
    hideAd();
  };

  const getUsername = () => {
    return doc.getElementById("username").value;
  };

  const getPassword = () => {
    return doc.getElementById("password").value;
  };

  const getConfirmPassword = () => {
    return doc.getElementById("confirmPassword").value;
  };

  const getTermsAndConditions = () => {
    return doc.getElementById("tandc").checked;
  };

  const getPrivacyPolicy = () => {
    return doc.getElementById("privacy").checked;
  };

  const getSpam = () => {
    return doc.getElementById("spam").checked;
  };

  const showAd = () => {
    return doc.getElementById("wfos").classList.toggle("hidden", false);
  };

  const hideAd = () => {
    return doc.getElementById("wfos").classList.toggle("hidden", true);
  };

  const showOverlay = overlay => {
    return doc
      .querySelector(`[data-overlay=${overlay}]`)
      .classList.toggle("hidden", false);
  };

  const hideOverlay = overlay => {
    return doc
      .querySelector(`[data-overlay=${overlay}]`)
      .classList.toggle("hidden", true);
  };

  const fadeOut = () => {
    doc
      .querySelector('.view[data-name="register"]')
      .classList.toggle("faded", true);
    return new Promise(r => setTimeout(r, fadeTime));
  };

  const fadeIn = () => {
    doc
      .querySelector('.view[data-name="register"]')
      .classList.toggle("faded", false);
    return new Promise(r => setTimeout(r, fadeTime));
  };

  const preventFormSubmit = () => {
    return doc.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
    });
  };

  const focusNewsletterEmail = () => {
    doc.getElementById("newsletterEmail").value = "";
    doc.getElementById("newsletterEmail").focus();
  };

  const showPermission = text => {
    setElementText(doc.getElementById("permissionText"), text);
    showOverlay("permission");
  };

  return {
    showWelcome,
    showRegister,
    showComplete,
    setTimer,
    addStartListener,
    addSubmitListener,
    addCancelListener,
    addInputListener,
    addPasteListener,
    addSubmitHoverListener,
    setErrorMessage,
    getUsername,
    getPassword,
    getConfirmPassword,
    getTermsAndConditions,
    getPrivacyPolicy,
    getSpam,
    showOverlay,
    hideOverlay,
    addOverlayCloseListener,
    showAd,
    hideAd,
    resetForm,
    preventFormSubmit,
    fadeOut,
    fadeIn,
    setResult,
    focusNewsletterEmail,
    showPermission
  };
}
