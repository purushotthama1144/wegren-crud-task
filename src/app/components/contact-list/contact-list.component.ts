import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit , AfterViewInit {
  contacts: Contact[] = [];
  

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Serial No' , 'First Name', 'Last Name', 'Mobile No', 'Email Id' , 'Profile Pic'];
  

  constructor(private contactService: ContactService , private sanitizer: DomSanitizer) { 
    
  }

  ngOnInit(): void {
    this.getContactList()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getContactList() {
    this.contacts = this.contactService.getContacts();
    this.refreshDataSource()
  }

  refreshDataSource(){
    this.dataSource = new MatTableDataSource(this.contacts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id);
  }
}
