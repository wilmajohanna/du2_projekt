"use strict";

/*
  Notice the images on the page header.
  G: The images can be hard-coded in the CSS (as background-image)
  */

// Create Filter Elements
create_countries_cities_filters();

create_filters({ name: "level", array_element: LEVELS });
create_filters({ name: "subject", array_element: SUBJECTS });
create_filters({ name: "language", array_element: LANGUAGES });

// Add Interaction of search field button
document.querySelector("#search_field button").addEventListener("click", update_programmes);

// Initialise programmes list by calling relevant function
update_programmes();


// VG
// Add Interaction of filter containers (select-deselect all filters in the container)
// Example: Click anywhere on the language-filter-container and all the language filters
// (spanska, svenska, engelska, franska) will toggle.


// VG
// Add Interaction of button toggle-all-cities

