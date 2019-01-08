import { Client } from "dsteem";
import { STEEM_API } from "../config";

export const client = new Client(STEEM_API);
