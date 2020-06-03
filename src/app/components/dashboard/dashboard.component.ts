import { Component, OnInit, Inject } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  component = [];
  constructor(private _bottomSheet: MatBottomSheet, public dialog: MatDialog, private route: Router) { }

  ngOnInit() {
    this.component = JSON.parse(localStorage.getItem('components')) ? JSON.parse(localStorage.getItem('components')) : [];
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.component, event.previousIndex, event.currentIndex);
    this.addtoLocalStorage();
  }
  removeitem(i) {
    this.component.splice(i, 1);
    this.addtoLocalStorage();
  }

  resetform = () => {
    localStorage.removeItem('components');
    this.component = [];
  }
  submitform = () => {
    this.route.navigate(['form-output']);
  }
  openBottomSheet(type): void {
    const dialogRef = this.dialog.open(BottomSheetOverviewExampleSheet, { width: '600px', data: type });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.component.push(result);
        this.addtoLocalStorage();
      }

    });
  }

  addtoLocalStorage = () => {
    localStorage.setItem('components', JSON.stringify(this.component));
  }

}

/**Popup component**/

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
})
export class BottomSheetOverviewExampleSheet {
  className = 'form-control';
  name;
  placeholder;
  type;
  label;
  btntitle;
  btnclass = 'btn btn-primary';
  constructor(private _bottomSheetRef: MatDialogRef<BottomSheetOverviewExampleSheet>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.type = data;
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.close();
    event.preventDefault();
  }



  addField() {
    let object;
    if (this.type === 'input') {
      object = { name: this.name, className: this.className, placeholder: this.placeholder, type: this.type };
    }
    if (this.type === 'text') {
      object = { label: this.label, type: this.type };
    }
    if (this.type === 'button') {
      object = { btnclass: this.btnclass, btntitle: this.btntitle, type: this.type }
    }
    console.log(object);

    this._bottomSheetRef.close(object);
  }
}