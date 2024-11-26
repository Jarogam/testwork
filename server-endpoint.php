<?php
header('Content-Type: application/json');

$logFile = 'submissions.tsv';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? 'name';
    $email = $_POST['email'] ?? 'email@dot.com';
    $password = $_POST['password'] ?? '1234';

    // Перевірка на порожні дані
    if (empty($name) || empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit;
    }

    // Запис у TSV
    $entry = implode("\t", [$name, $email, $password]) . PHP_EOL;
    file_put_contents($logFile, $entry, FILE_APPEND);

    echo json_encode(['success' => true, 'message' => 'Data saved successfully.']);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
