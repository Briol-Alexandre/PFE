<?php

namespace App\Notifications;

use App\Models\Repair;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class RepairStatusUpdated extends Notification
{
    use Queueable;

    public function __construct(protected Repair $repair)
    {
    }

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        // Déterminer si le destinataire est le créateur ou l'utilisateur
        $isCreator = $notifiable->id === $this->repair->collection->watch->creator_id;
        $repairRoute = $isCreator ? 'repair.show.creator' : 'repair.show';

        $message = (new MailMessage)
            ->from(config('mail.from.address'), config('mail.from.name'))
            ->replyTo(config('mail.from.address'), config('mail.from.name'))
            ->subject('Mise à jour de votre réparation - WatchOut')
            ->greeting('Bonjour')
            ->salutation('Cordialement, L\'équipe WatchOut');

        switch ($this->repair->status) {
            case 'asked':
                $message->line('Une nouvelle demande de réparation a été créée.')
                    ->line('Montre : ' . $this->repair->collection->watch->model)
                    ->line('Description: ' . $this->repair->description);

                // Afficher les types de réparations demandés
                $message->line('Réparations demandées :');
                foreach ($this->repair->revisions as $revision) {
                    $message->line('- ' . $revision['name']);
                }
                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;

            case 'pending':
                $message->line('La réparation de votre ' . $this->repair->collection->watch->model . ' a été évaluée.')
                    ->line('Prix estimé: ' . $this->repair->price . '€')
                    ->line('Date prévue: ' . $this->repair->date->format('d/m/Y H:i'));
                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;

            case 'accepted':
                $message->line('La réparation a été acceptée par l‘utilisateur.')
                    ->line('Prix: ' . $this->repair->price . '€')
                    ->line('Date prévue: ' . $this->repair->date->format('d/m/Y H:i'));
                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;

            case 'completed':
                $message->line('La réparation de votre ' . $this->repair->collection->watch->model . ' est terminée.')
                    ->line('Merci de votre confiance !');
                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;

            case 'rejected':
                $message->line('La réparation de votre ' . $this->repair->collection->watch->model . ' a été refusée.')
                    ->line('Raison: ' . $this->repair->refuse_reason);
                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;

            case 'modified':
                $message->line('La réparation de votre ' . $this->repair->collection->watch->model . ' a été modifiée.')
                    ->line('Modification: ' . $this->repair->modify_reason)
                    ->line('Nouvelle date: ' . $this->repair->date->format('d/m/Y H:i'))
                    ->line('Nouveau prix: ' . $this->repair->price . '€');

                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;

            case 'canceled':
                $message->line('La réparation de votre ' . $this->repair->collection->watch->model . ' a été annulée par le client.');
                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;

            case 'in_progress':
                $message->line('La réparation de votre ' . $this->repair->collection->watch->model . ' est en cours.');
                $message->action('Voir la réparation', route($repairRoute, $this->repair->id));
                break;
        }

        return $message;
    }
}
