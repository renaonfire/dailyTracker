import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProjectService } from 'src/app/service/project.service';
import { Helpers } from 'src/app/helpers/helpers';
import { ViewDayPage } from '../view-day/view-day.page';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.page.html',
  styleUrls: ['./new-activity.page.scss'],
})
export class NewActivityPage implements OnInit {

  @Input() selectedProject;
  @Input() selectedDay;
  projectName;
  newDayDate;
  startTime;
  category;
  addedDay;
  existingDays;

  constructor(private modalCtrl: ModalController, private projectSrv: ProjectService, private helpers: Helpers) { }

  ngOnInit() {
    this.projectName = window.localStorage.getItem('projectName');
    this.newDayDate = this.selectedDay ? this.selectedDay : window.localStorage.getItem(`${this.selectedProject}-temp-day`);
  }

  onTimeChanged(event) {
    this.startTime = event.target.value;
  }

  onModalClose() {
    this.modalCtrl.dismiss({
      animated: false
    });
  }

  async onPresentDay() {
    const modal = await this.modalCtrl.create({
      component: ViewDayPage,
      componentProps: {selectedProject: this.selectedProject, selectedDay: this.newDayDate}
    });
    return modal.present();
  }

  currentDate() {
    return this.helpers.formatDate();
  }

  onDateChanged(event) {
    this.addedDay = this.helpers.formatDate(event.target.value);
  }

  onSaveActivity() {
    const time = this.startTime ? this.startTime : new Date();
    const day = this.newDayDate ? this.newDayDate : this.addedDay;
    if (this.selectedProject && this.selectedProject !== this.projectName) {
      this.projectSrv.onAddActivity(this.selectedProject, day, time, this.category);
      window.localStorage.removeItem(`${this.selectedProject}-temp-day`);
    } else {
      this.projectSrv.onCreateProjectWithData(this.projectName, day, time, this.category);
      window.localStorage.removeItem('projectName');
      window.localStorage.removeItem(`${this.selectedProject}-temp-day`);
    }
    this.onModalClose();
  }


}
