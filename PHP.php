<?php	
	global $current_user;
	get_currentuserinfo();

	echo 'Username: ' . $current_user->user_login . "\n";
	echo 'User email: ' . $current_user->user_email . "\n";
	echo 'User level: ' . $current_user->user_level . "\n";
	//echo 'User first name: ' . $current_user->user_firstname . "\n";
	//echo 'User last name: ' . $current_user->user_lastname . "\n";
	//echo 'User display name: ' . $current_user->display_name . "\n";
	//echo 'User ID: ' . $current_user->ID . "\n";

	$servername = "";
	$username = "";
	$password = "";
	$dbname = "";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "SELECT ID, EMAIL FROM USER";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	        echo "ID: " . $row["ID"]. " - EMAIL: " . $row["EMAIL"]. "<br>";
	    }
	} else {
	    echo "0 results";
	}
	$conn->close();









	global $current_user;
	get_currentuserinfo();

	$email = $current_user->user_email;

	//Database Information
	$servername = "";
	$username = "";
	$password = "";
	$dbname = "";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "SELECT " .
			  "PROGRAM.NAME AS PROGRAM, " .
			  "CONCAT(LOCATION.NAME,' @', LOCATION.ADDRESS) AS LOCATION, " .
			  "WAITLIST.QUEUE AS 'WAITLIST POSITION' " .  
			"FROM USER " .
			  "INNER JOIN WAITLIST ON WAITLIST.USER_ID = USER.ID " . 
			  "INNER JOIN PROGRAM ON PROGRAM.ID = WAITLIST.PROGRAM_ID " .
			  "INNER JOIN LOCATION ON LOCATION.ID = PROGRAM.LOCATION_ID " .
			"WHERE " .
			  "EMAIL = " .  "'" . $email . "'";

	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	        echo "<br> " . $row["PROGRAM"] . " " . $row["LOCATION"] . "<br>Waitlist Position: " . $row["WAITLIST POSITION"]. "<br><br>";
	    }
	} else {
	    echo "You are not on a waitlist.";
	}
	$conn->close();





?>


<?php


	//Database Information
	$servername = "";
	$username = "";
	$password = "";
	$dbname = "";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 



	$sql = "SELECT " .
			  "EMAIL, " .
			  "QUEUE, " .
			  "PROGRAM, " .
			  "LOCATION " .
			"FROM WAITLIST_VIEW";

	$result = $conn->query($sql);

	$email = ""; 
	$program = "";
	$location = "";
	$queue = "";

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	        $email = $row["EMAIL"];
	        $program = $row["PROGRAM"];
	        $location = $row["LOCATION"];
	        $queue = $row["QUEUE"];

	        //send email
			$to      = $email;
			$subject = $program . " Waitlist";
			$message = "Hello," . "\r\n" . "There is an opening for " . $program . " " . $location;
			$headers = 'From: webmaster@example.com' . "\r\n" .
			'Reply-To: webmaster@example.com' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();

			mail($to, $subject, $message, $headers);
	    }
	}
	$conn->close();
?>


<?php

	global $current_user;
	get_currentuserinfo();

	$email = $current_user->user_email;

	//Database Information
	$servername = "";
	$username = "";
	$password = "";
	$dbname = "";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "UPDATE WAITLIST " .
				"SET CONFIRMED = 1, QUEUE = NULL " .
			"WHERE " .
				"QUEUE = 1 ";

	$conn->query($sql);

	$sql = "SELECT 1 " .
			"FROM USER " .
			  "INNER JOIN WAITLIST ON WAITLIST.USER_ID = USER.ID " . 
			  "INNER JOIN PROGRAM ON PROGRAM.ID = WAITLIST.PROGRAM_ID " .
			  "INNER JOIN LOCATION ON LOCATION.ID = PROGRAM.LOCATION_ID " .
			"WHERE " .
			  "EMAIL = " .  "'" . $email . "'" .
			  "AND CONFIRMED = 1 " . 
			  "AND WAITLIST.QUEUE IS NULL ";

	$result = $conn->query($sql);

	if ($result->num_rows == 0) {
		echo "Enrollment confirmed.";
	} else {
		echo "Enrollment failed.";
	}

	$conn->close();

?>