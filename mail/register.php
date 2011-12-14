<?php
require_once 'lib/swift_required.php';
// écriture de données
if (!empty($_POST))
{
	if (isset($_POST['name']) != '') { $_POST['name'] = sanitize($_POST['name']); }
	if (isset($_POST['message']) != '') { $_POST['message'] = sanitize($_POST['message']); }
	if (isset($_POST['lang']) != '') { $_POST['lang'] = sanitize($_POST['lang']); }
	if (isset($_POST['email']) != '') { $_POST['email'] = sanitize($_POST['email']); }
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
	
	try {
		$translation['en'] = "send you an greeting animated card from Groupe CAT!<br/><br/>Discover it quickly by clicking here:";

		$translation['fr'] = "vous a envoyé une carte de voeux du Groupe CAT !<br/><br/>Découvrez-là en cliquant ici :";

		$translation['es'] = "le ha mandado una tarjeta de Navidad animada del Groupe CAT !<br/><br/>Descúbrala rápidamente pinchando aquí :";

		$translation['de'] = "hat Ihnen eine animierte Glückwunschkarte geschickt von Groupe CAT!<br/><br/>Entdecken Sie diese schnell indem Sie hier klicken:";

		$translation['pl'] = "przesyła animowaną kartkę świąteczną od Groupe CAT!<br/><br/>Otwórz kartkę klikając tutaj:";
		
		$title['en'] = "Cat Group E-Card";

		$title['fr'] = "Cat Group E-Card";

		$title['es'] = "Cat Group E-Card";

		$title['de'] = "Cat Group E-Card";

		$title['pl'] = "Cat Group E-Card";
		
		

			if($_POST['lang']=='en'||$_POST['lang']=='fr'||$_POST['lang']=='es'||$_POST['lang']=='de'||$_POST['lang']=='pl'){
				$_POST['lang']=$_POST['lang'];
			}else{
				$_POST['lang']='en';
			}

			$message = Swift_Message::newInstance();
		$message->setSubject($title[$_POST['lang']]);

		$logoid = $message->embed(Swift_Image::fromPath("logo.png"));	
		$nuage = $message->embed(Swift_Image::fromPath("nuage_logo.png"));	
		$nuage2_mail = $message->embed(Swift_Image::fromPath("nuage2_mail.png"));	
		$video_go = $message->embed(Swift_Image::fromPath("video_go.png"));	

		$message->setBody('<html dir="ltr"><head>
											<meta charset="UTF-8"/>
											</head>
	<body>
		<div style="margin:0px;padding:0px;color:#fff;font-size:12px;line-height:18px;background:none repeat scroll 0 0 background: #7da7d9; background: -webkit-gradient(linear, left top, left bottom, from(#7da7d9), to(#feffff)); background: -moz-linear-gradient(top,  #7da7d9,  #feffff);vertical-align:baseline;font-family:Helvetica, \'Trebuchet MS\', Verdana, Arial, sans-serif;">
			<div style="margin:0px auto;border-left:0px solid ;border-right:0px solid;padding:0 5px;width:600px;background:none repeat scroll 0 0;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#7da7d9\', endColorstr=\'#feffff\');">
				
				<div style="margin:0px 0 0;border:none;padding:0;">
					<div style="margin:0;border:none;padding:0;">
						<div style="margin:0;border:none;padding:0;width:100%;">
							<table cellspacing="0" cellpadding="0" style="margin:0;border:none;padding:0;">
								<tbody><tr>
									<td style="margin:0;border:none;padding:0;">
										<h1 style="margin:32px 0 17px;border:none;padding:0;width:100px;font-size:30px;font-family:Helvetica, "Trebuchet MS", Verdana, Arial, sans-serif;line-height:36px;">
											<span style="margin:0;border:none;padding:0;">
													<img alt=" " src="' . $nuage . '"/>
											</span>
										</h1>
									</td>
								</tr>
							</tbody></table>
						</div>
					</div>
				</div>
				<!-- end header -->

				<div style="margin:0 auto;border:none;padding:10px 0 0;width:100%;overflow:hidden;">
					<div style="margin:0;border:none;padding:0;width:100%;">
						<div style="border:none;padding:0;color:#444;font-size:13px;line-height:24px;">
								<span style="color: white;font-size:18px;margin-left:80px;">'.$_POST['name'].',</span>
							<div style="color: white;margin-left:80px;font-size:17px;">
								'.$translation[$_POST['lang']].'
							</div>
							<span style="margin:0;border:none;padding:0;margin-left: 360px;margin-top: -41px;position: absolute;">
													<a href=\'http://lab.soixantecircuits.fr/cat-greetings/index.php?lang='.
													$_POST['lang'].'&message="'.urlencode($_POST['message']).'"\'><img border=0 style="border:0px solid;" alt="e-card" src="'.$video_go.'"/></a>
							</span>
						</div>
					</div>
			  </div>
		</div>
		<div style="margin:0px 0 0;border:none;padding:0;">
					<div style="margin:0;border:none;padding:0;">
						<div style="margin:0;border:none;padding:0;width:100%;">
							
							<table style="border: 0px solid;width: 100%;text-align: right;">
								<tr style="border: 0px solid;width: 100%;text-align: right;background-color: transparent;color: black;margin:0px;padding:0px">
									<th style="border: 0px solid;width: 100%;text-align: right;background-color: transparent;color: black;margin:0px;padding:0px"><span style="margin:0;border:none;padding:0;">
													<img alt=" " src="'.$nuage2_mail.'"/>
											</span></th>
								</tr>
							</table>

						</div>
					</div>
				</div>
</div>
</body></html>',
	   	   'text/html' //Mark the content-type as HTML
		);



		$message->addPart('Cat group vous souhaite une excellente année 2012 et vous invite à lire sa carte de voeux en ligne.'.
			' Cat Group wish you a happy new year 2012 and invites you to view the greeting card online.'.
			' Grupo del gato que usted desea un feliz año nuevo 2012 y te invita a ver la línea de la tarjeta de felicitación.'.
			' Cat Group wünschen Ihnen ein frohes neues Jahr 2012 und lädt Sie ein, die Grußkarte online ansehen.'.
			' Grupa Cat życzę szczęśliwego nowego roku 2012 i zaprasza do wyświetlenia powitania on-line karty.'
			, 'text/plain');

		
		$message->setReturnPath('infos@catgroup.com');
		$message->setFrom(array('infos@catgroup.com' => 'Cat Group'));
		$message->addTo($_POST['email']);
		$message->setPriority(1);
		
		date_default_timezone_set("France/Paris");
		
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
	echo '{"success":false, "msg":'.json_encode('Wrong STATE').'}';
	exit;
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