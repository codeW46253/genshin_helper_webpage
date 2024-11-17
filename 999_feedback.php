<?php

$servername = "localhost";
$username   = "root";
$password   = "";
$db         = "genshinhelper_db";

$conn = new mysqli($servername, $username, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email    = strtolower(trim($_GET['email']));;
$feedback = $_GET['feedback'];
$pname    = $_GET['pname'];

// Server-side validation
if (empty($email) || empty($feedback || empty($pname))) {
    die("Error: All fields are required.");
}

$stmt = $conn->prepare("INSERT INTO feedback (email, feedback, pname) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $email, $feedback, $pname);

if ($stmt->execute()) {
    header("Location: 1000_feedback_form.html?status=success");
    exit();
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();

?>
