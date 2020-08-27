import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.page.html',
  styleUrls: ['./new-activity.page.scss'],
})
export class NewActivityPage implements OnInit {

  projectName;
  newDayDate;
  startTime;
  category;

  constructor(private modalCtrl: ModalController, private projectSrv: ProjectService) { }

  ngOnInit() {
    this.projectName = window.localStorage.getItem('projectName');
    this.newDayDate = window.localStorage.getItem('newDayDate');
  }

  currentTime() {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return `${hour}:${minutes}`;
  }

  onModalClose() {
    this.modalCtrl.dismiss();
  }

  onSaveActivity() {
    this.projectSrv.onCreateProjectWithActivity(this.projectName, this.newDayDate, this.startTime, this.category);
    console.log(this.projectName, this.newDayDate, this.startTime, this.category);
  }


}
