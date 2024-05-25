const userTable = document.getElementById('user-table');
const filters = {
    age: document.getElementById('age'),
    gender: document.getElementById('gender'),
    location: document.getElementById('location')
};

function populateUserTable(users) {
    userTable.innerHTML = ''; 
  
    users.forEach(user => {
      // Create the profile container div
      const profileContainer = document.createElement('div');
      profileContainer.classList.add('profile-container');
  
      // Image Element (Replace 'placeholder.jpg' with the actual image path or URL)
      const img = document.createElement('img');
      img.src = `${user.Name}.jpg`
      img.alt = `${user.Name}'s Profile Picture`;
      img.classList.add('profile-image');
      profileContainer.appendChild(img);
  
      // Profile Info Div
      const profileInfo = document.createElement('div');
      profileInfo.classList.add('profile-info');
      profileInfo.innerHTML = `
        <h2 class="name">${user.Name}</h2>
        <p class="age">Age: ${user.Age}</p>
        <p class="gender">Gender: ${user.Gender}</p>
        <p class="location">Location: ${user.Location}</p>
        `;
      profileContainer.appendChild(profileInfo);

      // Profile Details (initially hidden)
        const profileDetails = document.createElement('div');
        profileDetails.classList.add('profile-details', 'hidden');
        profileDetails.innerHTML = `
        <p>Email: ${user.Email}</p>
        <p>Occupation: ${user.Occupation}</p>
        <p>Hobbies: ${user.Hobbies}</p>
        `;
        profileContainer.appendChild(profileDetails);
  
      // Add container to table row
      const row = document.createElement('tr');
      const cell = document.createElement('td'); // Create a single cell
      cell.appendChild(profileContainer); // Place the container in the cell

      // Click event to toggle details visibility
        profileContainer.addEventListener('click', () => {
        profileDetails.classList.toggle('hidden');
      });

      row.appendChild(cell);
      userTable.appendChild(row);
    });
  }
  
function createFilterOptions() {
    const uniqueAges = [...new Set(userData.map(user => user.Age))];
    const uniqueGenders = [...new Set(userData.map(user => user.Gender))];
    const uniqueLocation = [...new Set(userData.map(user => user.Location))];

    filters.age.innerHTML = '<option value="all">All</option>';
    uniqueAges.forEach(age => {
        filters.age.innerHTML += `<option value="${age}">${age}</option>`;
    });

    filters.gender.innerHTML = '<option value="all">All</option>';
    uniqueGenders.forEach(gender => {
        filters.gender.innerHTML += `<option value="${gender}">${gender}</option>`;
    });

    filters.location.innerHTML = '<option value="all">All</option>';
    uniqueLocation.forEach(location => {
        filters.location.innerHTML += `<option value="${location}">${location}</option>`;
    });
}

function applyFilters() {
    const filteredUsers = userData.filter(user => {
        return (filters.age.value === 'all' || user.Age == filters.age.value) && 
               (filters.gender.value === 'all' || user.Gender == filters.gender.value)&&
               (filters.location.value === 'all' || user.Location == filters.location.value); 
    });
    populateUserTable(filteredUsers);
}

// Event listeners to trigger filtering
filters.age.addEventListener('change', applyFilters);
filters.gender.addEventListener('change', applyFilters);
filters.location.addEventListener('change', applyFilters);

// Initial setup
createFilterOptions();
populateUserTable(userData);
