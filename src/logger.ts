import { Observable, Subject } from "rxjs";

const messages = new Subject<string>();

const Logger = {
  get messages(): Observable<string> {
    return messages.asObservable();
  },
  write(level: string, ...values: any[]): void {
    // log to regular console (comment out or filter by level when not want to log all, e.g. in prod)
    (window as any)["console"][level](...values);

    // publish messages as observable (to display them in DOM etc.)
    // (useful for debugging in mobile when dev tools not easily available)
    try {
      messages.next(
        level + ": " + values.map(JSON.stringify as any).join(" ") + "\n"
      );
    } catch (e) {} // catch possible JSON.stringify errors
  },
  log: (...values: any[]): void => Logger.write("log", ...values),
  debug: (...values: any[]): void => Logger.write("debug", ...values),
  info: (...values: any[]): void => Logger.write("info", ...values),
  warn: (...values: any[]): void => Logger.write("warn", ...values),
  error: (...values: any[]): void => Logger.write("error", ...values)
};

export default Logger;