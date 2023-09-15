<?php
$inData = getRequestInfo();

$conn = new mysqli("localhost", "Itachi", "WeLoveCOP4331", "COP4331");
if ($conn->connect_error) 
{
    returnWithError($conn->connect_error);
} 
else 
{
    $id = $inData["ID"];
    $firstName = $inData["FirstName"];
    $lastName = $inData["LastName"];
    $email = $inData["Email"];
    $phoneNumber = $inData["Phone"];
    $userId = $inData["UserId"];

    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserId=?");
    $stmt->bind_param("s", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if($row = $result->fetch_assoc())
    {
        http_response_code(409); 
        returnWithError("User already exists");
    }
    else
    {
        $stmt = $conn->prepare("INSERT INTO Contacts (ID, FirstName, LastName, Email, PhoneNumber, UserId) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $id, $firstName, $lastName, $email, $phoneNumber, $userId);
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
