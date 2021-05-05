import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = "5d02d7c9";
  const APP_KEY = "b41a8b7a4f2cc3a47b6d8b2c9abd4667";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  const getRecipes = async () => {
    let response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data);
    setRecipes(data.hits);
  }

  useEffect(() => {
    getRecipes();
  }, [query]);

  const searchFunction = e => {
    setSearch(e.target.value);
  }

  const updateQuery = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form onSubmit={updateQuery} className="search-form">
        <input type="text" class="search-bar" value={search} onChange={searchFunction}></input>
        <button type="submit" class="search-button">Search</button>
      </form>

      <div className="recipes">
        {recipes.map(recipe => {
          return <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>;
        })}
      </div>
    </div>
  )
}

export default App;