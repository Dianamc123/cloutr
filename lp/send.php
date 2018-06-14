<?php 

//-- importamos la libreria de mailchimp --//
require_once("lib/Mailchimp.php");

// creamos una instancia de la libreria 
$mailchimp = new MailChimp();

// capturamos lo que llegue en post 
$post = $_POST;

//-- pagina de gracias 
$tk = "thanks.html";

//-- script de redireccion --//
$script ="<script> window.location = $tk; </script>";

// verificamos si no se encuentran vacios
if( !empty( $post["name"] ) || !empty($post["email"]) )
    echo $script;
else
    echo "Se han enviado campos vacios!";
?>