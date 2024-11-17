<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    header('Location: 1004_admin_login.php');
    exit;
}
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="icon" type="image/x-icon" href="resource/photo/main/logo.png">
        <title>Feedback Collection</title>
        
        <link rel="stylesheet" href="resource/style/tools/feedback_table.css">
        <link rel="stylesheet" href="resource/style/shared/center_table.css">
    </head>
    <body>
        <div class="center table-container">
            <h1>Feedback Table</h1>
            <a href="1004_admin_login.php" class="logout-button">Log Out</a>
            <table id="feedbackTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Feedback</th>
                        <th>Prefered Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Rows will be inserted here by JavaScript -->
                </tbody>
            </table>
            <script>
                function loadFeedbackData() {
                    fetch('1002_fetch_feedback.php')
                        .then(response => response.json())
                        .then(data => {
                            const tableBody = document.getElementById('feedbackTable').getElementsByTagName('tbody')[0];
                            tableBody.innerHTML = ''; // Clear existing rows
                            data.forEach(item => {
                                const row          = document.createElement('tr');
                                const idCell       = document.createElement('td');
                                const emailCell    = document.createElement('td');
                                const feedbackCell = document.createElement('td');
                                const pnameCell    = document.createElement('td');
                                const actionCell   = document.createElement('td');
                                const deleteButton = document.createElement('button');
                
                                idCell.textContent       = item.id;
                                emailCell.textContent    = item.email;
                                feedbackCell.textContent = item.feedback;
                                pnameCell.textContent    = item.pname;

                                deleteButton.textContent = 'Delete';
                                deleteButton.onclick = function() {
                                    deleteFeedback(item.id);
                                };
                
                                actionCell.appendChild(deleteButton);
                                row.appendChild(idCell);
                                row.appendChild(emailCell);
                                row.appendChild(feedbackCell);
                                row.appendChild(pnameCell);
                                row.appendChild(actionCell);
                
                                tableBody.appendChild(row);
                            });
                        })
                        .catch(error => console.error('Error fetching feedback data:', error));
                }
                
                function deleteFeedback(id) {
                    fetch('1003_delete_feedback.php?id=' + id)
                        .then(response => response.text())
                        .then(data => {
                            console.log(data);
                            loadFeedbackData(); // Reload the table data
                        })
                        .catch(error => console.error('Error deleting feedback:', error));
                }
                
                window.onload = function() {
                    loadFeedbackData();
                };
            </script>
        </div>
    </body>
</html>