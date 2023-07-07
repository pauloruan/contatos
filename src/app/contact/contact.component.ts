import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  contactForm: FormGroup | any;
  data: any;
  isEdit: boolean = false;
  name: string = '';

  constructor(private _dataservice: DataserviceService) {}

  ngOnInit() {
    (this.contactForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required),
      cel: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      birth_date: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      neighborhood: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
    })),
      this.getData();
  }

  getData() {
    this._dataservice.getData().subscribe((data) => {
      this.data = data;
    });
  }

  sendData(contactForm: FormGroup) {
    this.data.push(this.contactForm.value);
    this.name = this.contactForm.value.name;
    this._dataservice.postData(this.contactForm.value).subscribe((data) => {
      this.getData();
    });
    console.log(contactForm);
  }

  updateContact(contact: any) {
    this.contactForm.id = contact.id;
    this._dataservice
      .updateData(this.contactForm.id, this.contactForm.value)
      .subscribe((data) => {
        this.getData();
      });
  }

  modalEdit() {
    this.isEdit = false;
    this.contactForm.reset();
  }

  edit(i: number, contact: any) {
    this.isEdit = true;
    this.contactForm.id = contact.id;
    this.contactForm.setValue({
      name: contact.name,
      email: contact.email,
      tel: contact.tel,
      cel: contact.cel,
      age: contact.age,
      birth_date: contact.birth_date,
      street: contact.street,
      number: contact.number,
      neighborhood: contact.neighborhood,
      city: contact.city,
      state: contact.state,
    });
  }

  deleteContact(i: number, contact: any) {
    this.contactForm.id = contact.id;
    this._dataservice
      .deleteData(this.contactForm.id, contact)
      .subscribe((data) => {
        this.data.splice(i, 1);
      });
  }
}
