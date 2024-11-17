<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Replace these with your actual admin credentials
    $adminUsername = 'admin';
    $adminPassword = 'password123';

    if ($username == $adminUsername && $password == $adminPassword) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: 1001_feedback_table.php');
        exit;
    } else {
        $error = 'Invalid credentials. Please try again.';
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="icon" type="image/x-icon" href="resource/photo/main/logo.png">
    <title>Admin Login</title>

    <link rel="stylesheet" href="resource/style/tools/logger.css">
</head>
<body>
    <form method="POST" class="center login-container" action="">
        <table>
            <tr>
                <td colspan="2">
                    <h2>Admin Login</h2>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="username">Username:</label>
                </td>
                <td>
                    <input type="text" id="username" name="username" required>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="password">Password:</label>
                </td>
                <td>
                    <input type="password" id="password" name="password" required>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <input type="submit" value="Login">
                </td>
            </tr>
        </table>
    </form>
    <?php

    if (isset($error)) {
        echo '<p style="color: red;">' . $error . '</p>';
    }

    ?>
</body>
</html>
