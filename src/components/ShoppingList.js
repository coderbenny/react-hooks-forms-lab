import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState('')
  const [allItems, setAllItems] = useState(items)

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = allItems.filter((item) => {
    const categoryCondition = selectedCategory === 'All' || item.category === selectedCategory
    const searchCondition = item.name.toLowerCase().includes(searchText.toLowerCase())
    return categoryCondition && searchCondition;
  });


  function handleSearchChange(event) {
    const newText = event.target.value
    setSearchText(newText)
  }

  function handleAddItem(item) {
    const updatedItems = [...allItems, item]
    setAllItems(updatedItems)
  }

  return (
    <div className="ShoppingList">
      <ItemForm props={allItems} onItemFormSubmit={handleAddItem} />
      <Filter search={searchText} onSearchChange={handleSearchChange} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
