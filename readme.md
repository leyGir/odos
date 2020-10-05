# Odos

Application for sharing geotagged travel photos with favorites list function.

## Ressources

- **User**
  - Username and/or email
  - Password
  - Registration date
- **Pictures of places**
  - Description
  - Geolocation
  - Picture
  - Creation date
  - Last modification date
  - Linked with a user
- **Favorites list**
  - List name
  - Creation date
  - Modification date
  - Linked with place
  - Public or private

## Authorization

- You cannot delete or edit someone else's photos
- You cannot delete or modify a list of someone else
-  You cannot add photos to someone else's private list (unless it is shared)
-  You cannot modify someone else's data
-  You cannot modify the creation dates of photos or lists

## URLs

### User

- see my user account: http://odos.herokuapp.com/users/id GET
- add one user: http://odos.herokuapp.com/users POST
- modify one user: http://odos.herokuapp.com/users/id PUT or PATCH
- delete one user: http://odos.herokuapp.com/users/id DELETE

### Pictures of places

- add one picture: http://odos.herokuapp.com/pictures POST
- see one picture: http://odos.herokuapp.com/pictures/id GET
- see the feed: http://odos.herokuapp.com/pictures GET
- delete one picture: http://odos.herokuapp.com/pictures/id DELETE
- modify one picture: http://odos.herokuapp.com/pictures/id PUT or PATCH

### Favorites

- see all my favorites lists: http://odos.herokuapp.com/users/id/lists GET
- see one list: http://odos.herokuapp.com/users/id/lists/id GET
- modify one list: http://odos.herokuapp.com/users/id/lists/id PUT or PATCH
- delete one list: http://odos.herokuapp.com/users/id/lists/id DELETE

## Real-time API

- Feed: when a new pitcture is added, the feed is updated
- Photo counter: counter that updates as soon as a photo is added

