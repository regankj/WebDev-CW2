const base_url = "http://127.0.0.1:3000";

document.querySelector('#removeBook').addEventListener('click', function(){   // code to remove a book
  var bookID = document.getElementById('bookID').value;
  var bookURL = base_url + '/books/' + bookID;
  var xhttp = new XMLHttpRequest();
  xhttp.open('DELETE', bookURL);
  xhttp.send();
});

const addColumn = function(parentTable, Content){                                 // function to add a column to a table
  let newColumn = document.createElement('td')
  newColumn.appendChild(document.createTextNode(Content));
  parentTable.appendChild(newColumn);

};

const processResponse = function(){                                                       // processResponse funxtion, produces a table of results
  var response = JSON.parse(this.response);
  console.log(response);
  let outputDiv = document.getElementById('output');
  let newTbl = outputDiv
  response.forEach(function(book){
    addColumn(newTbl, book.id);
    addColumn(newTbl, book.title);
    addColumn(newTbl, book.isbn);
    var newRow = document.createElement('tr');
    newTbl.appendChild(newRow);
  });
};

const encodeParameters = function(params) {                                                 // encodeParameters funxtion
  var strArray = [];
  Object.keys(params).forEach(function(key){
    var paramString = encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    strArray.push(paramString);
  });
  return strArray.join("&");
};

const QueryByTitle = function(Title){                                                     // search function, produces a table for all search results
  let rootURL = "http://127.0.0.1:3000/search?type=book";
  let params = {
    title: Title
  };

  let queryURL = rootURL + "&" + encodeParameters(params);

  let xhttp = new XMLHttpRequest();
  xhttp.addEventListener('load', processResponse);
  xhttp.open('GET', queryURL);
  xhttp.send();
};


document.getElementById('searchByTitle').addEventListener('click', function(){
  var Title = document.getElementById('Title').value;
  if (Title) {
    QueryByTitle(Title);
  };
  var output_table = document.querySelector('#output');

});

document.getElementById('searchByAuthor').addEventListener('click', function(){           // function to search for a book by author ID

  var aID = document.getElementById('aID').value;
  queryURL = base_url + '/authors/' + aID + '?allEntities=true';
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', queryURL);
  xhttp.addEventListener('load', function(){
    var output_table = document.getElementById('output');
    author = JSON.parse(this.response);
    books = author.Books;
    books.forEach(function(book){
      addColumn(output_table, book.id);
      addColumn(output_table, book.title);
      addColumn(output_table, book.isbn);
      var newRow = document.createElement('tr');
      output_table.appendChild(newRow);
    });
  });
  xhttp.send();
});

document.getElementById('addAuthor').addEventListener('click', function(){              // function to add a new author to the system
  var name = document.getElementById('newAuthor').value;

  var authorsURL = base_url + '/authors';
  var xhttp = new XMLHttpRequest();
  xhttp.open('POST', authorsURL);
  xhttp.setRequestHeader('Content-Type', 'application/json');

  var params = {
    name: name
  };
  xhttp.send(JSON.stringify(params));
});

document.getElementById('assign').addEventListener('click', function(){                 // funxtion to add a book to an authors list of books
  let aID = document.getElementById('authorID').value;
  let bookTitle = document.getElementById('bookTitle').value;
  let bookISBN = document.getElementById('bookISBN').value;

  var postURL = base_url + '/authors/' + aID + '/books';
  var xhttp = new XMLHttpRequest();
  xhttp.open('POST', postURL);
  xhttp.setRequestHeader('Content-Type', 'application/json');

  var params = {
    bookTitle: bookTitle,
    bookISBN: bookISBN
  };

  xhttp.send(JSON.stringify(params));
});

document.getElementById('searchAuthor').addEventListener('click', function(){               // function to search for an author by name
  let name = document.getElementById('searchAuthorName').value;
   var param = {
     name: name
   };
   let queryURL = base_url + '/search?type=author' + '&' + encodeParameters(param);
   var xhttp = new XMLHttpRequest();
   xhttp.open('GET', queryURL);
   xhttp.addEventListener('load', function(){
     var output_table = document.getElementById('output');
     output_table.innerHTML = "";

     authors = JSON.parse(this.response);
     authors.forEach(function(author){
       addColumn(output_table, author.id);
       addColumn(output_table, author.name);
       var newRow = document.createElement('tr');
       output_table.appendChild(newRow);
     });
   });
   xhttp.send();
});
