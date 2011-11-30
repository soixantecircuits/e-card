<?php
require_once '../lib/swift_required.php';
require ('../config.php');
$table = 'beta_register';
mysql_select_db($db_name);

$connection = $db_connect;
// écriture de données
if (!empty($_POST))
{
	if (isset($_POST['name']) != '') { $_POST['name'] = sanitize($_POST['name']); }
	if (isset($_POST['fname']) != '') { $_POST['fname'] = sanitize($_POST['fname']); }
	if (isset($_POST['email']) != '') { $_POST['email'] = sanitize($_POST['email']); }
	if (isset($_POST['image']) != '') { $_POST['image'] = sanitize($_POST['image']); }
	/* ERREURS
		0: 	Veuillez indiquer votre nom
		1:	L'adresse email que vous avez indiquée n'est pas valide
		2:	Score non valide
		3:  Pays non valide
		10: Erreur SQL : L'inscription s'est mal déroulée
		11:	Erreur SQL : ne peut pas recuperer l'id du score qu'on vient d'inserer
		100: Erreur Connexion MySQL
		101: Erreur selection bdd
		102: Erreur set names utf-8
		200: Mauvais parametres GET ou parametres manquants
		210: Erreur SQL : Ne paut pas lire les scores
		500: No get et no post
		600: Impossible de vider la base
	*/
	
	// check validité email
	else if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){ 
		$errMsg = 'Votre email n\'est pas valide';
	}
	// check nom
	else if (strlen ($_POST['name']) < 2)
	{
		$errMsg = 'Votre nom semble trop court';
	}
	else if (isset ($errMsg))
	{
		echo '{"success":false, "msg":'.json_encode($errMsg).'}';
		exit;
	}
	
	$query = "INSERT INTO ".$table. "(name, ".
									 "fname, ".	
									 "email,".
									 "ip) VALUES ('".
									 mysql_real_escape_string($_POST['name'])."','".
									 mysql_real_escape_string($_POST['fname'])."','".
									 mysql_real_escape_string($_POST['email'])."','".
									 mysql_real_escape_string(getRealIpAddr())."')";
	try {
		$result = mysql_query($query);
		$id = mysql_insert_id($connection);
	// echo 'ins id ' . $id;
	// CHECK
	//ici on renvoie le score dans msg, ce qui permet à l'application de récupérer le score. C'est un simple tableau avec le nom et le score. 
	//le tri de score s'effectue par pays.
		$message = Swift_Message::newInstance();
		$message->setSubject('Dior - Your own Lady Dior');
		// If placing the embed() code inline becomes cumbersome
// it's easy to do this in two steps
		if($_POST['image'] != "xx")
		{		
				$imageNum = 'sac_lady_dior_'.$_POST['image'].'.jpg';
				$src = imagecreatefromjpeg($imageNum);
				$dest = imagecreatetruecolor(318, 564);

// Copy
				imagecopy($dest, $src, 0, 0, 200, 300, 318, 564);

				// Output and free from memory
				
				imagejpeg($dest,'ladydior.jpg');

				imagedestroy($dest);
				imagedestroy($src);
				$cid = $message->embed(Swift_Image::fromPath('ladydior.jpg'));
		}
		else
			$cid = "empty";
			
		$logoid = $message->embed(Swift_Image::fromPath("logo.jpg"));	
			
		$message->setBody(
			'<html>' .
			' <head></head>' .
			' <body style="height:100%;text-align:center;color:#BBB;display:block;background-color:#FFF;">' .
			'  <img style="position:relative;margin:0 auto;display:block;" src="' . $logoid . '" width="400px" height="160px" alt="Dior"/>'.
			'  <br/><br/><img style="position:relative;margin:0 auto;display:block;" src="' . $cid . '" alt="ladydior" />' .
			'  <p style="font-size:13px">' .
			'  <br/><br/>Vous venez de créer votre propre Lady Dior, <br/>avec cette photo vous entrez désormais dans la légende de ce sac Icône.	'.
			'  <br/><br/>You have just designed your very own Lady Dior bag, with this picture, <br/>you are now becoming a part of the legend of this Iconic bag.'.
			'  <br/><br/>您刚设计完成了专属于您的Lady Dior<br/>这幅图片的诞生意味着您已经成为这款标志性女包传奇的一部分。' .
			'  </p>' .
			' </body>' .
			'</html>',
	   	   'text/html' //Mark the content-type as HTML
		);
		$message->addPart('Vous venez de créer votre propre Lady Dior, avec cette photo vous entrez désormais dans la légende de ce sac Icône.'.
			' You have just designed your very own Lady Dior bag, with this picture, you are now becoming a part of the legend of this Iconic bag.'.
			' 您刚设计完成了专属于您的Lady Dior<br/>这幅图片的诞生意味着您已经成为这款标志性女包传奇的一部分。'
			, 'text/plain');

		
		$message->setReturnPath('newsletter@dior.com');
		$message->setFrom(array('newsletter@dior.com' => 'Dior - Lady Dior'));
		$message->addTo($_POST['email']);
		$message->setPriority(3);
		
		date_default_timezone_set("Asia/Shanghai");
		
		$transport = Swift_SendmailTransport::newInstance('/usr/sbin/sendmail -bs');

		$mailer = Swift_Mailer::newInstance($transport);
		
		$result = $mailer->send($message,$fail);



	
		echo '{"success":true, "msg":'.json_encode($result).'}';
	}
	catch (Exception $e){
		echo '{"success":false, "msg":'.json_encode('10').'}';
		exit;
	}
}
// lecture des scores
else if (!empty ($_GET))
{
	if (isset($_GET['key']) && sanitize($_GET['key'])=='7afb92816faaea844ac1a90f5db86a8f')
	{
		$sql= "TRUNCATE TABLE ".$table ;
		try {
			$res4 = mysql_query ($sql) or DIE(mysql_error());
		}
		catch (Exception $e){
			echo '{"success":false, "msg":'.json_encode('600').'}';
		}
	}
	else
	{
		$limit = sanitize($_GET['limit'],true);
		if ($limit < 1 )
		{
			echo '{"success":false, "msg":'.json_encode('200').'}';
			exit;
		}
		$sql = "SELECT name,email,ip FROM ".$table;
		$sql .= " ORDER BY name ASC LIMIT 0," . $limit;
		// echo $sql;
		try {
			$res3 = mysql_query ($sql);
			$result = array('registered' => array());
			while ($row = mysql_fetch_assoc($res3))
			{	
				$result['registerd'][] = $row;
			}
			echo '{"success":true, "msg":'.json_encode($result).'}';
		}
		catch (Exception $e){
			echo '{"success":false, "msg":'.json_encode('20').'}';
		}
	}
}
else{
	echo '{"success":false, "msg":'.json_encode('500').'}';
	exit;
}

function sanitize($var,$toInt=false){
	$var = stripslashes(strip_tags(trim($var)));
	return ($toInt) ? (int)$var : $var;
}

function getRealIpAddr() {
    //check ip from share internet
    if (! empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    }
    //to check ip is pass from proxy
    elseif (! empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}
?>