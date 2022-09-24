const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const contactsPath = path.resolve(__dirname, './db/contacts.json');

const updateContacts = async contacts =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactsById = async contactId => {
  const contacts = await listContacts();
  const resp = contacts.find(c => c.id === contactId);
  if (!resp) {
    return null;
  }
  return resp;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  contactId = String(contactId);
  const contactIndex = contacts.findIndex(c => c.id === contactId);
  if (contactIndex === -1) {
    return null;
  }

  const [newContact] = contacts.splice(contactIndex, 1);
  await updateContacts(contacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactsById,
  addContact,
  removeContact,
};
