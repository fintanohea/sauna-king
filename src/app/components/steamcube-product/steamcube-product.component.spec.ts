import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamcubeProductComponent } from './steamcube-product.component';

describe('SteamcubeProductComponent', () => {
  let component: SteamcubeProductComponent;
  let fixture: ComponentFixture<SteamcubeProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteamcubeProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteamcubeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
