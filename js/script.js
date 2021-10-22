document.addEventListener('DOMContentLoaded', () => {

   // Dyamically insert search form
   const header = document.querySelector('header.header');

   const labelSearch = document.createElement('label');
   labelSearch.for = 'search';
   labelSearch.className = 'student-search';
   header.append(labelSearch);

   const spanSearch = document.createElement('span');
   spanSearch.textContent = 'Search by name';
   labelSearch.append(spanSearch);

   const inputSearch = document.createElement('input');
   inputSearch.id = 'search';
   inputSearch.placeholder = 'Search by name...';
   labelSearch.append(inputSearch);

   const buttonSearch = document.createElement('button');
   buttonSearch.type = 'button';
   labelSearch.append(buttonSearch);

   const imgSearch = document.createElement('img');
   imgSearch.src = 'img/icn-search.svg';
   imgSearch.alt = 'Search icon';
   buttonSearch.append(imgSearch);

   // Dynamically insert a hidden paragraph with "No results found" message
   const paraNoResults = document.createElement('p');
   paraNoResults.textContent = `No results found! ${String.fromCodePoint(0x1f615)}`;
   paraNoResults.style.display = 'none';
   header.insertAdjacentElement("afterend", paraNoResults);

   // Set the number of students displayed on page
   const itemsPerPage = 9;

   /**
    * Creates and inserts/appends the elements needed to display a "page" of nine students
    * 
    * @param {array} list  - Student data
    * @param {number} page - The page number
    */
   function showPage(list, page) {

      // Indexes of the selected 9 students - interval [start; end)
      const startIndex = page * itemsPerPage - itemsPerPage;
      const endIndex = page * itemsPerPage;

      // Reference the <ul> with class 'student-list'
      const ulStudent = document.querySelector('ul.student-list');

      // Remove any students that might have previously been displayed.
      ulStudent.innerHTML = '';

      for (let i = 0; i < list.length; i++) {
         if (i >= startIndex && i < endIndex) {

            // <li class="student-item cf">
            //    <div class="student-details">
            //       <img class="avatar" src="https://randomuser.me/api/portraits/women/25.jpg" alt="Profile Picture">
            //       <h3>Ethel Dean</h3>
            //       <span class="email">ethel.dean@example.com</span>
            //    </div>
            //    <div class="joined-details">
            //       <span class="date">Joined 12-15-2005</span>
            //    </div>
            // </li>

            // Create HTML code as shown above for every student on the "page" page
            const liStudent = document.createElement('li');
            liStudent.className = 'student-item cf';

            const divStudentDetails = document.createElement('div');
            divStudentDetails.className = 'student-details';
            liStudent.append(divStudentDetails);

            const imgAvatar = document.createElement('img');
            imgAvatar.className = 'avatar';
            imgAvatar.src = `${list[i].picture.large}`;
            imgAvatar.alt = 'Profile Picture';
            divStudentDetails.append(imgAvatar);

            const h3 = document.createElement('h3');
            h3.textContent = `${list[i].name.first} ${list[i].name.last}`;
            divStudentDetails.append(h3);

            const spanEmail = document.createElement('span');
            spanEmail.className = 'email';
            spanEmail.textContent = `${list[i].email}`;
            divStudentDetails.append(spanEmail);

            const divJoinedDetails = document.createElement('div');
            divJoinedDetails.className = 'joined-details';
            liStudent.append(divJoinedDetails);

            const spanDate = document.createElement('span');
            spanDate.className = 'date';
            spanDate.textContent = `Joined ${list[i].registered.date}`;
            divJoinedDetails.append(spanDate);

            ulStudent.append(liStudent);
         }
      }
   }


   /**
    * Creates and inserts/appends the elements needed for the pagination buttons
    * 
    * @param {array} list - Student data
    */
   function addPagination(list) {
      //Number of pagination buttons needed
      const numPagButtons = Math.ceil(list.length / itemsPerPage);

      // Reference <ul> with class 'link-list'
      const ulLink = document.querySelector('ul.link-list');

      // Remove any pagination buttons that might have previously been displayed
      ulLink.innerHTML = '';

      // Display the needed pagination buttons (Starts at 1)
      for (let i = 1; i <= numPagButtons; i++) {
         const liButton = document.createElement('li');

         const pagButton = document.createElement('button');
         pagButton.type = "button";
         pagButton.textContent = `${i}`;

         liButton.append(pagButton);
         ulLink.append(liButton);
      }

      /*
         Set className "active" for the first pagination button
         ulLink.firstElementChild === null means there are no matches for the search =>
         null.firstElementChild returns Uncaught Type Error !! =>
         First, we need to check if there are any <li> tags (which contain <button> tags)
      */
      if (ulLink.firstElementChild) {
         ulLink.firstElementChild.firstElementChild.className = 'active';
      }

      ulLink.addEventListener('click', (e) => {
         if (e.target.tagName === 'BUTTON') {
            const btnTarget = e.target;

            // Select pagination button with class active and remove its class
            const btnActive = document.querySelector('ul.link-list li button.active');
            btnActive.classList.remove('active');

            // Set class = active to the button that was clicked
            btnTarget.className = 'active';

            // Get the number of the page to be displayed
            const page = btnTarget.textContent;

            showPage(list, page);
         }
      });
   }


   /**
    * Compares user's search input with both first and last names of students in the aray
    * and calls showPage function to display only matches
    * 
    * @param {array} list  - Student data
    * @param {string} name - Names or letters introduced by user in search input
    */
   function searchFn(list, name) {
      const ulStudent = document.querySelector('ul.student-list');

      // Remove any students that might have previously been displayed.
      ulStudent.innerHTML = '';

      // Array containing student mathing the search input.
      const filteredList = [];

      for (let i = 0; i < list.length; i++) {

         // If search bar is not empty AND if first OR last names of every student include searched text,
         // then add the student to filteredList array.
         if (name.length !== 0 &&
            (list[i].name.first.toLowerCase().includes(name.toLowerCase()) ||
               list[i].name.last.toLowerCase().includes(name.toLowerCase()))) {

            filteredList.push(list[i]);
         }
      }

      // If there are results, hide "No results" message
      if (filteredList.length === 0) {
         paraNoResults.style.display = '';
      }

      // Display matched students and pagination buttons
      showPage(filteredList, 1);
      addPagination(filteredList);
   }

   // Filter the students
   buttonSearch.addEventListener('click', () => {
      const name = inputSearch.value;

      // If search bar is empty, hide "No results" and display all students
      if (name === '') {
         paraNoResults.style.display = 'none';
         showPage(data, 1);
         addPagination(data);
      } else {
         // Else search students
         paraNoResults.style.display = 'none';
         searchFn(data, name);
      }
   });

   // Filter the students
   inputSearch.addEventListener('keyup', () => {
      const name = inputSearch.value;

      // If search bar is empty, hide "No results" and display all students
      if (name === '') {
         paraNoResults.style.display = 'none';
         showPage(data, 1);
         addPagination(data);
      } else {
         // Else search students
         paraNoResults.style.display = 'none';
         searchFn(data, name);
      }
   });


   // Display the first page when the web page is loaded
   showPage(data, 1);

   // Display pagination buttons
   addPagination(data);

});