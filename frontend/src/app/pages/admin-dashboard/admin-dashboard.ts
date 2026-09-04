
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { AdminService } from '../../service/admin';
import { AdminStats } from '../../data/admin-stats';
import { Comment } from '../../data/comment';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
  imports: [MatIcon, MatButton]
})
export class AdminDashboard implements OnInit {

  private adminService = inject(AdminService);

  public stats = signal<AdminStats | undefined>(undefined);
  public comments = signal<Comment[]>([]);
  public commentsLoading = signal(true);

  ngOnInit(): void {
    this.adminService.getStats().subscribe({
      next: (stats) => this.stats.set(stats),
      error: (err) => console.error('Failed to load admin stats:', err)
    });

    this.adminService.getAllComments().subscribe({
      next: (comments) => {
        this.comments.set(comments);
        this.commentsLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load admin comments:', err);
        this.commentsLoading.set(false);
      }
    });
  }

  public deleteComment(comment: Comment): void {
    this.adminService.deleteComment(comment.id).subscribe({
      next: () => this.comments.update((comments) => comments.filter((item) => item.id !== comment.id)),
      error: (err) => console.error('Failed to delete comment:', err)
    });
  }
}
