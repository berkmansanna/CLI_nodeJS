const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.resolve(__dirname, './db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactsById = async contactId => {
  const contacts = await listContacts();
  contactId = String(contactId);
  const resp = contacts.find(c => c.id === contactId);
  if (!resp) {
    return null;
  }
  return resp;
};

const addContact = async (name, email, phone, id) => {
  const contacts = await listContacts();
  const newId = String(+[...contacts].sort((a, b) => b.id - a.id)[0].id + 1);
  const newContact = { name, email, phone, id: newId };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  contactId = String(contactId);
  const contactIndex = contacts.findIndex(c => c.id === contactId);
  if (contactIndex === -1) {
    return null;
  }

  const newContacts = contacts.filter((_, index) => index !== contactIndex);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactsById,
  addContact,
  removeContact,
};
