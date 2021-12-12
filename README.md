# CS124 Lab5 Project Details
The document containing our thought processes and design decisions can be found 
[here](https://github.com/McGarvs/cs124/blob/lab5/docs/design.md).

The live version of our mobile Task Application can be found at the following link: 
[https://mcgarvs.github.io/cs124/](https://mcgarvs.github.io/cs124/)

Authors: Danica Du & Dylan McGarvey

Sharing logic for a given task list:
* OWNERS can...
  * Edit the task list
  * Share with additional emails
  * Delete the task list
* USERS SHARED WITH can...
  * Edit the task list
  * Unshare the document with themselves (effectively removing their own email from
  the task list's "sharedWith" list of emails, so the task list no longer shows up in
  this user's task list view)
