<?php 
//-- importamos la libreria de mailchimp --//
include_once( __DIR__ ."/lib/MailChimp.php");

// creamos una instancia de la libreria 
$mailchimp = new MailChimp();

// capturamos lo que llegue en post 
$post = $_POST;

//-- pagina de gracias 
$tk = "thanks.html";

//-- script de redireccion --//
$script ="<script> window.location.href = '$tk'; </script>";


// verificamos si no se encuentran vacios
if( !empty( $post["name"] ) && !empty($post["email"]) ){
    
    // creamos los datos a mailchimp 
    $data[] = array( 
                  "name" => $post["name"],
                  "email" =>  $post["email"]
                );

    //-- enviamos los datos a la lista de mailchimp 
    $r = $mailchimp->Suscribe( Mailchimp::$listID, $data );

    //var_dump($r);
    echo $script;
}else
    echo "Se han enviado campos vacios!";
?>