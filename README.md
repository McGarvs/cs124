# CS124 Lab1 Design Document

## Design Requirements
Task # | Task Description
------ | ----------------
Index  | [Home Page](https://mcgarvs.github.io/cs124/) with links to each Task (Before/During/After)
Task 1 | In an empty list, create an item named "Buy new John Grisham book"
Task 2 | In a non-empty list, create an item named "Eat Lunch"
Task 3 | Mark the item named "Call Mom" completed (assumes there exists an item named "Call Mom").
Task 4 | Rename the item "Text John" to "Text John about bank statements" (assumes there exists an item named "Text John").
Task 5 | Show only uncompleted items.
Task 6 | Delete all completed items.

## Design Iterations
Our first design looked something like this: 
![First Task List Design](/Images/First-Design.JPG)
Our second design looked like this:
![Final Task List Design](/Images/Second-Design.JPG)

## Task Flow

### Task 1

### Task 2

### Task 3

### Task 4

### Task 5

### Task 6

## User Testing

## Challenges
One challenge that we faced was dealing with how to have users
delete tasks. Per the lab requirements, we made a button to
delete all completed tasks, but realized that was an unwieldy 
way of deleting single items. So we decided to add a delete button 
for each individual task and placed it next to the edit button. 
Additionally, we wanted to prevent users from accidentally
delete an item by having a pop-up confirmation for both the 
individual task delete button and the "delete all completed 
task" button. However, a pop-up would have required javascript, 
so we decided to leave that feature for a future re-implementation 
of this lab.

## Reflections