import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { authConfig } from '../../app.auth';
import { Media } from '../../data/media';
import { MediaService } from '../../service/media';
import { MediaList } from './media-list';

describe('MediaList', () => {
  let component: MediaList;
  let fixture: ComponentFixture<MediaList>;
  let mediaService: {
    getList: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let dialogOpen: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    mediaService = {
      getList: vi.fn(() => of([])),
      save: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    };
    dialogOpen = vi.fn();

    await TestBed.configureTestingModule({
      imports: [MediaList],
      providers: [
        provideOAuthClient(),
        { provide: AuthConfig, useValue: authConfig },
        { provide: MediaService, useValue: mediaService },
      ],
    }).overrideProvider(MatDialog, { useValue: { open: dialogOpen } }).compileComponents();

    fixture = TestBed.createComponent(MediaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the media list on initialization', () => {
    const media = [new Media()];
    mediaService.getList.mockClear();
    mediaService.getList.mockReturnValue(of(media));

    component.ngOnInit();

    expect(mediaService.getList).toHaveBeenCalledTimes(1);
    expect(component.mediaList()).toEqual(media);
  });

  it('updates a medium after editing', () => {
    const existing = new Media();
    existing.id = 1;
    const updated = new Media();
    updated.id = 1;
    updated.title = 'Updated title';
    component.mediaList.set([existing]);
    mediaService.update.mockReturnValue(of(updated));
    dialogOpen.mockReturnValue({ afterClosed: () => of(updated) });

    component.onEdit(existing);

    expect(mediaService.update).toHaveBeenCalledWith(updated);
    expect(component.mediaList()).toEqual([updated]);
  });

  it('adds a medium after the add dialog closes', () => {
    const media = new Media();
    media.id = 2;
    mediaService.save.mockReturnValue(of(media));
    dialogOpen.mockReturnValue({ afterClosed: () => of(media) });

    component.openAddDialog();

    expect(mediaService.save).toHaveBeenCalledWith(media);
    expect(component.mediaList()).toEqual([media]);
  });

  it('deletes a medium after confirmation', () => {
    const media = new Media();
    media.id = 3;
    component.mediaList.set([media]);
    mediaService.delete.mockReturnValue(of({ status: 204 }));
    dialogOpen.mockReturnValue({ afterClosed: () => of(true) });

    component.onDelete(media);

    expect(mediaService.delete).toHaveBeenCalledWith(3);
    expect(component.mediaList()).toEqual([]);
  });
});
