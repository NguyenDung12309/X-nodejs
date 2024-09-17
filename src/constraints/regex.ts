/**
 * Regular expression for validating usernames.
 *
 * @description The regular expression matches a string that:
 * - Starts with a letter or underscore.
 * - Contains only letters, numbers, or underscores.
 * - Has a minimum length of 4 characters.
 * - Has a maximum length of 15 characters.
 *
 * @type {RegExp}
 */

export const REGEX_USERNAME = /^(?!\d+$)\w{4,15}$/
