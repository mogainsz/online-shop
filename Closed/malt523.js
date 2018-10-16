
function search_book(search_term) {
	var xhr = new XMLHttpRequest();
	var uri = "http://localhost:8188/Service.svc/booksearch?term=" + search_term;
	xhr.open("GET", uri, true);

	xhr.onload = function () {
		var data = xhr.responseXML;
		var list = "";
		var l = document.getElementById("show_books");
		var books = data.getElementsByTagName("Book");
		for (var i = 0; i < books.length; i++) {
			list += "<li class='list'>" + "<center><img width = '200px' height='300px' src=http://localhost:8188/Service.svc/bookimg?id=" + books[i].childNodes[2].textContent + "></center>" + "<p align='center'>" + books[i].childNodes[3].textContent + "</p><button onclick='buyBook(\"" + books[i].childNodes[2].textContent + "\")' class='buy_button' id='buy_book'>BUY NOW</button ></li>";

		}
		l.innerHTML = list;
		
	}
	xhr.send();

}

function search_bluray(search_term) {
	var xhr = new XMLHttpRequest();
	var uri = "http://localhost:8188/Service.svc/brsearch?term=" + search_term;
	xhr.open("GET", uri, true);

	xhr.onload = function () {
		var data = xhr.responseXML;
		var list = "";
		var l = document.getElementById("show_blurays");
		var blurays = data.getElementsByTagName("Bluray");
		for (var i = 0; i < blurays.length; i++) {
			list += "<li class='list'>" + "<center><img width = '200px' height='300px' src=http://localhost:8188/Service.svc/brimg?id=" + blurays[i].childNodes[0].textContent + "></center>" + "<p align='center'>" + blurays[i].childNodes[1].textContent + "</p><button onclick='buyBluray(\"" + blurays[i].childNodes[0].textContent + "\")' class='buy_button' id='buy_book'>BUY NOW</button ></li>";
							
		}
		l.innerHTML = list;
	}
	xhr.send();

}

function postComment(cName) {
   
	var xhr = new XMLHttpRequest();
	var uri = "http://localhost:8188/Service.svc/comment?name=" + cName;
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	var comment = document.getElementById("comment").value.replace(/'/g,"''");
	var name = document.getElementById("pName").value;
	if (comment != "" && name != "") {
		xhr.send(JSON.stringify(comment));
		
		xhr.onload = function () {
			document.getElementById("pName").value = "";
			document.getElementById("comment").value = "";
			document.getElementById("comments_window").src = document.getElementById("comments_window").src;
			
		}
	}
	else {
		alert("name/comment-box must not be empty");
	}
}


function buyBook(book_id) {
	if(localStorage.active == 1){
	var xhr = new XMLHttpRequest();
	var uri = "http://localhost:8189/Service.svc/bookbuy?id=" + book_id;
	
	xhr.open("GET", uri, true, localStorage.name, localStorage.password);
	
	xhr.withCredentials = true;
	xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
	

	xhr.onload = function () {
		
			alert((JSON.parse(xhr.responseText)));
			
		}
	xhr.send(null);
	}
	else{
		changeTab('login', 'selLogin');
	}
	

}

	
function logOut(){
	var xhr = new XMLHttpRequest();
	var uri = "http://localhost:8189/Service.svc/user";
	xhr.open("GET", uri, true, "42b43a3d3655034c96afb8695d0a95bd", "11ea4d9a91f8fd0c2bec8e90ffffc688");
	xhr.withCredentials = true;
	xhr.onload = function(){
		localStorage.name = "";
		localStorage.password = "";
		localStorage.active = 0;
		location.reload();
		alert("Successfully logged out");
	}
	xhr.send();
	
}




function buyBluray(br_id) {
	if(localStorage.active == 1){
	var xhr = new XMLHttpRequest();
	var uri = "http://localhost:8189/Service.svc/brbuy?id=" + br_id;
	xhr.open("GET", uri, true, localStorage.name, localStorage.password);
	xhr.withCredentials = true;
	xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
	xhr.onload = function () {
		
			alert((JSON.parse(xhr.responseText)));
		}
	xhr.send(null);
	}
	else{
		changeTab('login', 'selLogin');
	}
}

function LogIn(name, password) {
	if(name == "" && password == ""){
		document.getElementById("invalidCred").innerHTML = "Please enter your credentials";
	}
	else{
	var xhr = new XMLHttpRequest();
	var uri = "http://localhost:8189/Service.svc/user";
	xhr.open("GET", uri, true, name, password);
	xhr.withCredentials = true;
	xhr.onload = function (){
		if(xhr.status == 200){
			localStorage.name = name;
			localStorage.password = password;
			localStorage.active = 1;
			document.getElementById("logInB").value = "Logging in...";
			setTimeout(location.reload(), 1000);
			
		}
		else {
			document.getElementById("invalidCred").innerHTML = "Invalid username/password";
			
		}
	}
	
	xhr.send();
	}
}

function checkLogged(){
	if(localStorage.active == 1){
		document.getElementById("logoutO").style.display = "inline";
		document.getElementById("loggedUser").style.display = "inline";
		document.getElementById("selLogin").style.display = "none";
		document.getElementById("loggedUser").innerHTML = "Welcome " + localStorage.name;
	}
}


function register() {
	var xhr = new XMLHttpRequest();
	var uri = "http://localhost:8188/Service.svc/register";
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("Content-Type", "application/xml;charset=UTF-8");
	var address = document.getElementById("address").value;
	var name = document.getElementById("name").value;
	var password = document.getElementById("password").value;
	var data = "<User xmlns='http://schemas.datacontract.org/2004/07/BoutiqueCassee.Open'> <Address>" + address + "</Address> <Name>" + name + "</Name> <Password>" + password + "</Password></User>";
	xhr.onload = function () {
		document.getElementById("address").value = "";
		document.getElementById("name").value = "";
		document.getElementById("password").value= "";
		alert(xhr.responseText);
	}
	xhr.send(data);

}

function removeMessage(){
	if(document.getElementById('lName').value == "" || document.getElementById('lPassword').value == ""){
		document.getElementById("invalidCred").innerHTML = "";
	}
}



function reloadComments() {
	document.getElementById("comments_window").src = document.getElementById("comments_window").src;
}

function removeClass(){
	 document.getElementById("selHome").classList.remove('selected');
	 document.getElementById("selBooks").classList.remove('selected');
	 document.getElementById("selBlurays").classList.remove('selected');
	 document.getElementById("selGuestbook").classList.remove('selected');
	 document.getElementById("selRegister").classList.remove('selected');
	 document.getElementById("selLogin").classList.remove('selected');
}


function hideAll() {
	document.getElementById("Home").style.display = "none";
	document.getElementById("books").style.display = "none";
	document.getElementById("blurays").style.display = "none";
	document.getElementById("guestbook").style.display = "none";
	document.getElementById("register").style.display = "none";
	document.getElementById("login").style.display = "none";

}

function clearLogin(){
	document.getElementById('lName').value = "";
	document.getElementById('lPassword').value = "";
	removeMessage();
}


function changeTab(tab, menuItem){
	hideAll();
	removeClass();
	document.getElementById(tab).style.display = "inline";
	document.getElementById(menuItem).classList.add('selected');
	clearLogin();
}


window.onload = function(){
	search_book(""); 
	search_bluray("");
	checkLogged();
	

}

