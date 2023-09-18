<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: *");
    ini_set('display_startup_errors', 1);
    ini_set('display_errors', 1);
    error_reporting(-1);

    $inData = getRequestInfo();

    $conn = new mysqli("localhost", "Itachi", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        $userId = $inData["userId"];
        $id = $inData["id"];

        $stmt = $conn->prepare("DELETE FROM Contact WHERE UserId=? AND ID=?");
        $stmt->bind_param("ss", $userId, $id);
        $stmt->execute();

        if($stmt->affected_rows > 0) {
            // Successfully deleted a row, now fetch remaining rows with matching UserID
            $stmt->close();
            $stmt = $conn->prepare("SELECT ID as id, UserID as userId, FirstName as firstName, LastName as lastName, Email as emailAddress, Phone as phoneNumber FROM Contact WHERE UserId=?");
            $stmt->bind_param("s", $userId);
            $stmt->execute();

            $result = $stmt->get_result();
            $contactsArray = array();

            while($row = $result->fetch_assoc()) {
                $contactsArray[] = $row;
            }

            returnWithInfo(json_encode($contactsArray));
        } else {
            // No row was deleted
            returnWithError("No Contact found with the given ID and UserID");
        }

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

    function returnWithInfo($searchResults)
    {
        $retValue = '{"contacts":' . $searchResults . ',"error":""}';
        sendResultInfoAsJson($retValue);
    }
?>
