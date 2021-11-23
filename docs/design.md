# CS124 Lab4 Design Document

## Design Decisions
Our previous Lab 3 Design Document can be found [here](https://github.com/McGarvs/cs124/blob/lab3/docs/design.md).
To recap, our final design from Lab 4 can be compared to the final design of Lab 3 in the table below:

Lab 3 Design  | Lab 4 Design - Home Page | Lab 4 Design - Tasks Page
------------- | ------------------------ | ---------------------------
![](./screenshots/lab3-finaldesign.png) | ![](./screenshots/lab4-finaldesign-home.png) | ![](./screenshots/lab4-finaldesign-tasks.png)

The key differences are as follows:
* Dynamic Resizing based on the device's screen size
* Multiple List Functionality: 
  * New Page displayed on first load of the web app, allows list creation and selection
  * On the List Display Page, the header was changed from "My Tasks" to the list's name
  * The List Display Page allows selection of different lists, and deletion of the current list
* Accessibility Features:
  * Can now use tab and enter on the custom dropdowns for sort and list selection
  * Improved usability with screen reader
  * App displays better upon zooming up to 200%

## Alternative Designs

## User Testing

## Final Design
Our final design from this lab looks like this:

Lab 4 Design - Home Page | Lab 4 Design - Tasks Page
------------------------ | ---------------------------
![](screenshots/lab4-finaldesign-home.png) | ![](screenshots/lab4-finaldesign-tasks.png)

We will now walk through each of the supported features.

### Multi-List Features
These are the new features that have been added to support multi-list functionality.

#### Adding a New List
The user is at the Home Page, and sees that there are no lists.
![Before adding new list](./screenshots/before-addlist.png)

The user is at the Home Page, and types in a new list name in the field.
![During adding new list](./screenshots/during-addlist.png)

The user hits the plus button next to the form, and then goes into the dropdown to see their list.
![After adding new list](./screenshots/after-addlist.png)

The user clicks their list in the dropdown, and are taken to the list display page, with no current tasks.
![Seeing the new list](./screenshots/after2-addlist.png)

#### Deleting the Current List
The user is at the display page for a list.
![Before deleting list](./screenshots/before-deletelist.png)

The user clicks the trashcan icon by the list's name, and brings up a modal.
![During deleting list](./screenshots/during-deletelist.png)

The user clicks to confirm delete on the modal. They are brought to the home page, 
and they see that the list no longer exists.
![After deleting list](./screenshots/after-deletelist.png)

#### Selecting a Different List
If the user is at the Home Page, they click the "Choose a List" button.

If the user is at a List Display Page, they click 



### List-Specific Features
Since our List specific features have largely remained the same, we will re-use the pictures from lab 3.
The only visual difference between these photos and lab4 is the following:
* "My Tasks" header has been renamed to dynamically display the list name
* An arrow icon button that displays a dropdown to switch between lists
* A "Home" button that takes the user to the initial page

#### Marking a task as completed/not completed
The user has a list of tasks -- some are completed, some are not.

![Before marking completed](./screenshots/before-complete.png)

The user clicks on the open circle within a task to mark it as completed.

![After marking completed](./screenshots/after-complete.png)

#### Adding a new task
To add a new task, the user types in text for the new task in the header.

![Before add 1](./screenshots/before-add-task-1.png)

After finishing typing in text, the user clicks the "+", or add, button to add
this new task to the list of tasks.

![Before add 2](./screenshots/before-add-task-2.png)

The new task appears at the top of the list, uncompleted with no priority by default.

![After add](./screenshots/after-add-task.png)

#### Editing a task
The user has a list of tasks and wants to rename and re-prioritize the second.
The user clicks on the button with the edit icon.

![Before rename](./screenshots/before-rename.png)

The user is autofocused on a text box where the original task name is the starting value.

![During rename 1](./screenshots/during-rename-1.png)

The task text is edited to be something different, and the user selects a new priority level.
The user then clicks on "Save" to save changes.

![During rename 2](./screenshots/during-rename-2.png)

After clicking save, the renamed task is displayed with a new priority level.

![After rename](./screenshots/after-rename.png)

#### Deleting a task
The user has a list of tasks and wants to delete the first one. The user clicks on the trash
can icon.

![Before delete](./screenshots/before-delete.png)

A modal is displayed that asks the user to confirm or cancel their delete request. If cancel
is clicked, the modal will close with no changes to the list of tasks. However, the user does
want to delete and confirms this by clicking "Delete".

![During delete](./screenshots/during-delete.png)

After the delete request is confirmed, the modal closes and the first task is removed from the
list of tasks.

![After delete](./screenshots/after-delete.png)

#### Hiding completed tasks
By default, the list of tasks displays all tasks, completed or not.

![Show all tasks](./screenshots/show-all-tasks.png)

The user clicks on the button "Hide Completed" to hide all completed tasks. In this state, the
"Delete Completed" button is hidden because there are no complete tasks displayed.

![Hide completed tasks](./screenshots/hide-comp-tasks.png)

#### Deleting all completed tasks
The user clicks on "Deleted Completed" button to delete all completed tasks.

![Before delete all completed](./screenshots/before-delete-all-comp.png)

A modal pops up asking the user to confirm the request to delete all completed tasks.

![During delete all completed](./screenshots/during-delete-all-comp.png)

After the user confirms this "Delete Completed" request, the modal closes and all completed
tasks are deleted. Since there are no longer any completed tasks in this view, the "Hide Completed"
and "Delete Completed" buttons are hidden from view.

![After delete all completed](./screenshots/after-delete-all-comp.png)

#### Changing the task display order
The user sees the sort button and decides to click it, bringing up the drop-down menu.

![Before Priority Sort](./screenshots/before-sort.png)

The user sees that they can sort by alphabetic, priority, and creation date.
They decide to click sort by priority, and then see the tasks reordered, with higher priorities
higher up on the list.

![After Priority Sort](./screenshots/after-sort.png)


## Challenges + Reflections