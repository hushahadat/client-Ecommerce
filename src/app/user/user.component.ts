import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'models/user';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  str: string = 'yes';
  userArr: User[] = [];

  constructor(private router: Router, private userService: UserService) {
    this.userService.getUsers().subscribe((data) => {
      this.userArr = data;
    });
  }

  ngOnInit(): void {}
  displayUserDetails(_id: number) {
    console.log('user _id of item clicked' + _id);
    this.router.navigate(['/singleuser/' + _id]);
  }
  deleteUser(uid: number) {
    this.userService.deleteUser(uid).subscribe((data) => {
      console.log(data);
      location.reload();
      //console.log("user id of item clicked"+data)
    });
  }
}
