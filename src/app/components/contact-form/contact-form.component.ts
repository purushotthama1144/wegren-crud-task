import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
  isFormTouched:boolean = false;
  @ViewChild('myForm', { static: false }) myForm: NgForm;

  constructor(private fb: FormBuilder, private contactService: ContactService , private router: Router , private snackbarService: SnackbarService) {}

  ngOnInit(): void {}
  
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
      this.mobile && this.mobile.trim() !== '' &&
      this.convertedImage
    );
  }

  onSubmit() {
    this.contact = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobile: this.mobile,
      image: this.convertedImage
    };

    if (!this.isFormValid()) {
      this.snackbarService.openSnackBar("mat-warn", "Please add Details");
    } else {
      this.contactService.addContact(this.contact);
      this.snackbarService.openSnackBar("mat-primary", "Contact Added Successfully");
      this.myForm.resetForm()
    }
  }

  goBack() {
    this.router.navigate(['/contact-list']);
  }
}
