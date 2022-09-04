const contactsAction = require('./contacts.js');
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await contactsAction.listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await contactsAction.getContactsById(id);
      console.log(contact);
      break;

    case 'add':
      const newContact = await contactsAction.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const removedContact = await contactsAction.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
