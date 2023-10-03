# IT News
IT News is a web application that displays news articles related to IT. The project was created as part of the curriculum for the Hack Your Future coding school. The project was developed as a part of the curriculum at the Hack Your Future coding school, utilizing the React library for the frontend and the MongoDB database to store the news articles. The initial template data for the application is provided in the `articles.json` file.
Check out the deployed app [here](https://it-news-project.netlify.app/).


### Key Features:
- **NewsList**: Displays the latest 10 news articles on main page.
- **Search**: Enables users to search for news articles using keywords. The search is powered by the Fuse.js library.
- **NewsFeed**: Displays all news and groups the news articles by date. It also provides a "Load More" button that allows the user to view older news articles if available.

### Custom HTTPS Endpoints for MongoDB
In addition to the application itself, the project includes custom HTTPS endpoints for MongoDB. The endpoints are set up using MongoDB's Stitch service, which provides a simple way to integrate a database with a frontend application without needing to build and maintain a backend server. 

Endpoint for retrieving the latest 10 news articles:
https://eu-central-1.aws.data.mongodb-api.com/app/data-owhxg/endpoint/news

Here's the function, I use for this endpoint:
```javascript
exports = async function() {
  const collection = context.services.get("Cluster0").db("it-news").collection("articles");

  try {
    const findResult = await collection.find();
    return findResult;
  } catch (err) {
    console.log("Error occurred while executing find operation:", err.message);
    return err.message;
  }
};
```

Endpoint for retrieving all news articles:
https://eu-central-1.aws.data.mongodb-api.com/app/data-owhxg/endpoint/allnews

The function for this endpoint:
```javascript
exports = async function() {
  const collection = context.services.get("Cluster0").db("it-news").collection("articles");

  try {
    const findResult = await collection.find().sort({ publishing_time: -1 }).limit(10);
    return findResult;
  } catch (err) {
    console.log("Error occurred while executing find operation:", err.message);
    return err.message;
  }
};
```
Note that these functions are for demonstration purposes only and are not needed to build the application.

Thanks for checking out my project! I hope you found it interesting and useful. If you have any questions or suggestions for improvements, feel free to reach out to me.
