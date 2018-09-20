import { Response } from "express";
import { inspect  } from "util";

// Import the class definitions for Document and Documents:
import { Document, Documents } from "../../services/documents";

// Import the definition of the documents-instance, created in the app.ts file:
import { documents } from "../../app";

// Just for Reference: List of important http status codes:
// 200 OK
// 201 CREATED
// 204 NO CONTENT (Indicates success but nothing is in the response body, often used for DELETE and PUT operations.)
// 400 BAD REQUEST (e.g. when data is missing or has wrong data type)
// 401 UNAUTHORIZED (e.g. missing or invalid authentication token)
// 403 FORBIDDEN (anlike a 401 Unauthorized response, authenticating will make no difference)
// 404 NOT FOUND
// 405 METHOD NOT ALLOWED (e.g. requested URL exists, but the requested HTTP method is not applicable. The Allow HTTP header must be set when returning a 405 to indicate the HTTP methods that are supported.
// 409 CONFLICT (e.g. a resource conflict would be caused by fulfilling the request)
// 500 INTERNAL SERVER ERROR (given when no more specific message is suitable)
// 501 Not Implemented

// The following controller methods are exported to be used by the API:

/**
 * Created a new document and add it to the list of documents. Respond with created Document.
 */
export const create = (req:any, res:Response) => {
  const reqDocument = req.body;
  console.log("Controller documents, create(), reqDocument:", reqDocument);

  try {
    // Create a new document and respond with the newly created document:
    const newDocument:Document = documents.addNew(reqDocument.title, reqDocument.author, reqDocument.content);
    res.status(201).json(newDocument);
  } catch(err) {
    res.status(400).json({message: err.message});
  }
}


/**
 * Respond with a full list of all documents.
 */
export const readAll = (req:any, res:Response) => {
  console.log("Controller:documents.ts, readAll()");

  try {
    res.status(200).json(documents.getAll());
  } catch(err) {
    res.status(400).json({message: err.message});
  }
}


/**
 * Search for a document by its id. Respond with found document or with an error.
 */
export const readById = (req:any, res:Response) => {
  console.log("Controller:documents.ts, readById()");
  const reqId = req.swagger.params.id.value;
  console.log("Requested id:", reqId);

  try {
    const doc:Document = documents.getById(reqId);
    res.json(doc);
  } catch(err) {
    res.status(404).json({message: err.message});
  }
}

/**
 * Delete a document by its id. Respond with found document or with an error.
 */
export const deleteById = (req:any, res:Response) => {
  console.log("Controller:documents.ts, deleteById()");
  const reqId = req.swagger.params.id.value;
  console.log("Requested id:", reqId);

  try {
    const deletedDoc:Document = documents.deleteById(reqId);
    res.json( {
                success: 1,
                description: "Document with id "+reqId+" is deleted. Content was: "+ inspect(deletedDoc, { depth:1, breakLength:Infinity})
              });
  } catch(err) {
    res.status(404).json({message:err.message/*"The requested document with id "+reqId+" could not be deleted. You may try another id."*/});
  }
}

/**
 * Updates an existing document.
 */
export const updateById = (req:any, res:Response) => {
  console.log("Controller:documents.ts, updateById()");
  const reqId = req.swagger.params.id.value;
  const reqDocument = req.body;
  console.log("Requested id:", reqId);
  console.log("Requested contents:", reqDocument);

  try {
    const doc:Document = documents.updateById(reqId, reqDocument.title, reqDocument.author, reqDocument.content);
    res.status(200).json(doc);
  } catch(err) {
    res.status(404).json({message: err.message});
  }
}
