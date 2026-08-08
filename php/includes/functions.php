<?php
// php/includes/functions.php
// Minimal functions and log_action for deployment sample

function getPDO(){
    $cfg = include __DIR__ . '/../config/database.php';
    $dsn = 'mysql:host='.$cfg['host'].';dbname='.$cfg['dbname'].';charset=utf8mb4';
    try{ return new PDO($dsn, $cfg['user'], $cfg['pass'], [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]); }
    catch(Exception $e){ die('DB connection error'); }
}

function csrf_token(){
    if(session_status()===PHP_SESSION_NONE) session_start();
    if(empty($_SESSION['csrf'])) $_SESSION['csrf']=bin2hex(random_bytes(16));
    return $_SESSION['csrf'];
}

function csrf_check($t){
    if(session_status()===PHP_SESSION_NONE) session_start();
    return isset($_SESSION['csrf']) && hash_equals($_SESSION['csrf'], (string)$t);
}

function log_action(?int $userId, string $action, $details=null): void {
    try{
        $pdo = getPDO();
        $stmt = $pdo->prepare('INSERT INTO audit_logs (admin_id, action, details, ip, user_agent, created_at) VALUES (:admin, :action, :details, :ip, :ua, NOW())');
        $payload = null; if(is_array($details)) $payload = json_encode($details); elseif($details!==null) $payload = json_encode(['info'=>(string)$details]);
        $ip = $_SERVER['REMOTE_ADDR'] ?? null; $ua = $_SERVER['HTTP_USER_AGENT'] ?? null;
        $stmt->execute(['admin'=>$userId,'action'=>$action,'details'=>$payload,'ip'=>$ip,'ua'=>$ua]);
    }catch(Exception $e){ /* ignore */ }
}
