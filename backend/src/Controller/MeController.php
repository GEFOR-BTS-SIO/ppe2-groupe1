<?php

namespace App\Controller;
use  App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Expression\Expression;

#[IsGranted(new Expression("is_granted('ROLE_USER')"))]


class MeController extends AbstractController
{
    #[Route('/api', name: 'app_user_api', methods: ['GET', 'POST'])]
    public function index(Request $request, UserRepository $userRepository): Response
    {

        $user = $this->getUser();
        $email = $user->getEmail();

        return new Response(json_encode([
            'Content-Type' => 'application/json',
            'email' => $email,

        ]));

    }


}
