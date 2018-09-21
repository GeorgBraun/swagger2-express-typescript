// Take the swagger Request definition and extend it by swagger object 
// containing arbitrary objects operation and params.

// This could be the starting point for getting the RestAPI parameter definitions into TypeScript.
// Would be great ... but will take more time to be done.

import { Request } from "express";

export interface SwaggerRequest extends Request { 
  swagger: {
    operation: any,
    params: any
  }
}
