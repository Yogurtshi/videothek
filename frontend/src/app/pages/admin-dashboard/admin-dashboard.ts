
import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminService } from '../../service/admin';
import { AdminStats } from '../../data/admin-stats';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
  imports: []
})
export class AdminDashboard implements OnInit {

  private adminService = inject(AdminService);

  public stats = signal<AdminStats | undefined>(undefined);

  ngOnInit(): void {
    this.adminService.getStats().subscribe({
      next: (stats) => this.stats.set(stats),
      error: (err) => console.error('Failed to load admin stats:', err)
    });
  }
}
