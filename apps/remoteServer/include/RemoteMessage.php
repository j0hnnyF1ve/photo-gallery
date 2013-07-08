<?php
class RemoteMessage
{
  private $success;
  private $message;
  private $data;

  public function __construct($success, $message, $data='')
  {
    $this->__set('success', $success);
    $this->__set('message', $message);
    $this->__set('data', $data);
  }

  public function __get($property) 
  {
    if (property_exists($this, $property)) 
    {
      return $this->$property;
    }
  }

  public function __set($property, $value) 
  {
    if (property_exists($this, $property)) 
    {
      $this->$property = $value;
    }

    return $this;
  }

  public function getJson() 
  {
    return json_encode( array('success' => $this->success, 'message' => $this->message, 'data' => $this->data) );
  }
}
?>