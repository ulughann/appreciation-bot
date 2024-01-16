/**
 * * Structured logging for this project.
 * * Based on the implementation of [Good-Slog](https://www.npmjs.com/package/good-slog)
 * @module utility/console
 * @requires moment
 */

import moment from "moment";

type style = "print" | "error" | "warning" | "info";

function base(msg: string, type: style) {
  const time = moment().format("YYYY/MM/DD HH:mm:ss");
  switch (type) {
    case "print":
      console.log(`[${time}] ${msg}`);
      break;
    case "error":
      console.error(`[\x1b[31m${time}\x1b[37m] \x1b[31mERROR\x1b[37m ${msg}`);
      break;
    case "warning":
      console.warn(`[\x1b[33m${time}\x1b[37m] \x1b[33mWARN\x1b[37m ${msg}`);
      break;
    case "info":
      console.info(`[\x1b[36m${time}\x1b[37m] \x1b[36mINFO\x1b[37m ${msg}`);
      break;
  }
  return {
    type: type,
    time: time,
    msg: msg,
  };
}

/**
 * Structurally logs a message to the console.
 * @param {string} msg
 * @param {function} callback
 * @return {void}
 * @example
 * let logs = [];
 * error("This is an error!", (m) => logs.push(m));
*/

export function Print(msg: string, callback?: Function): void {
  const slog = base(msg, "print");
  typeof callback == "function" ? callback(slog) : null;
}

/**
 * Structurally logs an error to the console.
 * @param {string} msg
 * @param {function} callback
 * @return {void}
 * @example
 * let logs = [];
 * error("This is an error!", (m) => logs.push(m));
 */
export function Error(msg: string, callback?: Function): void {
  const slog = base(msg, "error");
  typeof callback == "function" ? callback(slog) : null;
}

/**
 * Structurally logs a warning to the console.
 * @param {string} msg
 * @param {function} callback
 * @return {void}
 * @example
 * let logs = [];
 * error("This is an error!", (m) => logs.push(m));
 */
export function Warn(msg: string, callback?: Function): void {
  const slog = base(msg, "warning");
  typeof callback == "function" ? callback(slog) : null;
}

/**
 * Structurally logs an info message to the console.
 * @param {string} msg
 * @param {function} callback
 * @return {void}
 * @example
 * let logs = [];
 * error("This is an error!", (m) => logs.push(m));
 */
export function Inform(msg: string, callback?: Function): void {
  const slog = base(msg, "info");
  typeof callback == "function" ? callback(slog) : null;
}