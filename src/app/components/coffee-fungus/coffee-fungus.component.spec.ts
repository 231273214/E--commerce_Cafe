import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeFungusComponent } from './coffee-fungus.component';

describe('CoffeeFungusComponent', () => {
  let component: CoffeeFungusComponent;
  let fixture: ComponentFixture<CoffeeFungusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeFungusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeFungusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
