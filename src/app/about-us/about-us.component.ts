import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionEvent } from '../prediction-event';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  gesture: String = '';

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  prediction(event: PredictionEvent) {
    this.gesture = event.getPrediction();
    this.controller();
  }

  homePageNav () {
    this.router.navigate(['/']);
  }

  controller() {
    switch(this.gesture) {
      case "One Open Hand One Closed Hand":
        this.homePageNav()
        break;
    }
  }

}
