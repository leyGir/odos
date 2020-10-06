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
  - Necessarily linked with a user 
- **Favorites list**
  - List name
  - Creation date
  - Last modification date
  - Linked with pictures of places
  - Necessarily linked with a user
  - Public or private
  
    ![](https://github.com/Soraya97/odos/blob/master/images/odos.png)

## Authorization

- You cannot delete or edit someone else's photos
- You cannot delete or edit a list of someone else
- You cannot add photos to someone else's list
- You cannot see someone else's private list
- You cannot modify someone else's data
- You cannot modify the creation dates of photos or lists

## URLs

### User

- see my user account: http://odos.herokuapp.com/users/id GET
- add one user: http://odos.herokuapp.com/users POST
- modify one user: http://odos.herokuapp.com/users/id PUT
- delete one user: http://odos.herokuapp.com/users/id DELETE

### Pictures of places

- add one picture: http://odos.herokuapp.com/pictures POST
- see one picture: http://odos.herokuapp.com/pictures/id GET
- see the feed: http://odos.herokuapp.com/pictures GET
- delete one picture: http://odos.herokuapp.com/pictures/id DELETE
- modify one picture: http://odos.herokuapp.com/pictures/id PUT

### Favorites

- see all my favorites lists: http://odos.herokuapp.com/users/id/lists GET
- see one list: http://odos.herokuapp.com/users/id/lists/id GET
- modify one list: http://odos.herokuapp.com/users/id/lists/id PUT
- delete one list: http://odos.herokuapp.com/users/id/lists/id DELETE

## Real-time API

- Feed: when a new pitcture is added, the feed is updated
- Photo counter: counter that updates as soon as a photo is added

