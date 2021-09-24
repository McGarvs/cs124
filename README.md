# CS124 Lab1 Design Document

## Design Iterations
For the first design, we planned for our web-app to have a simple header 
that contained an item entry field, and to have the task list items below it. 
Not shown in the first design are "Show Uncompleted" and "Delete Completed" buttons,
which we planned to add, but we ended up deciding to do a total refactor before getting
around to implementing them.
<br/>Our first design looked like this: 
![First Task List Design](/screenshots/First-Design.JPG)

<br/>Our second design looked like this:
![Second Task List Design](/screenshots/Second-Design.JPG)
<br/>Refactoring Highlights from the first design to the second design:
* Removed the app title: It looked ugly and wasn't really necessary, since it is self-evident what the app does.
* Color scheme change: The first design's colors were picked a bit arbitrarily and looked a bit ugly.
* Removed the unnecessary and slightly confusing form clear button
* Added delete buttons and colored them red
* Shortened the ridiculously long form field
* Moved and renamed the item entry form submit button for better clarity
* Spaced out the task items, making unnecessary the alternating colors and color change on hover
* Signified completed items with a green dot, instead of strike-through text (which made it hard to read)

Our third Design occurred after Feedback from a User Test and had some minor changes:
![Third Task List Design](/screenshots/Third-Design.JPG)
<br/>Refactoring Highlights from the second design to the third design:
* Changed the green dots to a checkmark to signify a completed task
* To Do in a Future Refactor: Add a pop-up confirmation for deleting items with javascript

## Task Flow
### Design Requirements
Task # | Task Description
------ | ----------------
Index  | [Home Page](https://mcgarvs.github.io/cs124/) with links to each Task (Before/During/After)
Task 1 | In an empty list, create an item named "Buy new John Grisham book"
Task 2 | In a non-empty list, create an item named "Eat Lunch"
Task 3 | Mark the item named "Call Mom" completed (assumes there exists an item named "Call Mom").
Task 4 | Rename the item "Text John" to "Text John about bank statements" (assumes there exists an item named "Text John").
Task 5 | Show only uncompleted items.
Task 6 | Delete all completed items.
### Task 1
[Before](https://mcgarvs.github.io/cs124/Tasks/task_1_before.html): 
The user enters "Buy new John Grisham book" into the field and clicks "Add Item".
<br/>[After](https://mcgarvs.github.io/cs124/Tasks/task_1_after.html): 
The page reloads and the user sees their task item.
### Task 2
[Before](https://mcgarvs.github.io/cs124/Tasks/task_2_before.html): 
The user enters "Eat Lunch" into the field and clicks "Add Item".
<br/>[After](https://mcgarvs.github.io/cs124/Tasks/task_2_after.html): 
The page reloads and the user sees their task item appear under "Buy new John Grisham book".
### Task 3
[Before](https://mcgarvs.github.io/cs124/Tasks/task_3_before.html): 
The user hits the empty circle by the "Call Mom" item, to mark it complete.
<br/>[After](https://mcgarvs.github.io/cs124/Tasks/task_3_after.html): 
The page reloads and the user sees the circle with a check mark.
### Task 4
[Before](https://mcgarvs.github.io/cs124/Tasks/task_4_before.html): 
The user finds the "Text John" item and clicks the "Edit" button to the left.
<br/>[During](https://mcgarvs.github.io/cs124/Tasks/task_4_during.html): 
The user clicks "Text John" and replaces the text with "Text John about bank statements" and clicks save.
<br/>[After](https://mcgarvs.github.io/cs124/Tasks/task_4_after.html): 
The page reloads and the user sees the updated task item, and can once again edit it.
### Task 5
[Before](https://mcgarvs.github.io/cs124/Tasks/task_5_before.html): 
The user clicks "Show Uncompleted".
<br/>[After](https://mcgarvs.github.io/cs124/Tasks/task_5_after.html): 
The page reloads and the completed "Call Mom" item disappears and "Show Uncompleted" becomes "Show All". 
The user can click "Show All" to make the "Call Mom" item reappear.
### Task 6
[Before](https://mcgarvs.github.io/cs124/Tasks/task_6_before.html): 
The user clicks "Delete Completed"
<br/>[After](https://mcgarvs.github.io/cs124/Tasks/task_6_after.html): 
The page reloads and the completed "Call Mom" item disappears and is deleted.
## User Testing
We did a single user test with a friend, where we asked them to accomplish Tasks 1-6 
on each tasks' "before" page. 
Overall, they were able to accomplish each task without much difficulty. 
One problem they had was identifying
which of the listed items were completed or not, but they eventually figured out that it was with the green dot. 
On review, we decided that the dot should be replaced with a check mark. 
We also realized in the review that our delete buttons had no "warning" and that in a future revision
we should add a javascript pop-up confirmation message for our "delete" and "delete completed" buttons.
## Challenges
One challenge that we faced was dealing with how to have users
delete tasks. Per the lab requirements, we made a button to
delete all completed tasks, but realized that was an unwieldy 
way of deleting single items. So we decided to add a delete button 
for each individual task and placed it next to the edit button. 
Additionally, we wanted to prevent users from accidentally
deleting an item by having a pop-up confirmation for both the 
individual task delete button and the "delete all completed 
task" button. However, a pop-up would have required javascript, 
so we decided to leave that feature for a future re-implementation 
of this lab.

## Reflections
In our design, we wanted to make sure the display looked clean and 
uncluttered through a soft color scheme and a comfortable amount of 
negative space. Additionally, we’re proud that our user testing showed 
that the user flow of our interface was self-explanatory.