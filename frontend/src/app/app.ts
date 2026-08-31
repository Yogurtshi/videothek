import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MediaService } from './service/media';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  
  // Test if the MediaService is working
  // private mediaService = inject(MediaService);
  // 
  // ngOnInit(): void {
  //  this.mediaService.getList().subscribe({
  //   next: (media) => console.log('media:', media),
  //  error: (err) => console.error('failed:', err)
  //});
  //}
  
}