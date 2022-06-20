import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UserMockData} from "./userMockData";

describe('UsersService', () => {
  // We declare the variables that we'll use for the Test Controller and for our Service
  let httpTestingController: HttpTestingController;
  let service: UsersService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(UsersService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const sharedService: UsersService = TestBed.get(UsersService);
    expect(sharedService).toBeTruthy();
  });

  it('returned Observable should match the right data when getting getUsers method is called ', () => {
    const params = {
      page: 1,
      results: 5,
    }
    service.getUsers(params)
      .subscribe(res => {
        expect(res).toEqual(UserMockData.getAllData);
      });
    const req = httpTestingController.expectOne(`${service.baseUrl}?page=1&results=5`);
    expect(req.request.method).toEqual('GET');

    req.flush(UserMockData.getAllData);
  });

});
