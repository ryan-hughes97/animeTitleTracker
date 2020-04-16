const form = document.querySelector('#anime-form');
const animeList = document.querySelector('ul.collection');
const animeInput = document.querySelector('#anime');
const titleCount = document.querySelector('h3');
const titleArr = [];

// add load event listeners
loadEventListeners();

// add load event listeners
function loadEventListeners(){
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTitles);
  // Add task event
  form.addEventListener('submit', addAnime);
  // Remove task event
  animeList.addEventListener('click', removeAnime);
}

function getTitles(){
  let titles;
  if(localStorage.getItem('titles') === null){
    titles = [];
  } else {
    titles = JSON.parse(localStorage.getItem('titles'));
    titleCount.innerText = 'Number of Titles: ' + titles.length;
  }

  titles.sort();

  titles.forEach(function(title){
    // Create li element
    const li = document.createElement('li');
    // Add class name
    li.className = '.collection-item';
    // Create text node and append
    li.appendChild(document.createTextNode(title));
    // Create link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
  
    // Link styling
    link.style.float = 'right';
    link.style.color = 'gray';
    // Link hover state: ON
    link.addEventListener('mouseover', hoverOnLink);
    function hoverOnLink(e){
      link.style.color = 'coral';
    }
    // Link hover state: OFF
    link.addEventListener('mouseout', hoverOffLink);
    function hoverOffLink(e){
      link.style.color = 'gray';
    }
  
    // Append link to li
    li.appendChild(link);

    // insert styling (can't do on css sheet some reason)
    li.style.padding = '.5rem';
    li.style.margin = '.5rem 0';
    // li.style.border = '1px solid black';
    li.style.listStyle = 'none';
    li.style.background = 'white';
  
    // Append li to ul
    animeList.appendChild(li);
  });
}

// Add anime event
function addAnime(e){
  if(animeInput.value === ''){
    // alert('Add an anime or manga title');
    showMessage('Please fill in the title field.', 'red')
  } else {
    // Create li element
    const li = document.createElement('li');
    // Add class name
    li.className = '.collection-item';
    // Create text node and append
    li.appendChild(document.createTextNode(animeInput.value));
    // Create link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
  
    // Link styling
    link.style.float = 'right';
    link.style.color = 'gray';
    // Link hover state: ON
    link.addEventListener('mouseover', hoverOnLink);
    function hoverOnLink(e){
      link.style.color = 'coral';
    }
    // Link hover state: OFF
    link.addEventListener('mouseout', hoverOffLink);
    function hoverOffLink(e){
      link.style.color = 'gray';
    }
  
    // Append link to li
    li.appendChild(link);

    // insert styling (can't do on css sheet some reason)
    li.style.padding = '.5rem';
    li.style.margin = '.5rem 0';
    // li.style.border = '1px solid black';
    li.style.listStyle = 'none';
    li.style.background = 'white';
  
    // Append li to ul
    animeList.appendChild(li);

    showMessage(`"${animeInput.value}" was added to the list!`, 'green')


    // let lis = document.querySelectorAll('li');
    // lis.sort();

    // adjust font size if name is too long (does not work)
    // if(animeInput.value.length > 20){
    //   li.style.fontSize = '1rem';
    // }

    // Store in Local Storage
    storeTitlesInLocalStorage(animeInput.value);

  
    // Clear Input
    animeInput.value = '';


    titleCount.innerText = 'Number of Titles: ' + document.querySelectorAll('li').length;
    
  }

  e.preventDefault();
}



// Store Task
function storeTitlesInLocalStorage(title){
  let titles;
  if(localStorage.getItem('titles') === null){
    titles = [];
  } else {
    titles = JSON.parse(localStorage.getItem('titles'));
  }

  titles.push(title);

  localStorage.setItem('titles', JSON.stringify(titles));
}

// Remove anime event 
function removeAnime(e){
  const title = e.target.parentElement.parentElement.innerText;
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm(`Remove "${title}" from the list?`)){
      e.target.parentElement.parentElement.remove();
      titleCount.innerText = 'Number of Titles: ' + document.querySelectorAll('li').length;

      showMessage(`"${title}" was removed from the list`, 'blue')

      // Remove from local storage
      removeTitlesFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local storage
function removeTitlesFromLocalStorage(titleItem){
  let titles;
  if(localStorage.getItem('titles') === null){
    titles = [];
  } else {
    titles = JSON.parse(localStorage.getItem('titles'));
  }

  titles.forEach(function(title, index){
    if(titleItem.textContent === title){
      titles.splice(index, 1);
    }
  });

  localStorage.setItem('titles', JSON.stringify(titles));
}

// showMessage Function
function showMessage(message, color){
  // create div
  const messageDiv = document.createElement('div');

  // get elements
  const messageAlert = document.querySelector('.message');

  // Add class
  messageDiv.className = 'message-alert';

  // Create text node and append to div
  messageDiv.appendChild(document.createTextNode(message));

  // Style div
  messageDiv.style.textAlign = 'center';
  messageDiv.style.color = color;
  messageDiv.style.padding = '0';
  messageDiv.style.margin = '0 0 1rem 0';

  // Insert Message
  messageAlert.appendChild(messageDiv);

  // Clear message after 3 seconds
  setTimeout(clearMessage, 3000);
}

// Clear Message
function clearMessage(){
  document.querySelector('.message-alert').remove();
}

// THINGS I WANT TO ADD:
// 1) Sort button by alphabetical order and date entered
// 2) add page numbers to longer lists
// 3) Search Database (suggest ~3-5 titles as you type in letters)
// 4) "Title was added" will show for 3s and then disappear
// 5) Add a Favorite button/ star

// THINGS I'M NOT SURE OF ADDING
// 1) change font size of longer titles inputted (text goes over the list if text string is too long)
//    Text may be too small. Maybe a '...' added after a certain number of characters inputted
// 2) alert text when a new title is added to list 'You've added "Title" to the list'. This may get annoying
// 3) Make the Back to Top button stick on the side (can always access it)

// THINGS I ADDED ON MY OWN:
// 1) confirm 'Remove "Title" from list?'
// 2) Count list items and display change as one adds/removes from list
// 3) Back to Top button 
// 4) Messages pop up when no title entered, when title is added to list, and when title is removed from list