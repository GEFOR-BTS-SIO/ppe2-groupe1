<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/me', name: 'app_me')]
public function me(): Response
{
    // Vérifier si l'utilisateur est connecté
    $data = json_decode($request->getContent(), true);

    $user = $this->getUser();
    if (!$user) {
        // Si l'utilisateur n'est pas connecté, renvoyer une réponse 401 Unauthorized
        return $this->json(['error' => 'Unauthorized'], 401);
    }

    // Récupérer l'email de l'utilisateur connecté
    $email = $user->getEmail();

    // Renvoyer une réponse avec l'email
    return $this->json(['email' => $email]);
}