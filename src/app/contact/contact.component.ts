import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from './contact';
import { ContactService } from '../services/contact.service';
import { AlertifyService } from '../services/alertify.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {

  contactForm:FormGroup
  contact:Contact = new Contact() 
  

  constructor(
    private formBuilder:FormBuilder,
    private contactService:ContactService,
    private alertifyService:AlertifyService
  ) { }

  ngOnInit(): void {
    this.createContactForm()
  }

  createContactForm() {
    this.contactForm = this.formBuilder.group ({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      comment: [null, Validators.required]

    })
  }

  submitContact() {

    if (this.contactForm.valid){
      this.contact = Object.assign({}, this.contactForm.value)
      this.contactService.submitContactService(this.contact)
      .subscribe(() => {
        this.alertifyService.success('Contact form succesfully sended. Thank you')
      })
    }
    else {
      this.alertifyService.error("Please check your inputs.")
    }
    
  }
}
