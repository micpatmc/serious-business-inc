<?php
// need to check if the contact already exists
$inData = getRequestInfo();

$conn = new mysqli("localhost", "Itachi", "WeLoveCOP4331", "COP4331");
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $userId = $inData["userId"];

    $stmt = $conn->prepare("DELETE FROM Contacts WHERE UserId=?");
    $stmt->bind_param("s", $userId);
    $stmt->execute();
    
    $stmt->close();
    $conn->close();
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
