import { ElementRef } from '@angular/core';
import { Highlight } from './highlight';

describe('Highlight', () => {
  it('should create an instance', () => {
    const mockElementRef = new ElementRef(document.createElement('div'));
    const directive = new Highlight(mockElementRef);
    expect(directive).toBeTruthy();
  });

  it('should set background color on mouseenter', () => {
    const mockElementRef = new ElementRef(document.createElement('div'));
    const directive = new Highlight(mockElementRef);
    directive.appHighlight = 'lightblue';

    directive.onMouseEnter();
    expect(mockElementRef.nativeElement.style.backgroundColor).toBe('lightblue');
  });

  it('should clear background color on mouseleave', () => {
    const mockElementRef = new ElementRef(document.createElement('div'));
    const directive = new Highlight(mockElementRef);

    directive.onMouseEnter();
    directive.onMouseLeave();
    expect(mockElementRef.nativeElement.style.backgroundColor).toBe('');
  });
});