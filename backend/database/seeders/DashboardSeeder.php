<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Client;
use App\Models\Lead;
use App\Models\Project;
use App\Models\RevenuePoint;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DashboardSeeder extends Seeder
{
    public function run(): void
    {
        $services = collect([
            ['slug' => 'web-development', 'name' => 'Web Development'],
            ['slug' => 'mobile-development', 'name' => 'Mobile Development'],
            ['slug' => 'saas-development', 'name' => 'SaaS Development'],
            ['slug' => 'consulting', 'name' => 'Technical Consulting'],
            ['slug' => 'ui-ux', 'name' => 'UI/UX Design'],
            ['slug' => 'support', 'name' => 'Maintenance & Support'],
        ])->mapWithKeys(fn ($s) => [$s['slug'] => Service::create($s)]);

        $clients = collect([
            'Helix Data Co.',
            'NorthRider Logistics',
            'Atlas Consulting',
            'PaySwift Inc.',
            'Vivid Studio',
            'Lumen Health',
            'Beacon Logistics',
            'OrbitWorks',
            'Greenline Retail',
            'Northwind Studios',
        ])->mapWithKeys(fn ($name) => [$name => Client::create(['name' => $name])]);

        collect([
            ['code' => 'PRJ-1042', 'name' => 'Helix Analytics Platform',  'client' => 'Helix Data Co.',        'service' => 'saas-development',   'progress' => 78,  'status' => 'On Track',  'due' => '2026-05-14', 'team' => ['AM', 'JD', 'KP']],
            ['code' => 'PRJ-1039', 'name' => 'NorthRider Mobile App',     'client' => 'NorthRider Logistics', 'service' => 'mobile-development', 'progress' => 54,  'status' => 'At Risk',   'due' => '2026-05-02', 'team' => ['SK', 'RV']],
            ['code' => 'PRJ-1037', 'name' => 'Atlas Client Portal',       'client' => 'Atlas Consulting',     'service' => 'web-development',    'progress' => 92,  'status' => 'On Track',  'due' => '2026-04-29', 'team' => ['MN', 'AM', 'BR']],
            ['code' => 'PRJ-1031', 'name' => 'PaySwift Billing Engine',   'client' => 'PaySwift Inc.',        'service' => 'saas-development',   'progress' => 38,  'status' => 'Delayed',   'due' => '2026-06-10', 'team' => ['JD', 'TL']],
            ['code' => 'PRJ-1024', 'name' => 'Vivid Studio Rebrand',      'client' => 'Vivid Studio',         'service' => 'ui-ux',              'progress' => 100, 'status' => 'Completed', 'due' => '2026-04-12', 'team' => ['BR', 'KP']],
        ])->each(function (array $p) use ($clients, $services) {
            Project::create([
                'code' => $p['code'],
                'name' => $p['name'],
                'client_id' => $clients[$p['client']]->id,
                'service_id' => $services[$p['service']]->id,
                'progress' => $p['progress'],
                'status' => $p['status'],
                'due_date' => $p['due'],
                'team' => $p['team'],
            ]);
        });

        collect([
            ['code' => 'LD-2087', 'name' => 'Rachel Singh',      'company' => 'Lumen Health',       'service' => 'saas-development',   'value' => 84_000, 'status' => 'Qualified', 'received' => Carbon::now()->subHours(2)],
            ['code' => 'LD-2086', 'name' => 'Marcus Reed',       'company' => 'Beacon Logistics',   'service' => 'mobile-development', 'value' => 52_500, 'status' => 'Proposal',  'received' => Carbon::now()->subHours(5)],
            ['code' => 'LD-2085', 'name' => 'Priya Natarajan',   'company' => 'OrbitWorks',         'service' => 'consulting',         'value' => 18_000, 'status' => 'New',       'received' => Carbon::now()->subDay()],
            ['code' => 'LD-2084', 'name' => 'Tom Bradshaw',      'company' => 'Greenline Retail',   'service' => 'web-development',    'value' => 36_400, 'status' => 'Contacted', 'received' => Carbon::now()->subDays(2)],
            ['code' => 'LD-2083', 'name' => 'Elena Park',        'company' => 'Northwind Studios',  'service' => 'ui-ux',              'value' => 12_800, 'status' => 'Won',       'received' => Carbon::now()->subDays(3)],
        ])->each(function (array $l) use ($services) {
            Lead::create([
                'code' => $l['code'],
                'name' => $l['name'],
                'company' => $l['company'],
                'service_id' => $services[$l['service']]->id,
                'est_value' => $l['value'],
                'status' => $l['status'],
                'received_at' => $l['received'],
            ]);
        });

        collect([
            ['label' => 'Nov', 'period' => '2025-11-01', 'revenue' => 118_400, 'target' => 120_000],
            ['label' => 'Dec', 'period' => '2025-12-01', 'revenue' => 132_900, 'target' => 130_000],
            ['label' => 'Jan', 'period' => '2026-01-01', 'revenue' => 141_200, 'target' => 140_000],
            ['label' => 'Feb', 'period' => '2026-02-01', 'revenue' => 152_700, 'target' => 150_000],
            ['label' => 'Mar', 'period' => '2026-03-01', 'revenue' => 164_500, 'target' => 160_000],
            ['label' => 'Apr', 'period' => '2026-04-01', 'revenue' => 184_250, 'target' => 175_000],
        ])->each(fn ($r) => RevenuePoint::create([
            'label' => $r['label'],
            'period_start' => $r['period'],
            'revenue' => $r['revenue'],
            'target' => $r['target'],
        ]));

        collect([
            ['actor' => 'Sara Mitchell', 'kind' => 'lead',    'message' => 'closed deal with Northwind Studios for $12,800', 'when' => Carbon::now()->subMinutes(32)],
            ['actor' => 'Adam Mansour',  'kind' => 'project', 'message' => 'pushed milestone v0.7 to Helix Analytics Platform', 'when' => Carbon::now()->subHour()],
            ['actor' => 'Billing Bot',   'kind' => 'invoice', 'message' => 'sent invoice INV-2041 to Atlas Consulting',        'when' => Carbon::now()->subHours(3)],
            ['actor' => 'System',        'kind' => 'system',  'message' => 'flagged NorthRider Mobile App as At Risk',         'when' => Carbon::now()->subHours(5)],
            ['actor' => 'Jordan Davis',  'kind' => 'lead',    'message' => 'qualified new lead from Lumen Health',             'when' => Carbon::now()->subHours(6)],
        ])->each(fn ($a) => Activity::create([
            'actor' => $a['actor'],
            'kind' => $a['kind'],
            'message' => $a['message'],
            'occurred_at' => $a['when'],
        ]));
    }
}
