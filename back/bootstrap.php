<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'host' => 'ec2-18-203-62-227.eu-west-1.compute.amazonaws.com',
'driver' => 'pdo_pgsql',
'user' => 'cjrlpdqebwvgni',
'password' => '4234272fdfc1d168327cd56d521b105e9c3970f5f92908e1bef8fb061b76ceb1',
'dbname' => 'dqlbvooaqq2r2',
'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);
?>