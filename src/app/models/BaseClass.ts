export class BaseClass {

  protected fromObject (json: any) {

      for (const propName in json) {

          if (json.hasOwnProperty(propName) && propName !== '$id') {

              this[propName] = json[propName];
          }
      }
  }
}
