import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/service/contact.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MatDialog } from '@angular/material/dialog';
import { WarningComponent } from '../warning/warning.component';
import { PersonDetailsComponent } from '../person-details/person-details.component';

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

  displayedColumns: string[] = ['Serial No' , 'First Name', 'Last Name', 'Mobile No', 'Email Id' , 'Profile Pic' , 'Action Buttons'];
  

  constructor(private contactService: ContactService , public dialog: MatDialog) { }

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
    this.dataSource = new MatTableDataSource(this.contacts.reverse());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteContact(id: number): void {
    const dialogRef = this.dialog.open(WarningComponent, {
      width: '300px',
      data: 'Are you sure you want to delete this contact?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.contactService.deleteContact(id);
        this.contacts = this.contactService.getContacts();
        this.getContactList()
      }
    });
  }

  updateContact(element) {
    this.dialog.open(ContactFormComponent, {
      data: { 
        operationType: 'update',
        contact: element
      },
      disableClose: true,
      panelClass: 'custom-modalbox',
      autoFocus: false
    });
  }

  openPersonDetail(contact): void {
    this.dialog.open(PersonDetailsComponent, {
      data: { 
        operationType: 'detail',
        person: contact
      },
      panelClass: 'custom-modalbox',
      autoFocus: false
    });
  }
}
