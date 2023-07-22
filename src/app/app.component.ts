import { Component } from '@angular/core';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public dialog: MatDialog) { }

  openAddContact() {
    this.dialog.open(ContactFormComponent, {
      data: { 
        operationType: 'add',
        contact: 'add',
      },
      disableClose: true,
      panelClass: 'custom-modalbox',
      autoFocus: false
    });
  }
}