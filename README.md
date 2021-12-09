# CS124 Lab4 Project Details
The document containing our thought processes and design decisions can be found 
[here](https://github.com/McGarvs/cs124/blob/lab4/docs/design.md).

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

TODO: (higher priority)
* make add-email-input box clear input text after clicking "+" button
* add error checking to prevent duplicate emails to be added
  * COMPLETED in code but still needs UI to let user know
* style "share" button
* indicate email of owner of task list in a nice looking way
*  (COMPLETED) prevent the UI from updating when (in the console logs), there are permission errors
since this user doesn't have the permission to do this action.
* (COMPLETED) hide delete-list button to people who are NOT owners of the current tasklist
* (COMPLETED) hide delete-email button to people who do not have that email and are NOT owners of the current tasklist

TODO: (later)
* allow users who are not the tasklist owner to make changes to the task list (but not allowed
to edit share permissions)
* allow users (who are not owners of a tasklist) delete that tasklist from their view (effectively
unsharing it with themselves) 
* double check that "verify email" button works

Optional:
* support editing list names
* add hovering effect over list of tasklists in landing page