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
	$id = $inData["id"]; // Assuming you send ID along with the request if you want to update.

	$conn = new mysqli("localhost", "Itachi", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		// Update contact if ID is provided
		if (isset($id)) 
		{
			$stmt = $conn->prepare("UPDATE Contact SET FirstName=?, LastName=?, Phone=?, Email=? WHERE UserID=? AND ID=?");
			$stmt->bind_param("ssssss", $firstName, $lastName, $phoneNumber, $emailAddress, $userId, $id);
			$stmt->execute();

			if ($stmt->affected_rows <= 0)
			{
				returnWithError("No contact updated.");
				$stmt->close();
				$conn->close();
				exit();
			}
		}

		// Fetch all contacts with the specified UserID
		$searchResults = "";
		$searchCount = 0;

		$stmt = $conn->prepare("SELECT * FROM Contact WHERE UserID=?");
		$stmt->bind_param("s", $userId);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '{"firstName" : "' . $row["FirstName"] . '", "lastName" : "' . $row["LastName"] . '", "phoneNumber" : "' . $row["Phone"] . '", "emailAddress" : "' . $row["Email"] . '" , "userId" : "' . $row["UserID"] . '", "id" : "' . $row["ID"] . '"}';
		}

		if ($searchCount == 0)
		{
			returnWithError("No Records Found.");
		}
		else
		{
			returnWithInfo($searchResults);
		}
		
		$stmt->close();
		$conn->close();
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
		$retValue = '{"contacts":[], "error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"contacts":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>
