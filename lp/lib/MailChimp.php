<?php
class MailChimp 
{
    #-- variables --#
    static $api = "1e14b756c620179b90867a782a5693fc-us17"; # api de CloudTr
    static $endpoint = "https://us15.api.mailchimp.com/3.0/"; # url de endpoint
    static $listID = "5af05f0ea4"; 
    static $content = NULL;
    static $length = 0;
    static $info = NULL;
    static $return = NULL;


    //-- crear la lista ---//
    function addList( $obj )
    {
         if( empty($obj) )
            return "No Hay Datos para Ingresar";
                 
         #-- convertimos en json
        $this->jsonConvert($obj);
         
        #-- enviamos el curl ---##
        $this->_exec("lists","POST");
         
        return self::$return;
    }


    function Suscribe( $listID, $obj )
    {
        $json = array("members"=> array());

        foreach($obj as $suscribe){
            $json["members"][] = array(
                'merge_fields'  => array(
                    'FNAME' => $suscribe["name"]
                ),
                "email_address" => $suscribe["email"], 
                "status" =>  "subscribed"
            );
        }

        #-- convertimos en json
        $this->jsonConvert($json);
            
        #-- enviamos el curl ---##
        $this->_exec("lists/{$listID}","POST");
            
        return self::$return;
    }


    function ReplicateCampaing( $ID )
    {
        if( empty($ID) )
            return "No Hay Datos para Ingresar";
                     
             #-- enviamos el curl ---##
            $this->_exec("campaigns/{$ID}/actions/replicate","POST");
        
        return self::$return;
    }

    function Campaing( $ID )
    {
        if( empty($ID) )
            return "No Hay Datos para Ingresar";
                     
             $this->_exec("campaigns/{$ID}","GET");
        
        return self::$return;
    }

    function CreateCampaing( $obj )
    {
        if( empty($obj) )
            return "No Hay Datos para Ingresar";

            #-- convertimos en json
            $this->jsonConvert($obj);
                     
            $this->_exec("campaigns","POST");
        
        return self::$return;
    }


    
    function Template( $ID )
    {
        if( empty($ID) )
            return "No Hay Datos para Ingresar";
                     
             $this->_exec("templatess/{$ID}","GET");
        
        return self::$return;
    }

    function Content( $ID , $content = NULL ,$type = "READ")
    {
        if( empty($ID) )
            return "No Hay Datos para Ingresar";
            

             #-- convertimos en json
            if(!empty( $content )){
                $this->jsonConvert($content);
            }
            if($type == "READ")
                $this->_exec("campaigns/{$ID}/content","GET");
            else
                $this->_exec("campaigns/{$ID}/content","PUT");

        return self::$return;
    }

    

    function Schedule($ID, $obj)
    {
        #-- convertimos en json
        $this->jsonConvert($obj);

        $this->_exec("campaigns/{$ID}/actions/schedule","POST");

        return self::$return;
    }

    function Send($ID)
    {
        $this->_exec("campaigns/{$ID}/actions/send","POST");

        return self::$return;
    }

    function EditCampaing( $ID ,$obj )
    {
        if( empty($ID) )
            return "No Hay Datos para Ingresar";

            #-- convertimos en json
            $this->jsonConvert($obj);
                     
            $this->_exec("campaigns/{$ID}","PATCH");
        
        return self::$return;
    }

    

    private function  jsonReturn($string)
    {
        return  json_decode($string);
    }


    private function jsonConvert( $obj )
    {
        self::$content = json_encode($obj);
        self::$length = strlen(self::$content);
    }


    private function _exec( $seg, $type = "GET" )
    {
        $ch = curl_init(self::$endpoint.$seg); 

        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $type);   
        
        curl_setopt($ch, CURLOPT_USERPWD, "user:".self::$api);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); 
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

        if( !empty(self::$content) ){
            curl_setopt($ch,CURLOPT_POSTFIELDS, self::$content);                                                               
        }

        curl_setopt($ch, CURLOPT_HTTPHEADER, array(   
            //"Authorization: Basic ".self::$auth,
            //"accept-encoding: gzip, deflate",                                                                       
            'Content-Type: application/json',                                                                                                                                                
        ));  
        
        $return = curl_exec($ch);

        self::$info = curl_getinfo($ch);

        #-- retornamos la info --#
        self::$return = $this->jsonReturn($return);

    }

}
