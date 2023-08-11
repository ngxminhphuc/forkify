# :rocket: forkify

<br>
<div align="center"> 
  <img src="https://github.com/ngxminhphuc/forkify/assets/55644028/a10462b0-efe1-43da-b1dd-5d3ce9da2013" alt="forkify logo" />
</div>
<br>

<p align="center">
  <img alt="Demo" src="https://img.shields.io/badge/demo-online-green.svg" />

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/ngxminhphuc/forkify?color=blue">

  <img alt="License" src="https://img.shields.io/github/license/ngxminhphuc/forkify?color=yellow">
</p>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#classical_building-architecture-and-flowchart-overview">Architecture</a> &#xa0; | &#xa0;
  <a href="#hammer_and_wrench-installation-guide">Installation</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a>
</p>
<br>

## :dart: About

**forkify** is a web application designed to simplify your cooking journey, your go-to platform for discovering, saving, and preparing a wide range of delicious recipes while providing step-by-step instructions, ingredient lists, and serving suggestions for each recipe.

With an extensive collection of recipes from around the world, **forkify** gives a chance to explore new flavors, learn cooking techniques, and create memorable meals. Visit now at [forkify // Search over 1,000,000 recipes](https://forkify-ngxminhphuc.netlify.app) for more experience.

![forkify demo](https://github.com/ngxminhphuc/forkify/assets/55644028/10c6e7d5-8829-4a9f-9620-7dc929c28f18)

> Inspired by [forkify-v2 — Jonas Schmedtmann](https://forkify-v2.netlify.app/) while continuing to practice more about HTML5, CSS3, SASS/SCSS and Javascript skills, this project is built upon the robust foundation of [Forkify API v2](https://forkify-api.herokuapp.com/v2/), which offers helpful features. This includes recipe searching functionality across a diverse collection, as well as the ability to interact with recipes through actions such as creation and deletion.

## :sparkles: Features

- ### :seedling: Original Features

|      Features      | Description                                                                                                                                 |
| :----------------: | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Search for recipes | :heavy_check_mark: Search by name recipes or ingredients <br> :heavy_check_mark: Pagination search results                                  |
|    View recipe     | :heavy_check_mark: Display cooking time, servings, ingredients, publisher and reference to cooking instructions                             |
|  Update servings   | :heavy_check_mark: Update all amount of ingredients according to current number of servings                                                 |
|   Create recipes   | :heavy_check_mark: Create and upload your own recipes                                                                                       |
|  Bookmark recipes  | :heavy_check_mark: Save your favorite recipes for future uses<br> :heavy_check_mark: Store bookmarks data in the browser with local storage |

- ### :bulb: Additional Features in This Project

  :heavy_check_mark: Update user's uploaded recipes - name, image, publisher, cooking time, servings and ingredients  
  :heavy_check_mark: Delete user's uploaded recipes  
  :heavy_check_mark: Remove deleted recipes by other browsers in bookmark when page loads

## :classical_building: Architecture and Flowchart Overview

### Recipe Loading Architecture

![forkify-architecture-recipe-loading](https://github.com/ngxminhphuc/forkify/assets/55644028/10a32edc-268b-4ea4-89d0-a44e3af9a9be)

  <p align="center">MVC Implementation for Display Recipe</p>

### Flowchart

![forkify-flowchart](https://github.com/ngxminhphuc/forkify/assets/55644028/f7d1e80d-dcda-4f9b-91e1-a1ad481d91fb)

  <p align="center">The step-by-step process of creating <i>forkify</i> system</p>

## :hammer_and_wrench: Installation Guide

Before starting, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed, then following these steps:

1. Clone this project:

   ```bash
   git clone https://github.com/ngxminhphuc/forkify
   ```

1. Access directory:

   ```bash
   cd forkify
   ```

1. Install dependencies:

   ```bash
   npm install
   ```

1. Run the project:

   ```bash
   npm run start
   ```

## :memo: License

This project is under license from MIT. For more details, see the [LICENSE](LICENSE) file.
