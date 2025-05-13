<?php

namespace App\Providers;

use App\Models\Collection;
use App\Models\Watch;
use App\Models\Repair;
use App\Policies\CollectionPolicy;
use App\Policies\WatchPolicy;
use App\Policies\RepairPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Watch::class => WatchPolicy::class,
        Collection::class => CollectionPolicy::class,
        Repair::class => RepairPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
