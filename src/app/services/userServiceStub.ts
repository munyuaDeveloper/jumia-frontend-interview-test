import {of} from 'rxjs';
import {UserMockData} from "./userMockData";

export class MockUserServiceStub {
  getUsers() {
    return of(UserMockData.getAllData);
  }
}
