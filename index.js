const { Command } = require("commander");
// const { log } = require("console");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const oneContacts = await contacts.getContactById(id);
      console.log(`Get contact by ID=${id}`);
      console.table([oneContacts]);
      break;

    case "add":
      await contacts.addContact(name, email, phone);
      console.log(`Add contact name=${name}, email=${email}, phone=${phone}`);
      const allContactsAdd = await contacts.listContacts();
      console.table(allContactsAdd);
      break;

    case "remove":
      const removeContacts = await contacts.removeContact(id);
      console.log(`Remove contact with ID=${id}:`);
      console.table([removeContacts]);
      const allContactsAfterRemove = await contacts.listContacts();
      console.table(allContactsAfterRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

(async () => {
  await invokeAction(argv);
})();
