export function requiredStringRule() {
  return function(name, value) {
    if (typeof value === "string" && value.length > 0) {
      return false;
    }
    return `${name} is required`;
  };
}

export function mixedCaseRule() {
  return function(name, value) {
    if (value !== value.toUpperCase() && value !== value.toLowerCase()) {
      return false;
    }
    return `${name} must have uppercase and lowercase characters`;
  };
}

export function charactersRule() {
  return function(name, value) {
    if (/[a-z]+/i.test(value)) {
      return false;
    }
    return `${name} must contain alpha characters`;
  };
}

export function numbersRule() {
  return function(name, value) {
    if (/[0-9]+/.test(value)) {
      return false;
    }
    return `${name} must contain numbers`;
  };
}

export function requiredCheckedRule() {
  return function(name, value) {
    if (typeof value === "boolean" && value) {
      return false;
    }
    return `You must confirm that you accept ${name}`;
  };
}

export function lengthRule(exact, range) {
  let params = null;
  return function(name, value) {
    if (!params) {
      if (value.length > exact) {
        params = { min: exact - range, max: exact };
      } else if (value.length < exact) {
        params = { min: exact, max: exact + range };
      } else {
        params = {
          min: exact - Math.floor(range / 2),
          max: exact + Math.ceil(range / 2)
        };
      }
    }
    if (value.length < params.min) {
      return `${name} must be ${params.min} characters or more`;
    }
    if (value.length > params.max) {
      return `${name} must be shorter than ${params.max} characters`;
    }
    return false;
  };
}

export function specialCharactersRule(specialCharacters) {
  const allSpecialCharacters = Array.from(specialCharacters);
  let params = null;

  return function(name, value) {
    const firstSpecialCharacter = Array.from(value).find(c =>
      allSpecialCharacters.includes(c)
    );
    if (!firstSpecialCharacter) {
      return `${name} must contain at least one special character or symbol`;
    }
    if (!params) {
      params = {
        allowed: allSpecialCharacters.filter(c => c != firstSpecialCharacter)
      };
    }

    if (!Array.from(value).some(c => params.allowed.includes(c))) {
      return `${name} must contain one of the following special characters ${params.allowed.join(
        " "
      )}`;
    }

    return false;
  };
}

export function availableUsernameRule() {
  return function(name, value) {
    if (!/\d+$/.test(value)) {
      return `That username is not available. Try adding some numbers to the end to make it more unique`;
    }
    return false;
  };
}

export function matchRule(otherName, comparator) {
  return function(name, value) {
    if (!comparator(value)) {
      return `${name} must match ${otherName}`;
    }
    return false;
  };
}
