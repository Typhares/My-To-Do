
//Requirements
//**managing state in jQuery web apps.
//**Use DOM manipulation and traversal to dynamically add and remove HTML elements and apply styles.
//**enter items they need to purchase by entering text and hitting "Return" or clicking the "Add item" button
//**check and uncheck items on the list by clicking the "Check" button
//**permanently remove items from the list
//**Using this and event delegation
//.submit(), event.preventDefault(), toggleClass(), and closest().
//**create the state variable as an Array of item Objects containing properites. We can then call the .map method on the array to loop through each Obj and find it's index */
'use strict';
//HELP LINE 60
let state = {
	items: [
//		{ name: "Return to TJMaxx", checked: false },
//		{ name: "Paper BestBuy", checked: false }
	]
}
 /*
   * Create the HTML template for one todo item
   * @param  {boolean} checked - true if checked, false if not
   * @return {number} index - The index of the item in the store */

let listItemTemplate = (
  '<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
      '<button class="js-shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
      '</button>' +
      '<button class="js-shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);
/*
Manage State 
**can I reverse the order with state.items.unshift, pop() or shift (displayName: item, checkedOff: false)
*/
function addItem(state, item) {
  state.items.push({
    displayName: item,
    checkedOff: false
  });
}
//************BUG STARTS HERE WITH param named currentItemIndex
function getItem(state, currentItemIndex) {
	return state.items[currentItemIndex];
}

function deleteItem(state, currentItemIndex) {
	return state.items.splice(currentItemIndex, 1)
}

function updateItem(state, currentItemIndex, newStateItem) {
	state.items[currentItemIndex] = newStateItem;
}
//DOM manipulation
//The find method executes the callback function once for each index of the array until it finds one where callback returns a true value. If such an element is found, find immediately returns the value of that element. 
function renderItem(item, itemId, itemTemplate, itemDataAttr ) {
	let element = $(itemTemplate);
//WHERE DOES SHOPPING LIST ITEM COME FROM
	element.find('.js-shopping-item').text(item.displayName);
	if (item.checkedOff) {
		element.find('.js-shopping-item').addClass('shopping-item__checked');
	}
		element.find('js-shopping-item-toggle')
		element.attr(itemDataAttr, itemId);
		return element;
}
//LINE 76
function renderElements (state, listElement, itemDataAttr) {
	let renderedItems = state.items.map(
    	function(item, index) {
      		return renderItem(item, index, listItemTemplate, itemDataAttr);
  	});
  	listElement.html(itemsHTML);
}

function renderList(state, listElement, itemDataAttr) {
  let itemsHTML = state.items.map(
	function(item, index) {
      return renderItem(item, index, listItemTemplate, itemDataAttr);
  	});
	listElement.html(itemsHTML);
}

//Event Listeners
//what is the new element identifyer is that an HTML attributet
//does state have to be passed as the last param
function handleAddItems (formElement, newItemIdentifier, itemDataAttr, listElement, state) {
  	formElement.submit(function(event){
      event.preventDefault();
      let newItem = formElement.find(newItemIdentifier).val();
      addItem(state, newItem);
      renderList(state, listElement, itemDataAttr);
      // reset form
      this.reset();
  });
}
//	THIS IS WHERE THE BUG IS DOES THE local variable temIndex the same as the 
function handleItemDeletes(formElement, removeIdentifyer, itemDataAttr, listElement, state) {
	listElement.on("click", removeIdentifyer, function(event) {
		let itemIndex = parseInt($(this).closest('li').attr(itemDataAttr));
		deleteItem(state, itemIndex);
		renderList(state, listElement, itemDataAttr);
	})
}
	
function handleItemToggles(listElement, toggleIdentifier, itemDataAttr, state) {
  listElement.on('click', toggleIdentifier, function(event) {
   	let itemId = $(event.currentTarget.closest('li')).attr(itemDataAttr);
   	let oldItem = getItem(state, itemId);

    updateItem(state, itemId, {
      displayName: oldItem.displayName,
      checkedOff: !oldItem.checkedOff
    });
    renderList(state, listElement, itemDataAttr)
  });
}

$(function() {
	let formElement = $('#js-shopping-list-form');
	let listElement = $(".js-shopping-list");
	  // from index.html -- it's the id of the input
  // containing shopping list items
	let newItemIdentifier = '#shopping-list-entry';
	let removeIdentifyer = '.js-shopping-item-delete';
	let itemDataAttr = 'data-list-item-id';
	let toggleIdentifier = '.js-shopping-item-toggle';
	
	handleAddItems(formElement, newItemIdentifier, itemDataAttr, listElement, state);
	handleItemDeletes( formElement, removeIdentifyer, itemDataAttr, listElement, state)
	handleItemToggles(listElement, toggleIdentifier, itemDataAttr, state);
});
	













