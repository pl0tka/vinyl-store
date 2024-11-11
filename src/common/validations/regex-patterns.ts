export const uppercasePattern = /(?=.*[A-Z])/;
export const lowercasePattern = /(?=.*[a-z])/;
export const numberPattern = /(?=.*[0-9])/;
export const specialCharacterPattern = /(?=.*[!@#$%^&*])/;

export function getPasswordRegexPatterns() {
    return {
        uppercasePattern,
        lowercasePattern,
        numberPattern,
        specialCharacterPattern,
    };
}
