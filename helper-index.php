<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Draw Four Fold - Overview</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="../js/js.js"></script>
<link rel="stylesheet" href="../css/screen.css">
</head>
<body>
<div id="wrapper">
<h1>Draw Four Fold - Overview</h1>
<h2>A JavaScript Game for 1 to Many Players</h2>
<div class="section">
<div id="overview">
<h3>The Distributed System: Collection of independant computers</h3>
<img src="../img/overview.jpg" alt="Overview" width="625">
<h3>Concurrent Operation</h3>
<p>Each computer processes data simultaneously.</p>
<h3>Fault Tolerance</h3>
<p>Each computer can fail independently without loss of data.</p>
<h3>Asynchronous Processing</h3>
<p>Each computer processes it's own share of data.</p>
</div>
<div id="details">
<h3>Clients</h3>
<p>Once game has loaded into cache and local storage, each client can operate independently, 
  e.g. without connecting to Client Server 1 or 2.</p>
<p>Each client will assign it's own drawing index and stitch images as required. Once a connection 
to one of the Client Server has been established, the client will:</p>
<ul>
<li>synchronize drawing indices,</li>
<li>upload stitched drawing,</li>
<li>download new drawing segments, and</li>
<li>download completed drawings relevant to client.</li>
</ul>
<h3>Client Server 1 + 2</h3>
<p>Each client server will assign a Client Server drawing index for each drawing received from a client. Ideally, each client server will
hold a complete set of all drawings created by all clients. However, the minimum amount of drawings expected to be held on any client 
server are the drawings relevant to the connected clients. Once a connection to the Controller has been established, the Client Server will:</p>
<ul>
<li>synchronize drawing indices,</li>
<li>synchronize drawing segments,</li>
<li>stitch images for upload, and</li>
<li>synchronize user credentials.</li>
</ul>
<h3>Controller</h3>
<p>The controller will assign a unique drawing index for each comination of drawing segments and store all drawings that were created by any user.</p>
<p>The controller will mirror the user databases.</p>
<p>The controller is allowed to fail temporarily. Lost data can be rebuild form the Client Server datasets.</p>
</div>
</div>
<div class="clearBoth">&nbsp;</div>

<div class="section details2">
<h3>User Databases</h3>
<p>All user details are stored on Client Server databases. Details of the current player are stored on Clients local storage.</p>
<p>Sample Data:</p>
<table>
<tr>
<th>id</th>
<th>user name</th>
<th>password</th>
<th>ip</th>
<th>online</th>
</tr>
<tr>
<td>0</td>
<td>Joseph</td>
<td>A Password</td>
<td>???</td>
<td>true</td>
</tr>
<tr>
<td>1</td>
<td>Stefan</td>
<td>A Password</td>
<td>???</td>
<td>false</td>
</tr>
</table>
<h3>Drawing Database</h3>
<p>Drawing databases are stored in Client, Client Server and Controller.</p>
<p>Sample Data:</p>
<table>
<tr>
<th>id</th>
<th>client id (local)</th>
<th>server id (remote)</th>
<th>controller id (remote)</th>
<th>draw a</th>
<th>draw a owner</th>
<th>draw b</th>
<th>draw b owner</th>
<th>draw c</th>
<th>draw c owner</th>
<th>draw d</th>
<th>draw d owner</th>
<th>stitched draw</th>
<th>stage</th>
</tr>
<tr>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>bin</td>
<td>0</td>
<td>bin</td>
<td>1</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>bin</td>
<td>2</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td></td>
<td></td>
<td>bin</td>
<td>1</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>bin</td>
<td>1</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td></td>
<td></td>
<td>bin</td>
<td>1</td>
<td>bin</td>
<td>0</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>bin</td>
<td>2</td>
</tr>
</table>

</div>
<div class="clearBoth">&nbsp;</div>

<div class="section footer">
<p>Part of Distributed Systems CA demonstration - Tuesday 18<sup>th</sup> September 2018</p>
</div>
<div class="clearBoth">&nbsp;</div>
</div>
</body>
</html>
