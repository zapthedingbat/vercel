import "./main.css";
import { Session } from "./session";
import { Ui } from "./ui";
import {
  lengthRule,
  requiredStringRule,
  requiredCheckedRule,
  availableUsernameRule,
  matchRule,
  specialCharactersRule,
  mixedCaseRule,
  numbersRule,
  charactersRule
} from "./rules";

(function(win, doc) {
  const ui = Ui(doc);
  const session = Session();
  ui.preventFormSubmit();

  const state = {
    overlay: {
      prev: Date.now(),
      wait: 10000
    },
    permission: {
      location: null,
      notifications: null
    }
  };

  const validations = {
    username: [requiredStringRule(), lengthRule(8, 3), availableUsernameRule()],
    password: [
      requiredStringRule(),
      lengthRule(10, 5),
      numbersRule(),
      charactersRule(),
      mixedCaseRule(),
      specialCharactersRule(".&*!?@+-")
    ],
    confirmPassword: [
      requiredStringRule(),
      matchRule("Password", value => value === ui.getPassword())
    ],
    termsAndConditions: [requiredCheckedRule()],
    privacyPolicy: [requiredCheckedRule()]
  };

  const validateField = (name, value, rules) => {
    for (const rule of rules) {
      const result = rule(name, value);
      if (result) {
        return result;
      }
    }
    return false;
  };

  const validate = () => {
    const result =
      validateField("Username", ui.getUsername(), validations.username) ||
      validateField("Password", ui.getPassword(), validations.password) ||
      validateField(
        "Confirm password",
        ui.getConfirmPassword(),
        validations.confirmPassword
      ) ||
      validateField(
        "Terms and conditions",
        ui.getTermsAndConditions(),
        validations.termsAndConditions
      ) ||
      validateField(
        "Privacy Policy",
        ui.getPrivacyPolicy(),
        validations.privacyPolicy
      );
    if (result) {
      ui.setErrorMessage(result);
      return false;
    }
    return true;
  };

  const updateTimer = () => {
    ui.setTimer(session.getTime());
    win.requestAnimationFrame(updateTimer);
  };

  ui.showWelcome();

  ui.addStartListener(() => {
    session.start();
    ui.showRegister();
    ui.showOverlay("consent");
    state.permission.notifications = setTimeout(
      () => ui.showPermission("This website wants to send you notifications"),
      8500
    );
    state.permission.location = setTimeout(
      () => ui.showPermission("This website wants to know your location"),
      15500
    );
  });

  ui.addCancelListener(() => {
    clearTimeout(state.permission.notifications);
    clearTimeout(state.permission.location);
    ui.setErrorMessage("");
    ui.resetForm();
    ui.showWelcome();
  });

  ui.addSubmitListener(async event => {
    event.preventDefault();

    if (ui.getSpam()) {
      ui.setErrorMessage("");
      ui.showOverlay("spam");
      clearTimeout(state.permission.notifications);
      clearTimeout(state.permission.location);
      ui.resetForm();
      ui.showWelcome();
      return;
    }

    await ui.fadeOut();
    if (validate()) {
      ui.setResult(session.getTime());
      ui.showComplete();
    } else {
      ui.resetForm();
    }
    await ui.fadeIn();
  });

  ui.addSubmitHoverListener(() => {
    setTimeout(() => {
      ui.showAd();
    }, 100);
  });

  ui.addOverlayCloseListener(event => {
    state.overlay.prev = Date.now();
    ui.hideOverlay(event.target.getAttribute("data-overlay-close"));
  });

  ui.addInputListener(async event => {
    if (event.target.classList.contains("form-control")) {
      if (Date.now() - state.overlay.prev > state.overlay.wait) {
        ui.showOverlay("newsletter");
        ui.focusNewsletterEmail();
      }
    }
  });

  ui.addPasteListener(event => {
    if (event.target.classList.contains("form-control")) {
      ui.setErrorMessage(
        "Paste has been disabled for ineffable security reasons"
      );
      ui.resetForm();
      event.preventDefault();
    }
  });

  updateTimer();
})(window, document);
