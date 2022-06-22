import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {UsersService} from "../../services/users.service";
import {MockUserServiceStub} from "../../services/userServiceStub";
import {MatTableExporterModule} from "mat-table-exporter";
import {MatOption} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [
        MatSidenavModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatTableExporterModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule,
        MatTableExporterModule,
        MatFormFieldModule,
        MatSelectModule,
      ],
      providers: [
        {provide: UsersService, useClass: MockUserServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it( 'It should get users data on load', ()=>{
    component.page = 2;
    spyOn(component, 'getUsers').and.callThrough();
    component.ngOnInit();

    expect(component.getUsers).toHaveBeenCalled();
  });

  it('test selectionChange on column change', () => {
    // make sure the mat-select has the expected mat-options
    const options: MatOption[] = component.matSelect.options.toArray();
    expect(options.length).toBe(8);
    expect(options[0].viewValue).toBe('Picture');
    expect(options[1].viewValue).toBe('Name');
    expect(options[2].viewValue).toBe('Gender');
    expect(options[3].viewValue).toBe('Email');
    expect(options[4].viewValue).toBe('Phone');
    expect(options[5].viewValue).toBe('Dob');
    expect(options[6].viewValue).toBe('Registered');
    expect(options[7].viewValue).toBe('Location');

    // set up a spy on the function that will be invoked via selectionChange
    const spy = spyOn(component, 'changeTableColumns').and.callThrough();
    expect(spy).not.toHaveBeenCalled();

    // select the option
    options[1]._selectViaInteraction();
    fixture.detectChanges();

    // selectionChange was called and the option is now selected
    expect(spy).toHaveBeenCalledTimes(1);
    expect(options[1].selected).toBe(true);
  });

  xit('should call onTableScroll on scroll', () => {
    const mockEvent = { srcElement: { scrollTop: 5486 } } as any;
    const table = fixture.debugElement.nativeElement.querySelector('.scrollable-table');


    table.scrollTo(mockEvent)
    fixture.detectChanges();
    spyOn(component, 'onTableScroll').and.callThrough();
    expect(component.onTableScroll).toHaveBeenCalled();
  });

});
