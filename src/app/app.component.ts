import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//first set implements OnInit lifecycle
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  //we are required then to place the ngOnInit method
  //this intializes it before the template is rendered
  //we need to create a new FormGroup
  //once we have passing in a js object, then we have our first form
  //remember reactive forms are created programatically
  //first argument is the default, the second is the validators
  //if you want to pass multiple validators, make an array
  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }), 
      'gender': new FormControl('male')
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
