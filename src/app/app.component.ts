import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


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
  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null),
      'email': new FormControl(null),
      'gender': new FormControl('male')
    });
  }
}
