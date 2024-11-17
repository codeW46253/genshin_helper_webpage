<?php
session_start();
session_unset();
session_destroy();
header('Location: 1004_admin_login.php');
exit;
?>
