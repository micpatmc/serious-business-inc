<?php

$inData = getRequestInfo();

$conn = new mysqli("localhost", "Itachi", "WeLoveCOP4331", "COP4331");

//  check connections
/*if($conn->conn_error)
{
  returnWithError("Connection failed: ");
}*/

//else
//{

  //$sql ="INSERT INTO contact_list (id, first_name, last_name, phone, email) VALUES('34','TRIET', 'BRYAN', 1234567890, 'Toawesomeforthisproject@gmail.com' , 'NULL')";
  $sql = "INSERT INTO `Contact` (id, firstName, lastName, phoneNumber, emailAddress, userId) VALUES('" . $inData["ID"] . "', '" . $inData["FirstName"] . "', '" . $inData["LastName"] . "', '" . $inData["Phone"] . "', '" . $inData["Email"] . "', '" . $inData["UserID"] . "')";
  $sql2 = "SELECT cid FROM Contact where id='". $inData["ID"] . "' and firstName = '" . $inData["FirstName"] . "' and lastName = '" . $inData["LastName"] . "' and phoneNumber = '" . $inData["Phone"] . "' and emailAddress = '" . $inData["Email"] .  "' and userId = '" . $inData["UserID"] . "'";
  if($conn->query($sql) === TRUE)
  {
    $result = $conn->query($sql2);
    if($result->num_rows > 0)
    {
      //echo "New record created successfully";
      $row = $result->fetch_assoc();
      $cid = $row["cid"];
      //echo $cid ;
      $id = $inData["ID"];
      $firstName = $inData["FirstName"];
      $lastName = $inData["LastName"];
      $phoneNumber = $inData["Phone"];
      $emailAddress = $inData["Email"];
      $userId = $inData["UserID"];
      $conn->close();
    }

    returnWithInfo($id,$cid, $firstName, $lastName, $phoneNumber, $emailAddress, $userId);

  }
  else
  {
      returnWithError("Contact Creation failure");
  }



//}

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
  $retValue = '{"id":"0","firstName":"","lastName":"","phone":"","email":"","address":"","error":"' . $err . '"}';
  sendResultInfoAsJson( $retValue );
}
function returnWithInfo( $id, $cid, $firstName, $lastName, $phoneNumber, $emailAddress, $userId)
{
  $retValue = '{"id":"'. $id . '","cid":"'. $cid . '","FirstName":"' . $firstName . '","LastName":"' . $lastName . '","Phone":"'. $phoneNumber . '","Email":"' . $emailAddress . '","UserID":"' . $userId . '","error":""}';
  sendResultInfoAsJson( $retValue );
}

>
