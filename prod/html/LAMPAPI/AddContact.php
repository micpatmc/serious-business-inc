<?php
// need to check if the contact already exists
$inData = getRequestInfo();

$conn = new mysqli("localhost", "Itachi", "WeLoveCOP4331", "COP4331");
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $firstName = $inData["FirstName"];
    $lastName = $inData["LastName"];
    $email = $inData["Email"];
    $phoneNumber = $inData["Phone"];
    $userId = $inData["UserId"];

    $stmt = $conn->prepare("INSERT INTO Contacts (FirstName, LastName, Email, PhoneNumber, UserID) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $firstName, $lastName, $email, $phoneNumber, $userId);
    $stmt->execute();
    
    $stmt->close();
    $conn->close();
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
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

?>
