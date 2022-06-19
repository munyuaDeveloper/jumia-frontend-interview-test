import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {UsersService} from "../../services/users.service";
import {Result} from "../../interfaces/user.interface";
import {MatPaginator} from "@angular/material/paginator";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  /** For testing purposes */
  @ViewChild(MatSelect) public matSelect!: MatSelect;

  page: number = 1;
  pageLimit: number = 100;

  dataSource!: MatTableDataSource<Result>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tableColumns: string[] = ['picture', 'name', 'gender', 'email', 'phone', 'dob', 'registered', 'location'];
  displayedColumns: string[] = [...this.tableColumns];
  selectedColumns: string[] = [...this.tableColumns];

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

];
  loading = false;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getData({});
  }

  getData(filter: {}): void {
    this.loading = true;
    const queryParams = {
      results: this.pageLimit,
      page: this.page,
    }
   this.userService.getData({...queryParams, ...filter}).subscribe(res => {
     this.loading = false;
     if (this.page > 1) {
       this.dataSource.data = this.dataSource.data.concat(res.results)
     }else {
       this.dataSource = new MatTableDataSource(res.results);
     }

     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
   })
  }

  changeTableColumns(): void {
    this.displayedColumns = this.selectedColumns;
    this.getData({inc: this.displayedColumns.toString()})
  }

  onTableScroll(e: any): void {
    const tableViewHeight = e.target.offsetHeight // viewport
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {

      if (!this.loading) {
        this.page += 1;
        this.getData({});
      }

    }
  }
}
