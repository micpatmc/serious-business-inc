<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: *");


	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$userId = $inData["userId"];
        
	$conn = new mysqli("localhost", "Itachi", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
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
			$searchResults .= '{"id": "' . $row["ID"] . '", "firstName" : "' . $row["FirstName"] . '", "lastName" : "' . $row["LastName"] . '", "phoneNumber" : "' . $row["Phone"] . '", "emailAddress" : "' . $row["Email"] . '" , "userId" : "' . $row["UserID"] . '"}';
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"contacts":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
