<?php

namespace Tests\Feature;

use App\Models\Activity;
use App\Models\Client;
use App\Models\Lead;
use App\Models\Project;
use App\Models\RevenuePoint;
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    // -------------------------------------------------------------------------
    // GET /api/dashboard/overview
    // -------------------------------------------------------------------------

    public function test_overview_returns_four_stat_keys(): void
    {
        $response = $this->getJson('/api/dashboard/overview');

        $response->assertOk()
            ->assertJsonCount(4, 'stats')
            ->assertJsonPath('stats.0.key', 'revenue')
            ->assertJsonPath('stats.1.key', 'projects')
            ->assertJsonPath('stats.2.key', 'clients')
            ->assertJsonPath('stats.3.key', 'pipeline');
    }

    public function test_overview_returns_zero_values_when_database_is_empty(): void
    {
        $response = $this->getJson('/api/dashboard/overview');

        $response->assertOk()
            ->assertJsonPath('stats.0.value', '$0')
            ->assertJsonPath('stats.1.value', '0')
            ->assertJsonPath('stats.2.value', '0')
            ->assertJsonPath('stats.3.value', '$0');
    }

    public function test_overview_revenue_reflects_latest_revenue_point(): void
    {
        RevenuePoint::factory()->create(['period_start' => '2026-03-01', 'revenue' => 20000]);
        RevenuePoint::factory()->create(['period_start' => '2026-04-01', 'revenue' => 30000]);

        $response = $this->getJson('/api/dashboard/overview');

        $response->assertOk()->assertJsonPath('stats.0.value', '$30,000');
    }

    public function test_overview_revenue_trend_is_up_when_current_exceeds_previous(): void
    {
        RevenuePoint::factory()->create(['period_start' => '2026-03-01', 'revenue' => 20000]);
        RevenuePoint::factory()->create(['period_start' => '2026-04-01', 'revenue' => 30000]);

        $response = $this->getJson('/api/dashboard/overview');

        $response->assertOk()->assertJsonPath('stats.0.trend', 'up');
    }

    public function test_overview_revenue_trend_is_down_when_current_is_less_than_previous(): void
    {
        RevenuePoint::factory()->create(['period_start' => '2026-03-01', 'revenue' => 30000]);
        RevenuePoint::factory()->create(['period_start' => '2026-04-01', 'revenue' => 20000]);

        $response = $this->getJson('/api/dashboard/overview');

        $response->assertOk()->assertJsonPath('stats.0.trend', 'down');
    }

    public function test_overview_revenue_change_is_zero_when_only_one_period_exists(): void
    {
        RevenuePoint::factory()->create(['period_start' => '2026-04-01', 'revenue' => 10000]);

        $response = $this->getJson('/api/dashboard/overview');

        $response->assertOk()->assertJsonPath('stats.0.change', 0);
    }

    public function test_overview_active_projects_excludes_completed(): void
    {
        $client  = Client::factory()->create();
        $service = Service::factory()->create();

        Project::factory()->for($client)->for($service)->create(['status' => 'In Progress']);
        Project::factory()->for($client)->for($service)->create(['status' => 'Planning']);
        Project::factory()->for($client)->for($service)->create(['status' => 'Completed']);

        $response = $this->getJson('/api/dashboard/overview');

        $response->assertOk()->assertJsonPath('stats.1.value', '2');
    }

    public function test_overview_active_clients_excludes_inactive(): void
    {
        Client::factory()->count(3)->create(['active' => true]);
        Client::factory()->count(2)->create(['active' => false]);

        $response = $this->getJson('/api/dashboard/overview');

        $response->assertOk()->assertJsonPath('stats.2.value', '3');
    }

    public function test_overview_pipeline_sums_only_open_lead_statuses(): void
    {
        $service = Service::factory()->create();

        Lead::factory()->for($service)->create(['status' => 'New',       'est_value' => 5000]);
        Lead::factory()->for($service)->create(['status' => 'Contacted', 'est_value' => 3000]);
        Lead::factory()->for($service)->create(['status' => 'Qualified', 'est_value' => 2000]);
        Lead::factory()->for($service)->create(['status' => 'Proposal',  'est_value' => 1000]);
        Lead::factory()->for($service)->create(['status' => 'Won',       'est_value' => 9000]);
        Lead::factory()->for($service)->create(['status' => 'Lost',      'est_value' => 9000]);

        $response = $this->getJson('/api/dashboard/overview');

        $response->assertOk()->assertJsonPath('stats.3.value', '$11,000');
    }

    // -------------------------------------------------------------------------
    // GET /api/dashboard/revenue
    // -------------------------------------------------------------------------

    public function test_revenue_returns_empty_data_when_no_points_exist(): void
    {
        $response = $this->getJson('/api/dashboard/revenue');

        $response->assertOk()->assertExactJson(['data' => []]);
    }

    public function test_revenue_returns_points_ordered_by_period_start_ascending(): void
    {
        RevenuePoint::factory()->create(['period_start' => '2026-04-01', 'label' => 'Apr 2026', 'revenue' => 10000, 'target' => 15000]);
        RevenuePoint::factory()->create(['period_start' => '2026-02-01', 'label' => 'Feb 2026', 'revenue' => 8000,  'target' => 12000]);
        RevenuePoint::factory()->create(['period_start' => '2026-03-01', 'label' => 'Mar 2026', 'revenue' => 9000,  'target' => 13000]);

        $response = $this->getJson('/api/dashboard/revenue');

        $response->assertOk()
            ->assertJsonCount(3, 'data')
            ->assertJsonPath('data.0.label', 'Feb 2026')
            ->assertJsonPath('data.1.label', 'Mar 2026')
            ->assertJsonPath('data.2.label', 'Apr 2026');
    }

    public function test_revenue_data_contains_label_revenue_and_target_fields(): void
    {
        RevenuePoint::factory()->create(['period_start' => '2026-04-01', 'label' => 'Apr 2026', 'revenue' => 12000, 'target' => 15000]);

        $response = $this->getJson('/api/dashboard/revenue');

        $response->assertOk()
            ->assertJsonPath('data.0.label', 'Apr 2026')
            ->assertJsonPath('data.0.revenue', 12000)
            ->assertJsonPath('data.0.target', 15000);
    }

    // -------------------------------------------------------------------------
    // GET /api/dashboard/service-mix
    // -------------------------------------------------------------------------

    public function test_service_mix_returns_empty_data_when_no_services_exist(): void
    {
        $response = $this->getJson('/api/dashboard/service-mix');

        $response->assertOk()->assertExactJson(['data' => []]);
    }

    public function test_service_mix_includes_expected_fields(): void
    {
        $service = Service::factory()->create(['name' => 'Web Development', 'slug' => 'web-development']);
        $client  = Client::factory()->create();
        Project::factory()->for($client)->for($service)->active()->create();

        $response = $this->getJson('/api/dashboard/service-mix');

        $response->assertOk()
            ->assertJsonPath('data.0.service', 'Web Development')
            ->assertJsonPath('data.0.slug', 'web-development')
            ->assertJsonPath('data.0.projects', 1)
            ->assertJsonStructure(['data' => [['service', 'slug', 'projects', 'revenue', 'share']]]);
    }

    public function test_service_mix_active_project_count_excludes_completed(): void
    {
        $service = Service::factory()->create();
        $client  = Client::factory()->create();

        Project::factory()->for($client)->for($service)->active()->count(2)->create();
        Project::factory()->for($client)->for($service)->completed()->count(3)->create();

        $response = $this->getJson('/api/dashboard/service-mix');

        $response->assertOk()->assertJsonPath('data.0.projects', 2);
    }

    public function test_service_mix_revenue_sums_only_won_leads(): void
    {
        $service = Service::factory()->create();

        Lead::factory()->for($service)->won()->create(['est_value' => 5000]);
        Lead::factory()->for($service)->won()->create(['est_value' => 3000]);
        Lead::factory()->for($service)->open()->create(['est_value' => 9999]);

        $response = $this->getJson('/api/dashboard/service-mix');

        $response->assertOk()->assertJsonPath('data.0.revenue', 8000);
    }

    public function test_service_mix_shares_sum_to_approximately_100(): void
    {
        $serviceA = Service::factory()->create();
        $serviceB = Service::factory()->create();

        Lead::factory()->for($serviceA)->won()->create(['est_value' => 3000]);
        Lead::factory()->for($serviceB)->won()->create(['est_value' => 7000]);

        $response = $this->getJson('/api/dashboard/service-mix');

        $totalShares = collect($response->json('data'))->sum('share');

        $this->assertEqualsWithDelta(100, $totalShares, 1);
    }

    public function test_service_mix_is_sorted_by_revenue_descending(): void
    {
        $serviceA = Service::factory()->create(['name' => 'Low Revenue']);
        $serviceB = Service::factory()->create(['name' => 'High Revenue']);

        Lead::factory()->for($serviceA)->won()->create(['est_value' => 1000]);
        Lead::factory()->for($serviceB)->won()->create(['est_value' => 9000]);

        $response = $this->getJson('/api/dashboard/service-mix');

        $response->assertOk()
            ->assertJsonPath('data.0.service', 'High Revenue')
            ->assertJsonPath('data.1.service', 'Low Revenue');
    }

    // -------------------------------------------------------------------------
    // GET /api/dashboard/projects
    // -------------------------------------------------------------------------

    public function test_projects_returns_empty_data_when_no_projects_exist(): void
    {
        $response = $this->getJson('/api/dashboard/projects');

        $response->assertOk()->assertExactJson(['data' => []]);
    }

    public function test_projects_returns_correct_shape(): void
    {
        $client  = Client::factory()->create(['name' => 'Acme Corp']);
        $service = Service::factory()->create(['name' => 'Web Development']);
        Project::factory()->for($client)->for($service)->create([
            'code'     => 'PRJ-0001',
            'name'     => 'New Website',
            'progress' => 75,
            'status'   => 'In Progress',
            'due_date' => '2026-06-15',
        ]);

        $response = $this->getJson('/api/dashboard/projects');

        $response->assertOk()
            ->assertJsonPath('data.0.id', 'PRJ-0001')
            ->assertJsonPath('data.0.name', 'New Website')
            ->assertJsonPath('data.0.client', 'Acme Corp')
            ->assertJsonPath('data.0.service', 'Web Development')
            ->assertJsonPath('data.0.progress', 75)
            ->assertJsonPath('data.0.status', 'In Progress');
    }

    public function test_projects_are_ordered_by_id_descending(): void
    {
        $client  = Client::factory()->create();
        $service = Service::factory()->create();

        Project::factory()->for($client)->for($service)->create(['name' => 'First Project']);
        Project::factory()->for($client)->for($service)->create(['name' => 'Second Project']);

        $response = $this->getJson('/api/dashboard/projects');

        $response->assertOk()
            ->assertJsonPath('data.0.name', 'Second Project')
            ->assertJsonPath('data.1.name', 'First Project');
    }

    public function test_projects_team_defaults_to_empty_array_when_null(): void
    {
        $client  = Client::factory()->create();
        $service = Service::factory()->create();
        Project::factory()->for($client)->for($service)->create(['team' => null]);

        $response = $this->getJson('/api/dashboard/projects');

        $response->assertOk()->assertJsonPath('data.0.team', []);
    }

    // -------------------------------------------------------------------------
    // GET /api/dashboard/leads
    // -------------------------------------------------------------------------

    public function test_leads_returns_empty_data_when_no_leads_exist(): void
    {
        $response = $this->getJson('/api/dashboard/leads');

        $response->assertOk()->assertExactJson(['data' => []]);
    }

    public function test_leads_returns_correct_shape(): void
    {
        $service = Service::factory()->create(['name' => 'Mobile App Development']);
        Lead::factory()->for($service)->create([
            'code'        => 'LED-0001',
            'name'        => 'John Doe',
            'company'     => 'Tech Co',
            'est_value'   => 15000,
            'status'      => 'New',
            'received_at' => now()->subDay(),
        ]);

        $response = $this->getJson('/api/dashboard/leads');

        $response->assertOk()
            ->assertJsonPath('data.0.id', 'LED-0001')
            ->assertJsonPath('data.0.name', 'John Doe')
            ->assertJsonPath('data.0.company', 'Tech Co')
            ->assertJsonPath('data.0.service', 'Mobile App Development')
            ->assertJsonPath('data.0.estValue', 15000)
            ->assertJsonPath('data.0.status', 'New');
    }

    public function test_leads_are_ordered_by_received_at_descending(): void
    {
        $service = Service::factory()->create();

        Lead::factory()->for($service)->create(['name' => 'Older Lead', 'received_at' => now()->subDays(5)]);
        Lead::factory()->for($service)->create(['name' => 'Newer Lead', 'received_at' => now()->subDay()]);

        $response = $this->getJson('/api/dashboard/leads');

        $response->assertOk()
            ->assertJsonPath('data.0.name', 'Newer Lead')
            ->assertJsonPath('data.1.name', 'Older Lead');
    }

    public function test_leads_received_at_is_human_readable_string(): void
    {
        $service = Service::factory()->create();
        Lead::factory()->for($service)->create(['received_at' => now()->subHour()]);

        $response = $this->getJson('/api/dashboard/leads');

        $this->assertIsString($response->json('data.0.receivedAt'));
    }

    // -------------------------------------------------------------------------
    // GET /api/dashboard/activity
    // -------------------------------------------------------------------------

    public function test_activity_returns_empty_data_when_no_entries_exist(): void
    {
        $response = $this->getJson('/api/dashboard/activity');

        $response->assertOk()->assertExactJson(['data' => []]);
    }

    public function test_activity_returns_correct_shape(): void
    {
        Activity::factory()->create([
            'actor'       => 'Alice',
            'kind'        => 'project_created',
            'message'     => 'New project kicked off.',
            'occurred_at' => now()->subMinutes(30),
        ]);

        $response = $this->getJson('/api/dashboard/activity');

        $entry = $response->json('data.0');

        $this->assertStringStartsWith('ACT-', $entry['id']);
        $this->assertSame('Alice', $entry['actor']);
        $this->assertSame('project_created', $entry['kind']);
        $this->assertSame('New project kicked off.', $entry['message']);
        $this->assertIsString($entry['timestamp']);
    }

    public function test_activity_is_ordered_by_occurred_at_descending(): void
    {
        Activity::factory()->create(['message' => 'Older event', 'occurred_at' => now()->subHours(2)]);
        Activity::factory()->create(['message' => 'Newer event', 'occurred_at' => now()->subHour()]);

        $response = $this->getJson('/api/dashboard/activity');

        $response->assertOk()
            ->assertJsonPath('data.0.message', 'Newer event')
            ->assertJsonPath('data.1.message', 'Older event');
    }

    public function test_activity_is_limited_to_20_entries(): void
    {
        Activity::factory()->count(25)->create();

        $response = $this->getJson('/api/dashboard/activity');

        $response->assertOk()->assertJsonCount(20, 'data');
    }
}
