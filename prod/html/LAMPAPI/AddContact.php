<?php
$inData = getRequestInfo();

$conn = new mysqli("localhost", "Itachi", "WeLoveCOP4331", "COP4331");
if ($conn->connect_error) 
{
    returnWithError($conn->connect_error);
} 
else 
{
    $firstName = $inData["FirstName"];
    $lastName = $inData["LastName"];
    $email = $inData["Email"];
    $phoneNumber = $inData["Phone"];
    $userId = $inData["UserId"];

    // You need to prepare the statement before executing it.
    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID=?");
    $stmt->bind_param("s", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Now, you check if a row was returned.
    if($row = $result->fetch_assoc())
    {
        http_response_code(409); 
        returnWithError("User already exists");
    }
    else
    {
        // Prepare the INSERT statement.
        $stmt = $conn->prepare("INSERT INTO Contacts (FirstName, LastName, Email, PhoneNumber, UserID) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $firstName, $lastName, $email, $phoneNumber, $userId);
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

