<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\Transport\Serialization\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class ApiController extends AbstractController
{
    #[Route('/api', name: 'app_user_api', methods: ['GET', 'POST'])]
    #[IsGranted('ROLE_USER')]
    public function index(Request $request, UserRepository $userRepository, SerializerInterface $serializerInterface): Response
    {
        $user = $this->getUser();
        $email = $user->getUserIdentifier();

        $response = new Response($serializerInterface->serialize([
            'email' => $email,
        ], 'json'), 200, [
            'Content-Type' => 'application/json'
        ]);

        return $response;
    }
}
