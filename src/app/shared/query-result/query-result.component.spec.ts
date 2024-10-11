import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QueryResultComponent } from './query-result.component';
import { errorResult, loadingResult } from '../../core/result.utils';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <app-query-result [result]="{ status: 'success' }">
      <h1>Test</h1>
    </app-query-result>
  `,
})
class TestComponent {}

describe('QueryResult', () => {
  describe('not having a result', () => {
    let fixture: ComponentFixture<QueryResultComponent>;
    let instance: QueryResultComponent;
    let element: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [QueryResultComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(QueryResultComponent);
      instance = fixture.componentInstance;
      element = fixture.nativeElement;
    });

    it('should set result to an initial result by default', async () => {
      expect(fixture.componentInstance.result).toEqual({ status: 'initial' });
    });

    it('should render loading result', async () => {
      // given/when
      instance.result = loadingResult();
      fixture.detectChanges();

      // then
      expect(element.querySelector('p')?.innerText).toBe('loading');
    });

    it('should render error result', async () => {
      // given/when
      instance.result = errorResult('some test error');
      fixture.detectChanges();

      // then
      expect(element.querySelector('p')?.innerText).toBe(
        'error: some test error',
      );
    });
  });

  it('should render success result', async () => {
    await TestBed.configureTestingModule({
      imports: [QueryResultComponent],
      declarations: [TestComponent],
    }).compileComponents();

    // given/when
    // Rendering test component
    const fixture = TestBed.createComponent(TestComponent);
    const element = fixture.nativeElement;
    fixture.detectChanges();

    // then
    expect(element.querySelector('h1')?.innerText).toBe('Test');
  });
});
