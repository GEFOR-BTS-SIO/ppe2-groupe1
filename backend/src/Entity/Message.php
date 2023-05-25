<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Ignore;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $message_send = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $message_receved = null;

    // #[ORM\ManyToOne(inversedBy: 'iduser')]
    // private ?User $user = null;

    // #[ORM\Column(length: 255)]
    // #[Ignore]
    // private ?string $sender = null;

    // #[ORM\Column(length: 255)]
    // #[Ignore]
    // private ?string $recipient = null;

    #[ORM\Column(length: 255)]
    #[Ignore]
    private ?string $content = null;

    // changer username par user_id
   
    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: "user_id", referencedColumnName: "id")]
    private ?User $user = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMessageSend(): ?string
    {
        return $this->message_send;
    }

    public function setMessageSend(string $message_send): self
    {
        $this->message_send = $message_send;

        return $this;
    }

    public function getMessageReceved(): ?string
    {
        return $this->message_receved;
    }

    public function setMessageReceved(?string $message_receved): self
    {
        $this->message_receved = $message_receved;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getSender(): ?string
    {
        return $this->sender;
    }

    public function setSender(string $sender): self
    {
        $this->sender = $sender;

        return $this;
    }

    public function getRecipient(): ?string
    {
        return $this->recipient;
    }

    public function setRecipient(string $recipient): self
    {
        $this->recipient = $recipient;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }
}
