import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'templatePipes', pure: false
})
export class TemplatePipesPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(content:any) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  

}
