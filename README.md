Trip Organizer
=============
Creators: Matt Wright, Ateeq Bahaduri, Jennifer Evenson

Objective
=========
Keep travel plans and reservation information for (primarily) multi-city trips all in one place for easy reference on the go.

Example use case is an American traveling to Europe for 2 weeks and visiting 4 cities in those 2 weeks. 
* For each city, the person will have some method of traveling there - flight, train, boat, etc. - as well as some way of getting to and from airports / train stations. 
* There might be rental cars. 
* They'll have hotel reservations for each city, as well as possibly having reservations for tours, museums, fancy restaurants, going up in the Eiffel Tower, etc. 
* There's a lot to keep track of and it's a pain to keep digging through email to find reservation times on confirmation emails.

Functionality
=============
* Mobile first design. Assume that much of the planning will probably happen on a computer, but once the data is loaded, most reference to the data will happen on a phone.

* Users Collection
    * UserID (auto-generated)
    * User name
    * User password - hashed
    * Trip IDs (array of Trip IDs)

* Fields available for trips
	*	TripID (auto-generated)
	*	Trip Name
	*	User Name ID (link to the User Collection)
	*	Trip Start Date
    *	Trip End Date
	*	Destination ID (array of IDs to link to the Destination Collection)

* Fields available for destinations
	*	DestinationID (auto-generated by the database)
	*	Name
	*	Date start (include day of the week when displaying)
	*	Date end
	*	Climate -- selector (hot, cold, mixed)
	*	Type of destination? (city, rural, road trip stop)
	*	Transportation IDs (array of IDs to link to the Transportation Collection)
	*	Reservation IDs (array of IDs to link to the Transportation Collection)

Technologies Used
=================
* Front End: HTML5, CSS3, JavaScript, React, React Router, Redux + Thunk, Axios
* Back End: Express, MongoDB, Mongoose
* Hosted at Heroku with the database at MLab

Ideas for Improvements
======================
* Assign different permission levels to users, e.g., have an Admin user for the App as a whole, allow users to collaborate on trips with other users, having one of them be the "owner", while the others can view or edit, depending on permissions.

* Per destination, keep track of sightseeing ideas - days and hours open, prices, address, website, tips for visiting, etc.

* Have a Packing List component, with some built-in templates for different types of trips (e.g., "3 day ski trip", "1 week beach vacation", "indefinite travel with carry-on only", "weekend in the big city to attend the Theater") that would auto-populate the packing list to give the user a starting point.

* Have a Pre-trip To Do component for quick capture ("book the flights", "book the hotel in Paris", "book the train to Munich"). When the user is ready to complete one of those tasks, clicking it will take them to the appropriate data entry form, and once saved, will delete the task.

* Be able to save all the data on the device so it can be accessed without internet access.

Inspiration for the Project
===========================
This was an [assignment](assignment.md) for a class. 
