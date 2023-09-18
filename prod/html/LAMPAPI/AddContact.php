<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: *");

	$inData = getRequestInfo();
	
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phoneNumber = $inData["phoneNumber"];
	$emailAddress = $inData["emailAddress"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "Itachi", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError($conn->connect_error);
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contact (FirstName, LastName, Phone, Email, UserID) VALUES(?,?,?,?,?)");
		$stmt->bind_param("sssss", $firstName, $lastName, $phoneNumber, $emailAddress, $userId);
		$stmt->execute();
		$stmt->close();
		
		// Fetch all contacts with the specified UserID after adding the new one
		$searchResults = "";
		$searchCount = 0;

		$stmt = $conn->prepare("SELECT * FROM Contact WHERE UserID=?");
		$stmt->bind_param("s", $userId);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if($searchCount > 0)
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '{"id":"' . $row["ID"] . '", "firstName" : "' . $row["FirstName"] . '", "lastName" : "' . $row["LastName"] . '", "phoneNumber" : "' . $row["Phone"] . '", "emailAddress" : "' . $row["Email"] . '" , "userId" : "' . $row["UserID"] . '"}';
		}

		$stmt->close();
		$conn->close();

		if ($searchCount == 0)
		{
			returnWithError("No Records Found.");
		}
		else
		{
			returnWithInfo($searchResults);
		}
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError($err)
	{
		$retValue = '{"contacts":[], "error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}
	
	function returnWithInfo($searchResults)
	{
		$retValue = '{"contacts":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson($retValue);
	}
?>
