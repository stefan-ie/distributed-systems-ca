<?php
header("Access-Control-Allow-Origin: *");
?>
<?php
if(isset($_POST['action']) && $_POST['action'] == 'Check Status') {
	$statusFile = fopen('status.php', 'r') or die('Unable to open file!');
	$serverStatus = fread($statusFile, filesize('status.php'));
	fclose($statusFile);
	echo $serverStatus;
	exit;
}
else if(isset($_POST['action']) && $_POST['action'] == 'Shutdown') {
	$statusFile = fopen('status.php', 'w') or die('Unable to open file!');
	fwrite($statusFile, 'Client Server 1 Shut Down');
	fclose($statusFile);
	echo 'Client Server 1 Shut Down';
	exit;
}
else if(isset($_POST['action']) && $_POST['action'] == 'Restart') {
	$statusFile = fopen('status.php', 'w') or die('Unable to open file!');
	fwrite($statusFile, 'Client Server 1 Running');
	fclose($statusFile);
	echo 'Client Server 1 Running';
	exit;
}
?>
