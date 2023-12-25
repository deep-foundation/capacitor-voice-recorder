import mitt from "mitt";
import { Events } from "./events.js";

// @ts-ignore https://github.com/developit/mitt/issues/191
export const emitter = mitt<Events>();
