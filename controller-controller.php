<?php
// Start the session
session_start();
if(isset($_POST['logout'])) {
$_SESSION['username'] = 'xyz';
}
if(isset($_POST['uname']) && $_POST['uname'] == '???' && $_POST['pword'] == '???') {
$_SESSION['username'] = $_POST['uname'];
}
if ($_SESSION['username'] != ???) {
echo 'Need To Login:<br>';
echo '<form action="http://www.worldclimatedata.org/controller/" method="post">
User Name: <input type="text" name="uname"><br>
Password: <input type="password" name="pword"><br>
<input type="submit" value="Login">
</form>';
exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Draw Four Fold - Controller</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="../js/js.js"></script>
<link rel="stylesheet" href="../css/screen.css">
</head>
<body>
<div id="wrapper">
<h1>Draw Four Fold - Controller</h1>
<h2>A JavaScript Game for 1 to Many Players</h2>
<div class="section">
<div class="toggle">
<h3>Controller</h3>
<p id="controllerStatus"></p>
<button id="controllerToggle" disabled>Unknown Status</button>
</div>
<div class="toggle">
<h3>Client Server 1</h3>
<p id="clientServer1Status"></p>
<button id="clientServer1Toggle" disabled>Unknown Status</button>
</div>
<div class="toggle">
<h3>Client Server 2</h3>
<p id="clientServer2Status"></p>
<button id="clientServer2Toggle" disabled>Unknown Status</button>
</div>
</div>

<div class="section" style="text-align: right; padding: 0 20px 0 0;">
<button id="checkStatuses">Check Status</button>
<form action="http://www.worldclimatedata.org/controller/" method="post">
<input type="hidden" name="logout">
<input type="submit" value="Logout">
</form>
</div>

<div class="clearBoth">&nbsp;</div>
<div class="section footer">
<p>Part of Distributed Systems CA demonstration - Tuesday 18<sup>th</sup> September 2018</p>
</div>
<div class="clearBoth">&nbsp;</div>
</div>
</body>
</html>
