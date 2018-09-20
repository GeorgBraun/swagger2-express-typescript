
/**
 * Class to handle documents
 */
export class Document {
  
  /** Timestamp of creation. Is set automatically and is readonly afterwards. */
  public readonly createdAt: Date;

  /** Title of document */
  public title: string;
  
  /** Author of document */
  public author: string;

  /** Content of document */
  public content: string;

  /** Id of document. Is set automatically upon creation and is readonly afterwards. */
  public readonly id: number;
  
  /** Counter for how often the document has been fetched. */
  public downloads: number;

  /** Creates a new document */
  constructor(title:string, author:string, content:string, id:number) {
    this.createdAt = new Date();
    this.title     = title.trim();
    this.author    = author.trim();
    this.content   = content;
    this.id        = id;
    this.downloads = 0;
  }

}

/** Class to handle a list of documents */
export class Documents {
  private list: Document[];
  private nextId: number;

  constructor() {
    this.list = [
      new Document("Where to go?",   "Harry Potter",     "How can I find my way to Hogwarts School of Witchcraft and Wizardry? Maybe by train?", 0),
      new Document("Important Todo", "Hermione Granger", "Study at the library.", 1),
      new Document("Task",           "Ron Weasley",      "Find Scabbers!", 2)
    ];
    this.nextId = this.list.length;
  }

  /**
   * Searches for a document by its id. Responds with found document or throws an error. 
   * Auto-increments the download-counter of a found document.
   * @param id Id of desired document
   */
  getById(id:number) : Document {
    // Search list for doucment with id
    for(let i=0; i<this.list.length; i++) {
      if(this.list[i].id == id) {
        this.list[i].downloads++; // Found it. Increase counter
        return this.list[i];      // and return it (will terminate the loop).
      }
    }
    // If we are still here, document was not found -> error
    throw new Error("ERROR in Documents.getById(): Document with id "+id+" could not be found.");
  }

  /**
   * Returns the array with all documents. Auto-increments the download-counter of all documents.
   * @readonly Array with all documents. Be careful: Do not change its contents!
   */
  getAll() : Document[] {
    // Loop through list and increase each download counter
    for(let i=0; i<this.list.length; i++) {
      this.list[i].downloads++;
    }
    // Then return the list
    return this.list;
  }

  /** Creates a new document, adds it to the array and returns the new document
   * @param title Title for the new document
   * @param author Author for the new document
   * @param content Content for the new document
   * @returns the new document
   */
  addNew(title:string, author:string, content:string) : Document {
    let newDoc = new Document(title, author, content, this.nextId);
    this.list.push(newDoc);
    this.nextId++;
    return newDoc;
  }

  /**
   * Searches for a document by its id. Deletes the found document or throws an error. Returns the deleted document.
   * @param id Id of desired document
   * @returns The deleted document
   */
  deleteById(id:number) : Document {
    // Search list for doucment with id
    for(let i=0; i<this.list.length; i++) {
      if(this.list[i].id == id) {
        const deletedDoc:Document = this.list.splice(i, 1)[0];
        // Document is found and deleted. We can terminate the loop and return:
        return deletedDoc;
      }
    }
    // If we are still here, document was not found -> error
    throw new Error("ERROR in Documents.deleteById(): Document with id "+id+" could not be found.");
  }

  /**
   * Searches for a document by its id and returns true or false
   * @param id Id of desired document
   * @returns true if found, false if not found
   */
  testIfExists(id:number) : boolean {
    // Search list for doucment with id
    for(let i=0; i<this.list.length; i++) {
      if(this.list[i].id == id) {
        return true; // Found it.
      }
    }
    // If we are still here, document was not found -> return false
    return false;
  }

  /**
   * Searches for a document's index. Returns the index of found document or -1 if not found.
   * @param id Id of document to be found
   * @returns Index of found document or -1 if not found
   */
  private getIndexById(id:number) : number {
    // Search list for doucment with id
    for(let i=0; i<this.list.length; i++) {
      if(this.list[i].id == id) {
        return i; // Found it. Return index
      }
    }
    // If we are still here, document was not found -> return -1
    return -1;
  }
  
  /**
   * Updates an existing document. Returns modified document or throws an error if not found.
   * @param id Id of the document
   * @param title New title of document
   * @param author New author of document
   * @param content New content of document
   * @returns the modified document
   */
  updateById(id:number, title:string, author:string, content:string) : Document {
    // Test if document with id exists:
    const idx = this.getIndexById(id);
    if(idx<0) {
      // idx<0 means: document could not be found => error
      throw new Error("ERROR in Documents.updateById(): Document with id "+id+" could not be found.");
    } else {
      // Document was found. Update attributes which are not undefined or null:
      if(title)   { this.list[idx].title   = title;   }
      if(author)  { this.list[idx].author  = author;  }
      if(content) { this.list[idx].content = content; }
      return this.list[idx]; // return modified document
    }
  }

}