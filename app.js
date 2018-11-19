'use strict';
// ***REFACTOR USING <buttons> and one function to render the <li>
//  *delete button
//  *submit button
//  * call a function to add items
//  * two span items on each li,  style them with in-line block
//  *add new list items to top, try using the array unshift method
//  *JQuery Animations: visual clues for user, almost as if the app is "a training video"
    //*when rendering a new list item, try to render each item as a different color
    //*span element: when user hovers over the span (X or the button), style CSS so that on-hover changes to a hand icon
    //*change span to in-line block 

//*** */global state object, an empty array. I can use Array Methods 'push or unshift' to add items to the top or bottom of array
const state = [];

// pre populate the page with To-Do

//**** refactor this to a button rather than keypress not clear users */
$("input[type='text']").keypress(function(event) { 
    if(event.which === 13) {
    //grab and save user to-do input 
    let toDoText = $(this).val();
    //passes as empty string to input value and clears the input field
    $(this).val("");
    //render a new li for the new input
    $("ul").append("<li>" + "<span> X </span>" + toDoText + "</li>")
  }       
});
// ***check out todos
// can only add JQuery listener to an element that already exists when the page loads
$("ul").on("click", "li", function() {
    $(this).toggleClass("completed");
});

//***User clicks on one item
//***checks items by using conditional statement
// $("li").click(function(){
     // if the li is gray
//     if ($(this).css("color") === "rgb(128, 128, 128)" ) {
//     // turn it back to black
//         // $(this).css("color", "black");
//         $(this).css({
//             color: "black",
//             textDecoration: "none"
//         });
//     }
//     else {
//         $(this).css({
//             color: "gray",
//             textDecoration: "line-through"
//         });
//     }
// });

//***delete the to-do
//***listen on an event that exists when the page loads
$("ul").on("click", "span", function(event) {
    // alert("clicked on a span");
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    //stops event from bubbling up to other elements
    event.stopPropagation();
});

