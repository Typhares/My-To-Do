'use strict';
// ***REFACTOR USING <buttons> 
//  *delete button
//  *submit button

// ***check out todos
// can only add JQuery to an element that already exists
// add a listener to an element that exists when the page loads
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

//**** add an event listener that fires when user hits 'enter' key*/
//*** */
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
// $("ul").click(function() {
//     alert("clicked on a ul");
// });

// $("#container").click(function() {
//     alert("clicked on a container");
// });

// $("body").click(function() {
//     alert("clicked on a body");
// });