import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateProductComponent } from './user-update-product.component';

describe('UserUpdateProductComponent', () => {
  let component: UserUpdateProductComponent;
  let fixture: ComponentFixture<UserUpdateProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserUpdateProductComponent]
    });
    fixture = TestBed.createComponent(UserUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
