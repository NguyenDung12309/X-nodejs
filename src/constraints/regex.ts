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

export const REGEX_USERNAME = /^(?![0-9]+$)[A-Za-z0-9_]{4,15}$/
