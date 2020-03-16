<?php

    $msg = '';
    $msgClass = '';
    $fnameerr = '';
    $lnameerr = '';
    $phoneerr = '';
    $emailerr = '';


    if (filter_has_var(INPUT_POST, 'submit')) {
      
      $fname = test_input($_POST['fname']);
      $lname = test_input($_POST['lname']);
      $email = test_input($_POST['email']);
      $phone = test_input($_POST['phone']);
      $message = test_input($_POST['message']);

      if (!empty($email) && !empty($fname) && !empty($lname) && !empty($phone) && !empty($message)) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
          $emailerr = 'Please use a valid email';
          $msgClass = 'alert-danger';

        }
        elseif (!preg_match("/^[a-zA-Z ]*$/", $fname) && !preg_match("/^[a-zA-Z ]*$/", $lname)) {

            $fnameerr = "Only letters and white space allowed";
            $lnameerr = "Only letters and white space allowed";
            $msgClass = 'alert-danger';
        } 

        elseif (!preg_match("/^(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{4}$/i", $phone)) {
            $phoneerr = "Invalid phone number";
            $msgClass = 'alert-danger';
        }


        else{

          $toEmail = 'contact@victornwakwue.info';
          $subject = 'Contact Form Submit'.$fname .$lname;
          $body = '<h2> Contact Request</h2>
                   <h4> Name</h4> <p>'.$fname .$lname.'</p>
                   <h4> Email</h4> <p>'.$email.'</p>
                   <h4> Phone</h4> <p>'.$phone.'</p>
                   <h4> Message</h4> <p>'.$message.'</p>

          ';

          $headers = "MIME-Version: 1.0" ."\r\n";
          $headers = "Content-Type:text/html;charset=UTF-8" ."\r\n";

          $headers .= "From: " .$fname. "<".$email.">". "\r\n";

          if (mail($toEmail, $subject, $body, $headers)) {
               
               $msg = 'Your Email Has Been Sent';
               $msgClass = 'alert-success';
          
          }else{
          
          $msg = 'Email Not Sent';
          $msgClass = 'alert-danger';

          }

        }

      }else {

        $msg = '';
        $fnameerr = 'Please fill this fields';
        $lnameerr = 'Please fill this fields';
        $phoneerr = 'Please fill this fields';
        $emailerr = 'Please fill this fields';
        $msgClass = 'alert-danger';
      }


    }


    function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);

    return $data;
}

?>