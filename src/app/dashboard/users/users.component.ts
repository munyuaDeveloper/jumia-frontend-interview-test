import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {UsersService} from "../../services/users.service";
import {Result} from "../../interfaces/user.interface";
import {MatPaginator} from "@angular/material/paginator";
interface DisplayData {
  name: string;
  gender: string;
  location: string;
  email: string;
  current_age: string;
  registration_seniority: string;
  phone: string;
  picture: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dataSource!: MatTableDataSource<Result>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  limit: number = 1000;
  tableColumns: string[] = ['picture', 'name', 'gender', 'email', 'phone', 'age', 'registered', 'location'];
  displayedColumns: string[] = [...this.tableColumns]
  selectedColumns: string[] = [...this.tableColumns]

  nationalities =  [
  {
    code: 'AU',
    country: 'Australia'
  },
  {
    code: 'BR',
      country: 'Brazil'
  },
  {
    code: 'CA',
    country: 'Canada'
  },
  {
    code: 'CH',
    country: 'Switzerland'
  },
  {
    code: 'DE',
    country: 'Germany'
  },
  {
    code: 'DK',
    country: 'Denmark'
  },
  {
    code: 'ES',
    country: 'Spain'
  },
  {
    code: 'FI',
    country: 'Finland'
  },
  {
    code: 'FR',
    country: 'France'
  },
  {
    code: 'IE',
    country: 'Ireland'
  },
  {
    code: 'IR',
    country: 'Iran'

  },
  {
    code: 'NO',
    country: 'Norway'
  },
  {
    code: 'NL',
    country: 'Netherlands'
  },
  {
    code: 'NZ',
    country: 'New Zealand'
  },
  {
    code: 'TR',
    country: 'Turkey'
  },
  {
    code: 'US',
    country: 'United States'
  }



]
  full: boolean = true;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getData({});
  }

  // handleScroll = (scrolled: boolean) => {
  //   console.timeEnd('lastScrolled');
  //   scrolled ? this.getData() : _noop();
  //   console.time('lastScrolled');
  // }
  // hasMore = () => !this.dataSource || this.dataSource.data.length < this.limit;

  getData(filter: {}) {
    const queryParams = {
      results: 100
    }
   this.userService.getData({...queryParams, ...filter}).subscribe(res => {
     this.dataSource = new MatTableDataSource(res.results);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
   })
  }

  changeTableColumns(): void {
    this.displayedColumns = this.selectedColumns;
  }
}
