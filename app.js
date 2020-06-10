class Anime {
  constructor(title, type, status){
    this.title = title;
    this.type = type;
    this.status = status;
  }
}

class UI {
  addAnimeToList(anime){
    const list = document.getElementById('anime-list');
    const showList = document.querySelector('.container-2');
    showList.style.display = 'block';

    // Create tr element
    const row = document.createElement('tr');
  
    // insert columns
    row.innerHTML = `
      <td>${anime.title}</td>
      <td>${anime.type}</td>
      <td>${anime.status}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
  
    list.appendChild(row);
  }

  showAlert(message, className){
    // create div
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#anime-form');

    // Insert alert
    container.insertBefore(div, form);

    // timeout after 3s
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteAnime(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
      this.countAnime();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('type').value = 'select';
    document.getElementById('status').value = 'select';
  }

  countAnime(){
    let titleCount = document.querySelector('.title-count');
    titleCount.style.display = 'block';
    titleCount.innerText = 'Number of Titles: ' + (document.querySelectorAll('tr').length - 1);
  }
}

// Local Storage Class
class Store {
  static getAnimes(){
    let animes;
    if(localStorage.getItem('animes') === null){
      animes = [];
    } else {
      animes = JSON.parse(localStorage.getItem('animes'));
      animes.sort((a,b) => (a.title > b.title) ? 1: -1);
    }
    
    return animes;
  }

  static displayAnimes(){
    const animes = Store.getAnimes();

    animes.forEach(function(anime){
      const ui = new UI;
      
      // add title to UI
      ui.addAnimeToList(anime);
      ui.countAnime();
    });
  }

  static addAnime(anime){
    const animes = Store.getAnimes();

    animes.push(anime);

    localStorage.setItem('animes', JSON.stringify(animes));
  }

  static removeAnime(title){
    const animes = Store.getAnimes();

    animes.forEach(function(anime, index){
      if(anime.title === title){
        animes.splice(index, 1);
      }
    });

    localStorage.setItem('animes', JSON.stringify(animes));
  }
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayAnimes);

// Event Listener for Add
document.getElementById('anime-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        type = document.getElementById('type').value,
        status = document.getElementById('status').value

  // Instantiate anime
  const anime = new Anime(title, type, status);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if(title === ''|| type === 'select'|| status === 'select'){
    //Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addAnimeToList(anime);

    // Add to LS
    Store.addAnime(anime);

    // Show success
    ui.showAlert(`${title} was added!`, 'success');
  
    // Clear fields
    ui.clearFields();

    // Count total of titles
    ui.countAnime();
    
  }


  e.preventDefault();
})

// Event Listener for Delete
document.getElementById('anime-list').addEventListener('click', function(e){
  // Instantiate UI
  const ui = new UI();

  // Delete Book
  ui.deleteAnime(e.target);

  // Remove from LS
  Store.removeAnime(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

  // Show message
  ui.showAlert(`${e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText} was Removed!`, 'success');

  e.preventDefault();
})

// Sort Alphabetically
const sort = document.getElementById('sort');
sort.addEventListener('click', sortAnime);

function sortAnime() {
  location.reload();
}

// THINGS I WANT TO ADD:
// 1) Sort by date entered
// 2) add page numbers to longer lists
// 3) Search Database (suggest ~3-5 titles as you type in letters)
// 4) Add a Favorite button/ star

// THINGS I'M NOT SURE OF ADDING
// 1) change font size of longer titles inputted (text goes over the list if text string is too long)
//    Text may be too small. Maybe a '...' added after a certain number of characters inputted
// 2) Make the Back to Top button stick on the side (can always access it)

// THINGS I ADDED ON MY OWN:
// 1) confirm 'Remove "Title" from list?'
// 2) Count list items and display change as one adds/removes from list
// 3) Back to Top button 
// 4) Messages pop up when no title entered, when title is added to list, and when title is removed from list
// 5) "Title was added" will show for 3s and then disappear
// 6) Added sort alphabetically