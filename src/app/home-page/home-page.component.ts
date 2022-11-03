import { Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { PredictionEvent } from '../prediction-event';

// The foundation of our game was achieved with the help of this youtube video: https://www.youtube.com/watch?v=i7nIutSLvdU
// The code was adapted to fit Angular and our needs
// Any other feature that is was not in the orignal game or seen in the video is soley our own code and ideas

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  gesture: String = "";
  @ViewChild("jumper") jumper: ElementRef;
  @ViewChild("obstacle") obstacle: ElementRef;
  @ViewChild ("fireball") fireball: ElementRef;
  running = false;

  Checker = setInterval(() => {
    var jumperPos = parseInt(window.getComputedStyle(this.jumper.nativeElement).getPropertyValue("top"));

    var obstaclePos = parseInt(window.getComputedStyle(this.obstacle.nativeElement).getPropertyValue("left"));

    var fireballPos = parseInt(window.getComputedStyle(this.fireball.nativeElement).getPropertyValue("left"))

    // This is for collision between the jumper and the obstacle
    if (obstaclePos < 40 && obstaclePos > 0 && jumperPos >= 240) {
      alert("Oh no! You got hit!")
      this.render.removeClass(this.obstacle.nativeElement, "start");
      this.running = false;
    }

    if (fireballPos > obstaclePos) {
      this.render.removeClass(this.fireball.nativeElement, "shoot");
      this.render.removeClass(this.obstacle.nativeElement, "start");
      this.render.setStyle(this.fireball.nativeElement, "display", "none");
      this.render.setStyle(this.obstacle.nativeElement, "top", "210px");
      this.render.setStyle(this.obstacle.nativeElement, "left", "680px");
      if (this.running) {
        setTimeout(() => {
          this.render.addClass(this.obstacle.nativeElement, "start");
        }, 10)
      }
    }

  }, 10);

  constructor(private render:Renderer2, private router:Router) { }

  ngOnInit(): void {
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    this.controller();
  }

  jump() {
    // This makes sure that the user cannot spam the jump function
    if (this.jumper.nativeElement.classList != "jump") {

      // This will add the "jump" class to the "jumper" div which will activate his jump
      this.render.addClass(this.jumper.nativeElement, "jump")

      // This is what allows the jumper to continue to jump when the jump function is called
      // It removes the "jump" class from the "jumper" div
      setTimeout(() => {
      this.render.removeClass(this.jumper.nativeElement, "jump");
      }, 300);
    }
  }

  start() {
    if (!this.running) {
      this.render.addClass(this.obstacle.nativeElement, "start");
      this.running = true;
    }
  }

  quit() {
    if (this.running) {
      this.render.removeClass(this.obstacle.nativeElement, "start")
      this.running = false;
    }
  }

  shoot() {
    if (this.fireball.nativeElement.classList != "shoot") {

      this.render.setStyle(this.fireball.nativeElement, "display", "block");
      this.render.setStyle(this.obstacle.nativeElement, "top", "200px");
      this.render.addClass(this.fireball.nativeElement, "shoot");

      setTimeout(() => {
        this.render.removeClass(this.fireball.nativeElement, "shoot");
        this.render.setStyle(this.fireball.nativeElement, "display", "none");
        this.render.setStyle(this.obstacle.nativeElement, "top", "210px");
      }, 1600);
    }
  }

  aboutPageNav () {
    this.router.navigate(['/aboutUs']);
  }

  controller() {
    switch(this.gesture) {
      case "Closed Hand":
        this.jump();
        break;
      case "Hand Pointing":
        this.start();
        break;
      case "Two Open Hands":
        this.quit();
        break;
      case "Two Hands Pointing":
        this.shoot();
        break;
      case "Two Closed Hands":
        this.aboutPageNav();
        break;
    }
  }
}
