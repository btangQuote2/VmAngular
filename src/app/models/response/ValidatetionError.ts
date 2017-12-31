export class APIValidationError {
  Message: string;
  Property: string;

  constructor(message: string, property: string) {
    this.Message = message;
    this.Property = property;
  }
}
