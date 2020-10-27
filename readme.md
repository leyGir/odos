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
- You cannot delete or edit someone else's list
- You cannot add photos to someone else's list
- You cannot see someone else's private list
- You cannot modify someone else's data
- You cannot modify the creation dates of photos or lists

## URLs

### User

- see my user account: http://odos.herokuapp.com/users/:userId GET
- add one user: http://odos.herokuapp.com/users POST
- modify one user: http://odos.herokuapp.com/users/:userId PATCH
- delete one user: http://odos.herokuapp.com/users/:userId DELETE

### Pictures of places

- add one picture: http://odos.herokuapp.com/pictures POST
- see one picture: http://odos.herokuapp.com/pictures/:pictureId GET
- see the feed: http://odos.herokuapp.com/pictures GET
- delete one picture: http://odos.herokuapp.com/pictures/:pictureId DELETE
- modify one picture: http://odos.herokuapp.com/pictures/:pictureId PUT

### Favorites

- add one list: http://odos.herokuapp.com/users/userId/lists POST
- see all my favorites lists: http://odos.herokuapp.com/users/:userId/lists GET
- see one list: http://odos.herokuapp.com/users/:userId/lists/:listId GET
- modify one list: http://odos.herokuapp.com/users/:userId/lists/:listId PATCH
- delete one list: http://odos.herokuapp.com/users/:userId/lists/:listId DELETE
- delete a photo from a list: http://odos.herokuapp.com/users/:userId/lists/:listId/picture/:pictureId DELETE

## Real-time API

- Feed: when a new pitcture is added, the feed is updated
- Photo counter: counter that updates as soon as a photo is added
