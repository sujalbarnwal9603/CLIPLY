import {Queue} from "bullmq";
import connection from "./connection.queues.js";

export const urlAnalyticssQueue=new Queue("url-analytics",{connection})