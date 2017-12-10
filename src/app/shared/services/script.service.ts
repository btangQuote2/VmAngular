import {Injectable} from '@angular/core';
import { ScriptStore } from '../configurations/scrtipt.store';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

declare var document: any;

@Injectable()
export class ScriptService {

private scripts: any = {};
private scripts1: Array<ScriptModel> = []; //{ScriptModel}[] = [];
constructor() {
    ScriptStore.forEach((script: any) => {
        this.scripts[script.name] = {
            loaded: false,
            src: script.src
        };
    });
}

load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
}

loadScript(name: string) {
    return new Promise((resolve, reject) => {
        // resolve if already loaded
        if (this.scripts[name].loaded) {
            resolve({script: name, loaded: true, status: 'Already Loaded'});
        }else {
            // load script
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = this.scripts[name].src;
            if (script.readyState) {  // IE
                script.onreadystatechange = () => {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        this.scripts[name].loaded = true;
                        resolve({script: name, loaded: true, status: 'Loaded'});
                    }
                };
            } else {  // Others
                script.onload = () => {
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                };
            }
            script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    });
}


public  load1(script: ScriptModel): Observable<ScriptModel> {
  const result = new Observable<ScriptModel>(( observer: Observer<ScriptModel> ) => {
      const existingScript = this.scripts1.find(s => s.name === script.name);

      // Complete if already loaded
      if (existingScript && existingScript.loaded) {
          observer.next(existingScript);
          observer.complete();
      }else {
          // Add the script
          this.scripts1 = [...this.scripts1, script];

          // Load the script
          const scriptElement = document.createElement('script');
          scriptElement.type = 'text/javascript';
          scriptElement.src = script.src;

          scriptElement.onload = () => {
              script.loaded = true;
              observer.next(script);
              observer.complete();
          };

          scriptElement.onerror = (error: any) => {
              observer.error('Couldn\'t load script ' + script.src);
          };

          document.getElementsByTagName('body')[0].appendChild(scriptElement);
      }
  });


  return result;
}


}

export class ScriptModel {
  name: string;
  src: string;
  loaded: boolean;
}
