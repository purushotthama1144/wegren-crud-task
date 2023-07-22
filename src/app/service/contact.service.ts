import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  readonly storageKey = 'contacts';

  getContactsFromLocalStorage(): Contact[] {
    const contactsData = localStorage.getItem(this.storageKey);
    return contactsData ? JSON.parse(contactsData) : [];
  }

  saveContactsToLocalStorage(contacts: Contact[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }

  getContacts(): Contact[] {
    return this.getContactsFromLocalStorage();
  }

  addContact(contact: Contact): void {
    const contacts = this.getContactsFromLocalStorage();
    const newContact: Contact = { ...contact };
    contacts.push(newContact);
    this.saveContactsToLocalStorage(contacts);
  }

  deleteContact(id: any): void {
    let contacts = this.getContactsFromLocalStorage();
    contacts = contacts.filter(contact => contact.id !== id);
    this.saveContactsToLocalStorage(contacts);
  }

  updateContact(updatedContact: Contact): void {
    const contacts = this.getContacts();
    const index = contacts.findIndex(c => c.email === updatedContact.email);
    if (index !== -1) {
      contacts[index] = updatedContact;
      localStorage.setItem(this.storageKey, JSON.stringify(contacts));
    }
  }
}