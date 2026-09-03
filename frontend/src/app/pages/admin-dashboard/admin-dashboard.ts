
import { Component, inject, OnInit } from '@angular/core';
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

  public stats?: AdminStats;

  ngOnInit(): void {
    this.adminService.getStats().subscribe({
      next: (stats) => this.stats = stats,
      error: (err) => console.error('Failed to load admin stats:', err)
    });
  }
}
