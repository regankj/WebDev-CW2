const base_url = "http://127.0.0.1:3000";

const processResponse = function(){                                                               // code for process response
  response = JSON.parse(this.response);
};

const addColumn = function(parentTable, Content){
  let newColumn = document.createElement('td')
  newColumn.appendChild(document.createTextNode(Content));
  parentTable.appendChild(newColumn);
};



function viewUsers(){                                                           // function to produce a table containing all users
  var xhttp = new XMLHttpRequest();
  var users_url = "/users";

  var query_url = base_url + users_url;
  xhttp.open('GET', query_url);

  xhttp.addEventListener('load', function(){
    var user_table = document.querySelector('#users_table');

    var users = JSON.parse(this.response);
    users.forEach(function(user){
      addColumn(user_table, user.id);
      addColumn(user_table, user.name);
      addColumn(user_table, user.barcode);
      addColumn(user_table, user.memberType);
      var newRow = document.createElement('tr');
      user_table.appendChild(newRow);
    });
  });
  xhttp.send();
};

function viewBooks(){                                                         // funxtion to produce a table containing all books
  var xhttp = new XMLHttpRequest();
  var books_url = "/books";

  var query_url = base_url + books_url;
  xhttp.open('GET', query_url);

  xhttp.addEventListener('load', function(){
    var books_table = document.querySelector('#books_table');

    var users = JSON.parse(this.response);
    users.forEach(function(book){
      addColumn(books_table, book.id);
      addColumn(books_table, book.title);
      addColumn(books_table, book.isbn);
      var newRow = document.createElement('tr');
      books_table.appendChild(newRow);
    });
  });
  xhttp.send();
};

function viewLoanedBooks(){                                                 // view books currently out on loan
  var xhttp = new XMLHttpRequest();
  var queryURL = base_url + '/Loans';

  xhttp.open('GET', queryURL);
  xhttp.addEventListener('load', function(){
    var loanedBooks = document.getElementById('loanedBooks');

    var loans = JSON.parse(this.response);
    loans.forEach(function(loan){
      addColumn(loanedBooks, loan.id);
      addColumn(loanedBooks, loan.BookId);
      addColumn(loanedBooks, loan.UserId);
      addColumn(loanedBooks, loan.dueDate);
      var newRow = document.createElement('tr');
      loanedBooks.appendChild(newRow);
    });
  });
  xhttp.send()
};

viewUsers();

viewBooks();

viewLoanedBooks();

document.getElementById('loanBook').addEventListener('click', function(){             // function to loan a book to a user
  var userID = document.getElementById('userID').value;
  var bookID = document.getElementById('bookID').value;
  var dueDate = document.getElementById('dueDate').value;

  let query_url = base_url + '/users/' + userID + '/loans/' + bookID;

  var xhttp = new XMLHttpRequest();
  xhttp.open('load', processResponse);
  xhttp.open('POST', query_url);
  xhttp.setRequestHeader('Content-Type', 'application/json');

  var params = {
    dueDate: dueDate
  };

  xhttp.send(JSON.stringify(params));
});



document.getElementById('viewUserLoans').addEventListener('click',function(){             // function to view the loans of a particular user
  var userID = document.getElementById('enterID').value;
  var xhttp = new XMLHttpRequest();
  var queryURL = base_url + '/users/' + userID + '/loans';

  xhttp.open('GET', queryURL);
  xhttp.addEventListener('load', function(){
    var userLoanTable = document.getElementById('userLoanTable');

    var loans = JSON.parse(this.response);
    loans.forEach(function(loan){
      addColumn(userLoanTable, loan.id);
      addColumn(userLoanTable, loan.BookId);
      addColumn(userLoanTable, loan.dueDate);
      var newRow = document.createElement('tr');
      userLoanTable.appendChild(newRow);
    });
  });
  xhttp.send();
});

document.getElementById('endLoan').addEventListener('click', function(){          // deletes a loan from the system
  var loanID = document.getElementById('loanID').value;
  var xhttp = new XMLHttpRequest();
  var queryURL = base_url + '/loans/' + loanID;
  xhttp.open('DELETE', queryURL);
  xhttp.send();
});
