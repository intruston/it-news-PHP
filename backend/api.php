<?php
require 'vendor/autoload.php';
require 'config.php';

// Endpoint to retrieve the latest 10 news articles
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['latest'])) {
    $latestArticles = $collection->find([], ['limit' => 10, 'sort' => ['date' => -1]]);
    $articles = iterator_to_array($latestArticles);
    echo json_encode($articles);
}

// Endpoint to retrieve all news articles
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['all'])) {
    $allArticles = $collection->find();
    $articles = iterator_to_array($allArticles);
    echo json_encode($articles);
}


?>
