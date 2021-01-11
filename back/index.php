<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;


use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/bootstrap.php';

$app = AppFactory::create();

function  addHeaders (Response $response) : Response {
    $response = $response
    ->withHeader("Content-Type", "application/json")
    ->withHeader('Access-Control-Allow-Origin', '*')
    ->withHeader('Access-Control-Allow-Headers', 'Content-Type,  Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    ->withHeader('Access-Control-Expose-Headers', 'Authorization');

    return $response;
}

function createJwt (Response $response, $login) : Response {
    $issuedAt = time();
    $expirationTime = $issuedAt + 3600; // jwt valid for 3600 seconds from the issued time
    $payload = array(
        'login' => $login,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );
    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
}

const JWT_SECRET = "tp06_witz_ludovic";

// API Nécessitant un Jwt valide
$app->get('/auth/{login}', function (Request $request, Response $response, $args) {
    global $entityManager;

    $login = $args['login'];
    
    $utilisateurRepository = $entityManager->getRepository('Utilisateur');
    $utilisateur = $utilisateurRepository->findOneBy(array('login' => $login));
    if ($utilisateur) {
        $data = array('name' => $utilisateur->getNom(), 'surname' => $utilisateur->getPrenom());
        $response = addHeaders ($response);
        $response = createJwT ($response, $login);
        $response->getBody()->write(json_encode($data));
    } else {
        $response = $response->withStatus(401);
    }

    return $response;
});


// APi d'authentification générant un JWT
$app->post('/login', function (Request $request, Response $response, $args) {   
    global $entityManager;
    $err=false;
    $body = $request->getParsedBody();
    $login = $body ['login'] ?? "";
    $password = $body ['password'] ?? "";

    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$login))   {
        $err = true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$password))  {
        $err=true;
    }

    if (!$err) {
        $utilisateurRepository = $entityManager->getRepository('Utilisateur');
        $utilisateur = $utilisateurRepository->findOneBy(array('login' => $login, 'password' => $password));
        if ($utilisateur and $login == $utilisateur->getLogin() and $password == $utilisateur->getPassword()) {
            $response = addHeaders ($response,$request->getHeader('Origin'));
            $response = createJwT ($response, $login);
            $data = array('name' => $utilisateur->getNom(), 
                          'surname' => $utilisateur->getPrenom(),
                          'login' => $utilisateur->getLogin(),
                          'address' => $utilisateur->getAddress(),
                          'cp' => $utilisateur->getCp(),
                          'city' => $utilisateur->getCity(),
                          'phone' => $utilisateur->getPhone(),
                          'email' => $utilisateur->getEmail(),
                          'civility' => $utilisateur->getCivility(),
                          'password' => ''
                        );
            $response->getBody()->write(json_encode($data));
        } else {          
            $response = $response->withStatus(401);
        }
    } else {
        $response = $response->withStatus(401);
    }

    return $response;
});

// APi créant un utilisateur
$app->post('/addClient', function (Request $request, Response $response, $args) {   
    global $entityManager;
    $err=false;
    $body = $request->getParsedBody();
    $name = $body['name'] ?? "";
    $surname = $body['surname'] ?? "";
    $login = $body['login'] ?? "";
    $password = $body['password'] ?? "";
    $address = $body['address'] ?? "";
    $cp = $body['cp'] ?? "";
    $city = $body['city'] ?? "";
    $phone = $body['phone'] ?? "";
    $email = $body['email'] ?? "";
    $civility = $body['civility'] ?? "";

    if (!preg_match("/[a-zA-Z]{1,20}/",$name))   {
        $err = true;
    }
    if (!preg_match("/[a-zA-Z]{1,20}/",$surname))   {
        $err = true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$login))   {
        $err = true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$password))  {
        $err=true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,50}/",$address))  {
        $err=true;
    }
    if (!preg_match("/[0-9]{5}/",$cp))  {
        $err=true;
    }
    if (!preg_match("/[a-zA-Z]{1,30}/",$city))  {
        $err=true;
    }
    if (!preg_match("/[0-9]{10}/",$phone))  {
        $err=true;
    }
    if (!preg_match("/[a-zA-Z]{5}/",$civility))  {
        $err=true;
    }

    if (!$err) {
        $utilisateurRepository = $entityManager->getRepository('Utilisateur');
        $utilisateur = $utilisateurRepository->findOneBy(array('login' => $login, 'password' => $password));
        if ($utilisateur and $login == $utilisateur->getLogin() and $password == $utilisateur->getPassword()) {
            $response = $response->withStatus(401);
        } else {      
            $utilisateur = new Utilisateur;
            $utilisateur->setNom($name);
            $utilisateur->setPrenom($surname);
            $utilisateur->setLogin($login);
            $utilisateur->setPassword($password);
            $utilisateur->setAddress($address);
            $utilisateur->setCp($cp);
            $utilisateur->setCity($city);
            $utilisateur->setPhone($phone);
            $utilisateur->setEmail($email);
            $utilisateur->setCivility($civility);
            $entityManager->persist($utilisateur);
            $entityManager->flush();
            $response = addHeaders ($response,$request->getHeader('Origin'));
            $response = createJwT ($response, $login);
            $data = array('name' => $utilisateur->getNom(), 
                          'surname' => $utilisateur->getPrenom(),
                          'login' => $utilisateur->getLogin(),
                          'address' => $utilisateur->getAddress(),
                          'cp' => $utilisateur->getCp(),
                          'city' => $utilisateur->getCity(),
                          'phone' => $utilisateur->getPhone(),
                          'email' => $utilisateur->getEmail(),
                          'civility' => $utilisateur->getCivility(),
                        );
            $response->getBody()->write(json_encode($data));
        }
    } else {
        $response = $response->withStatus(401);
    }

    return $response;
});

// APi supprimant un utilisateur
$app->post('/deleteUser', function (Request $request, Response $response, $args) {   
    global $entityManager;
    $err=false;
    $body = $request->getParsedBody();
    $login = $body['login'] ?? "";
    $password = $body['password'] ?? "";

    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$login))   {
        $err = true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$password))  {
        $err=true;
    }

    if (!$err) {
        $utilisateurRepository = $entityManager->getRepository('Utilisateur');
        $utilisateur = $utilisateurRepository->findOneBy(array('login' => $login, 'password' => $password));
        if ($utilisateur and $login == $utilisateur->getLogin() and $password == $utilisateur->getPassword()) {
            $entityManager->remove($utilisateur);
            $entityManager->flush();
            $response = addHeaders ($response);
            $response = createJwT ($response, $login);
            $data = array('msg' => 'User successfully deleted');
            $response->getBody()->write(json_encode($data));
        } else {    
            $response = $response->withStatus(401);
        }
    } else {
        $response = $response->withStatus(401);
    }

    return $response;
});


// Middleware de validation du Jwt
$jwt = new \Tuupola\Middleware\JwtAuthentication([
    "path" => "/",
    "secure" => false,
    "secret" => JWT_SECRET,
    "ignore" => ["/login", "/addClient", "/deleteUser"],
    "attribute" => "decoded_token_data",
    "algorithm" => ["HS256"],
    "error" => function  ($response, $arguments) {
    $data = array('ERREUR' => 'ERREUR', 'ERREUR' => 'AUTO');
    return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
]);

$app->add($jwt);

// Run app
$app->run();
