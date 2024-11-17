<?php
$servername = "localhost";
$username   = "root";
$password   = "";
$db         = "genshinhelper_db";

$conn = new mysqli($servername, $username, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, email, feedback, pname FROM feedback";
$result = $conn->query($sql);

$feedbackData = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $feedbackData[] = $row;
    }
}

$conn->close();
echo json_encode($feedbackData);
?>
