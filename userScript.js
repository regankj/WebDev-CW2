
      const base_url = "http://127.0.0.1:3000";

      document.querySelector('#removeUser').addEventListener('click', function(){         // code to delete a user
        var userID = (document.getElementById('userID').value);
        var userURL = base_url + '/users/' + userID;
        console.log(userURL);

        var xhttp = new XMLHttpRequest();
        xhttp.open('DELETE', userURL);
        xhttp.send();
      });


      const addColumn = function(parentTable, Content){                                 // function to add a column to a table
        let newColumn = document.createElement('td')
        newColumn.appendChild(document.createTextNode(Content));
        parentTable.appendChild(newColumn);

      };

      const processResponse = function(){                                             // processResponse function, produces table of results
        let response = JSON.parse(this.response);
        console.log(response);
        let outputDiv = document.getElementById('output');
        let newTbl = outputDiv
        response.forEach(function(user){
          addColumn(newTbl, user.id);
          addColumn(newTbl, user.name);
          addColumn(newTbl, user.barcode);
          addColumn(newTbl, user.memberType);
          var newRow = document.createElement('tr');
          newTbl.appendChild(newRow);
        });
      };

      const encodeParameters = function(params) {                                                 // encodeParameters function
        var strArray = [];
        Object.keys(params).forEach(function(key){
          var paramString = encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
          strArray.push(paramString);
        });
        return strArray.join("&");
      };

      const QueryByName = function(UserName){                                                     // search function, produces a table for all search results
        let rootURL = "http://127.0.0.1:3000/search?type=user"
        let params = {
          name: UserName
        };

        let queryURL = rootURL + "&" + encodeParameters(params);
        console.log(queryURL);

        let xhttp = new XMLHttpRequest();
        xhttp.addEventListener('load', processResponse);
        xhttp.open('GET', queryURL);
        xhttp.send();
      };


      document.getElementById('searchByName').addEventListener('click', function(){
        var UserName = document.getElementById('UserName').value;

        if (UserName) {
          QueryByName(UserName);
        };
        var output_table = document.querySelector('#output');
        output_table.innerHTML = "";
      });

      const QueryByBarcode = function(Barcode){                                             // function to search for a user by barcode
        let rootURL = "http://127.0.0.1:3000/search?type=user"
        let params = {
          barcode: Barcode
        };

        let queryURL = rootURL + "&" +encodeParameters(params);

        let xhttp = new XMLHttpRequest();
        xhttp.addEventListener('load', processResponse);
        xhttp.open('GET', queryURL);
        xhttp.send();
      };

      document.getElementById('searchByBarcode').addEventListener('click', function(){
        var Barcode = document.getElementById('Barcode').value;
        if (Barcode) {
          QueryByBarcode(Barcode);
        };
        var output_table = document.querySelector('#output');
        output_table.innerHTML = "";
      });


      const updateUserName = function(name){                                                  // code to update a users name
        let UID = document.getElementById('id_update').value;
        let params = {
          name: name,
        };
        let rootURL = base_url + '/users/' + UID;

        let xhttp = new XMLHttpRequest();
        xhttp.open('PUT', rootURL);
        xhttp.setRequestHeader('Content-Type', 'application/json')
        xhttp.send(JSON.stringify(params));
      };

      const updateUserType = function(type){                                                 // code to update a users member type
        let UID = document.getElementById('id_update').value;
        let params = {
          memberType: type,
        };
        let rootURL = base_url + '/users/' + UID;

        let xhttp = new XMLHttpRequest();
        xhttp.open('PUT', rootURL);
        xhttp.setRequestHeader('Content-Type', 'application/json')
        xhttp.send(JSON.stringify(params));
      };

      document.getElementById('updateName').addEventListener('click', function(){
        var name = document.getElementById('EnterNewName').value;
        if (name) {
          updateUserName(name);
        };
      });

      document.getElementById('updateType').addEventListener('click', function(){
        var type = document.getElementById('EnterNewType').value;
        if (type) {
          updateUserType(type);
        };
      });
