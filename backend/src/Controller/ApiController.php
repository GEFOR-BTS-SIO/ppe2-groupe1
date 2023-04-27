<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[IsGranted(new Expression("is_granted('ROLE_USER')"))]


class ApiController extends AbstractController

{
    #[Route('/api', name: 'app_user_api', methods: ['GET', 'POST'])]
    public function index(Request $request, UserRepository $userRepository): Response
    {
       
$user = $this->getUser();
$email = $user->getEmail();

return new Response(json_encode( [
    'Content-Type' => 'application/json',
    'email' => $email,
  
]));

}

   
}


