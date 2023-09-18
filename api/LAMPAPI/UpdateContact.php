<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: *');
    header("Access-Control-Allow-Headers: *");

    $inData = getRequestInfo();

    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $phoneNumber = $inData["phoneNumber"];
    $emailAddress = $inData["emailAddress"];
    $userId = $inData["userId"];
    $id = $inData["id"];

    $conn = new mysqli("localhost", "Itachi", "WeLoveCOP4331", "COP4331");

    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("UPDATE Contact SET FirstName=?, LastName=?, Phone=?, Email=? WHERE UserID=? AND ID=?");
        $stmt->bind_param("ssssss", $firstName, $lastName, $phoneNumber, $emailAddress, $userId, $id);
        $stmt->execute();

        $stmt->close();

        // Fetch all contacts with matching UserID, regardless of whether the update was successful
        $stmt = $conn->prepare("SELECT ID as id, UserID as userId, FirstName as firstName, LastName as lastName, Email as emailAddress, Phone as phoneNumber FROM Contact WHERE UserId=?");
        $stmt->bind_param("s", $userId);
        $stmt->execute();

        $result = $stmt->get_result();
        $contactsArray = array();

        while($row = $result->fetch_assoc()) {
            $contactsArray[] = $row;
        }

        $stmt->close();
        $conn->close();

        returnWithInfo(json_encode($contactsArray));
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
        $retValue = '{"contacts":[],"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($searchResults)
    {
        $retValue = '{"contacts":' . $searchResults . ',"error":""}';
        sendResultInfoAsJson($retValue);
    }
?>
