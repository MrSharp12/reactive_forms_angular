import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';




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
  //controls are all added in ngOnInit
  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }), 
      'gender': new FormControl('male'),
      //FormArray holds an array of controls
      'hobbies': new FormArray([new FormControl])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    //we need to tell ts that this is of type FormArray, so we won't get any errors
    //by placing it all in parens, we are telling angular that it is a form array
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
}
