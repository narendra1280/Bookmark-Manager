document.getElementById('myform').addEventListener('submit',saveBookmark);

function saveBookmark(e){
  var siteName=document.getElementById('siteName').value;
  var siteUrl=document.getElementById('siteUrl').value;

  if(!validateForm(siteName,siteUrl)){
    return false;
  }
  var bookmark={
    name:siteName,
    url:siteUrl
  }
  //localStorage.setItem('test','Hello');
  //Test if bookmarks is null
  if(localStorage.getItem('bookmarks')===null){
    // Initialize array
    var bookmarks = [];
    //Add to array
    bookmarks.push(bookmark);
    //Set to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }else{
    //Get bookmarks from localStorage
    var bookmarks =JSON.parse(localStorage.getItem('bookmarks'));
    //Add bookmark to array
    bookmarks.push(bookmark);
    //Re-set back to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }
  //clear form
  document.getElementById('myform').reset();

  //Re-fetch bookmarks
  fetchBookmarks();
  //prevent form from submitting
  e.preventDefault();
}

function deleteBookmark(url){
  //Get bookmarks from localStorage
  var bookmarks =JSON.parse(localStorage.getItem('bookmarks'));
  for(var i=0;i<bookmarks.length;i++){
    if(bookmarks[i].url==url){
      //Remove from array
      bookmarks.splice(i, 1);
    }
  }
  //Re-set back to localStorage
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  //Re-fetch bookmarks
  fetchBookmarks();
}


function fetchBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks =JSON.parse(localStorage.getItem('bookmarks'));
  //get output id
  var bookmarksResults= document.getElementById('bookmarksResults');
  //Build output
  bookmarksResults.innerHTML='';
  for(var i=0;i<bookmarks.length;i++){
    var name=bookmarks[i].name;
    var url=bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well well-sm">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }

}

function validateForm(siteName,siteUrl){
  if(!siteUrl||!siteName){
    alert('Please fill all details');
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if(!siteUrl.match(regex)){
    alert("Please enter valid URL");
    return false;
  }
  return true;
}
