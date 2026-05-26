<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metodo non consentito.']);
    exit;
}

function field(string $name): string
{
    return trim((string)($_POST[$name] ?? ''));
}

function header_field(string $value): string
{
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

if (field('website') !== '') {
    echo json_encode(['success' => true]);
    exit;
}

$nome = field('nome');
$cognome = field('cognome');
$email = field('email');
$telefono = field('telefono');
$note = field('note');

if ($nome === '' || $cognome === '' || $email === '' || $telefono === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Compila tutti i campi obbligatori.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Inserisci un indirizzo email valido.']);
    exit;
}

$to = 'josepossidente1977@gmail.com';
$subject = "Richiesta consulenza gratuita Champion's Fit";
$message = "Hai ricevuto una nuova richiesta dal sito Champion's Fit Possidente.\n\n"
    . "Nome: {$nome} {$cognome}\n"
    . "Email: {$email}\n"
    . "Telefono: {$telefono}\n\n"
    . "Note:\n{$note}\n";

$from = 'no-reply@championsfitpossidente.it';
$replyName = header_field($nome . ' ' . $cognome);
$replyEmail = header_field($email);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Champion\'s Fit Possidente <' . $from . '>',
    'Reply-To: ' . $replyName . ' <' . $replyEmail . '>',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($to, $subject, $message, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Invio non riuscito.']);
    exit;
}

echo json_encode(['success' => true]);
