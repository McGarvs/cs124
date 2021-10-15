# CS124 Lab2 Design Document

## Design Decisions
Our Lab 1 Design Document can be found [here](https://github.com/McGarvs/cs124/tree/lab1#readme).
To recap, our final design from Lab 1 can be compared to the final design of Lab 2 in the table below:
Lab 1 Design                   | Lab 2 Design
------------------------------ | ---------------------------- 
![](./screenshots/lab1finaldesign.png) | ![](./screenshots/lab2finaldesign.png)

The key differences are as follows:
* Different font: the sans serif font in the newer design instead of the serif font
  in the older design presents a more modern and user-friendly look
* Box shadow around each to-do task: the added shadow simulates elevated tasks, which
  adds more emphasis without the grey background, which made the overall design seem a
  bit flat
* Icons for the "Edit" and "Delete" buttons to minimize cluttering of words in each task
  component
* Modal pop-ups to confirm delete requests
  ![Modal popup](./screenshots/modal-popup.png)
* "Delete Completed" button is hidden when completed tasks are hidden
    * Before hiding completed tasks  | After hiding completed tasks
      ------------------------------ | ---------------------------- 
      ![](./screenshots/before-deletecompleted-hidden.png) | ![](./screenshots/after-deletecompleted-hidden.png) 
* "Hide Completed" and "Deleted Completed" buttons are hidden when there are no completed tasks
  ![No comp tasks](./screenshots/no-completed-tasks.png)

## Alternative Designs
We were originally going to keep the "Edit" and "Delete" buttons as text, as it seemed to
be clear design for the user. However, as we continued to iterate on our design, we
realized that all this text in one component can seem cluttered quickly. We ended up
replacing these text buttons with icon buttons.
![Before rename](./screenshots/before-rename.png)

As seen below, our first design had a larger text input area for when a user edits a task. Our reasoning
was for the user to be able to see a larger portion of the text as they edit. However our User Testing showed
that resize wasn't really used, and that this text area tag caused some weird formatting, so we decided to switch it to a 
normal input tag instead.

Additionally, the Save button was placed to the far right such that if a user clicked quickly, they would often hit the 
Delete button and trigger the Delete popup. To help remedy this, our final design shifted it a bit to the left.

![During rename 1](./screenshots/during-rename-part1.png)

## User Testing
Our first round of user testing revealed several issues in our design. The user was able to add empty tasks, 
and since the task field was not cleared, it was annoying for them to have to delete their previously entered task. 
When editing a task, the user also accidentally clicked delete after saving since the buttons were overlaid. The user also thought
that the reformatting that occured when editing a task was strange. To remedy these issues, we redesigned our application to 
clear the input field on adding, prevent adding empty tasks, shift the save button, and simplifiy the edit input field. 

Our second round of user testing occured after the redesign from the first round of testing, and our Users overwhelming liked the app
and found it intuitive and usable. One change that occured in this phase was that we noticed that the blank space in our header was a bit
odd, so we decided to add a new title, and chose "My Tasks". 
## Final Design
Our final design from this lab looks like this:

![Lab 2 design](./screenshots/lab2finaldesign.png)

We will now walk through each of the supported features.

### Marking a task as completed/not completed
The user has a list of tasks -- some are completed, some are not.
![Before marking completed](./screenshots/fin-before-complete.png)

The user clicks on the open circle within the second task to mark it as completed.
![After marking completed](./screenshots/fin-after-complete.png)

### Adding a new task
To add a new task, the user types in text for the new task in the header.
![Before add 1](./screenshots/before-add-task-1.png)

After finishing typing in text, the user clicks the "+", or add, button to add
this new task to the list of tasks.
![Before add 2](./screenshots/before-add-task-2.png)

The new task appears at the bottom of the list, uncompleted by default.
![After add](./screenshots/after-add-task.png)

### Renaming a task
The user has a list of tasks and wants to rename the second. The user clicks on the button
with the edit icon.
![Before rename](./screenshots/fin-before-rename.png)

The user is autofocused on a text box where the original task name is the starting value.
![During rename 1](./screenshots/fin-during-rename-1.png)

The task text is edited to be something different, then the user clicks on "Save" to save changes.
![During rename 2](./screenshots/fin-during-rename-2.png)

After clicking save, the renamed task is what's displayed.
![After rename](./screenshots/fin-after-rename.png)

### Deleting a task
The user has a list of tasks and wants to delete the first one. The user clicks on the trash
can icon.
![Before delete](./screenshots/fin-before-delete.png)

A modal is displayed that asks the user to confirm or cancel their delete request. If cancel
is clicked, the modal will close with no changes to the list of tasks. However, the user does
want to delete and confirms this by clicking "Delete".
![During delete](./screenshots/fin-during-delete.png)

After the delete request is confirmed, the modal closes and the first task is removed from the
list of tasks.
![After delete](./screenshots/fin-after-delete.png)

### Hiding completed tasks
By default, the list of tasks displays all tasks, completed or not.
![Show all tasks](./screenshots/show-all-tasks.png)

The user clicks on the button "Hide Completed" to hide all completed tasks. In this state, the
"Delete Completed" button is hidden because there are no complete tasks displayed.
![Hide completed tasks](./screenshots/hide-comp-tasks.png)

### Deleting all completed tasks
The user clicks on "Deleted Completed" button to delete all completed tasks.
![Before delete all completed](./screenshots/before-delete-all-comp.png)

A modal pops up asking the user to confirm the request to delete all completed tasks.
![During delete all completed](./screenshots/during-delete-all-comp.png)

After the user confirms this "Delete Completed" request, the modal closes and all completed
tasks are deleted. Since there are no longer any completed tasks in this view, the "Hide Completed"
and "Delete Completed" buttons are hidden from view.
![After delete all completed](./screenshots/after-delete-all-completed.png)

## Challenges + Reflections
Deciding on which level of the component hierarchy each of the state variables should live,
as well as managing these states was quite challenging, but overtime, we became familiarized
with what would work best -- particularly, the importance of having a "single source of truth"
with all the nested components in this application.

Overall, we're very proud of the improvements we've made from the final product of Lab 1. The
features within this design are much more user-friendly. For instance, we noted in Lab 1 that
we planned to implement some sort of modal or pop-up dialog to minimize the possibility of
users accidentally deleted a task, and we successfully did so. Additionally, our end product of
this lab has a more aesthetic design. Specifically, the white background and sans serif font makes
the application appear less distracting and more clean and simple.
