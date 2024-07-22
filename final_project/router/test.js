let books = require("./booksdb.js");
let fs = require('fs');
let prompt = require('prompt-sync')();
//task 10 : get the list of books
async function asyncGetBook(){
 
    console.log("calling...");
    const result = await JSON.stringify(books,null,4);
    console.log(result);
}
//asyncGetBook();

//task10:with promise
const getBook = new Promise((resolve,reject)=>{
    let filename = prompt('What is the name of the file ?');
    try {
        const data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'});
        resolve(data);
      } catch(err) {
        reject(err)
      }
});

getBook.then((data) => console.log(data),
(err) => console.log("Error reading file"));

//task11: get book by isbn
async function byIsbn(){
    let isbn= prompt('insert isbn');
    const result = await books[isbn];
    console.log(result);
}

//byIsbn();

//task12: get book by author
async function byAuth(){
    let author= prompt('insert author');
    await Object.keys(books).forEach(key=>{
        if(books[key]["author"]=== author)
        {
            const result =   books[key] ;
            
             console.log(result);
        }
    })
}

//byAuth();


//task 13: get book by title using promise
const getByTitle = new Promise((resolve,reject)=>{
    let title = prompt('what is the title ?');
    Object.keys(books).forEach(key=>{
        if(books[key]["title"]===title){
            resolve(books[key]);
        }
     });
});


getByTitle.then((successmessage) =>{ console.log(successmessage)
})