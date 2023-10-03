<?php
require 'vendor/autoload.php';
require 'config.php';

// Set CORS headers to allow requests from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// GET latest 10 news articles
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['latest'])) {
    try {
        $latestArticles = $collection->find([], ['limit' => 10, 'sort' => ['publishing_time' => -1]]);
        $articles = iterator_to_array($latestArticles);
        // Convert ObjectIDs to plain strings in the result
        $articles = array_map(function($article) {
            $article['_id'] = (string) $article['_id'];
            return $article;
        }, $articles);
        echo json_encode($articles);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to retrieve latest articles']);
    }
}

// GET all news articles
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['all'])) {
    try {
        $allArticles = $collection->find();
        $articles = iterator_to_array($allArticles);
        // Convert ObjectIDs to plain strings in the result
        $articles = array_map(function($article) {
            $article['_id'] = (string) $article['_id'];
            return $article;
        }, $articles);
        echo json_encode($articles);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to retrieve all articles']);
    }
}

// POST a new news article
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jsonInput = file_get_contents('php://input');
    $data = json_decode($jsonInput, true);

    // Check if the JSON data is valid
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['errors' => ['Invalid JSON data']]);
    } else {
        try {
            // Extract data from the JSON object
            $article = trim($data['article']);
            $important = isset($data['important']) ? filter_var($data['important'], FILTER_VALIDATE_BOOLEAN) : false;
            $author = trim($data['author']);
            $image = isset($data['image']) ? trim($data['image']) : '';
            $text = trim($data['text']);

            $errors = [];

            if (empty($article)) {
                $errors[] = 'Article title is required.';
            }
            if (empty($author)) {
                $errors[] = 'Author name is required.';
            }
            if (empty($text)) {
                $errors[] = 'Article content is required.';
            }

            if (!empty($errors)) {
                // Return a 400 Bad Request response with error messages
                http_response_code(400);
                echo json_encode(['errors' => $errors]);
            } else {
                $currentDateTime = date('Y-m-d\TH:i:s\Z'); // Get current time in string format
                // Create a new document in the MongoDB collection
                $newArticle = [
                    'article' => $article,
                    'important' => $important,
                    'author' => $author,
                    'publishing_time' => $currentDateTime,
                    'image' => $image,
                    'text' => $text
                ];

                $insertResult = $collection->insertOne($newArticle);

                if ($insertResult->getInsertedCount() === 1) {
                    $insertedId = (string) $insertResult->getInsertedId();
                    $responseMessage = 'Article created successfully with _id: ' . $insertedId;
                    http_response_code(201);
                    echo json_encode(['message' => $responseMessage]);
                } else {
                    http_response_code(500);
                    echo json_encode(['message' => 'Failed to create article']);
                }
            }
        } catch (MongoDB\Driver\Exception\Exception $e) {
            // Handle the MongoDB exception here
            http_response_code(500);
            echo json_encode(['message' => 'MongoDB Exception: ' . $e->getMessage()]);
        }
    }
}

// PUT an existing news article
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $jsonInput = file_get_contents('php://input');
    $data = json_decode($jsonInput, true);
    $errors = [];

    // Check if the JSON data is valid
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['errors' => ['Invalid JSON data']]);
    } else {
        try {
            $articleId = $data['_id'];

            // Check if the article exists
            $existingArticle = $collection->findOne(['_id' => new MongoDB\BSON\ObjectID($articleId)]);

            if (!$existingArticle) {
                // Return a 404 Not Found response if the article doesn't exist
                http_response_code(404);
                echo json_encode(['message' => 'Article not found']);
            } else {
                // Retrieve the existing article data
                $existingData = (array) $existingArticle;

                // Update article fields with new values from the request
                $article = isset($data['article']) ? trim($data['article']) : $existingData['article'];
                $important = isset($data['important']) ? filter_var($data['important'], FILTER_VALIDATE_BOOLEAN) : $existingData['important'];
                $author = isset($data['author']) ? trim($data['author']) : $existingData['author'];
                $image = isset($data['image']) ? trim($data['image']) : $existingData['image'];
                $text = isset($data['text']) ? trim($data['text']) : $existingData['text'];

                if (empty($article)) {
                    $errors[] = 'Article title is required.';
                }
                if (empty($author)) {
                    $errors[] = 'Author name is required.';
                }
                if (empty($text)) {
                    $errors[] = 'Article content is required.';
                }

                if (!empty($errors)) {
                    // Return a 400 Bad Request response with error messages
                    http_response_code(400);
                    echo json_encode(['errors' => $errors]);
                } else {
                    // Update the article in MongoDB based on $articleId
                    $updateResult = $collection->updateOne(
                        ['_id' => new MongoDB\BSON\ObjectID($articleId)],
                        [
                            '$set' => [
                                'article' => $article,
                                'important' => $important,
                                'author' => $author,
                                'image' => $image,
                                'text' => $text
                            ]
                        ]
                    );

                    if ($updateResult->getModifiedCount() > 0) {
                        http_response_code(200);
                        echo json_encode(['message' => 'Article updated successfully']);
                    } else {
                        http_response_code(500);
                        echo json_encode(['message' => 'Failed to update article']);
                    }
                }
            }
        } catch (MongoDB\Driver\Exception\Exception $e) {
            // Handle the MongoDB exception here
            http_response_code(500);
            echo json_encode(['message' => 'MongoDB Exception: ' . $e->getMessage()]);
        }
    }
}

// DELETE an existing news article
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $jsonInput = file_get_contents('php://input');
    $data = json_decode($jsonInput, true);

    // Check if the JSON data is valid
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['errors' => ['Invalid JSON data']]);
    } else {
        $articleId = $data['_id'];

        // Check if the article exists
        $existingArticle = $collection->findOne(['_id' => new MongoDB\BSON\ObjectID($articleId)]);

        if (!$existingArticle) {
            // Return a 404 Not Found response if the article doesn't exist
            http_response_code(404);
            echo json_encode(['message' => 'Article not found']);
        } else {
            try {
                // Delete the article from MongoDB based on $articleId
                $deleteResult = $collection->deleteOne(['_id' => new MongoDB\BSON\ObjectID($articleId)]);

                if ($deleteResult->getDeletedCount() > 0) {
                    http_response_code(204);
                } else {
                    http_response_code(500);
                    echo json_encode(['message' => 'Failed to delete article']);
                }
            } catch (MongoDB\Driver\Exception\Exception $e) {
                http_response_code(500);
                echo json_encode(['message' => 'MongoDB Exception: ' . $e->getMessage()]);
            }
        }
    }
}
