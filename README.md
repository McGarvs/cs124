# CS124 Lab4 Project Details
The document containing our thought processes and design decisions can be found 
[here](https://github.com/McGarvs/cs124/blob/lab4/docs/design.md).

The live version of our mobile Task Application can be found at the following link: 
[https://mcgarvs.github.io/cs124/](https://mcgarvs.github.io/cs124/)

Authors: Danica Du & Dylan McGarvey


TODO: (higher priority)
* make add-email-input box clear input text after clicking "+" button
* add error checking to prevent duplicate emails to be added
* style "share" button
* indicate email of owner of task list in a nice looking way
* indicate to users who don't have permission to update/change lists (as of right now, 
only owners can make changes or add emails) that they don't have permission to do the action.
And prevent the UI from updating when (in the console logs), there are permission errors
since this user doesn't have the permission to do this action.
* (COMPLETED) hide delete-list button to people who are NOT owners of the current tasklist
* (COMPLETED) hide delete-email button to people who do not have that email and are NOT owners of the current tasklist

TODO: (later)
* allow users who are not the tasklist owner to make changes to the task list (but not allowed
to edit share permissions)
* allow users (who are not owners of a tasklist) delete that tasklist from their view (effectively
unsharing it with themselves) 

Optional:
* support editing list names