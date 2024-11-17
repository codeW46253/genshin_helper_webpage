<?php
$servername = "localhost";
$username   = "root";
$password   = "";
$db         = "genshinhelper_db";

$conn = new mysqli($servername, $username, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = intval($_GET['id']);

// Delete the specific feedback entry
$deleteSql = "DELETE FROM feedback WHERE id = $id";
if ($conn->query($deleteSql) === TRUE) {
    // Check if the table is empty
    $checkEmptySql = "SELECT COUNT(*) AS count FROM feedback";
    $result = $conn->query($checkEmptySql);
    $row = $result->fetch_assoc();

    if ($row['count'] == 0) {
        // Truncate the table to reset the auto-increment counter
        $truncateSql = "TRUNCATE TABLE feedback";
        if ($conn->query($truncateSql) === TRUE) {
            echo "Table truncated and ID reset successfully after last record deleted.";
        } else {
            echo "Error truncating table: " . $conn->error;
        }
    } else {
        echo "Record deleted successfully.";
    }
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
