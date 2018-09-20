import { Response } from "express";

/**
 * Respond with the current server timestamp as a local time string.
 */
export const getTimestamp = (req:any, res:Response) => {
  console.log("Controller timestamp, getTimestamp()");
  res.json(new Date().toLocaleString());
}
