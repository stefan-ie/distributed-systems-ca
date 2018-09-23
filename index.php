<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Draw Four Fold - The Game</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="js/js.js"></script>
<link rel="stylesheet" href="css/screen.css">
</head>
<body>
<div id="wrapper">
<h1>Draw Four Fold - The Game</h1>
<h2>A JavaScript Game for 1 to Many Players - Status: <span id="statusState">UNKNOWN</span></h2>
<div class="section">
<div id="playingField"><?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
if(isset($_POST['uname'])) {
    $statusFile = fopen('status.php', 'r') or die('Unable to open file!');
	//fwrite($statusFile, 'Client Server 1 Shut Down');
	$serverStatus = fread($statusFile, filesize('status.php'));
	if (substr($serverStatus, -4) == 'Down') {
		echo "<script>$('#statusState').html('Not Connected')</script>";
	}
	else {
		echo "<script>$('#statusState').html('Connected')</script>";
	} 
	fclose($statusFile);

	$host = "???"; $user = "???"; $pass = "???"; $db_name = "Drawings"; 
	$conn = new mysqli($host, $user, $pass, $db_name);
	if ($conn == true) {
		echo('<p>OK</p>');
	}
	else {
		echo('<p>NOT OK</p>');
	}
	$sql = "SELECT uname, pword FROM users WHERE uname LIKE \"".trim($_POST['uname']).'"';
	//echo('<p>'.$sql.'</p>');
	if (($result = mysqli_query($conn, $sql)) === false) {
		echo('<p>Invalid query: %s\n<br>Whole query: %s\n<br>'.$conn->error.sql.'</p>');
	}
	else {
		while ($row = mysqli_fetch_assoc($result)) {
			//echo('<p>row[pword]: '.$row['pword'].'</p>');
			if ($row['pword'] == trim($_POST['pword'])) {
				//echo('<p>Found user and password validated</p>');
				echo('<p><script>saveUser(\''.trim($_POST['uname']).'\');</script></p>');
			}
			else if ($row['uname'] == trim($_POST['uname'])) {
				echo('<p>Username registered but password not validated. Please choose another user name or retry your password.</p>');
				echo('<form action="http://www.worldclimatedata.org/" method="post" id="loginForm"><div></div><label for="uname">User Name:</label><input type="text" name="uname" id="uname"></div><div class="clearBoth">&nbsp;</div><div><label for="pword">Password:</label><input type="password" name="pword"></div><div class="clearBoth">&nbsp;</div><input type="submit" value="Login"></form>');
			}
			else {
				
			}
		}
		if (mysqli_num_rows($result) == 0) {
			$sql = "INSERT INTO users(uname, pword, ip) VALUES (\"".trim($_POST['uname']).'","'.trim($_POST['pword']).'","???")';
			echo('<p>'.$sql.'</p>');
			if (($result = mysqli_query($conn, $sql)) === false) {
				echo('<p>Invalid query: %s\n<br>Whole query: %s\n<br>'.$conn->error.sql.'</p>');
			}
			else {
				echo('<p>Username and password has been registered.</p>');
				echo('<p><script>saveUser(\''.trim($_POST['uname']).'\');</script></p>');
			}
		}
	}
//echo('<p>'.$row['uname'].'</p>');
	//endwhile;
//echo('<!--p><script>saveUser(\''.trim($_POST['uname']).'\');</script></p-->');

}
else {
echo('<p>Welcome</p>');
}
?></div>
<div class="clearBoth">&nbsp;</div>
<div class="section footer">
<p>Part of Distributed Systems CA demonstration - Tuesday 18<sup>th</sup> September 2018</p>
</div>
<div class="clearBoth">&nbsp;</div>
</div>
</body>
</html>
