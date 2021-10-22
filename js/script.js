// Set the number of students displayed on page
const itemsPerPage = 9;

/**
 * Creates and inserts/appends the elements needed to display a "page" of nine students
 * 
 * @param {array} list - Student data
 * @param {number} page - The page number
 */
function showPage(list, page) {

   // Indexes of the selected 9 students
   const startIndex = page * itemsPerPage - itemsPerPage;
   const endIndex = page * itemsPerPage;

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

   // Set className "active" for the first pagination button
   ulLink.firstElementChild.firstElementChild.className = 'active';


   ulLink.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const btnTarget = e.target;
         console.log(btnTarget);

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


// Display the first page when the web page is accesed
showPage(data, 1);

// Display pagination buttons
addPagination(data);