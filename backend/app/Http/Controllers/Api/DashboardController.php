<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Client;
use App\Models\Lead;
use App\Models\Project;
use App\Models\RevenuePoint;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function overview(): JsonResponse
    {
        $latest = RevenuePoint::orderBy('period_start', 'desc')->first();
        $previous = RevenuePoint::orderBy('period_start', 'desc')->skip(1)->first();

        $monthlyRevenue = (int) ($latest?->revenue ?? 0);
        $revenueChange = $previous && $previous->revenue > 0
            ? round((($monthlyRevenue - $previous->revenue) / $previous->revenue) * 100, 1)
            : 0.0;

        $activeProjects = Project::where('status', '!=', 'Completed')->count();
        $activeClients = Client::where('active', true)->count();
        $openPipeline = (int) Lead::whereIn('status', ['New', 'Contacted', 'Qualified', 'Proposal'])->sum('est_value');

        return response()->json([
            'stats' => [
                [
                    'key' => 'revenue',
                    'label' => 'Monthly Revenue',
                    'value' => '$' . number_format($monthlyRevenue),
                    'change' => $revenueChange,
                    'trend' => $revenueChange >= 0 ? 'up' : 'down',
                ],
                [
                    'key' => 'projects',
                    'label' => 'Active Projects',
                    'value' => (string) $activeProjects,
                    'change' => 4.2,
                    'trend' => 'up',
                ],
                [
                    'key' => 'clients',
                    'label' => 'Active Clients',
                    'value' => (string) $activeClients,
                    'change' => 8.1,
                    'trend' => 'up',
                ],
                [
                    'key' => 'pipeline',
                    'label' => 'Open Pipeline',
                    'value' => '$' . number_format($openPipeline),
                    'change' => -2.3,
                    'trend' => 'down',
                ],
            ],
        ]);
    }

    public function revenue(): JsonResponse
    {
        $points = RevenuePoint::orderBy('period_start')->get(['label', 'revenue', 'target']);

        return response()->json(['data' => $points]);
    }

    public function serviceMix(): JsonResponse
    {
        $rows = Service::query()
            ->withCount(['projects' => fn ($q) => $q->where('status', '!=', 'Completed')])
            ->with(['leads' => fn ($q) => $q->where('status', 'Won')])
            ->get()
            ->map(function (Service $s) {
                $revenue = (int) $s->leads->sum('est_value');
                return [
                    'service' => $s->name,
                    'slug' => $s->slug,
                    'projects' => (int) $s->projects_count,
                    'revenue' => $revenue,
                ];
            })
            ->sortByDesc('revenue')
            ->values();

        $totalRevenue = max(1, $rows->sum('revenue'));
        $rows = $rows->map(fn ($row) => $row + [
            'share' => (int) round(($row['revenue'] / $totalRevenue) * 100),
        ]);

        return response()->json(['data' => $rows]);
    }

    public function projects(): JsonResponse
    {
        $projects = Project::with(['client:id,name', 'service:id,name'])
            ->orderByDesc('id')
            ->get()
            ->map(fn (Project $p) => [
                'id' => $p->code,
                'name' => $p->name,
                'client' => $p->client?->name,
                'service' => $p->service?->name,
                'progress' => $p->progress,
                'status' => $p->status,
                'dueDate' => $p->due_date?->format('M d'),
                'team' => $p->team ?? [],
            ]);

        return response()->json(['data' => $projects]);
    }

    public function leads(): JsonResponse
    {
        $leads = Lead::with('service:id,name')
            ->orderByDesc('received_at')
            ->get()
            ->map(fn (Lead $l) => [
                'id' => $l->code,
                'name' => $l->name,
                'company' => $l->company,
                'service' => $l->service?->name,
                'estValue' => $l->est_value,
                'status' => $l->status,
                'receivedAt' => $l->received_at?->diffForHumans(),
            ]);

        return response()->json(['data' => $leads]);
    }

    public function activity(): JsonResponse
    {
        $entries = Activity::orderByDesc('occurred_at')
            ->limit(20)
            ->get()
            ->map(fn (Activity $a) => [
                'id' => 'ACT-' . $a->id,
                'message' => $a->message,
                'actor' => $a->actor,
                'timestamp' => $a->occurred_at?->diffForHumans(),
                'kind' => $a->kind,
            ]);

        return response()->json(['data' => $entries]);
    }
}
