<?php

$inData = getRequestInfo();

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
if ($conn->connect_error) 
{
    returnWithError( $conn->connect_error );
} 
else
{
    $firstName = $inData["FirstName"];
    $lastName = $inData["LastName"];
    $emailAddress = $inData["Email"];
    $phoneNumber = $inData["Phone"];
    $userId = $inData["UserID"];

    // Check for duplicates
    $stmt = $conn->prepare("SELECT * FROM Contact WHERE Email=? AND UserID=?");
    $stmt->bind_param("ss", $emailAddress, $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows > 0)
    {
        $stmt->close();
        $conn->close();
        returnWithError("Duplicate contact found.");
    }
    else
    {
        // Insert the contact
        $stmt = $conn->prepare("INSERT INTO Contact (FirstName, LastName, Email, Phone, UserID) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $firstName, $lastName, $emailAddress, $phoneNumber, $userId);
        $stmt->execute();

        $stmt->close();
        $conn->close();

        returnWithInfo("Contact added successfully.");
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
    $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $info )
{
    $retValue = '{"results":' . json_encode($info) . ',"error":""}';
    sendResultInfoAsJson( $retValue );
}

?>
