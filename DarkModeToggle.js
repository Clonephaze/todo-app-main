// Function to toggle the 'dark-mode' class on the body element
function toggleDarkMode() {
    // Check if the 'dark-mode' class is already present
    if (document.body.classList.contains('dark-mode')) {
        // If it is, remove it and store 'false' in local storage
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    } else {
        // If it isn't, add it and store 'true' in local storage
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    }
   }
   
   // Function to load the user's last choice from local storage when the page loads
   function loadDarkMode() {
    // Retrieve the value of the 'darkMode' key from local storage
    var darkMode = localStorage.getItem('darkMode');
    // If the value is 'true', add the 'dark-mode' class to the body element
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    } 
    // If the value is 'false', remove the 'dark-mode' class from the body element
    else if (darkMode === 'false') {
        document.body.classList.remove('dark-mode');
    }
   }
   
   // Call the loadDarkMode function when the page loads
   window.onload = loadDarkMode;
   