import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/service/contact.service';
import { SnackbarService } from 'src/app/service/snackbar.service.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  fileName: any;
  convertedImage: any;
  firstName:any;
  lastName:any;
  email:any;
  mobile:any
  contact = new Contact;
  operationType:string;
  showAddForm:boolean = false;
  showUpdateForm:boolean = false;
  @ViewChild('myForm', { static: false }) myForm: NgForm;

  constructor(private contactService: ContactService ,  
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    if(this.data.operationType == 'add'){
      this.showAddForm = true;
      this.showUpdateForm = false;
    }

    if(this.data.operationType == 'update'){
      this.showAddForm = false;
      this.showUpdateForm = true;
      this.firstName = this.data.contact.firstName
      this.lastName = this.data.contact.lastName
      this.email = this.data.contact.email
      this.mobile = this.data.contact.mobile  
    }
  }

  getContactList() {
    this.contactService.getContacts();
  }
  
  onChangeImage(event: any) {
    sessionStorage.clear()
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        sessionStorage.setItem('image', reader.result as string);
        this.convertedImage =  sessionStorage.getItem('image')
      };
    }
  }

  isFormValid(): boolean {
    return (
      this.firstName && this.firstName.trim() !== '' &&
      this.lastName && this.lastName.trim() !== '' &&
      this.email && this.email.trim() !== '' &&
      this.mobile && this.mobile.trim() !== ''
    );
  }

  onSubmit() {
    this.contact = {
      id: Date.now(),
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobile: this.mobile,
      image: this.convertedImage
    };

    if(this.data.operationType == 'update'){
      if (!this.isFormValid()) {
        this.snackbarService.openSnackBar("mat-warn", "Please add Details");
      } else {
        this.contactService.updateContact(this.contact);
        this.snackbarService.openSnackBar("mat-primary", "Contact Updated Successfully");
        window.location.reload();
      }
    } else {
      if (!this.isFormValid()) {
        this.snackbarService.openSnackBar("mat-warn", "Please add Details");
      } else {
        this.contactService.addContact(this.contact);
        this.snackbarService.openSnackBar("mat-primary", "Contact Added Successfully");
        this.myForm.resetForm();
        window.location.reload();
      }
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
