<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: *");

	ini_set('display_errors', 1);

	$inData = getRequestInfo();
	
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Login = $inData["userId"];
	$Password = $inData["password"];
	
	//$color = $inData["color"];
	//$userId = $inData["userId"];

	$conn = new mysqli("localhost", "Itachi", "WeLoveCOP4331", "COP4331"); 	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT ID FROM Users WHERE Login=?");
		$stmt->bind_param("s", $Login);
		$stmt->execute();
		$result = $stmt->get_result();
		if( $row = $result->fetch_assoc()  )
		{
			http_response_code(409); 
			returnWithError("User already exits");
		}
		else
		{


			$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
			$stmt->bind_param("ssss", $FirstName, $LastName, $Login, $Password);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			returnWithError("");
		}
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
