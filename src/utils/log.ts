import { Database } from "ydb";
import moment from "moment";
const logs = new Database("logs.yml");

export function $l(msg: any): any {
  logs.set(
    moment().format("YYYY/MM/DD HH:mm:ss"),
    msg
  );
}
