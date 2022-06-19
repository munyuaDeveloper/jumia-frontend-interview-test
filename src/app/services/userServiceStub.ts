import {of} from 'rxjs';
import {UserMockData} from "./userMockData";

export class MockUserServiceStub {
  getData() {
    return of(UserMockData.getAllData);
  }
}
