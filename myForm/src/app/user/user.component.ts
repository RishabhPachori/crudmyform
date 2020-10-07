import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';


import { UserService } from '../Services/user.service';
import { User } from '../Services/user.model';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  genders = ['male', 'female'];

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshUserList();
  }

  /* selectFile(event) {
    this.userService.selectFile(event.target.files[0]).subscribe((res: any) => {
      this.resume=res.resume
    })
  } */

  resetForm(form?: NgForm) {
    if (form) 
      form.reset();
    this.userService.selectedUser = {
      _id: '',
      name: '',
      email: '',
      gender: '',
      address: '',
      city: '',
      zip: null,
      domain: '',
      coverLetter: '',
      resume: ''
    }
  }

  
  onSubmit(form: NgForm) {
    if (form.value._id == '') {
      this.userService.postUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUserList();
      });
    }
    else {
      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUserList();
      });
    }
  }

  // tslint:disable-next-line: typedef
  refreshUserList() {
    this.userService.getUserList().subscribe((res) => {
      this.userService.users = res as User[];
    });
  }

  onEdit(user: User) {
    this.userService.selectedUser = user;
  }

  // tslint:disable-next-line: variable-name
  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.refreshUserList();
        this.resetForm(form);
      });
    }
  }

}
