import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-video-delete-dialog',
  templateUrl: './video-delete-dialog.component.html',
  styleUrls: ['./video-delete-dialog.component.css']
})
export class VideoDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VideoDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean) {}

  ngOnInit(): void {
  }

  onDeleteVideo() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}
