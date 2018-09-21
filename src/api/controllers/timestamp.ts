import { Response } from "express";
import { SwaggerRequest } from "../swagger/swagger-request";

/**
 * Respond with the current server timestamp as a local time string.
 */
export const getTimestamp = (req:SwaggerRequest, res:Response) => {
  console.log("Controller timestamp, getTimestamp()");
  res.json(new Date().toLocaleString());
}
