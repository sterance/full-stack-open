const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

const args = process.argv
const password = args[2]
const url = `mongodb+srv://sterance:${password}@cluster0.fitd4v3.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

const displayAll = () => {
    console.log('Connecting to database...');
    mongoose.connect(url)
        .then(() => {
            console.log('Database connection successful');
            // core logic
            return Person.find({});
        })
        .then(persons => {
            console.log('\nphonebook:');
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            });
            console.log('');
        })
        // logging and error handling
        .catch(error => {
            console.error('Error during database operation:', error.message);
        })
        .finally(() => {
            console.log('Closing database connection...');
            mongoose.connection.close()
                .then(() => {
                    console.log("Database closed successfully");
                })
                .catch((error) => {
                    console.error("Failed to close database connection:", error.message);
                })
        });
}

const addPerson = () => {
    console.log('Connecting to database...');
    mongoose.connect(url)
        .then(() => {
            console.log('Database connection successful');
            // core logic
            const newPerson = new Person ({ name: args[3], number: args[4] });
            return newPerson.save();
        })
        // logging and error handling
        .then(savedPerson => {
            console.log(`\nSuccessfully added ${savedPerson.name} to database\n`);
        })
        .catch(error => {
            console.error('Error during database operation:', error.message);
        })
        .finally(() => {
            console.log('Closing database connection...');
            mongoose.connection.close()
                .then(() => {
                    console.log('Database closed successfully');
                })
                .catch((error) => {
                    console.error('Failed to close database connection', error.message);
                })
        });
}

const badArgs = () => {
    console.log('INCORRECT ARGUMENT USEAGE!');
    console.log('To display all phonebook entries: node mongo.js [password]');
    console.log('To add a new phonebook entry: node mongo.js [password] [name] [number]');
}

switch (true) {
    case args.length < 3:
        badArgs();
        process.exit(1);
    case args.length === 3:
        displayAll();
        break;
    case args.length === 4:
        badArgs();
        process.exit(1);
    case args.length === 5:
        addPerson();
        break;
    case args.length > 5:
        badArgs();
        process.exit(1);
}



// Save personsData to the database
// 
// mongoose.connect(url)
//     .then(() => {
//         console.log('Database connection successful');

//         const personSchema = new mongoose.Schema({
//             name: String,
//             number: String
//         });
        
//         const Person = mongoose.model('Person', personSchema);

//         const personsData =[
//             { name: "Arto Hellas", number: "040-123456" },
//             { name: "Ada Lovelace", number: "39-44-5323523" },
//             { name: "Dan Abramov", number: "12-43-234345" },
//             { name: "Mary Poppendieck", number: "39-23-6423122" }
//         ];

//         const savePromises = personsData.map(pData => {
//             const person = new Person(pData);
//             return person.save();
//         });

//         return Promise.all(savePromises);
//     })
//     .then(savedPersons => {
//         console.log(`Successfully saved ${savedPersons.length} persons!`);
//     })
//     .catch(error => {
//         console.error('An error occurred:', error);
//     })
//     .finally(() => {
//         console.log('Closing database connection');
//         mongoose.connection.close();
//     })